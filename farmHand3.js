// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCbY-BQ0s-i-9iZKcfJHjnPXCRsDooHzcE",
    authDomain: "kopperlfarmhand-1492557353717.firebaseapp.com",
    databaseURL: "https://kopperlfarmhand-1492557353717.firebaseio.com",
    projectId: "kopperlfarmhand-1492557353717",
    storageBucket: "kopperlfarmhand-1492557353717.appspot.com",
    messagingSenderId: "954578208640"
  };
firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

var uid;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

var trainData = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
// 3. Button for adding trains
$("#add-user").on("click", function() {

  // Grabs user input
 var firstName = $("#firstName-input").val().trim();
 var lastName = $("#lastName-input").val().trim();
 var email = $("#email-input").val().trim();
  var phone = $("#phone-input").val().trim();
  var skills = $("#skills-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {

        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        skills: skills
  };

  // Uploads train data to the database
  trainData.ref().child(uid).push(newTrain);

  // Logs everything to console
  console.log(newTrain.firstName);
  console.log(newTrain.skills);
  console.log(newTrain.phone);
  

  // Alert
  alert("User Logged Properly!");

  // Clears all of the text-boxes
  $("#firstName-display").val("");
  $("#lastName-display").val("");
  $("#email-display").val("");
  $("#phone-display").val("");
  $("#skills-display").val("");

  // Determine when the next train arrives.
  return false;
});

// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
  var user = childSnapshot.val();
  var data = Object.values(user);

  for(var i = 0; i < data.length; i++) {
        var tfirstName = data[i].firstName;
  var tlastName = data[i].lastName;
  var temail = data[i].email;
  var tphone = data[i].phone;
  var tskills = data[i].skills;
      $("#profileTable > tbody").append("<tr><td>" + tfirstName + "</td><td>" + tlastName + "</td><td>"
  + temail + "</td><td>" + tphone + "</td><td>" + tskills + "</td></tr>");
  }
  // Store everything into a variable.

  // Calculate the minutes until arrival using hardcore math
  // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
  // and find the modulus between the difference and the frequency.
          // var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
          // var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
          // var tMinutes = tFrequency - tRemainder;

          // // To calculate the arrival time, add the tMinutes to the currrent time
          // var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

          // console.log(tMinutes);
          // console.log(tArrival);
          // console.log(moment().format("hh:mm A"));
          // console.log(tArrival);
          // console.log(moment().format("X"));

  // Add each train's data into the table
});

// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? ( Let's use our brains first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Let's use our brains first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21
