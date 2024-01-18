**React User Management App**

This project is a React application that allows users to manage a list of users, including adding, updating, viewing, and deleting user records. The application interacts with a mock API provided by JSONPlaceholder to perform **CRUD** (Create, Read, Update, Delete) operations.
Table of Contents
Getting Started
Features
Usage
Dependencies

**Getting Started**
Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000 to use the application.

**Features**
1) User Management: Add, update, view, and delete user records.
2) CRUD Operations: Perform Create, Read, Update, and Delete operations on user data.
3) Local Storage: User data is stored in the local storage to maintain persistence.

**Usage**
**Login Page** 
The login page allows users to enter their email and password for authentication.
Authentication: Email and password are validated, and if the provided credentials match the predefined values, the user is authenticated.
Navigation: Upon successful authentication, the user is redirected to the home page (/homePage).

**Home Page (/homePage)**
After successful login, navigate to the home page. From here, you can visit the product page and log out.

**Product Page (/productPage):** View, update, add, and delete user records. The page interacts with the JSONPlaceholder API to perform these operations.

**Add User Form (AddUserForm.tsx):** A reusable form component to add or update user data. It includes validation for unique user IDs.

**User Service (UserService.ts):** A service class to interact with the JSONPlaceholder API and handle user-related data.

**Dependencies**

React

Axios

React Router
