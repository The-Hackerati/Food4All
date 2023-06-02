document.addEventListener("DOMContentLoaded", function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 15
      });

      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: "Your Location",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2
        }
      });

      var circle = new google.maps.Circle({
        strokeColor: "#4285F4",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: "#4285F4",
        fillOpacity: 0.2,
        map: map,
        center: { lat: lat, lng: lng },
        radius: 80 // Adjust the radius as needed
      });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});