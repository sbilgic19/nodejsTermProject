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

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '***100alti',
  database: 'teamnode'
});

//test connection
app.get("/getAllTvSeries", (req, res) => {
  pool.query(`SELECT * FROM tvseries`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
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

function retrieveFilms(primaryTitle, genres, durations, averageRating, listReleaseYear, callback) {
  var sql = `SELECT DISTINCT movie.* FROM movie `;

  sql += `INNER JOIN moviegenre ON movie.tconst = moviegenre.tconst AND (`;
  for (var cur = 0; cur < genres.length; cur++) {
    if (genres[cur] == true) {
      sql += `moviegenre.genre = '${genres[cur]}' OR `; // assuming adding \r is no more needed for db access
    }
  }

  sql += `0 = 1) WHERE 1=1`;

  if (primaryTitle != "") {
    sql += ` AND movie.primaryTitle = '${primaryTitle}`;
  }

  for (var dur = 0; dur < durations.length; dur++) {
    if (durations[dur] == true) {
      if (durations[dur] === "Less than 40 minutes") {
        sql += " OR movie.duration < 40";
      } else if (durations[dur] === "More than 150 minutes") {
        sql += " OR movie.duration >= 150";
      } else if (durations[dur] === "Between 40 and 70 minutes") {
        sql += " OR (movie.duration >= 40 AND movie.duration < 70)";
      } else if (durations[dur] === "Between 70 and 150 minutes") {
        sql += " OR (movie.duration >= 70 AND movie.duration < 150)";
      }
    }




    else {
      const [startDuration, endDuration] = duration.split("-");
      if (startDuration && endDuration) {
        sql += ` AND movie.duration >= ${startDuration.trim()} AND movie.duration <= ${endDuration.trim()}`;
      }
    }
  }

  if (averageRating) {
    const minRating = averageRating;
    // note that default is zero, so if the user does not select a min rating, we do not need to take any explicit step to handle that
    sql += ` AND movie.averageRating >= ${minRating}`;
  }

  // if (releaseYear) {
  //   if (releaseYear === "Before 1920") {
  //     sql += " AND movie.releaseYear < 1920";
  //   } else if (releaseYear === "After 2020") {
  //     sql += " AND movie.releaseYear >= 2020";
  //   } else {
  //     const [startYear, endYear] = releaseYear.split("-");
  //     if (startYear && endYear) {
  //       sql += ` AND movie.releaseYear >= ${startYear.trim()} AND movie.releaseYear <= ${endYear.trim()}`;
  //     }
  //   }


  for (var idx = 0; idx < listReleaseYear.length; idx++) {
    if (listReleaseYear[idx] == true) {
      if (durations[dur] === "duration0040") {
        sql += " OR movie.duration < 40";
      } else if (listReleaseYear[idx] === "duration150") {
        sql += " OR movie.duration >= 150";
      } else if (listReleaseYear[idx] === "duration4070") {
        sql += " OR (movie.duration >= 40 AND movie.duration < 70)";
      } else if (listReleaseYear[idx]) === "duration70150") {
        sql += " OR (movie.duration >= 70 AND movie.duration < 150)";
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

  // create a list of release years
  var listReleaseYears = [];
  var isAll = true;
  listReleaseYears.push(req.query.releaseYear1920);
  listReleaseYears.push(req.query.releaseYear2040);
  listReleaseYears.push(req.query.releaseYear4060);
  listReleaseYears.push(req.query.releaseYear6080);
  listReleaseYears.push(req.query.releaseYear8000);
  listReleaseYears.push(req.query.releaseYear0010);
  listReleaseYears.push(req.query.releaseYear1020);
  listReleaseYears.push(req.query.releaseYear2020);
  for (var i = 0; i < listReleaseYears.length; i++) {
    if (listReleaseYears[i] == false) {
      isAll = false;
    }
  }

  if (isAll == true) {
    for (var i = 0; i < listReleaseYears.length; i++) {
      listReleaseYears[i] == true;
    }
  }


  var duration0040 = req.query.duration0040;
  var duration4070 = req.query.duration4070;
  var duration70150 = req.query.duration70150;
  var duration150 = req.query.duration150;

  var durations = [];
  isAll = true;
  durations.push(req.query.duration0040);
  durations.push(req.query.duration4070);
  durations.push(req.query.duration70150);
  durations.push(req.query.duration150);
  for (var i = 0; i < durations.length; i++) {
    if (durations[i] == false) {
      isAll = false;
    }
  }

  if (isAll == true) {
    for (var i = 0; i < durations.length; i++) {
      durations[i] == true;
    }
  }

  var genreDrama = req.query.genreDrama;
  var genreHistory = req.query.genreHistory;
  var genreComedy = req.query.genreComedy;
  var genreRomance = req.query.genreRomance;
  var genreFamily = req.query.genreFamily;
  var genreWestern = req.query.genreWestern;
  var genreBiography = req.query.genreBiography;

  var genres = [];
  isAll = true;
  genres.push(req.query.genreDrama);
  genres.push(req.query.genreHistory);
  genres.push(req.query.genreComedy);
  genres.push(req.query.genreRomance);
  genres.push(req.query.genreFamily);
  genres.push(req.query.genreWestern);
  genres.push(req.query.genreBiography);
  for (var i = 0; i < genres.length; i++) {
    if (genres[i] == false) {
      isAll = false;
    }
  }

  if (isAll == true) {
    for (var i = 0; i < genres.length; i++) {
      genres[i] == true;
    }
  }



  var averageRating = req.query.averageRating;

  retrieveFilms(
    primaryTitle, genres, durations, averageRating, listReleaseYears, (result) => {
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

app.listen(PORT, () => {
  console.log("Server started");
});

