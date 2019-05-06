

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Get a database reference to our posts
const database = admin.database();

function log(a) {
    console.log(a);
}

//receives new challenge_name, badge_id, start_time, end_time,points. returns the new challenge_id.
exports.addChallenge=functions.https.onRequest((req,res)=>{
    let arr=req.query.text.split("/");
    const challenge_name=arr[0];
    const badge_id = arr[1];
    const  start_time_arr = arr[2].toString().split(".");
    console.log(start_time_arr);
    const start_time=new Date(parseInt( start_time_arr[2]),parseInt(start_time_arr[1])-1,parseInt(start_time_arr[0])).toDateString();
    console.log(start_time);
    const end_time_arr = arr[3].toString().split(".");
    const end_time=new Date(parseInt( end_time_arr[2]),parseInt(end_time_arr[1])-1,parseInt(end_time_arr[0])).toDateString();
    const points = arr[4];
    return admin.database().ref('/Challenge/').push({name: challenge_name ,badge_id:badge_id ,start_time:start_time, end_time: end_time, points:points}).then((snapshot) => {
        let arr2 = snapshot.toString().split("/");
        //console.log("arr2 : "+arr2);
        //console.log("arr2[4] : "+arr2[4]);
        return res.redirect(303, arr2[4]);
    });
});

//receives challenge_id ,action_id, amount. returns the new ActionToChallenge_id
exports.addActionToChallenge = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let challenge_id=arr[0];
    let action_id=arr[1];
    let amount=arr[2];

    return admin.database().ref('/Challenge/'+challenge_id.toString()+'/////Actions/').push({action_id: action_id,amount:amount}).then((snapshot) => {

        let arr=snapshot.toString().split("/");
        console.log(arr[6]);
        return res.redirect(303, arr[6]);
    });
});

//receives new badge_name, context_id, photoURL. returns the new badge_id.
exports.addBadge=functions.https.onRequest((req,res)=>{
    let arr=req.query.text.split("/");
    const badge_name=arr[0];
    const context_id = arr[1];
    const photoUrl = arr[2];
    return admin.database().ref('/Badges/').push({name: badge_name ,context_id:context_id , photoUrl: photoUrl}).then((snapshot) => {
        let arr2 = snapshot.toString().split("/");
        console.log("arr2 : "+arr2);
        console.log("arr2[4] : "+arr2[4]);
        return res.redirect(303, arr2[4]);
    });
});




//receives new context name, return the context id
exports.addContext = functions.https.onRequest((req,res)=>{
    const context = req.query.text;

    return admin.database().ref('/Context').push({name: context}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        //console.log(snapshot);

        let arr=snapshot.toString().split("/");
       // console.log(arr);
        let context_id=arr[4];
      // console.log(context_id);
        return res.redirect(303, context_id);
    });
});

//receives new action name and context id, return the action id
exports.addAction = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let action_name=arr[0];
    let context_id=arr[1];

    return admin.database().ref('/Context/'+context_id.toString()+'/////Action/').push({name: action_name}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        //console.log(snapshot);

        let arr=snapshot.toString().split("/");
        console.log(arr);
        let action_id=arr[6];
         console.log(action_id);
        return res.redirect(303, action_id);
    });
});



//receives  action_id, value, points. return rule id
//Rp table
exports.addRp = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let action_id=arr[0];
    let value=arr[1];
    let points=arr[2];


    return admin.database().ref('/Rp/').push({action_id: action_id , value: value , points: points}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        let arr2=snapshot.toString().split("/");
        // console.log("arr2 : "+arr2);
        // console.log("rule id : "+arr2[4]);
        return res.redirect(303, arr2[4]);
    });
});

//receives  badge_id, valueOfPoints,context return rule id
//Rb table
exports.addRb = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let badge_id=arr[0];
    let valueOfPoints=arr[1];
    let context=arr[2];


    return admin.database().ref('/Rb/').push({badge_id: badge_id , valueOfPoints: valueOfPoints , context: context}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        let arr2=snapshot.toString().split("/");
        // console.log("arr2 : "+arr2);
        // console.log("rule id : "+arr2[4]);
        return res.redirect(303, arr2[4]);
    });
});

// receives user_id,action_id,context_id.
exports.addUserActivity = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let user_id=arr[0];
    let action_id=arr[1];
    let context_id=arr[2];
    const date= new Date().toDateString();
    console.log(date);
    //get the action count for the user
    return admin.database().ref('/UserActivity/').push({user_id: user_id , action_id:action_id ,context_id:context_id, date:date}).then((snapshot) => {

        let arr2=snapshot.toString().split("/");

        return res.redirect(303, arr2[4]);
    });

     });
