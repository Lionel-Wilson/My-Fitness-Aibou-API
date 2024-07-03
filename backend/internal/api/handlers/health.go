package handlers

import (
	"net/http"

	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/models"
	validators "github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/validators"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/pkg/utils"
	"github.com/gin-gonic/gin"
)

func (app *Application) GetBMR(c *gin.Context) {

	var bmrDetails models.GetBmrRequest

	err := c.ShouldBindJSON(&bmrDetails)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	err = validate.Struct(bmrDetails)
	if err != nil {
		errMsg := validators.TranslateValidationErrors(err)
		utils.NewErrorResponse(c, http.StatusBadRequest, "Invalid BMR details", errMsg)
		return
	}

	bmr := calculateBMR(bmrDetails)
	c.JSON(http.StatusOK, bmr)

}

func (app *Application) TrackBodyWeight(c *gin.Context) {
	userId, err := utils.ExtractIntegerCookie(c, "userID")
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	var bodyweight float32

	err = c.ShouldBindJSON(&bodyweight)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	_, err = app.Health.Insert(userId, bodyweight)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	c.JSON(http.StatusOK, "Weight successfully tracked!")

}

func (app *Application) GetBodyWeightData(c *gin.Context) {
	userId, err := utils.ExtractIntegerCookie(c, "userID")
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	bodyWeightData, err := app.Health.GetBodyWeightData(userId)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	c.JSON(http.StatusOK, bodyWeightData)
}

func calculateBMR(userInfo models.GetBmrRequest) float64 {
	//Mifflin-St Jeor Equation:
	bmr := (10 * userInfo.Weight) + (6.25 * userInfo.Height) - (5 * userInfo.Age)
	if userInfo.Gender == "Male" {
		bmr += float64(5)
		return bmr
	}
	bmr -= float64(161)
	return bmr
}
