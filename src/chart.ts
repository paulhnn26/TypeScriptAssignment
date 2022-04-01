import Chart from 'chart.js/auto';
import { chartCanvas } from './dom-utils';

export const chart = new Chart<"line">(chartCanvas, {
    type: 'line',
    data: {
      labels: [1,2,3,4],
      datasets: [{ 
          data: [10,20,30,50],
          label: "Infizierte nach x Tagen",
          borderColor: "#3e95cd",
          fill: false
        },
      ]
    },
  });