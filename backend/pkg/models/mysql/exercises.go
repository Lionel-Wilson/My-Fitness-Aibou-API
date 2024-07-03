package mysql

import (
	"database/sql"

	apiModels "github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/models"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/pkg/models"
)

type ExerciseModel struct {
	DB *sql.DB
}

func (m *ExerciseModel) Insert(workoutID int, exercise apiModels.Exercise) (int, error) {

	query := `
		INSERT INTO exercises (workout_id, exercise_name, weight, reps, sets, notes, created)
		VALUES(?, ?, ?, ?, ?, ?, UTC_TIMESTAMP());
		`

	result, err := m.DB.Exec(query, workoutID, exercise.ExerciseName, exercise.Weight, exercise.Reps, exercise.Sets, exercise.Notes)
	if err != nil {
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (m *ExerciseModel) Get(workoutId int) (*apiModels.Exercise, error) {
	result := &apiModels.Exercise{}

	query := `SELECT id, exercise_name, weight, reps, sets, notes FROM exercises WHERE workout_id = ?;`

	err := m.DB.QueryRow(query, workoutId).Scan(&result.Id, &result.ExerciseName, &result.Weight, &result.Reps, &result.Sets, &result.Notes)
	if err == sql.ErrNoRows {
		return nil, models.ErrNoRecord
	} else if err != nil {
		return nil, err
	}

	return result, nil
}

func (m *ExerciseModel) GetAllExercisesViaWorkoutID(workoutId int) ([]*apiModels.Exercise, error) {

	query := `
	SELECT id, exercise_name, weight, reps, sets, notes FROM myfitnessaiboudb.exercises WHERE workout_id=?;
	`

	rows, err := m.DB.Query(query, workoutId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	exercises := []*apiModels.Exercise{}

	for rows.Next() {
		e := &apiModels.Exercise{}

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

func (m *ExerciseModel) Update(exercise apiModels.Exercise) error {

	query := `
		UPDATE exercises
		SET exercise_name = ?, weight = ?, reps = ?, sets = ?, notes = ?
		WHERE id = ?;
		`

	_, err := m.DB.Exec(query, exercise.ExerciseName, exercise.Weight, exercise.Reps, exercise.Sets, exercise.Notes, exercise.Id)
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
