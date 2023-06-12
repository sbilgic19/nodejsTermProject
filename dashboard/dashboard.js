function updateTopRatedMovie(data) {
  var labels = data.map((row) => `${row.genre} - ${row.primaryTitle}`);
  var movieHistogram = new Chart(document.getElementById("movieHistogram"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Top Rated Movies",
        data: data.map((row) => row.rating),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
updateDashboardTopRatedMovies(updateTopRatedMovie);


function updateTopRatedTVSeries(data) {
  var labels = data.map((row) => `${row.genre} - ${row.primaryTitle}`);
  var topRatedTVSeriesHistogram = new Chart(document.getElementById("tvSeriesHistogram"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Top Rated TV Series",
        data: data.map((row) => row.rating),
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
updateDashboardTopRatedTVSeries(updateTopRatedTVSeries);

function updateMostVotedTVSeries(data) {
  var labels = data.map((row) => `${row.genre} - ${row.primaryTitle}`);
  var tvSeriesVotesHistogram = new Chart(document.getElementById("tvSeriesVotesHistogram"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Top 10 Most Voted TV Series",
        data: data.map((row) => row.numVotes),
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
updateDashboardMostVotedTVSeries(updateMostVotedTVSeries);

function updateMostVotedMovie(data) {
  var labels = data.map((row) => `${row.genre} - ${row.primaryTitle}`);
  var movieVotesHistogram = new Chart(document.getElementById("movieVotesHistogram"), {
    type: "bar",
    data: {
      labels: labels, 
      datasets: [{
        label: "Most Voted Movies",
        data: data.map((row) => row.numVotes),
        backgroundColor: "rgba(255, 205, 86, 0.6)"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
updateDashboardMostVotedMovies(updateMostVotedMovie);

function youngs(data) {
  console.log('Youngs data:', data);
}
updateDashboardYoungs(youngs);


function updatePieChart(data) {
  var piechart = new Chart(document.getElementById("piechart"), {
    type: "pie",
    data: {
      labels: ["Under 18", "18-24", "25-34", "35-49", "50+"],
      datasets: [{
        data: data.map((row) => row.UserCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
      }]
    },
    options: {
      title: {
        display: true,
        text: "User Age Distribution"
      }
    }
  });
}
updateDashboardAge(updatePieChart);