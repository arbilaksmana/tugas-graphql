require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

// ============= CONFIG MONGODB =============
const MONGO_URI =
  process.env.MONGO_URI || process.env.MONGO_URL ||
  "mongodb+srv://USERNAME:PASSWORD@CLUSTER/nama_db?retryWrites=true&w=majority";

// koneksi ke MongoDB
mongoose
  .connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ============= MODEL MONGOOSE =============
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

// ============= SCHEMA GRAPHQL =============
// Topik: Film
const schema = buildSchema(`
  type Movie {
    id: ID
    title: String
    director: String
    genre: String
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
    searchMovies(title: String!): [Movie]
  }

  type Mutation {
    addMovie(title: String!, director: String!, genre: String!): Movie
    deleteMovie(id: ID!): String
  }
`);

// ============= RESOLVERS =============
const root = {
  // ambil semua film
  movies: async () => {
    const movies = await Movie.find();
    // mongoose pakai _id, tapi GraphQL pakai id → otomatis di-handle
    return movies.map((m) => ({
      id: m._id.toString(),
      title: m.title,
      director: m.director,
      genre: m.genre,
    }));
  },

  // ambil film by id
  movie: async ({ id }) => {
    const m = await Movie.findById(id);
    if (!m) return null;
    return {
      id: m._id.toString(),
      title: m.title,
      director: m.director,
      genre: m.genre,
    };
  },

  // cari film berdasarkan judul (case-insensitive, partial match)
  searchMovies: async ({ title }) => {
    const movies = await Movie.find({
      title: { $regex: title, $options: 'i' } // case-insensitive search
    });
    return movies.map((m) => ({
      id: m._id.toString(),
      title: m.title,
      director: m.director,
      genre: m.genre,
    }));
  },

  // tambah film baru
  addMovie: async ({ title, director, genre }) => {
    const newMovie = new Movie({ title, director, genre });
    const saved = await newMovie.save();
    return {
      id: saved._id.toString(),
      title: saved.title,
      director: saved.director,
      genre: saved.genre,
    };
  },

  // hapus film
  deleteMovie: async ({ id }) => {
    const deleted = await Movie.findByIdAndDelete(id);
    if (!deleted) return "Film tidak ditemukan";
    return `Film dengan ID ${id} berhasil dihapus`;
  },
};

// ============= GRAPHQL MIDDLEWARE =============
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // untuk testing di browser
  })
);

// port untuk local / Railway
const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`GraphQL Movie API running on port ${PORT}`);
  console.log(`GraphiQL: http://localhost:${PORT}/graphql`);
});
