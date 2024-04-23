const axios = require("axios");
const mysql = require("mysql2");
const fs = require("fs");

const db = mysql.createConnection({
  host: "dbms-163.mysql.database.azure.com",
  user: "yatharth163",
  password: "DBMS@202251163",
  database: "books",
  port: 3306,
  ssl: { ca: fs.readFileSync("D:/downloads/DigiCertGlobalRootCA.crt.pem") },
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const options = {
  method: "GET",
  url: "https://www.googleapis.com/books/v1/volumes",
  params: { q: "Spiderman" }, 
};

async function fetchBooks() {
  try {
    const response = await axios.request(options);

    // Store book data in an array
    const books = response.data.items.map((bookItem) => {
      const bookInfo = bookItem.volumeInfo;
      return {
        title: bookInfo.title,
        authors: bookInfo.authors ? bookInfo.authors.join(", ") : "", // Join authors into a string if present
        publisher: bookInfo.publisher || "",
        publishedDate: bookInfo.publishedDate || "",
        description: bookInfo.description || "",
        categories: bookInfo.categories ? bookInfo.categories.join(", ") : "", // Join categories into a string if present
        pageCount: bookInfo.pageCount || 0,
        language: bookInfo.language || "",
        infoLink: bookInfo.infoLink || "",
        thumbnail: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "", // Check if imageLinks exist before accessing thumbnail
      };
    });

    // Insert each book into the books table
    books.forEach((book) => {
      const {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        categories,
        pageCount,
        language,
        infoLink,
        thumbnail,
      } = book;
      const query = `INSERT INTO books (title, authors, publisher, publishedDate, description, categories, pageCount, language, infoLink, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        title,
        authors,
        publisher,
        publishedDate,
        description,
        categories,
        pageCount,
        language,
        infoLink,
        thumbnail,
      ];

      // Execute the INSERT query
      db.query(query, values, (error, results) => {
        if (error) {
          console.error("Error inserting book:", error);
        } else {
          console.log("Book inserted successfully:", title);
        }
      });
    });

    // Close the MySQL connection
    connection.end();

    return books; // Return the array of books if you want to use it outside this function
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
}

fetchBooks();