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
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

// ============= SCHEMA GRAPHQL =============
// Topik: Buku
const schema = buildSchema(`
  type Book {
    id: ID
    title: String
    author: String
    genre: String
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    searchBooks(title: String!): [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!, genre: String!): Book
    deleteBook(id: ID!): String
  }
`);

// ============= RESOLVERS =============
const root = {
  // ambil semua buku
  books: async () => {
    const books = await Book.find();
    // mongoose pakai _id, tapi GraphQL pakai id → otomatis di-handle
    return books.map((b) => ({
      id: b._id.toString(),
      title: b.title,
      author: b.author,
      genre: b.genre,
    }));
  },

  // ambil buku by id
  book: async ({ id }) => {
    const b = await Book.findById(id);
    if (!b) return null;
    return {
      id: b._id.toString(),
      title: b.title,
      author: b.author,
      genre: b.genre,
    };
  },

  // cari buku berdasarkan judul (case-insensitive, partial match)
  searchBooks: async ({ title }) => {
    const books = await Book.find({
      title: { $regex: title, $options: 'i' } // case-insensitive search
    });
    return books.map((b) => ({
      id: b._id.toString(),
      title: b.title,
      author: b.author,
      genre: b.genre,
    }));
  },

  // tambah buku baru
  addBook: async ({ title, author, genre }) => {
    const newBook = new Book({ title, author, genre });
    const saved = await newBook.save();
    return {
      id: saved._id.toString(),
      title: saved.title,
      author: saved.author,
      genre: saved.genre,
    };
  },

  // hapus buku
  deleteBook: async ({ id }) => {
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return "Buku tidak ditemukan";
    return `Buku dengan ID ${id} berhasil dihapus`;
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
  console.log(`GraphQL Book API running on port ${PORT}`);
  console.log(`GraphiQL: http://localhost:${PORT}/graphql`);
});
