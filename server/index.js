const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");
const booksRoutes = require("./routes/books.js");
const reviewsRoutes = require("./routes/reviews.js"); 

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/reviews", reviewsRoutes); 

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
