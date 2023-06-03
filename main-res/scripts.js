var map;
document.addEventListener("DOMContentLoaded", function () {
  // var map;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 15,
        // hide all controls
        mapTypeControlOptions: {
          mapTypeIds: []
        }
      });
      map.setOptions({ zoomControl: false, streetViewControl: false, fullscreenControl: false, mapTypeControl: false });

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
        radius: 80
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
  // show loc on map - finally works!
  function showLocationOnMap(lat, lng) {
    map.setCenter({ lat: lat, lng: lng });
  }
  // fetchAddressesAndCreateMarkers(map); // Not needed?

  // search stuff
  var searchInput = document.getElementById("search-input");
  var searchButton = document.getElementById("button-addon");
  searchButton.addEventListener("click", function () {
    // Get search query from input field
    var searchQuery = searchInput.value;

    // Perform geocoding -> coords
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        // Gets lat long
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();

        // Center the map on the search location
        map.setCenter({ lat: lat, lng: lng });

        // Add a marker for the search location
        var marker = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          map: map,
          title: "Search Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#FF0000",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2
          }
        });
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  });

});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


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
    else {
      window.alert("You can safely donate now.");
      // window.location.href = "res/donate.html";
      //  "width=" + width + ",height=" + height
      window.open("res/donate.html", "Donata", "width=900,height=800,scrollbars=yes");

    }
  });
});


//user name display
function displayName() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      document.getElementById('user-name').innerHTML = "Not logged in";
      const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
      welcomeModal.show();

    } else {
      document.getElementById('logout-button').innerHTML = "Logout";
      var currentUser = auth.currentUser;
      var usernameRef = ref(database, 'users/' + currentUser.uid + '/name');
      get(usernameRef)
        .then((snapshot) => {
          document.getElementById('user-name').innerHTML = snapshot.val();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
}
displayName();

//logout button
const logoutBtn = document.getElementById('logout-button');
logoutBtn.addEventListener('click', function (event) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // window.alert("You are not login. Please login or create an account to continue.");
      window.location.href = "res/signup.html";
    }
    else {
      signOut(auth)
        .then(() => {
          // window.location.href = "./../index.html";
          // window.location.reload(true);
          window.alert("You have been logged out.");
          // window.location.href = "res/signup.html";
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });


})

// Fetch listings from Firebase and create listing items
function fetchListingsAndCreateItems() {
  const database = getDatabase(app);
  const listingsRef = ref(database, "listings");

  // Listen for changes
  onValue(listingsRef, (snapshot) => {
    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = ""; // Clear existing listing items

    // Get all the listings
    const listings = snapshot.val();

    // Iterate over the listings and create listing items
    for (const userId in listings) {
      const listing = listings[userId];
      var formattedExpiry = new Date(listing.expiry).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });

      // Create listing item HTML
      const listingItem = document.createElement("div");
      listingItem.classList.add("listing-item");
      listingItem.innerHTML = `
        <div class="listing-details">
          <div class="listing-icon">
          <h3><i class="bi bi-geo-alt-fill">  </i>${listing.address}</h3>
          </div>
          <p><i class="bi bi-telephone"></i> <a href=tel:${listing.number}>${listing.number}</a></p>
          <p><i class="fa-solid fa-bell-concierge"></i> ${listing.food}</p>
          <p><i class="bi bi-people"></i> ${listing.quantity} servings</p>
          <p><i class="bi bi-stopwatch"></i> ${formattedExpiry}</p>
        </div>
      `;

      // Add event listener to show location on map when clicked
      const pinIcon = listingItem.querySelector(".listing-icon");
      pinIcon.addEventListener("click", function () {
        map.setCenter({ lat: listing.pinLat, lng: listing.pinLng, }, 20)
        // showLocationOnMap(listing.pinLat, listing.pinLng);
      });

      // Append the listing item to the container
      listingsContainer.appendChild(listingItem);
    }
  });
}

// Fetch listings and create listing items
fetchListingsAndCreateItems();


// Button repositioning
