function updateMostVotedTVSeries(data){
  var labels = data.map((row) => `${row.genre} - ${row.primaryTitle}`);
  var tvSeriesVotesHistogram = new Chart(document.getElementById("tvSeriesVotesHistogram"), {
    type: "bar",
    data: {
      labels: labels, // Replace with actual genre names
      datasets: [{
        label: "Most Voted TV Series",
        data: data.map((row) => row.numVotes), // Replace with actual TV series votes count
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
      labels: labels, // Replace with actual genre names
      datasets: [{
        label: "Most Voted Movies",
        data: data.map((row) => row.numVotes),// Replace with actual movie votes count
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
  });}

  updateDashboardMostVotedMovies(updateMostVotedMovie);
  
  
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

// Call the updateDashboard function and pass the updatePieChart function as a callback
updateDashboardAge(updatePieChart);

