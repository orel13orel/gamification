import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

export class UserActivity {
  points: number;
  // date: any;
  constructor(points: number) {
    this.points = points;
  }
  addPoints(points: number) {
    this.points += points;
  }
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  ref: AngularFireList<any>;
  chartData = null;
  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;
  // chartArr: UserActivity[] = [];
  // chartArr: Map<string , UserActivity>;
  chartArr: Map<string , number>;
  constructor(private db: AngularFireDatabase) {
    this.chartArr = new Map<string, number>();
  }

  ngOnInit() {
    this.ref = this.db.list('UserActivity');
    // , ref => ref.orderByChild('date'));
    this.ref.valueChanges().subscribe(result => {
      console.log(result);
      for (const us of result) {
        if (this.chartArr.has(us.date)) {
          // add points to existing date
          // const tempPoints = this.chartArr.get(us.date).points;
          // this.chartArr.set(us.date, new UserActivity(+us.points + tempPoints));
          // this.chartArr.get(us.date).addPoints(+us.points.p);
         const num =+us.points +this.chartArr.get(us.date);
          this.chartArr.set(us.date , +num);
        } else {
          // set points to new date
          // this.chartArr.set(us.date, new UserActivity(+us.points));
          this.chartArr.set(us.date, +us.points);
        }
      }
      console.log(this.chartArr);
    });
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
///
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{data: [22 , 52 , 37 , 74 , 51 , 6 , 7], backgroundColor: '#32db64'}
            // , {data: [7 , 66 , 11 , 54 , 91 , 16 , 0], backgroundColor: '#db1d1b'}
          ],
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
