

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


// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//         // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//         return res.redirect(303, snapshot.ref.toString());
//     });
// });

//
// // Listens for new messages added to /messages/:pushId/original and creates an
// // uppercase version of the message to /messages/:pushId/uppercase
// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
//     .onCreate((snapshot, context) => {
//         // Grab the current value of what was written to the Realtime Database.
//         const original = snapshot.val();
//         console.log('Uppercasing', context.params.pushId, original);
//         const uppercase = original.toUpperCase();
//         // You must return a Promise when performing asynchronous tasks inside a Functions such as
//         // writing to the Firebase Realtime Database.
//         // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//         return snapshot.ref.parent.child('uppercase').set(uppercase);
//     });

// exports.addPointToSet = functions.https.onRequest((req,res)=>{
//     const point = req.query.text;
//
//     return admin.database().ref('/Points').push({point: point}).then((snapshot) => {
//         // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//         return res.redirect(303, snapshot.ref.toString());
//     });
// });


//receives new challenge_name, badge_id, start_time, end_time,points. returns the new challenge_id.
exports.addChallenge=functions.https.onRequest((req,res)=>{
    let arr=req.query.text.split("/");
    const challenge_name=arr[0];
    const badge_id = arr[1];
    const strat_time = arr[2];
    const end_time = arr[3];
    const points = arr[4];
    return admin.database().ref('/Challenge/').push({name: challenge_name ,badge_id:badge_id ,strat_time:strat_time, end_time: end_time, points:points}).then((snapshot) => {
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
    const date= new Date().toString();
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



exports.challenges = functions.database.ref('/UserActivity/{userActivityID}').onWrite((snapshot,context) => {
    const uerActivityID = context.params.userActivityID;
   const action_id = context.params.userActivityID.action_id;
    const context_id = context.params.userActivityID.context_id;
    const user_id=context.params.userActivityID.user_id;
    console.log(uerActivityID);
    console.log("snapshot:  " + snapshot.toString());
    console.log("challenges is on!!!!!");
});

// exports.exmple1 = functions.https.onRequest(()=>{
//     admin.database().ref("/Points/-LaLQsQFUVwKvzJE7G_R").on("value",function (snapshot) {
//         console.log("answer " +snapshot.val());
//     }, function (errorObject) {
//         console.log("The read failed: " + errorObject.code);
//     });
//
// });
