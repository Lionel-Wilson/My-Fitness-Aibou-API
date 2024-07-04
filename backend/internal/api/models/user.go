package models

import (
	"errors"
	"time"
)

var (
	ErrNoRecord = errors.New("models: no matching record found")
	// Add a new ErrInvalidCredentials error. We'll use this later if a user
	// tries to login with an incorrect email address or password.
	ErrInvalidCredentials = errors.New("models: invalid credentials")
	// Add a new ErrDuplicateEmail error. We'll use this later if a user
	// tries to signup with an email address that's already in use.
	ErrDuplicateEmail = errors.New("models: duplicate email")
)

type SignUpRequest struct {
	UserName    string `json:"userName" validate:"required,alphanum"`
	About       string `json:"about" `
	FirstName   string `json:"firstName" validate:"required,alpha"`
	LastName    string `json:"lastName" validate:"required,alpha"`
	Email       string `json:"email" validate:"required,email"`
	Country     string `json:"country" validate:"required,country_code"`
	Password    string `json:"password" validate:"required,min=10"`
	DateOfBirth string `json:"dob" validate:"required,dateofbirth"` // TO-DO: SET CORRECT VALIDATION tag when you figure out what a correct DOB is and put into postman. e.g. datetime
	Gender      string `json:"gender" validate:"oneof=Male Female"`
}

type UpdateUserDetailsRequest struct {
	UserName  string `json:"userName" validate:"required,alphanum"`
	About     string `json:"about" `
	FirstName string `json:"firstName" validate:"required,alpha"`
	LastName  string `json:"lastName" validate:"required,alpha"`
	Email     string `json:"email" validate:"required,email"`
	Country   string `json:"country" validate:"required,country_code"`
	Dob       string `json:"dob" validate:"required,dateofbirth"`
	Gender    string `json:"gender" validate:"oneof=Male Female"`
}

type UserDetails struct {
	UserName  string    `json:"userName" validate:"required,alphanum"`
	About     string    `json:"about" `
	FirstName string    `json:"firstName" validate:"required,alpha"`
	LastName  string    `json:"lastName" validate:"required,alpha"`
	Email     string    `json:"email" validate:"required,email"`
	Country   string    `json:"country" validate:"required,country_code"`
	Dob       time.Time `json:"dob" validate:"required,dateofbirth"`
	Gender    string    `json:"gender" validate:"oneof=Male Female"`
}

type User struct {
	Id             int
	UserName       string
	About          string
	FirstName      string
	LastName       string
	Email          string
	Country        string
	HashedPassword []byte
	Dob            time.Time
	Gender         string
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type LoginResponse struct {
	Message string `json:"message"`
	Token   string `json:"token"`
}
