import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data: Observable<any[]>;
ref: AngularFireList<any>;

UserActivity = {
  points: 0,
  date : 0
}
  reportByDay2: Map<any, any >;
@ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;

  chartData = null;

  constructor(private db: AngularFireDatabase) {
    this.reportByDay2 = new Map<any, any >();
  }



  ngOnInit() {
    this.ref = this.db.list('UserActivity', ref => ref.orderByChild('date'));
    this.ref.valueChanges().subscribe(result => {
    if (this.chartData) {
      this.updateCharts(result);
    } else {
      this.createCharts(result);
    }
    });
  }

  getReportValues() {
    // missing date
    // ua = userActivity
    let reportByDay = {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
      19: null,
      20: null,
      21: null,
      22: null,
      23: null,
      24: null,
      25: null,
      26: null,
      27: null,
      28: null,
      29: null
    }
    // let reportByDay2 = new Map();
    for (let ua of this.chartData) {
      if (this.reportByDay2[ua.date]) {
        this.reportByDay2[ua.date] += ua.points;
      } else {
        this.reportByDay2.set(ua.date, ua.points);

      }
    }
    return Object.keys(this.reportByDay2).map(a => this.reportByDay2[a]);
  }
  createCharts(data) {
  this.chartData = data;
  let chartData = this.getReportValues();
  console.log('my arr: ', chartData);
  this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
///
    type: 'bar',
    data: {
      labels: Object.keys(this.reportByDay2).map(a => this.reportByDay2[a].key),
      datasets: [{
        data: chartData,
        backgroundColor: '#32db64'
      }]
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
  updateCharts(data) {
  this.chartData = data;
  let chartData = this.getReportValues();
  this.valueBarsChart.data.datasets.forEach((dataset) => {
    dataset.data = chartData;
  });
  this.valueBarsChart.update();
  }

  // normalizeDate(st_date: string) {
  // let date = new Date(st_date);
  // let to_push = {st_date: null};
  // repo
  // }

}
