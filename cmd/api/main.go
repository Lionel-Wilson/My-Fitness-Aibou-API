package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/Lionel-Wilson/My-Fitness-Aibou-API/internal/api/handlers"
	"github.com/Lionel-Wilson/My-Fitness-Aibou-API/internal/api/middlewares"
	"github.com/Lionel-Wilson/My-Fitness-Aibou-API/internal/db/mysql"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"

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

/* TO-DO: Figure out how to put DB into container and have it communicate with api container
func buildConnectionString() string {
	user := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	database := os.Getenv("DATABASE")
	server := os.Getenv("DEV_SERVER") // Get the server address from the environment variable

	connectionString := fmt.Sprintf(`%s:%s@tcp(%s)/%s?parseTime=true`, user, password, server, database)
	return connectionString
}*/

/*Uncomment when running locally
func buildConnectionString() string {
	user := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	database := os.Getenv("DATABASE")

	connectionString := fmt.Sprintf(`%s:%s@/%s?parseTime=true`, user, password, database)
	return connectionString
}*/

func parseMySQLURL(mysqlURL string) (string, error) {
	// Parse the URL
	u, err := url.Parse(mysqlURL)
	if err != nil {
		return "", err
	}

	// Ensure the scheme is correct
	if u.Scheme != "mysql" {
		return "", fmt.Errorf("invalid scheme: %s", u.Scheme)
	}

	// Extract user information
	user := u.User.Username()
	password, _ := u.User.Password()

	// Extract the hostname and port
	host := u.Hostname()
	port := u.Port()

	// Extract the database name from the path
	dbname := strings.TrimPrefix(u.Path, "/")

	// Construct the DSN (Data Source Name) with sql_mode
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&sql_mode=''", user, password, host, port, dbname)
	return dsn, nil
}

func main() {
	/* Load environment variables. Uncomment when running locally and not in container
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}*/
	addr := os.Getenv("DEV_ADDRESS")
	//connectionString := buildConnectionString() Uncomment when running locally
	mysqlURL := os.Getenv("MYSQL_URL")
	secret := os.Getenv("SECRET")

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	if mysqlURL == "" {
		errorLog.Fatal("MYSQL_URL is not set or empty")
	}

	connectionString, err := parseMySQLURL(mysqlURL)
	if err != nil {
		errorLog.Fatal(err)
	}

	infoLog.Printf("Using connection string: %s", connectionString)

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
		Health:    &mysql.HealthModel{DB: db},
	}

	//gin.SetMode(gin.ReleaseMode)
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
		apiV1.POST("/users", app.SignUpUser)
		apiV1.POST("/users/login", app.LoginUser)
		apiV1.POST("/users/logout", app.LogoutUser) //TO-DO: Implement log out

		authorized := apiV1.Group("/")
		authorized.Use(middlewares.AuthRequired())
		{
			authorized.GET("/users/details", app.GetUserDetails)
			authorized.PUT("/users/details", app.UpdateUserDetails)
			//authorized.POST("/users/authenticate", app.AuthenticateUser) TO-DO: decide if I still need this

			authorized.GET("/workouts", app.GetAllWorkouts)
			authorized.POST("/workouts", app.AddNewWorkout)
			authorized.PUT("/workouts", app.UpdateWorkout) // TO-DO: update so that workout id is a path parameter.e.g. /workouts/:id
			authorized.DELETE("/workouts/:id", app.DeleteWorkout)

			authorized.DELETE("/workouts/exercises/:id", app.DeleteExercise)

			authorized.POST("/health/body-weight", app.TrackBodyWeight)
			authorized.GET("/health/body-weight", app.GetBodyWeightData)
			authorized.POST("/health/bmr", app.GetBMR)
		}

	}
	infoLog.Printf("Starting server on %s", addr)

	//router.RunTLS(addr, "./tls/cert.pem", "./tls/key.pem") TO-DO: Server over HTTPS when figure out how to get certificates
	router.Run(addr)
	if err != nil {
		errorLog.Fatal(err)
	}
}
