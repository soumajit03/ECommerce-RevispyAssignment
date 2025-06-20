# User Interests Selection App

This is a full-stack web application that allows users to register, verify their account, log in, and select interests from a list of categories. Selected interests persist across sessions and are saved in the database. The app includes a protected page accessible only to logged-in users.

---

## 🛠️ Tech Stack

- **Frontend**: React (with TypeScript + TailwindCSS)
- **Backend**: Node.js + Express.js + MongoDB (via Mongoose)
- **Database**: MongoDB
- **Utilities**: Faker.js (for seeding categories), Axios (API calls)

---

## 📸 Screens & Features

### 🔐 1. Protected Page
- Shows categories with checkboxes (6 per page)
- Pagination implemented
- Selected interests saved to DB per user

### 👤 2. User Authentication
- Register (Name, Email, Password)
- Simulated Email Verification
- Login for existing users
- Protected route for interests only after login

### 📂 3. Database
- 100 categories generated using Faker.js
- Categories stored in MongoDB
- User data (with selected interests) stored in MongoDB

