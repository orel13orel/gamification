

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

//receives new challenge_name, badge_id, start_time, end_time,points. returns the new challenge_id.date example: /day.month.year/
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

//receives new context name, return the context id
exports.addContext2 = functions.https.onRequest((req,res)=>{
    const context = req.query.text;

    return admin.database().ref('/Context2').push({name: context}).then((snapshot) => {
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
    return admin.database().ref('/UserActivity/').push({
        user_id: user_id ,
        action_id:action_id ,
        context_id:context_id,
        date:date,
        points:"0",
        challenge_Badge:"0",
        context_badge:"0"}).then((snapshot) => {
        let arr2=snapshot.toString().split("/");
        return res.redirect(303, arr2[4]);
    });

     });
//function getRndInteger(min, max) {return Math.floor(Math.random() * (max - min) ) + min;}
function addActivity(user_id,action_id,context_id,date) {
    setTimeout(function () {
        database.ref('/UserActivity/').push({
            user_id: user_id,
            action_id: action_id,
            context_id: context_id,
            date: date.toDateString(),
            points:"0",
            challenge_Badge:"0",
            context_badge:"0"
        });
    },4000);


}

exports.addUserActivityA = functions.https.onRequest((req,res)=>{
    let days =parseInt( req.query.text);
    log("days: "+days);
    let user_id="ZYP9sAngx7NinGt5QkdmrHPOpgp1";
    var date= new Date();
    //contexts id:
    //action id:
    let post_id_c="-Lbr-1NUNlyOVz4qRj2p";
    let post_id_a="-Lbr4afUT1Q8GM8Wfzhm";
    let commentMe_id_a="-LbvZ-DDBmNVfJkwqpws";
    let likeMe_id_a= "-LbvZ2ReJ1ZmcNcAS1gD";
    let unlikeME_id_a="-LbvZ9lVT2Nt1Y2u6_uT";

    let login_id_c ="-LbvUu_fYK9MPENSQYtj";
    let login_id_a="-LbvWSJ6Nb0S79-6jtsh";
    let invite_id_a ="-LbvWc8oL5zk-HCzaMaz";

    let profile_id_c="-LbvV5DHAybGUXNPS-0E";
    let following_id_a="-LbvWyZ2Di1p1jo3pOZR";
    let followers_id_a="-LbvX84LDLtxAgUSQ375";
    let unfollow_id_a="-LbvXSwreFP_tXRRn_m7";
    let unfollowME_id_a="-LbvXsMOsiiQ0yYn8dfp";

    let feed_id_c ="-LbvV8kDuZdkQM37TTNC";
    let comment_id_a="-LbvYT3xx6_xEKR7FDon";
    let like_id_a="-LbvYYqvdtNg7LsOK_Gy";
    let unlike_id_a="-LbvYcs-DRrCw3RJv8_5";

            //1 login, 4 post,2 comment,2 like, 2 following,2 followers, 1 likeMe. total: 14 actions per day
    var i=1;
    var a=setInterval(function () {
        date.setDate(date.getDate() + 1);
    if(i<days) {
        i++;
    }else {
        clearInterval(a);
    }

    setTimeout(function () {
        database.ref('/UserActivity/').push({
            user_id: user_id,
            action_id: login_id_a,
            context_id: login_id_c,
            date: date.toDateString(),
            points:"0",
            challenge_Badge:"0",
            context_badge:"0"
        });
    },1);

    setTimeout(function () {
        database.ref('/UserActivity/').push({
            user_id: user_id,
            action_id: post_id_a,
            context_id: post_id_c,
            date: date.toDateString(),
            points:"0",
            challenge_Badge:"0",
            context_badge:"0"
        });
    },4000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },8000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },12000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },16000);

    setTimeout(function () {
        database.ref('/UserActivity/').push({
            user_id: user_id,
            action_id: comment_id_a,
            context_id: feed_id_c,
            date: date.toDateString(),
            points:"0",
            challenge_Badge:"0",
            context_badge:"0"
        });
    },20000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },24000);

    setTimeout(function () {
        database.ref('/UserActivity/').push({
            user_id: user_id,
            action_id: like_id_a,
            context_id: feed_id_c,
            date: date.toDateString(),
            points:"0",
            challenge_Badge:"0",
            context_badge:"0"
        });
    },28000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },32000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },36000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },40000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },44000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },48000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },52000);






    },56000)
    return res.redirect(303,"done");
});


