// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)
var userCurrentLocation;
// Initialize Firebase
navigator.geolocation.getCurrentPosition(function(position) {
    userCurrentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    }
    console.log(position);
    // do_something(position.coords.latitude, position.coords.longitude);
});

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
    alert("error " + errorMessage)
        // ...
});

/**
Deprecated - why   because dondt need auth changed, because it doesn't matt
whether or not somoneone is signed in
*/
// var uid;

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var isAnonymous = user.isAnonymous;
//     uid = user.uid;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
//   // ...
// });

var trainData = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
// 3. Button for adding trains
$("#add-user").on("click", function() {

    // Grabs user input
    var fnInput = $("#firstName-input");
    var firstName = fnInput.val().trim();
    console.log(firstName)
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
    trainData.ref().child('users').child('+1' + phone).push(newTrain);

    // Logs everything to console
    console.log(newTrain.firstName);
    console.log(newTrain.skills);
    console.log(newTrain.phone);


    // Alert
    alert("User Logged Properly!");

    // Clears all of the text-boxes
    fnInput.val("");
    $("#lastName-input").val("");
    $("#email-input").val("");
    $("#phone-input").val("");
    $("#skills-input").val("");

    // Determine when the next train arrives.
    return false;
});

// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
// var userRef= firebase.database().ref("user").push();
// var geoFire= new GeoFire(firebaseRef.child("geofire"));
// geoFire.set(userLocation, [<lat>,<long>]).then(function() {
//  console.log(“Location added”)
//  }).catch(function(error) {
//  console.log(error);
//  });


var j = 0;

$(document).on( 'click', 'tr', function() {
    console.log($(this).data('j'));
    $("#modal" + $(this).data('j')).modal("toggle");
    // $("#profileTable").append("")
})
trainData.ref().child('users').on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
    var user = childSnapshot.val();
    var data = Object.values(user);
    console.log(data, 'data');
    j++;
    for (var i = 0; i < data.length; i++) {
        var tfirstName = data[i].firstName;
        var tlastName = data[i].lastName;
        var temail = data[i].email;
        var tphone = data[i].phone || data[i].From;
        var tskills = data[i].skills;

        // + data-index = i +
        $("body").append('<div class="modal" id="modal' + j + '" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"> '+temail + '<button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

        $("#profileTable > tbody").append('<tr data-j="' + j + '" id="row' + i + '">' + '<td>' +
            tfirstName + "</td><td>" + tlastName + "</td><td>" +
            temail + "</td><td>" + tphone + "</td><td>" + tskills +
            "</td></tr>")





    }
});

// $("#profileTable > tbody").append('<tr id="modal'+i+'">'
//     + '<div class="modal">'
//   + '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' 
//   + '<button type="button" class="close" data-dismiss="modal">'
//   + '&times;</button><h4 class="modal-title">Modal Header</h4>'
//   + '</div><div class="modal-body"><p>Some text in the modal.</p>'
//   + '</div><div class="modal-footer">'
//   + '<button type="button" class="btn btn-default" data-dismiss="modal">'
//   + 'Close</button></div></div></div></div><td>'
//    + tfirstName + "</td><td>" + tlastName + "</td><td>"
//   + temail + "</td><td>" + tphone + "</td><td>" + tskills
//    + "</td></tr>").on('click', function(){
//     $("#modal0").modal("show");
//     // $("#profileTable").append("")
//   })


//   }
//  });

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
            lat: -28.024,
            lng: 140.887
        }
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}
var locations = [{
    lat: -31.563910,
    lng: 147.154312
}, {
    lat: -33.718234,
    lng: 150.363181
}, {
    lat: -33.727111,
    lng: 150.371124
}, {
    lat: -33.848588,
    lng: 151.209834
}, {
    lat: -33.851702,
    lng: 151.216968
}, {
    lat: -34.671264,
    lng: 150.863657
}, {
    lat: -35.304724,
    lng: 148.662905
}, {
    lat: -36.817685,
    lng: 175.699196
}, {
    lat: -36.828611,
    lng: 175.790222
}, {
    lat: -37.750000,
    lng: 145.116667
}, {
    lat: -37.759859,
    lng: 145.128708
}, {
    lat: -37.765015,
    lng: 145.133858
}, {
    lat: -37.770104,
    lng: 145.143299
}, {
    lat: -37.773700,
    lng: 145.145187
}, {
    lat: -37.774785,
    lng: 145.137978
}, {
    lat: -37.819616,
    lng: 144.968119
}, {
    lat: -38.330766,
    lng: 144.695692
}, {
    lat: -39.927193,
    lng: 175.053218
}, {
    lat: -41.330162,
    lng: 174.865694
}, {
    lat: -42.734358,
    lng: 147.439506
}, {
    lat: -42.734358,
    lng: 147.501315
}, {
    lat: -42.735258,
    lng: 147.438000
}, {
    lat: -43.999792,
    lng: 170.463352
}]