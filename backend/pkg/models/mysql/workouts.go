package mysql

import (
	"database/sql"

	"github.com/Lionel-Wilson/My-Fitness-Aibou/pkg/models"
)

type WorkoutModel struct {
	DB *sql.DB
}

func (m *WorkoutModel) Insert(UserId int, WorkoutName string, Summary string) (int, error) {

	query := `
		INSERT INTO workouts (user_id, workout_name, summary, created)
		VALUES(?, ?, ?, UTC_TIMESTAMP());
		`

	result, err := m.DB.Exec(query, UserId, WorkoutName, Summary)
	if err != nil {
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

/*
	func (m *WorkoutModel) Get(Id int) (*models.WorkoutLog, error) {
		result := &models.WorkoutLog{}

		query := `SELECT id,user_id, exercise_name, current_weight, max_reps, notes, created FROM workoutlogs WHERE id = ?;`

		err := m.DB.QueryRow(query, Id).Scan(&result.ID, &result.UserId, &result.ExerciseName, &result.CurrentWeight, &result.MaxReps, &result.Notes, &result.Created)
		if err == sql.ErrNoRows {
			return nil, models.ErrNoRecord
		} else if err != nil {
			return nil, err
		}

		return result, nil
	}
*/
func (m *WorkoutModel) GetAll(userId int) ([]*models.Workout, error) {

	query := `
	SELECT * FROM myfitnessaiboudb.workouts WHERE user_id=?;
	`

	rows, err := m.DB.Query(query, userId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	workouts := []*models.Workout{}

	for rows.Next() {
		// Create a pointer to a new zeroed Snippet struct.
		w := &models.Workout{}
		// Use rows.Scan() to copy the values from each field in the row to the
		// new Snippet object that we created. Again, the arguments to row.Scan
		// must be pointers to the place you want to copy the data into, and the
		// number of arguments must be exactly the same as the number of
		// columns returned by your statement.
		err = rows.Scan(&w.ID, &w.UserId, &w.WorkoutName, &w.Summary, &w.Created)
		if err != nil {
			return nil, err
		}
		workouts = append(workouts, w)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return workouts, nil
}

func (m *WorkoutModel) Update(WorkoutId int, WorkoutName string, Summary string) error {

	query := `
		UPDATE workouts
		SET workout_name = ?, summary = ? 
		WHERE id = ?;
		`

	_, err := m.DB.Exec(query, WorkoutName, Summary, WorkoutId)
	if err != nil {
		return err
	}

	return nil
}

func (m *WorkoutModel) Delete(WorkoutId int) error {

	query := `
		DELETE FROM workouts WHERE id = ?;
		`

	_, err := m.DB.Exec(query, WorkoutId)
	if err != nil {
		return err
	}

	return nil
}