exports.addUserActivityB = functions.https.onRequest((req,res)=>{
    let days =parseInt( req.query.text);
    log("days: "+days);
    // user name : B
    let user_id="vJHDXoM1QtXWsWRdEDBBplvLyyp2";
    var date= new Date();
    //contexts id:
    //action id:
    let post_id_c="-Lbr-1NUNlyOVz4qRj2p";
    let post_id_a="-Lbr4afUT1Q8GM8Wfzhm";
    let commentMe_id_a="-LbvZ-DDBmNVfJkwqpws";
    let likeMe_id_a= "-LbvZ2ReJ1ZmcNcAS1gD";
    let unlikeME_id_a="-LbvZ9lVT2Nt1Y2u6_uT";

    let login_id_c ="-LbvUu_fYK9MPENSQYtj";
    let login_id_a="-LbvWSJ6Nb0S79-6jtsh";
    let invite_id_a ="-LbvWc8oL5zk-HCzaMaz";

    let profile_id_c="-LbvV5DHAybGUXNPS-0E";
    let following_id_a="-LbvWyZ2Di1p1jo3pOZR";
    let followers_id_a="-LbvX84LDLtxAgUSQ375";
    let unfollow_id_a="-LbvXSwreFP_tXRRn_m7";
    let unfollowME_id_a="-LbvXsMOsiiQ0yYn8dfp";

    let feed_id_c ="-LbvV8kDuZdkQM37TTNC";
    let comment_id_a="-LbvYT3xx6_xEKR7FDon";
    let like_id_a="-LbvYYqvdtNg7LsOK_Gy";
    let unlike_id_a="-LbvYcs-DRrCw3RJv8_5";

    //1 login, 4 post,2 comment,2 like, 2 following,2 followers, 1 likeMe. total: 14 actions per day
    var i=1;
    var a=setInterval(function () {
        date.setDate(date.getDate() + 1);
        if(i<days) {
            i++;
        }else {
            clearInterval(a);
        }

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: login_id_a,
                context_id: login_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },1);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },4000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },8000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },12000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },16000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: unlikeME_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },20000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },24000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },28000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },32000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },36000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },40000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },44000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },48000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },52000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },56000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },60000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },64000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },68000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },72000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },76000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },80000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },84000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },88000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },92000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },96000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },100000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },104000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },108000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: unfollowME_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },112000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },116000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },120000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },124000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },128000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },136000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },140000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },144000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },150000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },156000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },160000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },164000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },168000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },172000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },176000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },180000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },184000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },188000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },192000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },196000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },200000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },204000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },208000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },212000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },216000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },220000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },224000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },230000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },234000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },238000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },242000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },248000);


        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },252000);





    },260000)
    return res.redirect(303,"done");
});


exports.addUserActivityC = functions.https.onRequest((req,res)=>{
    let days =parseInt( req.query.text);
    log("days: "+days);
    let user_id="e9Y9mHG6kmXIIcgru2EuM6l5in43";
    var date= new Date();
    //contexts id:
    //action id:
    let post_id_c="-Lbr-1NUNlyOVz4qRj2p";
    let post_id_a="-Lbr4afUT1Q8GM8Wfzhm";
    let commentMe_id_a="-LbvZ-DDBmNVfJkwqpws";
    let likeMe_id_a= "-LbvZ2ReJ1ZmcNcAS1gD";
    let unlikeME_id_a="-LbvZ9lVT2Nt1Y2u6_uT";

    let login_id_c ="-LbvUu_fYK9MPENSQYtj";
    let login_id_a="-LbvWSJ6Nb0S79-6jtsh";
    let invite_id_a ="-LbvWc8oL5zk-HCzaMaz";

    let profile_id_c="-LbvV5DHAybGUXNPS-0E";
    let following_id_a="-LbvWyZ2Di1p1jo3pOZR";
    let followers_id_a="-LbvX84LDLtxAgUSQ375";
    let unfollow_id_a="-LbvXSwreFP_tXRRn_m7";
    let unfollowME_id_a="-LbvXsMOsiiQ0yYn8dfp";

    let feed_id_c ="-LbvV8kDuZdkQM37TTNC";
    let comment_id_a="-LbvYT3xx6_xEKR7FDon";
    let like_id_a="-LbvYYqvdtNg7LsOK_Gy";
    let unlike_id_a="-LbvYcs-DRrCw3RJv8_5";

    //1 login, 4 post,2 comment,2 like, 2 following,2 followers, 1 likeMe. total: 14 actions per day
    var i=1;
    var a=setInterval(function () {
        date.setDate(date.getDate() + 1);
        if(i<days) {
            i++;
        }else {
            clearInterval(a);
        }

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: login_id_a,
                context_id: login_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },1);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: post_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },4000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: commentMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },8000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },12000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },16000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: likeMe_id_a,
                context_id: post_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },20000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: unlike_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },24000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: unlike_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },28000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: following_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },32000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: followers_id_a,
                context_id: profile_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },36000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },40000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },44000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },48000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },52000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },56000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },60000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },64000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },68000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },72000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },76000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },80000);
        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: comment_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },84000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },88000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },92000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },96000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },100000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },104000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },108000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },112000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },116000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },120000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },124000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },128000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },132000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },136000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },140000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },144000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },148000);

        setTimeout(function () {
            database.ref('/UserActivity/').push({
                user_id: user_id,
                action_id: like_id_a,
                context_id: feed_id_c,
                date: date.toDateString(),
                points:"0",
                challenge_Badge:"0",
                context_badge:"0"
            });
        },155000);
    },160000)
    return res.redirect(303,"done");
});

