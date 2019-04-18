

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

//receives new badge_name, context_id, isPermanent, photoURL. returns the new badge_id.
exports.addBadge=functions.https.onRequest((req,res)=>{
    let arr=req.query.text.split("/");
    const badge_name=arr[0];
    const context_id = arr[1];
    const isPermanent = arr[2];
    const photoUrl = arr[3];
    return admin.database().ref('/Badges/').push({name: badge_name ,context_id:context_id ,isPermanent:isPermanent, photoUrl: photoUrl}).then((snapshot) => {
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


    return admin.database().ref('/Rp/').push({action_id: action_id , value:value , points: points}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        let arr2=snapshot.toString().split("/");
        // console.log("arr2 : "+arr2);
        // console.log("rule id : "+arr2[4]);
        return res.redirect(303, arr2[4]);
    });
});

//receives  badge_id, valueOfPoints, time(in hr). return rule id
//Rb table
exports.addRb = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let badge_id=arr[0];
    let valueOfPoints=arr[1];
    let time=arr[2];


    return admin.database().ref('/Rb/').push({badge_id: badge_id , valueOfPoints:valueOfPoints , time: time}).then((snapshot) => {
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

exports.Rp=  functions.database.ref('/UserActivity/{userActivityID}').onCreate((snapshot,context) => {
    const uerActivityID = context.params.userActivityID;
    //console.log("uerActivityID: "+uerActivityID);
    const data = snapshot.val();
    const action_id = data.action_id;
    const context_id = data.context_id;
    const user_id = data.user_id;
    const activityDate = data.date;



});

exports.challenges = functions.database.ref('/UserActivity/{userActivityID}').onCreate((snapshot,context) => {
    const uerActivityID = context.params.userActivityID;
    //console.log("uerActivityID: "+uerActivityID);
    const data=snapshot.val();
    const action_id=data.action_id;
    const context_id=data.context_id;
    const user_id=data.user_id;
    const activityDate=data.date;
    //console.log("user_id: "+user_id+"action_id: "+action_id+"context_id: "+context_id+"activityDate: "+activityDate);
    //geting
    database.ref('/Challenge/').on("value", function(snapshot2) {
        let challengeJSON=snapshot2.val();
        console.log("challengeJSON: ");
        console.log(challengeJSON);
        //Running on Challenges and check if the date is between start and end time
        Object.keys(challengeJSON).forEach(function (key) {
           // console.log("end_time: "+challengeJSON[key].end_time);
            const start_date=new Date(challengeJSON[key].start_time);
            const end_date=new Date(challengeJSON[key].end_time);
            const activity_date=new Date(data.date);
           // console.log("end date: "+end_date);
            if(activity_date>=start_date&&activity_date<=end_date) {
                console.log("enter actions on challengeID: "+key);
                database.ref('/Challenge/'+key+'/Actions/').on("value",function (snapshot3) {
                    let actionsJSON = snapshot3.val();
                    console.log("actionsJSON: ");
                    console.log(actionsJSON);
             Object.keys(actionsJSON).forEach(function (actionKey) {
                 const actionInChallengeId = actionsJSON[actionKey].action_id;
                 if(actionInChallengeId === action_id){
                     console.log(actionKey);
                     console.log("same action id" + actionInChallengeId);

                     //PIC_JSON = ProgressInChallenges
                     let PIC_JSON=null;
                 database.ref('/Users/'+user_id+'/ProgressInChallenges/'+actionKey+'/').on('value',function (snap_PIC) {

                     PIC_JSON=snap_PIC.val();
                     console.log("PIC_JSON: ");
                     console.log(PIC_JSON);
                 })
                     // checking if the record is exists or not
                    if(PIC_JSON === null ){

                        admin.database().ref('/Users/'+user_id+'/ProgressInChallenges/'+actionKey).set({count : "1", done: "0"});
                        //checking if not done then count++
                    }else{
                        const done=PIC_JSON.done;
                        console.log("done: "+done);
                     if( done === "0"){
                        let count=parseInt( PIC_JSON.count);
                        count++;
                        console.log("count: "+count);

                        admin.database().ref('/Users/'+user_id+'/ProgressInChallenges/'+actionKey).set({count : count.toString(),done : "0"});
                     }
                    }
                 //})
                 }
             })
                })
            } else {console.log("Didn't enter actions on challengeID: ");
                console.log(challengeJSON[key]);}
            //console.log(challengeJSON[key].points);

        });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    return snapshot;
});

// exports.exmple1 = functions.https.onRequest(()=>{
//     admin.database().ref("/Points/-LaLQsQFUVwKvzJE7G_R").on("value",function (snapshot) {
//         console.log("answer " +snapshot.val());
//     }, function (errorObject) {
//         console.log("The read failed: " + errorObject.code);
//     });
//
// });
