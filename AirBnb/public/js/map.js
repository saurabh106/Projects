//To display map on webpage using mapbox
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', //style url
    center: listing.geometry.coordinates, //starting positon[lng,lat]
    zoom: 9,
});


console.log(listing.geometry.coordinates); // Should output [lng, lat]



//For the makrer on map and popup for popup on map
const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat( listing.geometry.coordinates) //Lisitng.geometry.coordinates
    .setPopup(new mapboxgl.Popup({ offset: 25})
        .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`))
    .addTo(map);
