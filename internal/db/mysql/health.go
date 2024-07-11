package mysql

import (
	"database/sql"

	"github.com/Lionel-Wilson/My-Fitness-Aibou-API/internal/api/models"
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

func (m *HealthModel) GetBodyWeightData(userId int) ([]*models.BodyWeightData, error) {

	query := `
	SELECT weight, created FROM myfitnessaiboudb.bodyweight WHERE user_id=?;
	`

	rows, err := m.DB.Query(query, userId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	data := []*models.BodyWeightData{}

	for rows.Next() {
		w := &models.BodyWeightData{}

		err = rows.Scan(&w.Weight, &w.Created)
		if err != nil {
			return nil, err
		}
		data = append(data, w)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}
