//initialize firebase

var config = {
    apiKey: "AIzaSyCbY-BQ0s-i-9iZKcfJHjnPXCRsDooHzcE",
    authDomain: "kopperlfarmhand-1492557353717.firebaseapp.com",
    databaseURL: "https://kopperlfarmhand-1492557353717.firebaseio.com",
    projectId: "kopperlfarmhand-1492557353717",
    storageBucket: "kopperlfarmhand-1492557353717.appspot.com",
    messagingSenderId: "954578208640"
  };
  firebase.initializeApp(config);
  var database= firebase.database();


// im trying to make the newUserForm connect to the employeesProfile
	// document.getElementsById("#submit").onclick=submitProfile();

$(document).ready(function(){
	$("form").on('submit', submitProfile);

	function submitProfile(event) {
		event.preventDefault();
		console.log("im here");
	firstName = $("#firstName-input").val().trim();
	lastName=$("#lastName-input")
      email = $("#email-input").val().trim();
      hasCar = $("hasCar").val().trim();
      hourly = $("#hourly").val().trim();

      database.ref().set({
        name: name,
        email: email,
        age: age,
        comment: comment});}

		// var firstName= document.getElementsByName("firstName");
		// var lastName= document.getElementsByName("lastName");
		// var hasCar= document.getElementsByName("hasCar");
		// var noCar= document.getElementsByName("noCar");
		// var hourly= document.getElementById("hourly");
		console.log($("#firstName").val())
		if ($("#firstName").val()){
			console.log("im also here");
		}
			
		

	})
console.log($("#lastName").val())
		if ($("#lastName").val()){
			console.log("im also here");
		}
		
			
		

	

		// $('input[type=text]').each(function(){
  //    var text_value=$(this).val();
  //    if(text_value!='')
  //      {
  //       console.log('Value exist');
  //       }


				// }
   // })
//       var map, infoWindow;

// function initMap() {

//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 3,
//           center: new google.maps.LatLng(2.8,-187.3),});
//         infoWindow = new google.maps.InfoWindow;
//           // Create a <script> tag and set the USGS URL as the source.
//         var script = document.createElement('script');
//         // This example uses a local copy of the GeoJSON stored at
//         // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//         script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
//         document.getElementsByTagName('head')[0].appendChild(script);
//         }

//         // Create an array of alphabetical characters used to label the markers.
//         var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//         // Add some markers to the map.
//         // Note: The code uses the JavaScript Array.prototype.map() method to
//         // create an array of markers based on a given "locations" array.
//         // The map() method here has nothing to do with the Google Maps API.
//         //   window.eqfeed_callback = function(results) {
//         // for (var i = 0; i < results.features.length; i++) {
//         //   var coords = results.features[i].geometry.coordinates;
//         //   var latLng = new google.maps.LatLng(coords[1],coords[0]);
//         //   var marker = new google.maps.Marker({
//         //     position: latLng,
//         //     map: map
//         //   });
//         // }
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             infoWindow.open(map);
//             map.setCenter(pos);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           // handleLocationError(false, infoWindow, map.getCenter());
        
      
      
//         var markers = locations.map(function(location, i) {
//           return new google.maps.Marker({
//             position: location,
//             label: labels[i % labels.length]
//           });
//         });

//         // Add a marker clusterer to manage the markers.
//         var markerCluster = new MarkerClusterer(map, markers,
//             {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//       }    
//       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
//         infoWindow.open(map);
//       }
//       var locations = [
//         {lat: -31.563910, lng: 147.154312},
//         {lat: -33.718234, lng: 150.363181},
//         {lat: -33.727111, lng: 150.371124},
//         {lat: -33.848588, lng: 151.209834},
//         {lat: -33.851702, lng: 151.216968},
//         {lat: -34.671264, lng: 150.863657},
//         {lat: -35.304724, lng: 148.662905},
//         {lat: -36.817685, lng: 175.699196},
//         {lat: -36.828611, lng: 175.790222},
//         {lat: -37.750000, lng: 145.116667},
//         {lat: -37.759859, lng: 145.128708},
//         {lat: -37.765015, lng: 145.133858},
//         {lat: -37.770104, lng: 145.143299},
//         {lat: -37.773700, lng: 145.145187},
//         {lat: -37.774785, lng: 145.137978},
//         {lat: -37.819616, lng: 144.968119},
//         {lat: -38.330766, lng: 144.695692},
//         {lat: -39.927193, lng: 175.053218},
//         {lat: -41.330162, lng: 174.865694},
//         {lat: -42.734358, lng: 147.439506},
//         {lat: -42.734358, lng: 147.501315},
//         {lat: -42.735258, lng: 147.438000},
//         {lat: -43.999792, lng: 170.463352}
//       ];
	

