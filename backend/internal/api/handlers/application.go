package handlers

import (
	"log"

	validators "github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/validators"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/pkg/models/mysql"
	"github.com/go-playground/validator/v10"
)

type Application struct {
	ErrorLog  *log.Logger
	InfoLog   *log.Logger
	Workouts  *mysql.WorkoutModel
	Users     *mysql.UserModel
	Exercises *mysql.ExerciseModel
}

var (
	// use a single instance of Validate, it caches struct info
	validate *validator.Validate
)

func init() {
	validate = validator.New(validator.WithRequiredStructEnabled())
	validate.RegisterValidation("dateofbirth", validators.DateOfBirthValidation)
}
