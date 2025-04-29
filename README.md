# Express API Server
## 📦 Dependencies

- express
- mongoose
- dotenv
- jsonwebtoken
- bcrypt / bcryptjs
- cookie-parser
- cors
- morgan
- nodemon (for development)

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
[git clone https://github.com/your-username/your-repo-name.git](https://github.com/KamalM13/180-english-interview-tast.git)
cd 180-english-interview-test
cd server
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file in the root directory
```bash
MONGO_URI=your_mongodb_connection_string
API_VERSION=v1
JWT_SECRET=your_secret_key
```
4. Start the development server
```bash
npm run dev
```
The server will start on the port 3001 unless otherwise specified.


# Client - Vite + React App

This is the frontend application built with Vite and React, styled with Tailwind CSS and powered by modern libraries for UI, forms, validation, and API interaction.

## 🛠️ Setup Instructions

### 1. Navigate to client-side code source

```bash
cd client
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file in the root directory
```env
VITE_PUBLIC_NODE_DEPLOYMENT_URL='http://localhost:3001/api/v1/'
Replace the URL above if your API is hosted elsewhere.
```

4. Run the development server
```bash
npm run dev
```
This will start the app on http://localhost:5173 by default.
