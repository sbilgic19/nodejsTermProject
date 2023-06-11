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
updateDashboard(updatePieChart);