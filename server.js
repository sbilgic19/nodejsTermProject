const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Enable CORS
app.use(cors());

// Configure body-parser to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '415gk4cmz',
  database: 'projectdb',
});

function authenticateUser(email, password, callback){
  const sql = `SELECT Email, Password FROM User WHERE email = "${email}"`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else if (result.length == 0) {
        callback("The user is not registered!");
    }
    else if (result[0].Email = email && result[0].Password == password) {
        callback("The user is authenticated!");
    }
    else if (result[0].Email = email && result[0].Password != password) {
        callback("The password is not valid!");
    }
  })
}

app.get('/authenticateUser', (req, res) => {
    var email = req.query.email;
    var password = req.query.password;
    authenticateUser(email, password , (result) => {
        res.send(result);
    });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});