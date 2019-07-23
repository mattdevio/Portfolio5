# Moolahlah - Firebase Edition

The goal of this class is develop a project which is added to my personal developer portfolio with the intent of demonstrating my skills and knowledge accrued thus far.

___

## Project Definition
![moolahlah logo](./src/img/moolahlah_logo.png)

Moolahlah is a budgeting application. You enter your income / expenses / debts; then over the timeblock of the budget, you add your expenses. The application tracks your progress.

## Enviornment

The only machine dependency is `Node.js version 7.5.0` if you plan on working on the project. The backend uses the `Firebase` authentication and database service to store user information.

## Tech Stack

This is a single page application that uses React, Redux, & React Router Dom. The backend is all Google Firebase. The config for the firebase connection can be found in `src/firebase/firebase.js`. It uses the basic email & password authentication and a database. The database rules have yet to be defined because the application has not been finished yet. <br>

__Please see the `package.json` file for complete dependencies__

## Development

I am using `Webpack 3` to bundle assets and run tasks. _The configuration is custom and no react bootstrap was used._<br>

**Scripts**
```
# Install Dependencies
npm install

# Start Development Server
# The server does watch and reload non webpack files.
npm start

# Build Production Bundle
npm run build
```

___

**Developed By:** Matthew Greenberg<br>
**Calendar:** 1/29/2017 to 2/23/2017
