import {Component, OnInit, ViewChild} from '@angular/core';
    import {Chart} from 'chart.js';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

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
  chartMap: Map<string , UserActivity>;
  contextMap: Map<string , string>;
  // chartArr: Map<string , number>;
  pointsArr: number[];
  challengeBadgeArr: number[];
  contextBadgeArr: number[];
  userActivitys: any;
  filterdUserActivitys: any;

  // filter able properties
  public contextID: string;
  public limit: number;
  public userID: string;

  // Active filter rules
  filters = {};

 // contexts: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.chartMap = new Map<string, UserActivity>();
    this.contextMap = new Map<string, string>();
    // this.pointsArr = new Array<number>();
    // this.challengeBadgeArr = new Array<number>();
    // this.contextBadgeArr = new Array<number>();
    // this.contexts = this.db.list('Context').snapshotChanges();
  }

  ngOnInit() {
    // this.ref =
     // new Promise((resolve, reject) => {
      this.db.list('UserActivity', ref => ref).valueChanges().subscribe(res => {
      // console.log(res);
      this.userActivitys = res;
      this.applyFilters();
    });
      // resolve();
      //   // });
      // }).then(() => {
      // console.log(this.filterdUserActivitys);
      // // this.showGraph();
      // });
  }
  // filterLimit() {
  //   this.ref = this.db.list('UserActivity', ref => ref.limitToLast(this.limit));
  //   this.showGraph();
  // }
  // filterContext() {
  //   this.ref = this.db.list('UserActivity', ref => ref.orderByChild('context_id').equalTo(this.contextID));
  //   this.showGraph();
  // }
  // filterUser() {
  //   this.ref = this.db.list('UserActivity', ref => ref.orderByChild('user_id').equalTo(this.userID));
  //   this.showGraph();
  // }

  showGraph() {

    this.chartMap.clear();
    this.pointsArr = new Array<number>();
    this.challengeBadgeArr = new Array<number>();
    this.contextBadgeArr = new Array<number>();

    new Promise((resolve, reject) => {
     // this.ref.valueChanges().subscribe(result => {
        console.log(this.filterdUserActivitys);
        for (const ua of this.filterdUserActivitys) {
          if (this.chartMap.has(ua.date)) {
            // add points to existing date
            // const tempPoints = this.chartArr.get(us.date).points;
            // this.chartArr.set(us.date, new UserActivity(+us.points + tempPoints));
            this.chartMap.get(ua.date).sumUA(+(ua.points), +(ua.challenge_Badge), +(ua.context_badge));
            // const num =+us.points +this.chartArr.get(us.date);
            // this.chartArr.set(us.date , +num);
          } else {
            // set points to new date
            // this.chartArr.set(us.date, new UserActivity(+us.points));
            this.chartMap.set(ua.date, new UserActivity(+(ua.points), +(ua.challenge_Badge), +(ua.context_badge)));
          }
        }
        // make an array of points
        Array.from(this.chartMap.values()).forEach(ua => {
          this.pointsArr.push(+ua.points);
          this.challengeBadgeArr.push(+ua.challenge_Badge);
          this.contextBadgeArr.push(+ua.context_badge);
        });
        if ( this.valueBarsChart) {
          this.valueBarsChart.destroy();
        }
        resolve();
     // });
    }).then(() => {
      console.log(this.chartMap);
      console.log(Array.from(this.chartMap.keys()));
      console.log(this.pointsArr);
      console.log(this.challengeBadgeArr);
      console.log(this.contextBadgeArr);
      this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
///
        type: 'bar',
        data: {
          labels: Array.from(this.chartMap.keys()),  // ['1', '2' , '3' , '4'], //
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

  private applyFilters() {
    new Promise((resolve, reject) => {
      console.log(this.userActivitys);
      this.filterdUserActivitys = _.filter(this.userActivitys, _.conforms(this.filters));
      resolve();
    }).then(() => {
      this.showGraph();
    });
  }

  // filter property by equality to rule
  filterExact(property: string, rul: any) {
    this.filters[property] = val => val === rul;
    this.applyFilters();
  }

  /// filter  numbers greater than rule
  filterGreaterThan(property: string, rule: number) {
    this.filters[property] = val => val > rule;
    this.applyFilters();
  }

  // removes filter
  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }
}

