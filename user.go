package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"

	"github.com/Lionel-Wilson/My-Fitness-Aibou/pkg/models"
)

type UserFormData struct {
	UserName  string `json:"userName"`
	About     string `json:"about"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Country   string `json:"country"`
	Password  string `json:"password"`
	Dob       string `json:"dob"`
	Gender    string `json:"gender"`
}

type SignupResponse struct {
	FlashMessage string            `json:"flashMessage"`
	Errors       map[string]string `json:"errors"`
}

type LoginFormData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var EmailRX = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_" + "`" + "{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

func (app *application) signupUser(w http.ResponseWriter, r *http.Request) {

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	var signupData UserFormData

	err = json.Unmarshal(body, &signupData)
	if err != nil {
		app.serverError(w, err)
		return
	}

	//fmt.Println(signupData)

	errors := make(map[string]string)

	if strings.TrimSpace(signupData.UserName) == "" {
		errors["Username"] = "Username cannot be blank"
	} else if utf8.RuneCountInString(signupData.Email) > 255 {
		errors["Username"] = "Username is too long (maximum is 255 characters)"
	}

	if strings.TrimSpace(signupData.Email) == "" {
		errors["Email"] = "Email cannot be blank"
	} else if utf8.RuneCountInString(signupData.Email) > 255 {
		errors["Email"] = "Email is too long (maximum is 255 characters)"
	} else if !EmailRX.MatchString(signupData.Email) {
		errors["Email"] = "Email is invalid"
	}

	if strings.TrimSpace(signupData.Password) == "" {
		errors["Password"] = "Password cannot be blank"
	} else if utf8.RuneCountInString(signupData.Password) < 10 {
		errors["Password"] = "Password is too short (minimum is 10 characters)"
	}

	if strings.TrimSpace(signupData.FirstName) == "" {
		errors["FirstName"] = "First name cannot be blank"
	}
	if strings.TrimSpace(signupData.LastName) == "" {
		errors["LastName"] = "Last name cannot be blank"
	}
	if strings.TrimSpace(signupData.Dob) == "" {
		errors["DateOfBirth"] = "Please enter your date of birth"
	}

	response := SignupResponse{
		FlashMessage: "",
		Errors:       errors,
	}

	if len(errors) > 0 {
		response.FlashMessage = "You seem to have some incorrect fields. See errors below:"

		resultJson, err := json.Marshal(response)
		if err != nil {
			app.serverError(w, err)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		w.Write(resultJson)
		return
	}

	dob, err := time.Parse("2006-01-02", signupData.Dob)
	if err != nil {
		fmt.Println("Error parsing date of birth:", err)
		errors["DateOfBirth"] = "Error parsing date of birth"
		app.serverError(w, err)
		return
	}

	err = app.users.Insert(signupData.UserName, signupData.FirstName, signupData.LastName, signupData.Gender, signupData.Country, signupData.Email, signupData.About, signupData.Password, dob)
	if err == models.ErrDuplicateEmail {
		response.FlashMessage = "You seem to have some incorrect fields. See errors below:"
		errors["Email"] = "Email is already in use"
		response.Errors = errors
		resultJson, err := json.Marshal(response)
		if err != nil {
			app.serverError(w, err)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		w.Write(resultJson)
		return
	} else if err != nil {
		app.serverError(w, err)
		return
	}

	response.FlashMessage = "Your signup was successful. Please log in."

	var resultJson []byte
	resultJson, err = json.Marshal(response)
	if err != nil {
		app.serverError(w, err)
	}
	w.WriteHeader(http.StatusOK)
	w.Write(resultJson)
}

func (app *application) loginUser(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	var loginDetails LoginFormData

	err = json.Unmarshal(body, &loginDetails)
	if err != nil {
		app.serverError(w, err)
		return
	}

	id, err := app.users.Authenticate(loginDetails.Email, loginDetails.Password)
	if err == models.ErrInvalidCredentials {
		var genericErrorJson []byte
		genericErrorJson, err = json.Marshal("Email or Password is incorrect")
		if err != nil {
			app.serverError(w, err)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		w.Write(genericErrorJson)
		return
	} else if err != nil {
		app.serverError(w, err)
		return
	}
	app.session.Put(r, "userID", id)
	userDetails, err := app.users.Get(id)
	if err != nil {
		app.serverError(w, err)
		return
	}

	var resultJson []byte
	resultJson, err = json.Marshal(userDetails)
	if err != nil {
		app.serverError(w, err)
	}

	// Create a new cookie
	cookie := &http.Cookie{
		Name:     "userID",
		Value:    strconv.Itoa(id),
		Expires:  time.Now().Add(24 * time.Hour), // Cookie expires in 24 hours
		HttpOnly: true,                           // HttpOnly flag for added security
	}

	// Set the cookie in the response
	http.SetCookie(w, cookie)
	w.Write(resultJson)
	w.WriteHeader(http.StatusOK)
}
func (app *application) logoutUser(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Logout the user...")
}

func (app *application) authenticateUser(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}

	var userId int

	err = json.Unmarshal(body, &userId)
	if err != nil {
		app.serverError(w, err)
		return
	}

	_, err = app.users.Get(userId)
	if err == models.ErrNoRecord {
		http.Error(w, fmt.Sprintf("User doesn't exist for provided userID - %d", userId), http.StatusInternalServerError)
		return
	} else if err != nil {
		app.serverError(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (app *application) getUserDetails(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}

	var userId int

	err = json.Unmarshal(body, &userId)
	if err != nil {
		app.serverError(w, err)
		return
	}

	userDetails, err := app.users.Get(userId)
	if err != nil {
		app.serverError(w, err)
		return
	}

	var resultJson []byte
	resultJson, err = json.Marshal(userDetails)
	if err != nil {
		app.serverError(w, err)
	}
	w.Write(resultJson)
}

/*gin version
func Signup(c *gin.Context) {
	var signUpDetails SignUpBody

	signUpDetails.FirstName = c.Query("firstname")
	signUpDetails.Surname = c.Query("surname")
	signUpDetails.Email = c.Query("email")
	signUpDetails.Password = c.Query("password")
	signUpDetails.Dob = c.Query("dob")
	signUpDetails.Gender = c.Query("gender")

	// Return a greeting that embeds the name in a message.
	message := "You have succesfully signed up!"

	c.JSON(http.StatusOK, gin.H{
		"message":      message,
		"User Details": signUpDetails,
	})
}
*/
