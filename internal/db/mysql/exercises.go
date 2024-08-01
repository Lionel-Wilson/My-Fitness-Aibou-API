package mysql

import (
	"database/sql"

	"github.com/Lionel-Wilson/My-Fitness-Aibou-API/internal/api/models"
)

type ExerciseModel struct {
	DB *sql.DB
}

func (m *ExerciseModel) Insert(workoutID int, exerciseName, notes string, weight float64, reps, sets int) (int, error) {

	query := `
		INSERT INTO exercises (workout_id, exercise_name, weight, reps, sets, notes, created)
		VALUES(?, ?, ?, ?, ?, ?, UTC_TIMESTAMP());
		`

	result, err := m.DB.Exec(query, workoutID, exerciseName, weight, reps, sets, notes)
	if err != nil {
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (m *ExerciseModel) Get(workoutId int) (*models.Exercise, error) {
	result := &models.Exercise{}

	query := `SELECT id, exercise_name, weight, reps, sets, notes FROM exercises WHERE workout_id = ?;`

	err := m.DB.QueryRow(query, workoutId).Scan(&result.Id, &result.ExerciseName, &result.Weight, &result.Reps, &result.Sets, &result.Notes)
	if err == sql.ErrNoRows {
		return nil, models.ErrNoRecord
	} else if err != nil {
		return nil, err
	}

	return result, nil
}

func (m *ExerciseModel) GetAllExercisesViaWorkoutID(workoutId int) ([]*models.Exercise, error) {

	query := `
	SELECT id, exercise_name, weight, reps, sets, notes FROM exercises WHERE workout_id=?;
	`

	rows, err := m.DB.Query(query, workoutId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	exercises := []*models.Exercise{}

	for rows.Next() {
		e := &models.Exercise{}

		err = rows.Scan(&e.Id, &e.ExerciseName, &e.Weight, &e.Reps, &e.Sets, &e.Notes)
		if err != nil {
			return nil, err
		}
		exercises = append(exercises, e)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return exercises, nil
}

func (m *ExerciseModel) Update(exerciseName, notes string, weight float64, reps, sets, exerciseId int) error {

	query := `
		UPDATE exercises
		SET exercise_name = ?, weight = ?, reps = ?, sets = ?, notes = ?
		WHERE id = ?;
		`

	_, err := m.DB.Exec(query, exerciseName, weight, reps, sets, notes, exerciseId)
	if err != nil {
		return err
	}

	return nil
}

func (m *ExerciseModel) DeleteExercisesViaWorkoutId(WorkoutId int) error {

	query := `
		DELETE FROM exercises WHERE workout_id = ?;
		`

	_, err := m.DB.Exec(query, WorkoutId)
	if err != nil {
		return err
	}

	return nil
}

func (m *ExerciseModel) DeleteExercise(Id int) error {

	query := `
		DELETE FROM exercises WHERE id = ?;
		`

	_, err := m.DB.Exec(query, Id)
	if err != nil {
		return err
	}

	return nil
}
