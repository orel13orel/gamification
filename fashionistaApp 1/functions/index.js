

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


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref.toString());
    });
});


// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

exports.addPointToSet = functions.https.onRequest((req,res)=>{
    const point = req.query.text;

    return admin.database().ref('/Points').push({point: point}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref.toString());
    });
});

exports.addBadgeToSet=functions.https.onRequest((req,res)=>{
    var temp=req.query.text.split(",");
    const  caption=temp[0];
    const photoUrl = temp[1];
    return admin.database().ref('/Badges').push({caption: caption , photoUrl: photoUrl}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref.toString());
    });
});

//receives existing context id and new action name, return the new action id
exports.addAction = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let context_id=arr[0];
    let action_name=arr[1];
    console.log("arr : "+arr);
    console.log("context id : "+context_id);
    console.log("action name : "+action_name);
    return admin.database().ref('/Rp/Context/'+context_id.toString()+'/////Action').push({name: action_name}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        let arr2=snapshot.toString().split("/");
        console.log("arr2 : "+arr2);
        console.log("action id : "+arr2[5]);
        return res.redirect(303, arr2[5]);
    });
});


//receives new context name, return the context id
exports.addContextToSet = functions.https.onRequest((req,res)=>{
    const context = req.query.text;

    return admin.database().ref('/Rp/Context').push({name: context}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        //console.log(snapshot);

        let arr=snapshot.toString().split("/");

        let context_id=arr[5];
       // console.log(context_id);
        return res.redirect(303, context_id);
    });
});

//
exports.addRule = functions.https.onRequest((req,res)=>{
    let arr = req.query.text.split("/");
    let context_id=arr[0];
    let action_id=arr[1];
    let from=arr[2];
    let to =arr[3];
    let point_id=arr[4];

    return admin.database().ref('/Rp/Context/'+context_id.toString()+'/////Action/'+action_id.toString()+'/////Rule').push({from: from , to:to , points: point_id}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        let arr2=snapshot.toString().split("/");
        console.log("context_id =" + context_id);
        console.log("action_id =" + action_id);
        console.log("from =" + from);
        console.log("to =" + to);
        console.log("point_id =" + point_id);

        console.log("arr2 : "+arr2);
        console.log("rule id : "+arr2[9]);
        return res.redirect(303, arr2[9]);
    });
});


// // Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
// exports.addMessage2 = functions.https.onCall((data, context) => {
//     // Message text passed from the client.
//     const text = data.text;
// // Authentication / user information is automatically added to the request.
//     const uid = context.auth.uid;
//     const name = context.auth.token.name || null;
//     const picture = context.auth.token.picture || null;
//     const email = context.auth.token.email || null;
//
//     // Checking attribute.
//     if (!(typeof text === 'string') || text.length === 0) {
//         // Throwing an HttpsError so that the client gets the error details.
//         throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
//             'one arguments "text" containing the message text to add.');
//     }
// // Checking that the user is authenticated.
//     if (!context.auth) {
//         // Throwing an HttpsError so that the client gets the error details.
//         throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
//             'while authenticated.');
//     }
//
//
//     // Saving the new message to the Realtime Database.
//     const sanitizedMessage = sanitizer.sanitizeText(text); // Sanitize the message.
//     return admin.database().ref('/messages').push({
//         text: sanitizedMessage,
//         author: { uid, name, picture, email },
//     }).then(() => {
//         console.log('New Message written');
//         // Returning the sanitized message to the client.
//         return { text: sanitizedMessage };
//     })
//
//
//
//
// });

// exports.addMessage3 = functions.https.onCall((data, context) => {
//
//     const mac = data.text;
//     console.log(data);
//
//
//
//     //add MAC to table
//     admin.database().ref('/MAC').push({context: mac});
//
//
//     return admin.database().ref('/MAC').push({context: mac}).then((snapshot) => {
//         console.log('New Message written');
//         return{text: 'New Message written'}
//     });
// });



