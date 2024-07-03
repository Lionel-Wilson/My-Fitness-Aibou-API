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

type WorkoutLog struct {
	ID            int
	UserId        int
	ExerciseName  string
	CurrentWeight int
	MaxReps       int
	Notes         string
	Created       time.Time
}

type User struct {
	UserName       string    `json:"userName"`
	About          string    `json:"about"`
	FirstName      string    `json:"firstName"`
	LastName       string    `json:"lastName"`
	Email          string    `json:"email"`
	Country        string    `json:"country"`
	HashedPassword []byte    `json:"password"`
	Dob            time.Time `json:"dob"`
	Gender         string    `json:"gender"`
}
