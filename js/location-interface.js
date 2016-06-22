var map;
var infowindow;
// var service;

function initMap() {
    var pyrmont = {
        lat: -33.867,
        lng: 151.195
    };
    console.log("I AM A LOG");
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 1000,
        types: ['store']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
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
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
//This part is for Geolocation, to find user's location. locatUser is called upon button click.
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
