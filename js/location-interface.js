// Right now it is initializing the dispensary map on page load. once button is clicked, it loads geolocation map centered around user's location, but no other markers.
var map;
var infoWindow;
var service;
var marker;
var pos;


//Map #1: .
function initialize() {
  var mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false,
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      infoWindow = new google.maps.InfoWindow({map: map, position: pos, content: 'You Are Here'});

      var request = {location:pos, radius:5000, keyword: ['dispensary']};

      map.setCenter(pos);

      infoWindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request,callback);

    },

    function(){
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }
}
google.maps.event.addDomListener(window, 'load', initialize);

//End Map #1//








//Map #2: This map will initialize centered on Portland and will display nearest dispensaries within 1000 meters of the central location.

// function initMap() {
//     var portland = {
//         lat: 45.5231,
//         lng: -122.6765
//     };
//     console.log("I AM A LOG");
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: portland,
//         zoom: 15
//     });
//
//     infowindow = new google.maps.InfoWindow();
//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: portland,
//         radius: 1000,
//         keyword: ['dispensary']
//     }, callback);
// }
//
// function callback(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//     }
// }
//
// function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });
//
//     google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent(place.name);
//         infowindow.open(map, this);
//     });
// }

//End Map #2//

//Map #3: This map will display user location with a blue circle around it.//
// function writeAddressName(latLng) {
//     var geocoder = new google.maps.Geocoder();
//     geocoder.geocode({
//             "location": latLng
//         },
//         function(results, status) {
//             if (status == google.maps.GeocoderStatus.OK)
//                 document.getElementById("address").innerHTML = results[0].formatted_address;
//             else
//                 document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
//         });
// }
//
// function geolocationSuccess(position) {
//     var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//     // Write the formatted address
//     writeAddressName(userLatLng);
//     var myOptions = {
//         zoom: 16,
//         center: userLatLng,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     // Draw the map
//     var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
//     // Place the marker
//     new google.maps.Marker({
//         map: mapObject,
//         position: userLatLng
//     });
//     Draw a circle around the user position to have an idea of the current localization accuracy
//     var circle = new google.maps.Circle({
//       center: userLatLng,
//       radius: position.coords.accuracy,
//       map: mapObject,
//       fillColor: '#0000FF',
//       fillOpacity: 0.5,
//       strokeColor: '#0000FF',
//       strokeOpacity: 1.0
//     });
//     mapObject.fitBounds(circle.getBounds());
// }
//
// function geolocationError(positionError) {
//     document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
// }
//
// function geolocateUser() {
//     // If the browser supports the Geolocation API
//     if (navigator.geolocation) {
//         var positionOptions = {
//             enableHighAccuracy: true,
//             timeout: 10 * 1000 // 10 seconds
//         };
//         navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
//     } else
//         document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
// }
//
// window.onload = geolocateUser;

// END map #3//







//Map #4: This map only initializes the map showing user's current location on button click from HTML (will need to be commented back in for this map to work.)//
//
// $(document).ready(function() {
//   $('#locateUser').click(locateUser);
// });
//
// function locateUser() {
//   if (navigator.geolocation){
//     var positionOptions = {
//       enableHighAccuracy: true,
//       timeout: 10 * 1000
//     };
//     navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
//   }
//   else {
//     alert("Your browser doesn't support the Geolocation API");
//   }
// }
//
// function geolocationSuccess(position) {
//
//   var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//
//   var myOptions = {
//     zoom : 16,
//     center : userLatLng,
//     mapTypeId : google.maps.MapTypeId.ROADMAP
//   };
//
//   var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
//
//   new google.maps.Marker({
//     map: mapObject,
//     position: userLatLng
//   });
// }
//
// function geolocationError(positionError) {
//   alert(positionError);
// }

//End Map #4//