// exports.addUserActivity = functions.https.onCall((data, context) => {
//     let arr = data.text.split("/");
//     let user_id=arr[0];
//     let action_id=arr[1];
//     let context_id=arr[2];
//     //get the action count for the user
//     let count=admin.database().ref('/User/Action/'+action_id).get('Count');
//
//
// });


//RP function
exports.Rp=  functions.database.ref('/UserActivity/{userActivityID}').onCreate((snapshot,context) => {
    const uerActivityID = context.params.userActivityID;
    //console.log("uerActivityID: "+uerActivityID);
    const data = snapshot.val();
    const action_id = data.action_id;
    const context_id = data.context_id;
    const user_id = data.user_id;
    const activityDate = data.date;
    let Action_count;
    Rb(uerActivityID);

// get Atcion_CounterJSON fron the specific user and specific action
    let ActionCounterJSON=null;
    database.ref('/Users/'+user_id+'/ActionCounter/'+action_id+'/').once(`value`).then(function(snap_ActionCounter){
        ActionCounterJSON=snap_ActionCounter.val();
        // console.log("ActionCounterJSON: ");
        // console.log(ActionCounterJSON);


// if not exist set counter to 1
        if(ActionCounterJSON === null){
            database.ref('/Users/'+user_id+'/ActionCounter/'+action_id+'/').set({count: "1"});
            Action_count=1;
        }
        // set counter++
        else {
            Action_count = parseInt(ActionCounterJSON.count);
            Action_count++;
            database.ref('/Users/'+user_id+'/ActionCounter/'+action_id+'/').set({count: Action_count.toString()});

        }
        // console.log("Action_count"+Action_count);
        return;

    }).catch(function(error) {
        console.log("Error deleting app:", error);
    });


// get RpJSON
    let points = database.ref('/Rp/').once('value').then(function(snap_Rp){
        let RpJSON=snap_Rp.val();
        // console.log("RpJSON: ");
        // console.log(RpJSON);

        var BreakException = {};

        try {
            // run loop on all keys that exist
            Object.keys(RpJSON).forEach(function (Rpkey) {
                let RpActionId = RpJSON[Rpkey].action_id;
                // console.log("RpActionId: " + RpActionId);

                let RpPoints = RpJSON[Rpkey].points;
                let RpValue = RpJSON[Rpkey].value;


                // cheaking for matching the action_id and action_count(value)
                if (RpActionId === action_id && RpValue === Action_count.toString()) {
                    // console.log("RpPoints: " + RpPoints);
                    points = RpPoints;
                    // Adding points to user
                    database.ref('/Users/'+ user_id + '/Points/').once('value').then(function(pointsSnapshot){
                        var userPoints = pointsSnapshot.val();
                        userPoints=userPoints + parseInt(RpPoints);
                        database.ref('/Users/'+ user_id + '/Points/').set(userPoints);

                        return null;
                     }).catch(function(error) {
                console.log("Error deleting app:", error);
            });


                    database.ref('/Users/'+ user_id +'/ContextPoints/ֿ'+ context_id+'/' /*+`/sumOfPoints/`*/).once('value').then(function(pointsSnapshot){
                       let contextPointsJSON = pointsSnapshot.val();



                       if(contextPointsJSON === null){
                           database.ref('/Users/'+ user_id + '/ContextPoints/' + context_id).set({sumOfPoints: RpPoints.toString()});
                           // call Rb
                           //Rb(uerActivityID);

                       }else{

                           //neet to be checked 6.5.2019
                           var sumOfPoints = contextPointsJSON.sumOfPoints;
                           sumOfPoints = parseInt(sumOfPoints) + parseInt(RpPoints);
                           console.log(sumOfPoints);
                           //sumOfPoints= parseInt(sumOfPoints) + parseInt(RpPoints);
                           database.ref('/Users/'+ user_id + '/ContextPoints/' + context_id).set({sumOfPoints: sumOfPoints.toString()});
                           // call Rb
                           //Rb(uerActivityID);
                       }



                        return null;
                    }).catch(function(error) {
                        console.log("Error deleting app:", error);
                    });

                    throw BreakException;
                }
            })
        }catch (e) {
            if(e!== BreakException) throw e;
        }
        return null;

    }).catch(function(error) {
        console.log("Error deleting app:", error);
    });
});
//function foo(){console.log("blabla");}


  function Rb(userActivityID){
     //console.log("Rb");
     //get UserActivity
     database.ref('/UserActivity/'+userActivityID+'/').once('value').then( function(userActivitySnap) {
    let userActivityJSON=userActivitySnap.val();
         console.log("Rb: userActivityJSON");
         console.log(userActivityJSON);
    let user_id=userActivityJSON.user_id;

        //get user sum of points
         database.ref('/Users/'+user_id+'/').once('value').then( function(userSnap) {
             let userJSON=userSnap.val();
             console.log("Rb:userJSON");
             console.log(userJSON);
             let userPoints=userJSON.Points;
             console.log("Rb:userPoints: ");
             console.log(userPoints);
             //get user's contextPoints
             database.ref('/Users/'+user_id+'/ContextPoints/').once('value').then( function(contextPointsSnap) {
                 let contextPointsJSON=contextPointsSnap.val();
                 console.log("Rb:contextPointsJSON");
                 console.log(contextPointsJSON);
                //get the badge rule table
                 database.ref('/Rb/').once('value').then( function(RbSnap) {
                     let RbJSON=RbSnap.val();
                     console.log("Rb:RbJSON");
                     console.log(RbJSON);

                     Object.keys(RbJSON).forEach(function (RbKey) {
                        let Rb_context= RbJSON[RbKey].context;
                         log("Rb_context");
                        log(Rb_context);
                        let Rb_points=RbJSON[RbKey].valueOfPoints;
                        log("Rb_points");
                         log(Rb_points);
                         let badge_id=RbJSON[RbKey].badge_id;

                        //If the user is entitled to the badge then we will assign it to him else we'll delete the badge from the user's badges
                         //case context is global
                         if(Rb_context==="global"&&parseInt(userPoints)>=parseInt(Rb_points)){
                                log("give badge for global points");
                                addBadgeToUser(user_id,badge_id);
                         }else if(Rb_context!=="global"&& (typeof contextPointsJSON[Rb_context]!== 'undefined') &&(parseInt( contextPointsJSON[Rb_context].sumOfPoints)>=parseInt(Rb_points))){
                                log("give badge for specific context");
                             addBadgeToUser(user_id,badge_id);
                         }else {
                            log("take badge from user");

                             database.ref('/Users/' + user_id +'/Badges/'+badge_id+'/').remove();
                         }

                     });

                     return ;
                 }).catch(function (error) {
                     console.log("RbJSONBlock:Error deleting app inside catch:", error);
                 });

                 return;
             }).catch(function (error) {
                 console.log("contextPointsJSONBlock:Error deleting app inside catch:", error);
             });
             return;
         }).catch(function (error) {
             console.log("userJSONBlock:Error deleting app inside catch:", error);
         });
         return;
     }).catch(function (error) {
         console.log("userActivityuJSONBlock:Error deleting app inside catch:", error);
     });


}




