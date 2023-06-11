fetch('/api/movies') // Replace '/api/movies' with the actual API endpoint URL
  .then(response => response.json())
  .then(data => {
    // Process the data and extract the genre names and ratings
    const genreNames = data.map(movie => movie.genreName);
    const ratings = data.map(movie => movie.rating);

    // Create the chart using the retrieved data
    var movieHistogram = new Chart(document.getElementById("movieHistogram"), {
      type: "bar",
      data: {
        labels: genreNames,
        datasets: [{
          label: "Top 10 Rated Movies",
          data: ratings,
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
  })
  .catch(error => {
    console.error('Error:', error);
  });

