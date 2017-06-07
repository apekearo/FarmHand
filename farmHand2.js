var config = {
    apiKey: "AIzaSyCbY-BQ0s-i-9iZKcfJHjnPXCRsDooHzcE",
    authDomain: "kopperlfarmhand-1492557353717.firebaseapp.com",
    databaseURL: "https://kopperlfarmhand-1492557353717.firebaseio.com",
    projectId: "kopperlfarmhand-1492557353717",
    storageBucket: "kopperlfarmhand-1492557353717.appspot.com",
    messagingSenderId: "954578208640"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected");
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  'size': 'invisible',
  'callback': function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
connectionsRef.on("value", function(snap) {
$("#connected-viewers").html(snap.numChildren());
});

  var firstName = "";
  var lastName = "";
    var email = "";
    var phone = 0;
    var skills = "";

    // Capture Button Click
    $("#add-user").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      firstName = $("#firstName-input").val().trim();
      lastName = $("#lastName-input").val().trim();
      email = $("#email-input").val().trim();
      phone = $("#phone-input").val().trim();
      skills = $("#skills-input").val().trim();

      database.ref().set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        skills: skills
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val().firstName);
            console.log(snapshot.val().lastName);

      console.log(snapshot.val().email);
      console.log(snapshot.val().phone);
      console.log(snapshot.val().skills);

      // Change the HTML to reflect
      $("#firstName-display").html(snapshot.val().firstName);
      $("#lastName-display").html(snapshot.val().lastName);
      $("#email-display").html(snapshot.val().email);
      $("#phone-display").html(snapshot.val().phone);
      $("#skills-display").html(snapshot.val().skills);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });