
export const chartData = {
  labels: ['Food',
    'Alcohol',
    'Babies',
    'Special'],
  datasets: [{
    label: 'Total Number',
    data: [30, 19, 70, 5, ],
    backgroundColor: ['rgba(68, 96, 239,0.2)', 'rgba(68, 96, 239,0.4)', 'rgba(68, 96, 239,0.6)', 'rgba(68, 96, 239,0.8)'],
    borderColor: ['rgba(68, 96, 239,0.4)', 'rgba(68, 96, 239,0.6)', 'rgba(68, 96, 239,0.8)', 'rgba(68, 96, 239,1)'],
    borderWidth: 1
  }]
};

 export const shopOptions =
  {

  }

 export const pieData = {
    labels: ['Active', 'Pending', 'Declined'],
    datasets: [
      {
        label: 'Vendor Status Distribution',
        data: [100, 200, 100], 
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Pie chart colors
      }
    ]
  };

  

export  const lineData = {
    labels: ['January',
    'Febuary',
    'March',
    'April'], // X-axis labels
    datasets: [
      {
        label: 'Driver ',
        data: [30, 45, 60, 160], // Y-axis data
        fill: false,
        borderColor: 'rgba(68, 96, 239,0.3)', // Line color
        tension: 0.5, // Smoothing of the line curve
        border:0.2
      },
      {
        label: 'Vendor ',
        data: [60, 5, 35, 20], // Y-axis data
        fill: false,
        borderColor: 'rgba(68, 96, 239,0.5)', // Line color
        tension: 0.5, // Smoothing of the line curve
        border:0.2
      },
      {
        label: 'Hospitality ',
        data: [0, 20, 40, 200], // Y-axis data
        fill: false,
        borderColor: 'rgba(68, 96, 239,0.7)', // Line color
        tension: 0.5, // Smoothing of the line curve
        border:0.2
      },
      {
        label: 'Rental ',
        data: [10,70, 80, 100], // Y-axis data
        fill: false,
        borderColor: 'rgba(68, 96, 239,0.9)', // Line color
        tension: 0.5, // Smoothing of the line curve
        border:0.2
      },
    ],
  };
  export const lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };