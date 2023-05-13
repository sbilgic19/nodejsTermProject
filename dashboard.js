var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
    datasets: [{
      label: 'Data 6',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#00cc00',
        '#663399'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
});
