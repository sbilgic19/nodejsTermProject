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
  password: 's3rk4ns3rk4n',
  database: 'projectdb'

});

//test connection
app.get("/getAllTvSeries", (req, res) => {
  pool.query(`SELECT tvseries.tconst as tconst, primaryTitle, isAdult, startYear, endYear, averageRating, description, imageUrl, genre.genre as genre
  FROM tvseries, tvseriesgenre, genre WHERE tvseries.tconst=tvseriesgenre.tconst AND tvseriesgenre.gconst=genre.gconst ORDER BY tconst;`, (error, results) => {
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

function checkForSqlInjectionRisk(input) {

  const sqlInjectionPattern = /('|--|\b(ALTER|CREATE|DELETE|DROP|INSERT|SELECT|UPDATE|RENAME|TRUNCATE)\b)/ig;
  return sqlInjectionPattern.test(input);
}


function retrieveFilms(primaryTitle, genres, durations, averageRating, listReleaseYear, callback) {

  if (checkForSqlInjectionRisk(primaryTitle)) {
    console.log("SQL injection risk detected!");
    empty_query = `SELECT * FROM movie WHERE 1=0`;
    pool.query(empty_query, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    });
  }


  var sql = `SELECT DISTINCT movie.* FROM movie `;
  var genreFilter = '';
  var durationFilter = '';
  var releaseYearFilter = '';

  for (let genre in genres) {
    if (genres[genre]) {
      genreFilter += genreFilter ? " OR " : "";
      genreFilter += `genre.genre = '${genre}'`;
    }
  }

  if (genreFilter) {
    sql += ` INNER JOIN moviegenre ON movie.tconst = moviegenre.tconst`;
    sql += ` INNER JOIN genre ON moviegenre.gconst = genre.gconst AND (${genreFilter})`;
  }

  sql += ' WHERE 1=1';

  if (primaryTitle) {
    sql += ` AND movie.primaryTitle = '${primaryTitle}'`;
  }

  for (let duration in durations) {
    if (durations[duration]) {
      durationFilter += durationFilter ? " OR " : "";
      switch (duration) {
        case "Less than 40 minutes":
          durationFilter += "movie.duration < 40";
          break;
        case "More than 150 minutes":
          durationFilter += "movie.duration >= 150";
          break;
        case "Between 40 and 70 minutes":
          durationFilter += "(movie.duration >= 40 AND movie.duration < 70)";
          break;
        case "Between 70 and 150 minutes":
          durationFilter += "(movie.duration >= 70 AND movie.duration < 150)";
          break;
      }
    }
  }


  if (durationFilter) {
    sql += ` AND (${durationFilter})`;
  }

  if (averageRating) {
    sql += ` AND movie.averageRating >= ${averageRating}`;
  }

  for (let year in listReleaseYear) {
    if (listReleaseYear[year]) {
      releaseYearFilter += releaseYearFilter ? " OR " : "";
      switch (year) {
        case "1920":
          releaseYearFilter += "(movie.releaseYear < 1920)";
          break;
        case "2040":
          releaseYearFilter += "(movie.releaseYear >= 1920 AND movie.releaseYear < 1940)";
          break;
        case "4060":
          releaseYearFilter += "(movie.releaseYear >= 1940 AND movie.releaseYear < 1960)";
          break;
        case "6080":
          releaseYearFilter += "(movie.releaseYear >= 1960 AND movie.releaseYear < 1980)";
          break;
        case "8000":
          releaseYearFilter += "(movie.releaseYear >= 1980 AND movie.releaseYear < 2000)";
          break;
        case "0010":
          releaseYearFilter += "(movie.releaseYear >= 2000 AND movie.releaseYear < 2010)";
          break;
        case "1020":
          releaseYearFilter += "(movie.releaseYear >= 2010 AND movie.releaseYear < 2020)";
          break;
        case "2020":
          releaseYearFilter += "(movie.releaseYear >= 2020)";
          break;
      }
    }
  }

  if (releaseYearFilter) {
    sql += ` AND (${releaseYearFilter})`;
  }

  sql += ` LIMIT 200`;

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
  const genres = {
    Drama: req.query.genreDrama === 'true',
    History: req.query.genreHistory === 'true',
    Comedy: req.query.genreComedy === 'true',
    Biography: req.query.genreBiography === 'true',
    Romance: req.query.genreRomance === 'true',
    Family: req.query.genreFamily === 'true',
    Western: req.query.genreWestern === 'true',



  };

  const durations = {
    "Less than 40 minutes": req.query.duration0040 === 'true',
    "More than 150 minutes": req.query.duration150 === 'true',
    "Between 40 and 70 minutes": req.query.duration4070 === 'true',
    "Between 70 and 150 minutes": req.query.duration70150 === 'true',
  };

  const listReleaseYears = {
    "1920": req.query.releaseYear1920 === 'true',
    "2040": req.query.releaseYear2040 === 'true',
    "4060": req.query.releaseYear4060 === 'true',
    "6080": req.query.releaseYear6080 === 'true',
    "8000": req.query.releaseYear8000 === 'true',
    "0010": req.query.releaseYear0010 === 'true',
    "1020": req.query.releaseYear1020 === 'true',
    "2020": req.query.releaseYear2020 === 'true',
  };

  retrieveFilms(
    req.query.primaryTitle, genres, durations, req.query.averageRating, listReleaseYears, (result) => {
      res.send(result);
    }
  );
});

app.get('/dashboard', (req, res) => {
  
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


const topRatedMovies = `SELECT genre, primaryTitle, averageRating
FROM (
  SELECT g.genre, t.primaryTitle, t.averageRating, 
         ROW_NUMBER() OVER (PARTITION BY g.genre ORDER BY t.averageRating DESC) AS ranking
  FROM genre g
  INNER JOIN tvseriesgenre tg ON g.gconst = tg.gconst
  INNER JOIN tvseries t ON tg.tconst = t.tconst
  WHERE t.averageRating IS NOT NULL
) AS ranked_tv_series
WHERE ranking = 1
ORDER BY averageRating DESC, genre;`

app.get('/topRatedMovies', (req, res) => {
  pool.query(topRatedMovies, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.send(results);
  });
});


const topRatedTVSeries = `SELECT genre, primaryTitle, averageRating
FROM (
  SELECT g.genre, t.primaryTitle, t.averageRating, 
         ROW_NUMBER() OVER (PARTITION BY g.genre ORDER BY t.averageRating DESC) AS ranking
  FROM genre g
  INNER JOIN tvseriesgenre tg ON g.gconst = tg.gconst
  INNER JOIN tvseries t ON tg.tconst = t.tconst
  WHERE t.averageRating IS NOT NULL
) AS ranked_tv_series
WHERE ranking = 1
ORDER BY averageRating DESC, genre
LIMIT 10;`

app.get('/topRatedTVSeries', (req, res) => {
  pool.query(topRatedTVSeries, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.send(results);
  });
});

const mostVotedTVSeries = `SELECT genre, primaryTitle, numVotes
FROM (
  SELECT g.genre, t.primaryTitle, t.numVotes, 
         ROW_NUMBER() OVER (PARTITION BY g.genre ORDER BY t.numVotes DESC) AS ranking
  FROM genre g
  INNER JOIN tvseriesgenre tg ON g.gconst = tg.gconst
  INNER JOIN tvseries t ON tg.tconst = t.tconst
  WHERE t.numVotes IS NOT NULL
) AS ranked_tv_series
WHERE ranking = 1
ORDER BY numVotes DESC
LIMIT 10;`

app.get('/mostVotedTVSeries', (req, res) => {
  pool.query(mostVotedTVSeries, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.send(results);
  });
});

const mostVotedMovies = `SELECT genre, primaryTitle, numVotes
FROM (
  SELECT g.genre, m.primaryTitle, m.numVotes, 
         ROW_NUMBER() OVER (PARTITION BY g.genre ORDER BY m.numVotes DESC) AS ranking
  FROM genre g
  INNER JOIN moviegenre mg ON g.gconst = mg.gconst
  INNER JOIN Movie m ON mg.tconst = m.tconst
  WHERE m.numVotes IS NOT NULL
) AS ranked_movies
WHERE ranking = 1
ORDER BY numVotes DESC;`

app.get('/mostVotedMovies', (req, res) => {
  pool.query(mostVotedMovies, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.send(results);
  });
});

const youngs = `SELECT c.firstname, c.lastname, (YEAR(CURRENT_DATE) - c.birthYear) AS age, 'Movie' AS category
FROM Crewmember c
INNER JOIN moviecrew mc ON c.nconst = mc.nconst
WHERE (YEAR(CURRENT_DATE) - c.birthYear) = (
  SELECT MIN(YEAR(CURRENT_DATE) - c.birthYear)
  FROM crewmember AS c
  INNER JOIN moviecrew AS mc ON c.nconst = mc.nconst
  INNER JOIN movie AS m ON mc.tconst = m.tconst
)
UNION
SELECT c.firstname, c.lastname, (YEAR(CURRENT_DATE) - c.birthYear) AS age, 'TV Series' AS category
FROM Crewmember c
INNER JOIN tvseriescrew tc ON c.nconst = tc.nconst
WHERE (YEAR(CURRENT_DATE) - c.birthYear) = (
  SELECT MIN(YEAR(CURRENT_DATE) - c.birthYear)
  FROM crewmember AS c
  INNER JOIN tvseriescrew AS tc ON c.nconst = tc.nconst
  INNER JOIN tvseries AS ts ON tc.tconst = ts.tconst
);`

app.get('/youngs', (req, res) => {
  pool.query(youngs, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.send(results);
  });
});

const userAgeDistribution = `SELECT
age_groups.AgeGroup,
COUNT(user.age) AS UserCount
FROM (
SELECT '10-17' AS AgeGroup
UNION ALL
SELECT '18-25' AS AgeGroup
UNION ALL
SELECT '26-35' AS AgeGroup
UNION ALL
SELECT '37-45' AS AgeGroup
UNION ALL
SELECT '50+' AS AgeGroup
) AS age_groups
LEFT JOIN user ON (
CASE
  WHEN user.age BETWEEN 10 AND 17 THEN '10-17'
  WHEN user.age BETWEEN 18 AND 25 THEN '18-25'
  WHEN user.age BETWEEN 26 AND 35 THEN '26-35'
  WHEN user.age BETWEEN 41 AND 45 THEN '37-45'
  ELSE '50+'
END
) = age_groups.AgeGroup
GROUP BY age_groups.AgeGroup;`

app.get('/userAgeDistribution', (req, res) => {
  pool.query(userAgeDistribution, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.send(results);
  });
});


app.listen(PORT, () => {
  console.log("Server started");
});

