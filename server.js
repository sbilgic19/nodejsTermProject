const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
        callback("Invalid user!");
    }
    else if (result[0].Email = email && result[0].Password == password) {
        callback("Authenticated!");
    }
    else if (result[0].Email = email && result[0].Password != password) {
        callback("Invalid password!");
    }
  })
}

function registerUser(name, surname, age, email, password, callback) {
  const sql = `SELECT COUNT (*) AS Result FROM User WHERE email = "${email}"`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else if (result[0].Result == 0) {
      const sql = `INSERT INTO User Values ("${email}", "${password}", "${name}"\
      ,"${surname}", ${age})`;
      pool.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          callback("Registered succesfully!");
        }
      });
    }
    else {
      callback("The email already exists!")
    }
  });
}

app.get('/authenticateUser', (req, res) => {
    var email = req.query.email;
    var password = req.query.password;
    authenticateUser(email, password , (result) => {
        res.send(result);
    });
});

app.post('/registerUser', (req, res) => {
  var name = req.body.name;
  var surname = req.body.surname;
  var age = req.body.age;
  var email = req.body.email;
  var password = req.body.password;
  registerUser(name, surname, age, email, password , (result) => {
      res.send(result);
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});