exports.addUserActivityApp = functions.https.onCall((data, context) => {
    let arr = data.text.split("/");
    let user_id=arr[0];
    let action_id=arr[1];
    let context_id=arr[2];
    const date= new Date().toDateString();
    //console.log(date);
    //get the action count for the user
    return admin.database().ref('/UserActivity/').push({
        user_id: user_id ,
        action_id:action_id ,
        context_id:context_id,
        date:date,
        points:"0",
        challenge_Badge:"0",
        context_badge:"0"
    }).then((snap) => {
            return log("user id: " + user_id + "action_id" + action_id + "context_id" + context_id + "date: " + date);

    }).catch(function(error) {
        console.log("addUserActivityApp : Error deleting app:", error);
    });
    });


//RP function
exports.Rp=  functions.database.ref('/UserActivity/{userActivityID}').onCreate((snapshot,context) => {
    const userActivityID = context.params.userActivityID;
    //console.log("uerActivityID: "+uerActivityID);
    const data = snapshot.val();
    const action_id = data.action_id;
    const context_id = data.context_id;
    const user_id = data.user_id;
    const activityDate = data.date;
    let Action_count;
    //Rb(uerActivityID);

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
                    addPointsToUserActivity(points,userActivityID);
                    // was missing ; up here
                    // Adding points to user
                    database.ref('/Users/'+ user_id + '/Points/').once('value').then(function(pointsSnapshot){
                        var userPoints = pointsSnapshot.val();
                        userPoints=parseInt(userPoints) + parseInt(RpPoints);
                        log(userPoints);
                        database.ref('/Users/'+ user_id + '/Points/').set(userPoints.toString());

                        return null;
                     }).catch(function(error) {
                console.log("Error deleting app:", error);
            });

                    log("context_id");
                    log(context_id);
                    database.ref('/Users/'+user_id+'/ContextPoints/'+context_id+'/sumOfPoints/').once('value').then(function (pointsSnapshot) {
                       let userSumOfPoints = pointsSnapshot.val();
                        log("userSumOfPoints:");
                        log(userSumOfPoints);
                       if(userSumOfPoints === null){

                           database.ref('/Users/'+ user_id + '/ContextPoints/' + context_id).set({sumOfPoints: RpPoints.toString()});
                           // call Rb
                           Rb(userActivityID);

                       }else{

                           log("userSumOfPoints before:");
                           log(userSumOfPoints);
                           userSumOfPoints = parseInt(userSumOfPoints) + parseInt(RpPoints);
                           log("userSumOfPoints after:");
                           console.log(userSumOfPoints);
                           //sumOfPoints= parseInt(sumOfPoints) + parseInt(RpPoints);
                           database.ref('/Users/'+ user_id + '/ContextPoints/' + context_id).set({sumOfPoints: userSumOfPoints.toString()});
                           // call Rb
                           Rb(userActivityID);
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
         //console.log("Rb: userActivityJSON");
         //console.log(userActivityJSON);
    let user_id=userActivityJSON.user_id;

        //get user sum of points
         database.ref('/Users/'+user_id+'/').once('value').then( function(userSnap) {
             let userJSON=userSnap.val();
             //console.log("Rb:userJSON");
             //console.log(userJSON);
             let userPoints=userJSON.Points;
             let userBadges= userJSON.Badges;
             log("userBadges");
             log(userBadges);
             //console.log("Rb:userPoints: ");
             //console.log(userPoints);
             //get user's contextPoints
             // database.ref('/Users/'+user_id+'/ContextPoints/').once('value').then( function(contextPointsSnap) {
                 let contextPointsJSON=userJSON.ContextPoints;
                 console.log("Rb:contextPointsJSON");
                 console.log(contextPointsJSON);
                //get the badge rule table
                 database.ref('/Rb/').once('value').then( function(RbSnap) {
                     let RbJSON=RbSnap.val();
                     // console.log("Rb:RbJSON");
                     //console.log(RbJSON);

                     Object.keys(RbJSON).forEach(function (RbKey) {
                        let Rb_context= RbJSON[RbKey].context;
                         // log("Rb_context");
                         //log(Rb_context);
                        let Rb_points=RbJSON[RbKey].valueOfPoints;
                         // log("Rb_points");
                         //log(Rb_points);
                         let badge_id=RbJSON[RbKey].badge_id;
                         //let badgeFlag=false;
                         // eslint-disable-next-line promise/catch-or-return
                         new Promise(function(resolve, reject) {
                             Object.keys(userBadges).forEach((function (ubKey) {
                                if(ubKey===badge_id) {
                                    // badgeFlag= true
                                    resolve(true);
                                }
                             }));
                             resolve(false);
                         }).then(function (badgeFlag) {
                             log("badgeFlag");
                             log(badgeFlag);
                             if(!badgeFlag){
                                 //If the user is entitled to the badge then we will assign it to him else we'll delete the badge from the user's badges
                                 //case context is global
                                 if(Rb_context==="global"&&parseInt(userPoints)>=parseInt(Rb_points)){
                                     // log("give badge for global points");
                                     addBadgeToUser(user_id,badge_id);
                                     addBadgeToUserActivity(userActivityID, "context_badge");
                                 }else if(Rb_context!=="global"&& (typeof contextPointsJSON[Rb_context]!== 'undefined') &&(parseInt( contextPointsJSON[Rb_context].sumOfPoints)>=parseInt(Rb_points))   ){
                                     // log("give badge for specific context");
                                     addBadgeToUser(user_id,badge_id);
                                     addBadgeToUserActivity(userActivityID, "context_badge");
                                 }
                             }else if(Rb_context!=="global"&&(parseInt( contextPointsJSON[Rb_context].sumOfPoints)<parseInt(Rb_points))){
                                 //  log("take badge from user");
                                 database.ref('/Users/' + user_id +'/Badges/'+badge_id+'/').remove();
                             }
                             return;
                             });
                     });

                     return ;
                 }).catch(function (error) {
                     console.log("RbJSONBlock:Error deleting app inside catch:", error);
                 });

             //     return;
             // }).catch(function (error) {
             //     console.log("contextPointsJSONBlock:Error deleting app inside catch:", error);
             // });
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
    const userActivityID = context.params.userActivityID;
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
                                log("doneSnapshot.val");
                                log(val);
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


                    //challenge has been completed, we add the points and badge to the user
                    setTimeout(function () {
                        console.log("challengeComplete: " + challengeComplete);
                        if (challengeComplete) {
                            console.log("challengeComplete22: " + challengeComplete);
                            var points = challengeJSON[challengeId].points;
                            console.log("points!: ");
                            console.log(points);
                            var badge_id = challengeJSON[challengeId].badge_id;
                            console.log("badge!: ");
                            console.log(badge_id);
                            //add points to user
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
                            //add points to userActivity
                            addPointsToUserActivity(points, userActivityID);
                            addBadgeToUserActivity(userActivityID, "challenge_Badge");
                            Rb(userActivityID);
                            addBadgeToUser(user_id, badge_id);
                        }
                    },4000);
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
          //console.log("badgeJSON: ");
          //console.log(badgeJSON);

          let context_id = badgeJSON.context_id;

          let badgeName = badgeJSON.name;
          let photoUrl = badgeJSON.photoUrl;

          database.ref('/Users/' + user_id +'/Badges/'+badge_id+'/').set({context_id : context_id , name: badgeName, photoUrl:photoUrl});
          return;
      }).catch(function (error) {
          console.log("addBadgeToUser: Error deleting app:", error);
      });
  }

  function addPointsToUserActivity(points, userActivityID) {

      database.ref('/UserActivity/' + userActivityID + '/points').once('value').then(function (activityPointsSnapshot) {
          let activityPointsJSON = activityPointsSnapshot.val();
          let activityPoints = (parseInt(points) + parseInt(activityPointsJSON)).toString();
          database.ref('/UserActivity/' + userActivityID + '/points').set(activityPoints);
          console.log("activityPoints added: ");
          console.log(activityPoints);

          return;
      }).catch(function (error) {
          console.log("Error deleting app:", error);
      });

  }
//bType, type of badge: challenge_Badge OR context_badge
function addBadgeToUserActivity(userActivityID, bType) {

    database.ref('/UserActivity/' + userActivityID + '/' +bType).once('value').then(function (badgeSnap) {
        let activityPointsJSON = badgeSnap.val();
        let badgeCount = (1 + parseInt(activityPointsJSON)).toString();
        database.ref('/UserActivity/' + userActivityID + '/' +bType).set(badgeCount);
        console.log("badgeCount: ");
        console.log(badgeCount);

        return;
    }).catch(function (error) {
        console.log("Error deleting app:", error);
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
