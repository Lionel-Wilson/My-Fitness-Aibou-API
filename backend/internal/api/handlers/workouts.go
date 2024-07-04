package handlers

import (
	"net/http"
	"strconv"

	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/models"
	validators "github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/validators"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/utils"
	"github.com/gin-gonic/gin"
)

func (app *Application) AddNewWorkout(c *gin.Context) {
	userId, err := utils.ExtractIntegerCookie(c, "userID")
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	var workout models.AddNewWorkoutRequest

	err = c.ShouldBindJSON(&workout)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	if len(workout.Exercises) < 1 {
		utils.NewErrorResponse(c, http.StatusBadRequest, "Invalid workout details", []string{"A workout must include at least 1 exercise"})
		return
	}

	err = validate.Struct(workout)
	if err != nil {
		errMsg := validators.TranslateValidationErrors(err)
		utils.NewErrorResponse(c, http.StatusBadRequest, "Invalid workout details", errMsg)
		return
	}

	workoutId, err := app.Workouts.Insert(userId, workout.WorkoutName, workout.Summary)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	for i := 0; i < len(workout.Exercises); i++ {
		_, err = app.Exercises.Insert(workoutId, workout.Exercises[i].ExerciseName, workout.Exercises[i].Notes, workout.Exercises[i].Weight, workout.Exercises[i].Reps, workout.Exercises[i].Sets)
		if err != nil {
			utils.ServerErrorResponse(c, err, "")
			return
		}
	}

	c.JSON(http.StatusCreated, "Workout successfully added!")
}

func (app *Application) GetAllWorkouts(c *gin.Context) {
	userId, err := utils.ExtractIntegerCookie(c, "userID")
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	workouts, err := app.Workouts.GetAll(userId)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	var result []models.Workout

	for i := 0; i < len(workouts); i++ {

		exercises, err := app.Exercises.GetAllExercisesViaWorkoutID(workouts[i].Id)
		if err != nil {
			utils.ServerErrorResponse(c, err, "")
			return
		}

		workout := models.Workout{
			Id:          workouts[i].Id,
			WorkoutName: workouts[i].WorkoutName,
			Summary:     workouts[i].Summary,
			Exercises:   exercises,
		}

		result = append(result, workout)

	}

	c.JSON(http.StatusOK, result)

}

func (app *Application) UpdateWorkout(c *gin.Context) {
	var workout models.UpdateWorkoutRequest

	err := c.ShouldBindJSON(&workout)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	if len(workout.Exercises) < 1 {
		utils.NewErrorResponse(c, http.StatusBadRequest, "Invalid workout details", []string{"A workout must include at least 1 exercise"})
		return
	}

	err = validate.Struct(workout)
	if err != nil {
		errMsg := validators.TranslateValidationErrors(err)
		utils.NewErrorResponse(c, http.StatusBadRequest, "Invalid workout details", errMsg)
		return
	}

	err = app.Workouts.Update(workout.Id, workout.WorkoutName, workout.Summary)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	for i := 0; i < len(workout.Exercises); i++ {
		err = app.Exercises.Update(workout.Exercises[i].ExerciseName, workout.Exercises[i].Notes, workout.Exercises[i].Weight, workout.Exercises[i].Reps, workout.Exercises[i].Sets, workout.Exercises[i].Id)
		if err != nil {
			utils.ServerErrorResponse(c, err, "")
			return
		}
	}

	c.JSON(http.StatusOK, "Workout successfully updated!")
}

func (app *Application) DeleteWorkout(c *gin.Context) {
	workoutId := c.Param("id")
	workoutIDInt, err := strconv.Atoi(workoutId)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	err = app.Exercises.DeleteExercisesViaWorkoutId(workoutIDInt)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	err = app.Workouts.Delete(workoutIDInt)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	c.JSON(http.StatusOK, "Workout successfully deleted!")
}
func (app *Application) DeleteExercise(c *gin.Context) {
	exerciseId := c.Param("id")
	exerciseIdInt, err := strconv.Atoi(exerciseId)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	err = app.Exercises.DeleteExercise(exerciseIdInt)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	c.JSON(http.StatusOK, "Exercise successfully deleted!")
}

/* TO-DO: Decide if I still need it
func (app *Application) GetWorkoutLog(c) {

	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil || id < 1 {
		http.Error(w, "Invalid id provided", http.StatusBadRequest)
		return
	}

	result, err := app.workoutLogs.Get(id)
	if err == models.ErrNoRecord {
		http.NotFound(w, r)
		return
	} else if err != nil {
		app.serverError(w, err)
		return
	}
	resultJson, err := json.Marshal(result)
	if err != nil {
		app.serverError(w, err)
		return
	}

	w.Write(resultJson)

}
*/
