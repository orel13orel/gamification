import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;
  constructor() { }

  ngOnInit() {
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
///
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          data: [1 , 52 , 37 , 74 , 51 , 6 , 7],
          backgroundColor: '#32db64'
        }, {data: [7 , 66 , 11 , 54 , 91 , 16 , 0],
          backgroundColor: '#db1d1b'}],
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItems, data) {
              return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + ' $';
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return value + '$';
              },
              suggestedMin: 0
            }
          }]
        },
      }
      ///
    });
  }

}
