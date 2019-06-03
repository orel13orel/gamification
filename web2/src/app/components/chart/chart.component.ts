import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';

export class UserActivity {
  points: number;
  challenge_Badge: number;
  context_badge: number;
  // date: any;
  constructor(points: number, challenge_Badge: number, context_badge: number) {
    this.points = points;
    this.challenge_Badge = challenge_Badge;
    this.context_badge = context_badge;
  }
  sumUA(points: number, challenge_Badge: number, context_badge: number) {
    this.points += points;
    this.challenge_Badge += challenge_Badge;
    this.context_badge += context_badge;
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
  chartArr: Map<string , UserActivity>;
  contextMap: Map<string , string>;
  // chartArr: Map<string , number>;
  pointsArr: number[];
  challengeBadgeArr: number[];
  contextBadgeArr: number[];
  public contextID: string;
  public limit: number;
  contexts: Observable<any[]>;
  public userID: string;

  constructor(private db: AngularFireDatabase) {
    this.chartArr = new Map<string, UserActivity>();
    this.contextMap = new Map<string, string>();
    this.pointsArr = new Array<number>();
    this.challengeBadgeArr = new Array<number>();
    this.contextBadgeArr = new Array<number>();
    this.contexts = this.db.list('Context').snapshotChanges();
  }

  ngOnInit() {
    this.ref = this.db.list('UserActivity', ref => ref);
    this.showGraph();
}
  filterLimit() {
    this.ref = this.db.list('UserActivity', ref => ref.limitToLast(this.limit));
    this.showGraph();
  }
  filterContext() {
    this.ref = this.db.list('UserActivity', ref => ref.orderByChild('context_id').equalTo(this.contextID));
    this.showGraph();
  }
  filterUser() {
    this.ref = this.db.list('UserActivity', ref => ref.orderByChild('user_id').equalTo(this.userID));
    this.showGraph();
  }

  showGraph() {
    new Promise((resolve, reject) => {
      this.ref.valueChanges().subscribe(result => {
        console.log(result);
        for (const ua of result) {
          if (this.chartArr.has(ua.date)) {
            // add points to existing date
            // const tempPoints = this.chartArr.get(us.date).points;
            // this.chartArr.set(us.date, new UserActivity(+us.points + tempPoints));
            this.chartArr.get(ua.date).sumUA(+(ua.points), +(ua.challenge_Badge), +(ua.context_badge));
            // const num =+us.points +this.chartArr.get(us.date);
            // this.chartArr.set(us.date , +num);
          } else {
            // set points to new date
            // this.chartArr.set(us.date, new UserActivity(+us.points));
            this.chartArr.set(ua.date, new UserActivity(+(ua.points), +(ua.challenge_Badge), +(ua.context_badge)));
          }
        }
        // make an array of points
        Array.from(this.chartArr.values()).forEach(ua => {
          this.pointsArr.push(+ua.points);
          this.challengeBadgeArr.push(+ua.challenge_Badge);
          this.contextBadgeArr.push(+ua.context_badge);
        });

        console.log(this.chartArr);
        console.log(Array.from(this.chartArr.keys()));
        console.log(this.pointsArr);
        resolve();
      });
    }).then(() => {
      this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
///
        type: 'bar',
        data: {
          labels: Array.from(this.chartArr.keys()),  // ['1', '2' , '3' , '4'], //
          datasets: [{
            label: 'points',
            data: this.pointsArr,  // [ 1 , 2 , 3 , 4], //
            backgroundColor: '#32db64'
          }, {
            label: 'badges',
            data: this.contextBadgeArr,
            backgroundColor: '#db1019'
          }, {
            label: 'challenges',
            data: this.challengeBadgeArr,
            backgroundColor: '#0d1edb'
          }]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItems, data) {
                return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
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
                callback: function(value, index, values) {
                  return value ;
                },
                suggestedMin: 0
              }
            }]
          },
        }
        ///
      });
    });
  }
  }

