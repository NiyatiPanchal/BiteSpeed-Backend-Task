# Backend API Project

Welcome to the BiteSpeed Task! This task aims to provide a robust and scalable backend system for finding identity of customer. It is built using Node.js, Express.js, TypeScript, and MySQL with Sequelize.

Here if **`/identify`** end-point : Method : "POST" => https://bitespeed-backend-task-84cd.onrender.com/identify

Request Body:
{
"email": USER_EMAIL,
"phoneNumber": USER_PHONE_NUMBER
}

## Table of Contents

<!--ts-->

- [Framework](#framework)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
<!--te-->

# Framework

The backend is developed using the following technologies and frameworks:

- **`Node.js`** : A runtime environment that allows us to run JavaScript on the server side.
- **`Express.js`** : A popular web application framework for building APIs and web applications.
- **`TypeScript`** : A superset of JavaScript that adds static types and other features to enhance code quality and maintainability.
- **`Sequelize`** : A promise-based ORM (Object-Relational Mapping) for Node.js that allows us to interact with the MySQL database using TypeScript.

# Database Schema

The MySQL database schema includes the following tables:

**`Users`** : Stores user registration information.

    ```yml
    id (Primary Key, Auto Increment)
    phoneNumber
    email
    linkedId
    linkPrecedence
    createdAt
    updatedAt
    deletedAt
    ```

# Setup Instructions

Follow these instructions to set up the project from scratch:

1. Install Node.js and MySQL on your machine.

2. Create a new MySQL database with the name specified in your .env file.

3. Clone this repository:

   ```yml
   git clone https://github.com/NiyatiPanchal/BiteSpeed-Backend-Task.git
   ```

4. Navigate to the project directory:

   ```yml
   cd BiteSpeed-Backend-Task
   ```

5. Install dependencies using npm or yarn:

   ```yml
   npm install
   ```

6. Create a **`.env`** file in the root directory and add the necessary environment variables.

   ```yml
   DB_HOST=your_database_host
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

7. Run the database migrations to create the necessary tables:
   To do that create **`config.json`** file using this command and add db credentials in it.

   ```yml
   npx sequelize-cli init
   ```

   Now, run this command to create tables in database.

   ```yml
   npx sequelize-cli migration:generate --name create-contact
   ```

8. Run the server:

   ```yml
   npm start
   ```

9. The server should now be running on http://localhost:5000.
