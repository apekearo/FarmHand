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
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }
    initMap(userCurrentLocation.lat, userCurrentLocation.lng)
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
    var car = $(".car-input").val();
    var jobLocation = $(".jobLocation").val().trim();
    var type = $("input[name='type']:checked").val();

    // Creates local "temporary" object for holding train data
    var newTrain = {

        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        skills: skills,
        car: car,
        jobLocation: jobLocation,
        type: type,
        lat:userCurrentLocation.lat,
        lng:userCurrentLocation.lng
    };

    // Uploads train data to the database
    trainData.ref().child('users').child(type).child('+1' + phone).push(newTrain);

    // Logs everything to console
    console.log(newTrain.firstName);
    console.log(newTrain.skills);
    console.log(newTrain.phone);
    console.log(newTrain.car);


    // Alert
    alert("User Logged Properly!");

    // Clears all of the text-boxes
    fnInput.val("");
    $("#lastName-input").val("");
    $("#email-input").val("");
    $("#phone-input").val("");
    $("#skills-input").val("");
    $(".car-input").val("");
    $(".jobLocation").val("");
    $(".type").val("");

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

$(document).on('click', 'tr', function() {
    console.log($(this).data('j'));
    $("#modal" + $(this).data('j')).modal("toggle");
    // $("#profileTable").append("")
})

// $('#employee').on('click', function() {
//   getData('employee')
// })
// function getData(node) {
//   // Get data from firebase based on the node
//   trainData.ref().child(node).on("child_added", function(childSnapshot, prevChildKey){
//     // Show the data on html
//   })
// }
// value instead of childadded
function reloadTable(type) {

    // trainData.ref().child('users').child('employee').off();
    // trainData.ref().child('users').child('employer').off();
    trainData.ref().child('users').child(type).on("value", function(childSnapshot, prevChildKey) {

        $("#profileTable > tbody").empty();
        $('.modal').remove();
        locations= [];
        console.log(childSnapshot.val());
        var user = childSnapshot.val();
        var data = Object.values(user);
        console.log(data, 'data');
        var realData = [];
        data.forEach(item => {
          var value = Object.values(item);
          realData = realData.concat(value);
        });
        console.log(realData);
        for (var i = 0; i < realData.length; i++) {
            var infoObject
            var tfirstName = realData[i].firstName;
            var tlastName = realData[i].lastName;
            var temail = realData[i].email;
            var tphone = realData[i].phone || data[i].From;
            var tskills = realData[i].skills;
            var tcar = realData[i].car;
            var tjobLocation = realData[i].jobLocation;
            var ttype = realData[i].type;
            var lat = realData[i].lat;
            var lng = realData[i].lng 

            locations.push({lat, lng})
            // + data-index = i +
            $("body").append('<div class="modal" id="modal' + i + '" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"> ' + tfirstName + tlastName + '<button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">' + tphone + '<br>' + temail + tcar + tjobLocation + '</h4></div><div class="modal-body"><p>' + tskills + '</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

            $("#profileTable > tbody").append('<tr data-j="' + i + '" id="row' + i + '">' + '<td>' +
                tfirstName + "</td><td>" + tlastName + tjobLocation + "</td><td>" + tskills +
                "</td></tr>")
            // throw an if state ment for the emailinput and other map location
        }

            initMap(userCurrentLocation.lat, userCurrentLocation.lng);
    });
}


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
// initMap(lat, lon, 'modalMap')
function initMap(lat, lon, mapID = "map") {

    var map = new google.maps.Map(document.getElementById(mapID), {
        zoom: 3,
        center: {
            lat: lat || -28.024,
            lng: lon || 140.887
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
var locations = []