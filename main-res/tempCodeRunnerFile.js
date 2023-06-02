function fetchAddressesAndCreateMarkers(map) {
//   const addressesRef = ref(database, "listings");
  
//   // Listen for changes in the addresses data
//   onValue(addressesRef, (snapshot) => {
//     // Clear existing markers
//     markers.forEach((marker) => {
//       marker.setMap(null);
//     });
//     markers = [];

//     // Get all the addresses
//     const addresses = snapshot.val();

//     // Iterate over the addresses and create markers on the map
//     for (const key in addresses) {
//       const address = addresses[key];
//       const latLng = new google.maps.LatLng(address.lat, address.lng);
      
//       // Create a marker for each address
//       const marker = new google.maps.Marker({
//         position: latLng,
//         map: map,
//         title: address.title
//       });

//       // Add the marker to the markers array
//       markers.push(marker);
//     }
//   });
// }
