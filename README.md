# My-Fitness-Aibou-API

> Like my fitness Pal, but better and free, for now...

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Current Features](#current-features)
- [Endpoints](#endpoints)
- [Project Status](#project-status)
<!-- * [License](#license) -->

## General Information

- Created an api for a Fitness Web application.
- Decided to make this for fun, to learn new technologies and also to make an application that would solve my personal needs.

## Technologies Used

- Golang
- MySQL
- Docker
- JWT for Authorisation

## Current Features

- Create an account
- Log in
- Allows user to calculate BMR, Create Workouts, track weight overtime and many more fitness related things.

## Endpoints

### User Endpoints

#### 1. Sign Up User

- **Endpoint**: `/signup`
- **Method**: `POST`
- **Description**: Signs up a new user.
- **Request Body**:
  ```json
  {
    "UserName": "john_doe",
    "FirstName": "John",
    "LastName": "Doe",
    "Gender": "Male",
    "Country": "USA",
    "Email": "john@example.com",
    "About": "Fitness enthusiast",
    "Password": "password123",
    "DateOfBirth": "1990-01-01"
  }
  ```

#### Responses

- **Success (201 Created)**:

  ```json
  {
    "message": "Your signup was successful. Please log in."
  }
  ```

- **Validation Error (400 Bad Request)**:

  ```json
  {
    "statusCode": 400,
    "message": "Invalid sign up details",
    "errors": ["Email is already in use"]
  }
  ```

- **Failure (500 Internal Server Error)**:

  ```json
  {
    "statusCode": 500,
    "message": "Something went wrong. Please try again later."
  }
  ```

#### 2. Login User

- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:

  ```json
  {
    "Email": "john@example.com",
    "Password": "password123"
  }
  ```

#### Responses

- **Success (200 OK)**:

  ```json
  {
    "Message": "Login Successful",
    "Token": "jwt_token"
  }
  ```

- **Authentication Failed (400 Bad Request)**:

  ```json
  {
    "statusCode": 400,
    "message": "Authentication Failed",
    "errors": ["Email or Password is incorrect"]
  }
  ```

- **Failure (500 Internal Server Error)**:

  ```json
  {
    "statusCode": 500,
    "message": "Something went wrong. Please try again later."
  }
  ```

#### 3. Logout User

- **Endpoint**: `/logout`
- **Method**: `POST`
- **Description**: Logs out the current user.

#### Responses

- **Success (200 OK)**:

  ```json
  {
    "message": "Logout the user...(fake)"
  }
  ```

#### 4. Get User Details

- **Endpoint**: `/user/details`
- **Method**: `GET`
- **Description**: Retrieves the details of the logged-in user.

#### Responses

- **Success (200 OK)**:

  ```json
  {
    "UserName": "john_doe",
    "FirstName": "John",
    "LastName": "Doe",
    "Gender": "Male",
    "Country": "USA",
    "Email": "john@example.com",
    "About": "Fitness enthusiast",
    "DateOfBirth": "1990-01-01"
  }
  ```

- **Failure (500 Internal Server Error)**:

  ```json
  {
    "statusCode": 500,
    "message": "Something went wrong. Please try again later."
  }
  ```

#### 5. Update User Details

- **Endpoint**: `/user/update`
- **Method**: `PUT`
- **Description**: Updates the details of the logged-in user.
- **Request Body**:

  ```json
  {
    "UserName": "john_doe",
    "FirstName": "John",
    "LastName": "Doe",
    "Gender": "Male",
    "Country": "USA",
    "Email": "john@example.com",
    "About": "Fitness enthusiast",
    "DateOfBirth": "1990-01-01"
  }
  ```

#### Responses

- **Success (200 OK)**:

  ```json
  {
    "message": "Profile successfully updated!"
  }
  ```

- **Validation Error (400 Bad Request)**:

  ```json
  {
    "statusCode": 400,
    "message": "Failed to update profile",
    "errors": ["Error parsing date of birth"]
  }
  ```

- **Failure (500 Internal Server Error)**:

  ```json
  {
    "statusCode": 500,
    "message": "Something went wrong. Please try again later."
  }
  ```

### Health Endpoints

#### 1. Get BMR

- **Endpoint**: `/health/bmr`
- **Method**: `POST`
- **Description**: Calculates the BMR (Basal Metabolic Rate) based on user details.
- **Request Body**:
  ```json
  {
    "Weight": 70,
    "Height": 175,
    "Age": 30,
    "Gender": "Male"
  }
  ```

#### Responses

- **Success (200 OK)**:

  ```json
  {
    "bmr": 1700.5
  }
  ```

- **Validation Error (400 Bad Request)**:

  ```json
  {
    "statusCode": 400,
    "message": "Invalid BMR details",
    "errors": ["Weight is required"]
  }
  ```

- **Failure (500 Internal Server Error)**:

  ```json
  {
    "statusCode": 500,
    "message": "Something went wrong. Please try again later."
  }
  ```

#### 2. Track Body Weight

- **Endpoint**: `/health/weight`
- **Method**: `POST`
- **Description**: Tracks the body weight of the user.
- **Request Body**:

  ```json
  {
    "bodyweight": 70.5
  }
  ```

#### Responses

- **Success (200 OK)**:

  ```json
  {
    "message": "Weight successfully tracked!"
  }
  ```

- **Failure (500 Internal Server Error)**:

  ```json
  {
    "statusCode": 500,
    "message": "Something went wrong. Please try again later."
  }
  ```

## Project Status

Project is: _Complete_

## Acknowledgements

- A helpful book that I referenced using this was "Let's Go" and "Let's Go Further" by Alex Edwards
