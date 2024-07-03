package models

import "time"

type SignUpRequest struct {
	UserName    string `json:"userName" validate:"required,alphanum"`
	About       string `json:"about" validate:"alphanumunicode"`
	FirstName   string `json:"firstName" validate:"required,alpha"`
	LastName    string `json:"lastName" validate:"required,alpha"`
	Email       string `json:"email" validate:"required,email"`
	Country     string `json:"country" validate:"required,country_code"`
	Password    string `json:"password" validate:"required,min=10"`
	DateOfBirth string `json:"dob" validate:"required,dateofbirth"` // TO-DO: SET CORRECT VALIDATION tag when you figure out what a correct DOB is and put into postman. e.g. datetime
	Gender      string `json:"gender" validate:"oneof=Male Female"`
}

type UserDetails struct {
	UserName  string    `json:"userName"`
	About     string    `json:"about"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email"`
	Country   string    `json:"country"`
	Dob       time.Time `json:"dob"`
	Gender    string    `json:"gender"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
