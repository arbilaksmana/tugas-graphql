# GraphQL Book API - Setup & Testing Guide

## ✅ Implementation Complete!

All files have been successfully updated according to your assignment requirements:

### What Changed:
1. ✅ **server.js** - Updated Book schema from `year` to `genre`
2. ✅ **server.js** - Added `dotenv` for environment variables
3. ✅ **server.js** - Changed `MONGODB_URI` to `MONGO_URI` (Railway standard)
4. ✅ **server.js** - Removed `updateBook` mutation (not required)
5. ✅ **index.html** - Complete UI redesign with modern tech-blue theme
6. ✅ **index.html** - Added delete functionality for each book
7. ✅ **index.html** - Dynamic API endpoint detection (localhost/Railway)
8. ✅ **package.json** - Added `dotenv` dependency
9. ✅ **README.md** - Complete documentation
10. ✅ **.env.example** - Environment variable template
11. ✅ **.gitignore** - Security configuration

---

## 🚀 How to Run Locally

### Step 1: Create Your .env File

Copy `.env.example` to `.env` and update with your MongoDB credentials:

```bash
# In PowerShell
Copy-Item .env.example .env
```

Then edit `.env` with your actual MongoDB Atlas connection string:
```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER/books_db?retryWrites=true&w=majority
PORT=4003
```

### Step 2: Get MongoDB Atlas Credentials

If you don't have MongoDB Atlas set up:
1. Go to https://cloud.mongodb.com/
2. Create a free account
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<username>`, `<password>`, and database name in `.env`

### Step 3: Start the Server

```bash
npm start
```

You should see:
```
MongoDB connected
GraphQL Book API running on port 4003
GraphiQL: http://localhost:4003/graphql
```

### Step 4: Open the Frontend

Simply open `index.html` in your browser. The UI will automatically connect to `http://localhost:4003/graphql`.

---

## 🧪 Testing the API

### Option 1: Using the Frontend UI
1. Open `index.html` in your browser
2. Click "Load All Books" to see existing books
3. Use the "Add New Book" form to create books
4. Use the "Delete" button to remove books
5. Use the "Search Book" section to find by ID

### Option 2: Using GraphiQL (Browser Testing Tool)
Navigate to http://localhost:4003/graphql

**Test Query - Get All Books:**
```graphql
{
  books {
    id
    title
    author
    genre
  }
}
```

**Test Mutation - Add a Book:**
```graphql
mutation {
  addBook(
    title: "1984"
    author: "George Orwell"
    genre: "Dystopian Fiction"
  ) {
    id
    title
    author
    genre
  }
}
```

**Test Mutation - Delete a Book:**
```graphql
mutation {
  deleteBook(id: "PUT_BOOK_ID_HERE")
}
```

**Test Query - Get Single Book:**
```graphql
{
  book(id: "PUT_BOOK_ID_HERE") {
    id
    title
    author
    genre
  }
}
```

---

## 📦 Railway Deployment

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "GraphQL Book API with MongoDB"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Railway

#### **Option A: Using Railway MongoDB Plugin (RECOMMENDED)** ✅

Railway has built-in MongoDB support - no need for MongoDB Atlas!

1. **Create Project:**
   - Go to https://railway.app/ and sign in
   - Click **"New Project"** → **"Deploy from GitHub repo"**
   - Select your repository
   - Wait for initial deployment

2. **Add MongoDB Plugin:**
   - In your project, click **"New"** button
   - Select **"Database"** → **"Add MongoDB"**
   - Railway will automatically provision a MongoDB instance

3. **Connect Your App to MongoDB:**
   - Click on the **MongoDB plugin** you just added
   - Go to **"Variables"** tab
   - Copy the value of `MONGO_URL`
   - Go back to your **app service** (not MongoDB)
   - Go to **"Variables"** tab
   - Click **"New Variable"**
   - Add: `MONGO_URI` = (paste the MONGO_URL value you copied)
   
