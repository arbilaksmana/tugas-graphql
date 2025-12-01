# GraphQL Book API

A GraphQL API for managing books built with Node.js, Express, MongoDB (Mongoose), and a vanilla HTML/JavaScript frontend.

## Features

- **GraphQL API** with queries and mutations
- **MongoDB** database integration
- **Modern UI** with tech-blue gradient theme
- **CRUD Operations**: Create, Read, and Delete books
- **Railway-ready** deployment configuration

## Tech Stack

**Backend:**
- Node.js
- Express.js
- GraphQL (express-graphql)
- MongoDB (Mongoose)
- dotenv for environment variables

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- Fetch API for GraphQL requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd tugas-graphql
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER/books_db?retryWrites=true&w=majority
   PORT=4003
   ```

   Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your MongoDB Atlas credentials.

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open the application**
   - Backend GraphiQL: http://localhost:4003/graphql
   - Frontend: Open `index.html` in your browser

## GraphQL Schema

### Book Type
```graphql
type Book {
  id: ID
  title: String
  author: String
  genre: String
}
```

### Queries
```graphql
# Get all books
books: [Book]

# Get a single book by ID
book(id: ID!): Book
```

### Mutations
```graphql
# Add a new book
addBook(title: String!, author: String!, genre: String!): Book

# Delete a book
deleteBook(id: ID!): String
```

## Usage Examples

### Query All Books
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

### Query Single Book
```graphql
{
  book(id: "507f1f77bcf86cd799439011") {
    id
    title
    author
    genre
  }
}
```

### Add a Book
```graphql
mutation {
  addBook(
    title: "The Great Gatsby"
    author: "F. Scott Fitzgerald"
    genre: "Classic Fiction"
  ) {
    id
    title
    author
    genre
  }
}
```

### Delete a Book
```graphql
mutation {
  deleteBook(id: "507f1f77bcf86cd799439011")
}
```

## Deployment to Railway

1. **Push your code to GitHub**

2. **Create a new project on Railway**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add MongoDB Plugin**
   - In your Railway project, click "New"
   - Select "Database" → "Add MongoDB"
   - Railway will automatically create a MongoDB instance

4. **Configure Environment Variables**
   - Go to your service settings
   - Add variable: `MONGO_URI` = (copy from MongoDB plugin)
   - Railway automatically sets `PORT`

5. **Deploy**
   - Railway will automatically deploy your application
   - Access your app at the provided Railway URL

## Project Structure

```
tugas-graphql/
├── server.js           # Express + GraphQL backend
├── index.html          # Frontend UI
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # Documentation
```

## API Endpoint

- **Local**: `http://localhost:4003/graphql`
- **Railway**: `https://your-app.railway.app/graphql`

## License

ISC

## Author

University Assignment - Integration Application Course
