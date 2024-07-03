package utils

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/Lionel-Wilson/My-Fitness-Aibou/backend/internal/api/models"
	"github.com/gin-gonic/gin"
)

// ErrorResponse represents the structure of an error response.
// It contains a status code, a message, and an optional list of errors.
type ErrorResponse struct {
	StatusCode int      `json:"statusCode" example:"422"`
	Message    string   `json:"message" example:"Validation failed"`
	Errors     []string `json:"errors,omitempty"`
}

// TrimWhitespace trims leading and trailing whitespace from all string fields in SignUpRequest.
func TrimWhitespace(signUpDetails *models.SignUpRequest) {
	signUpDetails.FirstName = strings.TrimSpace(signUpDetails.FirstName)
	signUpDetails.LastName = strings.TrimSpace(signUpDetails.LastName)
	signUpDetails.UserName = strings.TrimSpace(signUpDetails.UserName)
	signUpDetails.Email = strings.TrimSpace(signUpDetails.Email)
	signUpDetails.UserName = strings.TrimSpace(signUpDetails.UserName)
	signUpDetails.About = strings.TrimSpace(signUpDetails.About)
	signUpDetails.Password = strings.TrimSpace(signUpDetails.Password)
}

// NewErrorResponse creates a new error response with the provided status code, message, and errors.
// It sends a JSON response with these details to the client.
func NewErrorResponse(c *gin.Context, statusCode int, message string, errors []string) {
	c.JSON(statusCode, ErrorResponse{
		StatusCode: statusCode,
		Message:    message,
		Errors:     errors,
	})
}

func ServerErrorResponse(c *gin.Context, err error, msg string) {
	var message string
	if msg != "" {
		message = msg
	} else {
		message = "Something went wrong. Please try again later."
	}
	c.JSON(http.StatusInternalServerError, ErrorResponse{
		StatusCode: http.StatusInternalServerError,
		Message:    message,
		Errors:     []string{err.Error()},
	})
}

func ExtractIntegerCookie(c *gin.Context, cookieName string) (int, error) {
	cookieValueAsString, err := c.Request.Cookie(cookieName)
	if err != nil {
		return 0, err
	}

	cookieValueAsInt, err := strconv.Atoi(cookieValueAsString.Value)
	if err != nil {
		return 0, err
	}

	return cookieValueAsInt, nil
}
