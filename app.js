const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
// Enable CORS
app.use(cors());
const PORT = 3000;
// Configure body-parser to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection pool

const pool = mysql.createPool({
  host: "localhost",
  // change below to use your local db
  user: "root",
  password: "s3rk4ns3rk4n",
  database: "projectdb",
});

//test connection
app.get("/getAllTvSeries", (req, res) => {
  pool.query(`SELECT * FROM tvseries`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(PORT, () => {
    console.log("Server started");
});

