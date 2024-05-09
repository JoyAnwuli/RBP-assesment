# Job-Challenge

# Express MongoDB Passport Authentication

This project is a simple web application built with Express.js, MongoDB, and Passport.js for user authentication using email and password.

## Overview

The purpose of this project is to demonstrate my skills as a backend developer, particularly in building web applications with Node.js and utilizing databases like MongoDB for data storage. In this project, I've implemented user authentication using Passport.js, which provides a robust and flexible authentication solution for Node.js applications,along with an error handling system that uses flash messages to relay error messages to the users. I have also implemented the requested api that can be used to get all users, get a specific user using their ID, update a users info using their id and delete a user.

## Features

- User authentication using email and password
- Relaying error messages using flash messages
- MongoDB integration for storing user data
- Express.js for building the web application framework
- Passport.js for handling authentication
- Secure password hashing using bcrypt

## Installation

1. Make sure you have Node.js and MongoDB installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install the dependencies.
6. Run `node app.js` to start the application.
7. Access the application in your web browser at `http://localhost:3000`.

## Usage of the validation and authentication

- Start the server on the IDE terminal.
- Run http://localhost:3000/ on the browser. 
- click create account on the dashboard page that you see.
- Fill in all the input with the required information.
- After successful validation you are redirected to the login.
- Fill in the email and password inputs and click the login button.
- After the authentication using Passport.js, you will be redirected back to the dashboard page where you started out.

## Usage of the api endpoints.
This part of the project was tested using Postman, so it has no apparent front-end. 
To Test this out, you'll need postman to run the routes, the fore-mentioned routes and their results are as follows:
- http://localhost:3000/users/ : to load out all the users stored in the database.This is a GET request.
- http://localhost:3000/users/663a19070c48fa0fd4eaa2d9 : This is to display the details of the user with a specific id, attached to it is an existing user.This is a GET request.
- http://localhost:3000/users/663a19070c48fa0fd4eaa2d9 : This will delete the user with the specified id, attached is the id of the user you just got the details in the last step. 
  This is a DELETE request.
-  http://localhost:3000/users/663a1e532f279038282cc084: This will update the user's info, it is a PUT request and requires the new info to be filled. The name of the inputs 
   should be name,email and password as they are the only info that we store in the database.
-  The creating of account that's required for the validation and authentication serves as the post request to add a new user. The endpoint there being /users with a POST method 
   on the form, so its a POST request.

  Extra existing Users for testing purposes
  - 663a1fb1fa1eb86c40a51916
  - 663ba7782575b997ffbcddf9

    
## Contributions

This project is intended to showcase my skills as a backend developer.
