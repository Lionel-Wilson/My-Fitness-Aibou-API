package mysql

import (
	"database/sql"
)

type HealthModel struct {
	DB *sql.DB
}

func (m *HealthModel) Insert(userId int, weight float32) (int, error) {

	query := `
		INSERT INTO bodyweight (user_id, weight, created)
		VALUES(?, ?, UTC_TIMESTAMP());
		`

	result, err := m.DB.Exec(query, userId, weight)
	if err != nil {
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}
