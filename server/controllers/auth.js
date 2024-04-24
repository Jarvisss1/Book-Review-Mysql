const  db = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "test";

const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  const values = [req.body.email, req.body.username];

  
  db.query(q, values, (err, result) => {
    console.log(req.body.email, req.body.username);
    if (err) {
      console.error("Error checking existing user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length) {
      return res.status(409).json({ error: "User already exists" }); // Wrap error message in an object
    } else {
      const insertQuery =
        "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const insertValues = [req.body.username, req.body.email, hash];

      db.query(insertQuery, insertValues, (err, data) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(201).json({ message: "User added successfully" }); // Use 201 for resource creation
      });
    }
  });
};


const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  console.log(req.body.username);
  db.query(q, [req.body.username], (err, result) => {
    if (err) {
      console.error("Error checking existing user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!result.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const {password,...other}=result[0];

    //return res.status(200).json({ message: "Login successful" });
    const token = jwt.sign({ id: user.user_id }, secret);
    console.log(user.user_id);
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({message:"Login successful",token,other});
  });
};

const logout = (req, res) => {
  // Clear the access token cookie
  res.clearCookie("access_token").json({ message: "Logged out" });

  // Remove user data from localStorage
  localStorage.removeItem("user");
};

module.exports = { register, login, logout };

