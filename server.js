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
  password: '***100altı',
  database: 'teamnode',
});

function authenticateUser(email, password, callback) {
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

function retrieveFilms(primaryTitle, genre, duration, averageRating, releaseYear, callback) {
  var sql = `SELECT DISTINCT movie.* FROM movie `;


  if (genre) {
    sql += `INNER JOIN moviegenre ON movie.tconst = moviegenre.tconst AND moviegenre.genre = '${genre}'`;
  } else {
    sql += `LEFT JOIN moviegenre ON movie.tconst = moviegenre.tconst`;
  }

  sql += " WHERE 1=1";

  if (primaryTitle) {
    sql += ` AND movie.primaryTitle = '${primaryTitle}`;
  }

  if (duration) {
    if (duration === "Less than 40 minutes") {
      sql += " AND movie.duration < 40";
    } else if (duration === "More than 150 minutes") {
      sql += " AND movie.duration >= 150";
    } else {
      const [startDuration, endDuration] = duration.split("-");
      if (startDuration && endDuration) {
        sql += ` AND movie.duration >= ${startDuration.trim()} AND movie.duration <= ${endDuration.trim()}`;
      }
    }
  }

  if (averageRating) {
    const minRating = parseInt(averageRating);
    sql += ` AND movie.averageRating >= ${minRating}`;
  }

  if (releaseYear) {
    if (releaseYear === "Before 1920") {
      sql += " AND movie.releaseYear < 1920";
    } else if (releaseYear === "After 2020") {
      sql += " AND movie.releaseYear >= 2020";
    } else {
      const [startYear, endYear] = releaseYear.split("-");
      if (startYear && endYear) {
        sql += ` AND movie.releaseYear >= ${startYear.trim()} AND movie.releaseYear <= ${endYear.trim()}`;
      }
    }
  }

  console.log(sql);

  pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      callback(results);
    }
  });
}




app.get('/retrieveFilms', (req, res) => {
  var primaryTitle = req.query.primaryTitle;
  var releaseYear = req.query.releaseYear;
  var averageRating = req.query.averageRating;
  var genre = req.query.genre;
  var duration = req.query.duration;
  retrieveFilms(
    primaryTitle, genre, duration, averageRating, releaseYear, (result) => {
      res.send(result);
    });
});



app.get('/authenticateUser', (req, res) => {
  var email = req.query.email;
  var password = req.query.password;
  authenticateUser(email, password, (result) => {
    res.send(result);
  });
});

app.post('/registerUser', (req, res) => {
  var name = req.body.name;
  var surname = req.body.surname;
  var age = req.body.age;
  var email = req.body.email;
  var password = req.body.password;
  registerUser(name, surname, age, email, password, (result) => {
    res.send(result);
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
