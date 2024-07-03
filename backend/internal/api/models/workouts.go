package models

type AddNewWorkoutRequest struct {
	WorkoutName string     `json:"workoutName" validate:"required,ascii"`
	Summary     string     `json:"summary" validate:"ascii,max=100"`
	Exercises   []Exercise `json:"exercises"`
}
type UpdateWorkoutRequest struct {
	Id          int        `json:"workoutId" validate:"required,number"`
	WorkoutName string     `json:"workoutName" validate:"required,ascii"`
	Summary     string     `json:"summary" validate:"ascii,max=100"`
	Exercises   []Exercise `json:"exercises"`
}

type Exercise struct {
	Id           int    `json:"exerciseId"`
	ExerciseName string `json:"exerciseName" validate:"required,ascii"`
	Weight       int    `json:"weight" validate:"required,number,gt=0"`
	Reps         int    `json:"reps" validate:"required,number,gt=0"`
	Sets         int    `json:"sets" validate:"required,number,gt=0"`
	Notes        string `json:"notes" validate:"ascii,max=250"`
}

type Workout struct {
	Id          int         `json:"workoutId"`
	WorkoutName string      `json:"workoutName"`
	Summary     string      `json:"summary"`
	Exercises   []*Exercise `json:"exercises"`
}
