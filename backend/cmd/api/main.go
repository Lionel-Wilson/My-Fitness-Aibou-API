package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/handlers"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/middlewares"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/pkg/models/mysql"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

func openDB(connectionString string) (*sql.DB, error) {
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func buildConnectionString() string {
	user := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	database := os.Getenv("DATABASE")

	connectionString := fmt.Sprintf(`%s:%s@/%s?parseTime=true`, user, password, database)
	return connectionString
}

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	addr := os.Getenv("DEV_ADDRESS")
	connectionString := buildConnectionString()
	secret := os.Getenv("SECRET")

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	db, err := openDB(connectionString)
	if err != nil {
		errorLog.Fatal(err)
	}
	defer db.Close()

	app := &handlers.Application{
		ErrorLog:  errorLog,
		InfoLog:   infoLog,
		Workouts:  &mysql.WorkoutModel{DB: db},
		Users:     &mysql.UserModel{DB: db},
		Exercises: &mysql.ExerciseModel{DB: db},
	}

	router := gin.Default()

	store := cookie.NewStore([]byte(secret))
	store.Options(sessions.Options{
		MaxAge:   12 * 60 * 60, // 12 hours
		HttpOnly: true,
		Secure:   true, // true in production
	})
	router.Use(sessions.Sessions("mysession", store))

	router.Use(middlewares.SecureHeaders())
	router.Use(middlewares.CorsMiddleware())

	apiV1 := router.Group("/api/v1")
	{
		apiV1.POST("/user/signup", app.SignUpUser)
		apiV1.POST("/user/login", app.LoginUser)
		apiV1.POST("/user/logout", app.LogoutUser) //TO-DO: Implement log out

		apiV1.POST("/kitchen/bmr", app.GetBMR)

		authorized := apiV1.Group("/")
		authorized.Use(middlewares.AuthRequired())
		{
			authorized.POST("/user/details", app.GetUserDetails)
			//authorized.POST("/user/authenticate", app.AuthenticateUser) TO-DO: decide if I still need this

			authorized.GET("/workout/get-workouts", app.GetAllWorkouts)
			authorized.POST("/workout/add-workout", app.AddNewWorkout)
			authorized.PUT("/workout/update-workout", app.UpdateWorkout)
		}

	}
	infoLog.Printf("Starting server on %s", addr)

	router.Run(addr)
}
