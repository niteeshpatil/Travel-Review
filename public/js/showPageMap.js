mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campData, // starting position [lng, lat]
    zoom: 2 // starting zoom
});


map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campData)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${lt}</h3><p>${lc}</p>`
            )
    )
    .addTo(map)