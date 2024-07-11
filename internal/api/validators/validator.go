package handlers

import (
	"fmt"
	"time"

	"github.com/go-playground/validator/v10"
)

func DateOfBirthValidation(fl validator.FieldLevel) bool {
	dob := fl.Field().String()
	_, err := time.Parse("2006-01-02", dob)
	return err == nil
}

func getValidationErrorMessage(err validator.FieldError) string {
	switch err.Tag() {
	case "required":
		return "is required"
	case "alpha":
		return "must only contain alphabetic characters"
	case "alphanum":
		return "must only contain alphanumeric characters"
	case "alphanumunicode":
		return "must only contain alphanumeric characters or Unicode characters"
	case "email":
		return "must be a valid email address"
	case "country_code":
		return "must be a valid country code"
	case "oneof":
		return fmt.Sprintf("must be one of [%s]", err.Param())
	case "gt":
		return fmt.Sprintf("must be greater than %s", err.Param())
	case "len":
		return fmt.Sprintf("must be exactly %s characters", err.Param())
	case "min":
		return fmt.Sprintf("must be at least %s characters", err.Param())
	case "max":
		return fmt.Sprintf("must be at most %s characters", err.Param())
	case "dateofbirth":
		return "must be a valid date in the format YYYY-MM-DD"
	default:
		return "is invalid"
	}
}

// TranslateValidationErrors translates validation errors into a slice of readable error messages.
// It takes an error object returned by the validator and returns a slice of strings with human-readable error messages.
func TranslateValidationErrors(err error) []string {
	var errMsg []string

	// Loop through each validation error and append a formatted message to the errMsg slice
	for _, err := range err.(validator.ValidationErrors) {
		errMsg = append(errMsg, fmt.Sprintf("%s %s", err.Field(), getValidationErrorMessage(err)))
	}

	return errMsg
}