4. **Deploy:**
   - Railway will automatically redeploy with the new variable
   - Your app will be live at: `https://your-app.railway.app`
   - GraphQL endpoint: `https://your-app.railway.app/graphql`

**That's it!** Railway MongoDB is free tier and works perfectly for this assignment.

---

#### **Option B: Using MongoDB Atlas (External)**

If you prefer MongoDB Atlas (more storage, better dashboard):

1. Create MongoDB Atlas account: https://cloud.mongodb.com/
2. Create a free cluster (M0)
3. Get connection string
4. In Railway project → "Variables" → Add `MONGO_URI` with Atlas connection string
5. In MongoDB Atlas → "Network Access" → Add `0.0.0.0/0` (allow all IPs)

---

### Step 3: Serve Frontend from Railway

The frontend in `index.html` already has dynamic endpoint detection:
```javascript
const url = window.location.hostname === 'localhost' 
  ? 'http://localhost:4003/graphql'
  : `${window.location.origin}/graphql`;
```

**To serve the frontend from Railway:**
- The `index.html` will automatically work if you access it via Railway URL
- Or deploy frontend separately to Vercel/Netlify and point to Railway backend

---

## 📋 Assignment Requirements Checklist

### Backend (server.js) ✅
- [x] Topic changed from "User" to "Book"
- [x] Book fields: `id`, `title`, `author`, `genre`
- [x] Real MongoDB connection using Mongoose
- [x] Uses `dotenv` for configuration
- [x] Query: `books` - fetch all books
- [x] Query: `book(id: ID)` - fetch single book by ID
- [x] Mutation: `addBook` - create new book
- [x] Mutation: `deleteBook` - delete a book
- [x] Listens on `process.env.PORT`
- [x] Connects to `process.env.MONGO_URI`
- [x] Uses `express-graphql` and `buildSchema`

### Frontend (index.html) ✅
- [x] Clean, modern styled UI (tech-blue theme)
- [x] Section 1: List all books (Query)
- [x] Section 2: Form to add new book (Mutation: addBook)
- [x] Section 3: Delete book functionality (Mutation: deleteBook)
- [x] Uses vanilla JavaScript `fetch` API
- [x] Calls GraphQL endpoint properly

### Configuration ✅
- [x] package.json with all dependencies
- [x] .env.example for Railway
- [x] .gitignore for security
- [x] README.md with documentation

---

## 🎨 UI Features

The new frontend includes:
- **Modern gradient design** (purple-blue tech theme)
- **Responsive layout** (works on mobile & desktop)
- **Smooth animations** (hover effects, fade-ins)
- **Delete confirmation** (prevents accidental deletion)
- **Auto-refresh** (list updates after add/delete)
- **Error handling** (user-friendly messages)
- **Loading states** (visual feedback)

---

## 🐛 Troubleshooting

**Problem: MongoDB connection error**
- Solution: Check your MONGO_URI in .env file
- Make sure to whitelist your IP in MongoDB Atlas Network Access

**Problem: "Cannot GET /"**
- Solution: The backend doesn't serve the root path. Use `/graphql` for GraphiQL or open `index.html` directly

**Problem: Frontend can't connect**
- Solution: Make sure the server is running on port 4003 and check browser console for errors

**Problem: CORS errors**
- Solution: Already handled with `app.use(cors())` in server.js

---

## 📚 Sample Test Data

Use these books for testing:

```graphql
mutation {
  addBook(title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic Fiction") { id title }
}

mutation {
  addBook(title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy") { id title }
}

mutation {
  addBook(title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction") { id title }
}

mutation {
  addBook(title: "Dune", author: "Frank Herbert", genre: "Science Fiction") { id title }
}
```

---

## ✨ You're All Set!

Your GraphQL Book API is ready for:
1. ✅ Local development and testing
2. ✅ Submission as university assignment
3. ✅ Deployment to Railway

Good luck with your assignment! 🚀