exports.challenges = functions.database.ref('/UserActivity/{userActivityID}').onCreate((snapshot,context) => {
    const uerActivityID = context.params.userActivityID;
    //console.log("uerActivityID: "+uerActivityID);
    const data=snapshot.val();
    const action_id=data.action_id;
    const context_id=data.context_id;
    const user_id=data.user_id;
    const activityDate=data.date;
   // function foo(){console.log("blabla");}

    //console.log("user_id: "+user_id+"action_id: "+action_id+"context_id: "+context_id+"activityDate: "+activityDate);
    database.ref('/Challenge/').once('value').then( function(snapshotChallenge) {
        const challengeJSON= snapshotChallenge.val();
    console.log("challengeJSON: ");
    console.log(challengeJSON);
    //    foo();
        //Running on Challenges and check if the date is between start and end time
        Object.keys(challengeJSON).forEach(function (challengeId) {
           // console.log("end_time: "+challengeJSON[challengeId].end_time);
            const start_date=new Date(challengeJSON[challengeId].start_time);
            const end_date=new Date(challengeJSON[challengeId].end_time);
            const activity_date=new Date(data.date);
           // console.log("end date: "+end_date);
            if (!(activity_date >= start_date && activity_date <= end_date)) {
                console.log("Didn't enter actions on challengeID: ");
                console.log(challengeJSON[challengeId]);
            } else {
                var actionKeyArray = new Array();
                var subActionFlag = false;
                console.log("enter actions on challengeID: " + challengeId);
                database.ref('/Challenge/' + challengeId + '/Actions/').once('value').then(function (snapshotAction) {
                    let actionsJSON = snapshotAction.val();
                    console.log("actionsJSON: ");
                    console.log(actionsJSON);

                    Object.keys(actionsJSON).forEach(function (actionKey) {
                        actionKeyArray.push(actionKey);
                        const actionInChallengeId = actionsJSON[actionKey].action_id;
                        if (actionInChallengeId === action_id) {
                            console.log(actionKey);
                            console.log("same action id" + actionInChallengeId);
                            //PIC_JSON = ProgressInChallenges
                            database.ref('/Users/' + user_id + '/ProgressInChallenges/' + actionKey + '/').once('value').then(function (snap_PIC) {
                                let PIC_JSON = snap_PIC.val();
                                console.log("PIC_JSON: ");
                                console.log(PIC_JSON);

                                // checking if the record is exists or not
                                if (PIC_JSON === null) {
                                    console.log("amount: " + actionsJSON[actionKey].amount);
                                    if (actionsJSON[actionKey].amount > 1)
                                        admin.database().ref('/Users/' + user_id + '/ProgressInChallenges/' + actionKey).set({
                                            count: "1",
                                            done: "0"
                                        });
                                    else {//amount=1
                                        admin.database().ref('/Users/' + user_id + '/ProgressInChallenges/' + actionKey).set({
                                            count: "1",
                                            done: "1"
                                        });
                                        subActionFlag = true;
                                        console.log("subActionFlag1: "+ subActionFlag);
                                    }
                                    //checking if not done then count++
                                } else {
                                    const done = PIC_JSON.done;
                                    console.log("done: " + done);
                                    if (done === "0") {
                                        let count = parseInt(PIC_JSON.count);
                                        count++;
                                        console.log("count: " + count);
                                        if (actionsJSON[actionKey].amount > count)
                                            admin.database().ref('/Users/' + user_id + '/ProgressInChallenges/' + actionKey).set({
                                                count: count.toString(),
                                                done: "0"
                                            });
                                        else {
                                            admin.database().ref('/Users/' + user_id + '/ProgressInChallenges/' + actionKey).set({
                                                count: count.toString(),
                                                done: "1"
                                            });
                                            subActionFlag = true;
                                            console.log("subActionFlag2: "+ subActionFlag);

                                        }

                                    }
                                }
                                return;
                            }).catch(function (error) {
                                console.log("Error deleting app inside catch:", error);
                            });
                            //})
                        }
                    })//end of forEach action
                    console.log("actionKeyArray: ");
                    console.log(actionKeyArray);
                    console.log("subActionFlag3: "+ subActionFlag);
                    return;
                }).catch(function (error) {
                    console.log("Error deleting app middle catch:", error);
                });//end of actionJSON forEach

                var challengeComplete = true;

                setTimeout( function() {
                    console.log("subActionFlag4: " + subActionFlag);
                    if (subActionFlag) {
                        //checking if all challenge is complete
                        actionKeyArray.forEach(function (actionKey) {
                            database.ref('/Users/' + user_id + '/ProgressInChallenges/' + actionKey + '/done').once('value').then(function (doneSnapshot) {
                                let val = doneSnapshot.val();
                                if (val !== "1")
                                    challengeComplete = false;
                                return;
                            }).catch(function (error) {
                                console.log("Error deleting app:", error);
                            });
                        })
                    } else {
                        challengeComplete = false;
                    }
                    console.log("challengeComplete: " + challengeComplete);

                    //challenge has been completed, we add the points and badge to the user
                    if (challengeComplete) {
                        var points = challengeJSON[challengeId].points;
                        console.log("points!: ");
                        console.log(points);
                        var badge_id = challengeJSON[challengeId].badge_id;
                        console.log("badge!: ");
                        console.log(badge_id);
                        database.ref('/Users/' + user_id + '/Points').once('value').then(function (pointsSnapshot) {
                            let userPointsJSON = pointsSnapshot.val();
                            userPointsJSON = (parseInt(points) + parseInt(userPointsJSON)).toString();
                            database.ref('/Users/' + user_id + '/Points').set(userPointsJSON);
                            console.log("userPointsJSON added: ");
                            console.log(userPointsJSON);
                            return;
                        }).catch(function (error) {
                            console.log("Error deleting app:", error);
                        });
                        addBadgeToUser(user_id,badge_id);
                    }
                  // return;
                },4000);
                //setTimeout(func(), 10000);


            }
            //console.log(challengeJSON[challengeId].points);

        });//end of challengeJSON forEach
        return;
    }).catch(function(error) { // the firsrt once challengeJSON
        console.log("Error deleting app outside catch:", error);
    });
    return snapshot;
});


  function addBadgeToUser(user_id,badge_id) {
      database.ref( 'Badges/' + badge_id + '/').once('value').then(function(badgeSnap){
          let badgeJSON = badgeSnap.val();
          console.log("badgeJSON: ");
          console.log(badgeJSON);

          let context_id = badgeJSON.context_id;

          let badgeName = badgeJSON.name;
          let photoUrl = badgeJSON.photoUrl;

          database.ref('/Users/' + user_id +'/Badges/'+badge_id+'/').set({context_id : context_id , name: badgeName, photoUrl:photoUrl});
          return;
      }).catch(function (error) {
          console.log("addBadgeToUser: Error deleting app:", error);
      });
  }
// exports.exmple1 = functions.https.onRequest(()=>{
//     admin.database().ref("/Points/-LaLQsQFUVwKvzJE7G_R").on("value",function (snapshot) {
//         console.log("answer " +snapshot.val());
//     }, function (errorObject) {
//         console.log("The read failed: " + errorObject.code);
//     });
//
// });
