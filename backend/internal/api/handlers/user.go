package handlers

import (
	"errors"
	"net/http"
	"time"

	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/middlewares"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/models"
	validators "github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/validators"
	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/utils"

	"github.com/gin-gonic/gin"
)

func (app *Application) SignUpUser(c *gin.Context) {
	var signUpDetails models.SignUpRequest

	err := c.ShouldBindJSON(&signUpDetails)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	utils.TrimWhitespace(&signUpDetails)

	err = validate.Struct(signUpDetails)
	if err != nil {
		errMsg := validators.TranslateValidationErrors(err)
		utils.NewErrorResponse(c, http.StatusBadRequest, "Invalid sign up details", errMsg)
		return
	}

	dob, err := time.Parse("2006-01-02", signUpDetails.DateOfBirth)
	if err != nil {
		utils.NewErrorResponse(c, http.StatusBadRequest, "Error parsing date of birth", []string{err.Error()})
		return
	}

	err = app.Users.Insert(signUpDetails.UserName, signUpDetails.FirstName, signUpDetails.LastName, signUpDetails.Gender, signUpDetails.Country, signUpDetails.Email, signUpDetails.About, signUpDetails.Password, dob)
	if err == models.ErrDuplicateEmail {
		utils.NewErrorResponse(c, http.StatusBadRequest, "Invalid sign up details", []string{"Email is already in use"})
		return
	} else if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Your signup was successful. Please log in.",
	})

}

func (app *Application) LoginUser(c *gin.Context) {
	var loginDetails models.LoginRequest
	//session := sessions.Default(c)

	err := c.ShouldBindJSON(&loginDetails)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	id, err := app.Users.Authenticate(loginDetails.Email, loginDetails.Password)
	if errors.Is(err, models.ErrInvalidCredentials) {
		utils.NewErrorResponse(c, http.StatusBadRequest, "Authentication Failed", []string{"Email or Password is incorrect"})
		return
	} else if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	//JWT implementaion:
	tokenString, err := middlewares.CreateToken(id)
	if err != nil {
		utils.ServerErrorResponse(c, err, "No userid found")
	}

	/*Session cookie authorisation implementation:
	Setting the session variable so that we don't have to keep logging in
	v := session.Get("userID")
	if v == nil {
		//cookie finished or first time logging in. Set the session variable userID, so we can check it when authenticating.
		session.Set("userID", id)
		err = session.Save()
		if err != nil {
			utils.ServerErrorResponse(c, err, "Failed to save session")
			return
		}

	// Set the cookie in the response
	expire := time.Now().Add(12 * time.Hour)
	c.SetCookie(
		"userID",
		strconv.Itoa(id),
		int(expire.Sub(time.Now()).Seconds()),
		"/", "localhost", false,
		true,
	)
	}*/

	/* using cookies to send JWT token. Vulnerable to CRSF attacks. Easier to implement
	c.SetCookie(
		"jwtToken",
		tokenString,
		int(time.Now().Add(time.Hour*24).Unix()),
		"/", "localhost", false,
		true,
	)*/
	c.JSON(http.StatusOK, models.LoginResponse{
		Message: "Login Successful",
		Token:   tokenString,
	})
}

func (app *Application) LogoutUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Logout the user...(fake)",
	})
}

func (app *Application) GetUserDetails(c *gin.Context) {
	userId, err := utils.ExtractIntegerCookie(c, "userID")
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	userDetails, err := app.Users.Get(userId)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	c.JSON(http.StatusOK, userDetails)
}

func (app *Application) UpdateUserDetails(c *gin.Context) {
	userId, err := utils.ExtractIntegerCookie(c, "userID")
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	var userDetails models.UpdateUserDetailsRequest

	err = c.ShouldBindJSON(&userDetails)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	utils.TrimWhitespace(&userDetails)

	err = validate.Struct(userDetails)
	if err != nil {
		errMsg := validators.TranslateValidationErrors(err)
		utils.NewErrorResponse(c, http.StatusBadRequest, "Failed to update profile", errMsg)
		return
	}

	dob, err := time.Parse("2006-01-02", userDetails.Dob)
	if err != nil {
		utils.NewErrorResponse(c, http.StatusBadRequest, "Error parsing date of birth", []string{err.Error()})
		return
	}

	err = app.Users.Update(userId, userDetails.UserName, userDetails.FirstName, userDetails.LastName, userDetails.Gender, userDetails.Country,
		userDetails.Email, userDetails.About, dob)
	if err != nil {
		utils.ServerErrorResponse(c, err, "")
		return
	}

	c.JSON(http.StatusOK, "Profile successfully updated!")
}

/*
	TO-DO: Figure out if I still need this

	func (app *Application) AuthenticateUser(c *gin.Context) {
		var userId int
		err := c.ShouldBindJSON(&userId)
		if err != nil {
			utils.ServerErrorResponse(c, err, "")
			return
		}

		_, err = app.Users.Get(userId)
		if err != nil {
			if err.Error() == models.ErrNoRecord.Error() {
				utils.NewErrorResponse(c, http.StatusInternalServerError, "Authentication Failed", []string{fmt.Sprintf("User doesn't exist for provided userID - %d", userId)})
				return
			} else {
				utils.ServerErrorResponse(c, err, "")
				return
			}
		}

		c.JSON(http.StatusOK, nil)
	}
*/
