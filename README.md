# GraphQL Movie API

A modern GraphQL API for managing movies built with Node.js, Express, MongoDB (Mongoose), and a beautiful vanilla HTML/CSS/JavaScript frontend.

## 🎬 Features

- **GraphQL API** with queries and mutations
- **MongoDB** database integration with Mongoose ODM
- **Modern UI** with responsive grid layout and toast notifications
- **Real-time Search** with debounced input
- **CRUD Operations**: Create, Read, Search, and Delete movies
- **Railway-ready** deployment configuration

## 🛠 Tech Stack

**Backend:**
- Node.js
- Express.js
- GraphQL (express-graphql)
- MongoDB (Mongoose)
- dotenv for environment variables

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- Font Awesome icons
- Google Fonts (Inter)
- Fetch API for GraphQL requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arbilaksmana/tugas-graphql.git
   cd tugas-graphql
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER/movies_db?retryWrites=true&w=majority
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

## 📊 GraphQL Schema

### Movie Type
```graphql
type Movie {
  id: ID
  title: String
  director: String
  genre: String
}
```

### Queries
```graphql
# Get all movies
movies: [Movie]

# Get a single movie by ID
movie(id: ID!): Movie

# Search movies by title (case-insensitive, partial match)
searchMovies(title: String!): [Movie]
```

### Mutations
```graphql
# Add a new movie
addMovie(title: String!, director: String!, genre: String!): Movie

# Delete a movie
deleteMovie(id: ID!): String
```

## 💡 Usage Examples

### Query All Movies
```graphql
{
  movies {
    id
    title
    director
    genre
  }
}
```

### Query Single Movie
```graphql
{
  movie(id: "507f1f77bcf86cd799439011") {
    id
    title
    director
    genre
  }
}
```

### Search Movies
```graphql
{
  searchMovies(title: "Inception") {
    id
    title
    director
    genre
  }
}
```

### Add a Movie
```graphql
mutation {
  addMovie(
    title: "Inception"
    director: "Christopher Nolan"
    genre: "Sci-Fi"
  ) {
    id
    title
    director
    genre
  }
}
```

### Delete a Movie
```graphql
mutation {
  deleteMovie(id: "507f1f77bcf86cd799439011")
}
```

## 🌐 Deployment to Railway

### Quick Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Railway**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add MongoDB Plugin**
   - In your Railway project, click "New"
   - Select "Database" → "Add MongoDB"
   - Railway will automatically provision a MongoDB instance

4. **Configure Environment Variables**
   - Click on your MongoDB service
   - Go to "Variables" tab
   - Copy the value of `MONGO_URL`
   - Go to your app service
   - Add variable: `MONGO_URI` = (paste MONGO_URL value)

5. **Generate Domain**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Your API will be live at: `https://your-app.railway.app/graphql`

### Environment Variables Required

- `MONGO_URI` - MongoDB connection string (from Railway MongoDB or Atlas)
- `PORT` - Server port (automatically set by Railway)

## 📁 Project Structure

```
tugas-graphql/
├── server.js           # Express + GraphQL backend
├── index.html          # Frontend UI
├── package.json        # Dependencies
├── .npmrc             # NPM configuration for Railway
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # Documentation
```

## 🎨 Frontend Features

- **Auto-load**: Movies load automatically on page open
- **Real-time Search**: Debounced search with 500ms delay
- **Toast Notifications**: Success/error messages as elegant popups
- **Responsive Grid**: Card-based layout that adapts to screen size
- **Smooth Animations**: Hover effects and transitions
- **Modern Icons**: Font Awesome integration

## 🔗 API Endpoints

- **Local Development**: `http://localhost:4003/graphql`
- **Production (Railway)**: `https://tugas-graphql-production.up.railway.app/graphql`

## 🧪 Testing

### Using GraphiQL
Navigate to the GraphQL endpoint in your browser to access the interactive GraphiQL interface:
```
http://localhost:4003/graphql
```

### Using the Frontend
Simply open `index.html` in your browser to interact with the API through a user-friendly interface.

### Sample Test Data

You can use these mutations to populate your database with sample movies:

```graphql
mutation {
  movie1: addMovie(title: "Inception", director: "Christopher Nolan", genre: "Sci-Fi") { id title }
  movie2: addMovie(title: "The Dark Knight", director: "Christopher Nolan", genre: "Action") { id title }
  movie3: addMovie(title: "Parasite", director: "Bong Joon-ho", genre: "Thriller") { id title }
  movie4: addMovie(title: "The Shawshank Redemption", director: "Frank Darabont", genre: "Drama") { id title }
  movie5: addMovie(title: "Spirited Away", director: "Hayao Miyazaki", genre: "Animation") { id title }
}
```

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Verify your `MONGO_URI` in `.env` file
- Whitelist your IP address in MongoDB Atlas Network Access

**CORS Errors**
- Already handled with `app.use(cors())` in server.js
- No additional configuration needed

**Port Already in Use**
- Change the `PORT` in `.env` file
- Default is 4003

## 📝 Assignment Requirements

This project fulfills the following requirements:

**Backend:**
- ✅ Changed from User → Movie entity
- ✅ Fields: `id`, `title`, `director`, `genre`
- ✅ Real MongoDB with Mongoose
- ✅ dotenv for environment variables
- ✅ Query: `movies` and `movie(id: ID)`
- ✅ Query: `searchMovies(title: String)`
- ✅ Mutation: `addMovie` and `deleteMovie`
- ✅ Uses `process.env.PORT` and `process.env.MONGO_URI`
- ✅ Uses `express-graphql` and `buildSchema`

**Frontend:**
- ✅ Modern styled UI with responsive design
- ✅ List all movies section with search
- ✅ Add new movie form
- ✅ Delete movie functionality
- ✅ Vanilla JavaScript with `fetch` API
- ✅ Toast notifications for user feedback

**Deployment:**
- ✅ Railway-ready configuration
- ✅ Environment variables properly configured
- ✅ MongoDB integration

## 📄 License

ISC

## 👨‍💻 Author

University Assignment - Integration Application Course

---

**Live Demo**: [https://tugas-graphql-production.up.railway.app/graphql](https://tugas-graphql-production.up.railway.app/graphql)

**Repository**: [https://github.com/arbilaksmana/tugas-graphql](https://github.com/arbilaksmana/tugas-graphql)
