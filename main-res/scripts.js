document.addEventListener("DOMContentLoaded", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
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

      // Fetch addresses from Firebase and create markers
      function fetchAddressesAndCreateMarkers(map) {
        const database = getDatabase(app);
        const listingsRef = ref(database, "listings");

        // Listen for changes
        onValue(listingsRef, (snapshot) => {
          // Clear existing markers
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          markers = [];

          // Get all the listings
          const listings = snapshot.val();

          // Iterate over the listings and create markers on the map
          for (const userId in listings) {
            const listing = listings[userId];
            const latLng = new google.maps.LatLng(listing.pinLat, listing.pinLng);

            // Create a marker for each listing address
            const marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: listing.address
            });

            // Add the marker to the markers array
            markers.push(marker);
          }
        });
      }

      var markers = [];
      fetchAddressesAndCreateMarkers(map);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  fetchAddressesAndCreateMarkers(map);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyB-vWKWiTqYfYwjIIcd_1W1_BLSuibzTb4",
  authDomain: "food4all-427ea.firebaseapp.com",
  projectId: "food4all-427ea",
  databaseURL: "https://food4all-427ea-default-rtdb.firebaseio.com",
  storageBucket: "food4all-427ea.appspot.com",
  messagingSenderId: "842713498087",
  appId: "1:842713498087:web:3e5baf4e9a169d0a23bd42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


const donateBtn = document.getElementById('donate-button');

donateBtn.addEventListener('click', function (event) {
  event.preventDefault();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.alert("You are not login. Please login or create an account to continue.");
      window.location.href = "res/signup.html";
    }
    else{
      window.alert("You can safely donate now.");
      window.location.href = "res/donate.html";
    }    
  });
});
