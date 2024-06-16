package main

import (
	"net/http"

	"github.com/bmizerany/pat"
	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	//Alice package allows use to chain middleware in a much more understandable and clearer way.
	// recoverPanic -> logrequest -> secureHeaders ->...
	standardMiddleware := alice.New(app.recoverPanic, app.logRequest, secureHeaders)

	// Create a new middleware chain containing the middleware specific to
	// our dynamic application routes. For now, this chain will only contain
	// the session middleware but we'll add more to it later.
	dynamicMiddleware := alice.New(app.session.Enable)

	//router := http.NewServeMux()
	// using bmizernay/pat package to implement RESTful routes
	router := pat.New()
	//router.Get("/", http.HandlerFunc(app.Home))

	//user
	router.Post("/user/signup", dynamicMiddleware.ThenFunc(app.signupUser))
	router.Post("/user/login", dynamicMiddleware.ThenFunc(app.loginUser))
	router.Post("/user/logout", dynamicMiddleware.ThenFunc(app.logoutUser))
	router.Post("/user/details", dynamicMiddleware.ThenFunc(app.getUserDetails))
	router.Post("/user/authenticate", dynamicMiddleware.ThenFunc(app.authenticateUser))

	//Kitchen Features
	router.Post("/kitchen/bmr", http.HandlerFunc(app.GetBMR))

	//Workout Area
	router.Get("/workout/getworkoutlog", dynamicMiddleware.ThenFunc(http.HandlerFunc(app.getWorkoutLog)))
	router.Get("/workout/getallworkoutlogs", dynamicMiddleware.ThenFunc(http.HandlerFunc(app.getAllWorkoutLogs)))
	router.Post("/workout/addworkoutlog", dynamicMiddleware.ThenFunc(http.HandlerFunc(app.addNewWorkoutLog)))

	//...router -> secureHeaders -> logrequest -> recoverPanic -> client
	return standardMiddleware.Then(router)
}
