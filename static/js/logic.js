// Store our API endpoint inside queryUrl
var queryEarthquakeUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var queryFaultlineUrl = "../data/PB2002_plates.json";

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 15000;
}

// Perform a GET request to the query URL
d3.json(queryEarthquakeUrl, function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data);
  createFeatures(data.features);
  //Get faultline data
});

function createFeatures(earthquakeData) {
  // Define arrays to hold created earthquake and fault line markers
  var earthquakeMarkers = [];
  // var faultlineMarkers = [];

  // Loop through earthquakeData and create city and state markers
  for (var i = 0; i < earthquakeData.length; i++) {
    // Conditionals for earthquake magnitiute and colour
    var color = "";
    if (earthquakeData[i].properties.mag > 5) {
      color = "#F06B6B";
    } else if (earthquakeData[i].properties.mag > 4) {
      color = "#F0A76B";
    } else if (earthquakeData[i].properties.mag > 3) {
      color = "#F3BA4D";
    } else if (earthquakeData[i].properties.mag > 2) {
      color = "#F3DB4D";
    } else if (earthquakeData[i].properties.mag > 1) {
      color = "#E1F34D";
    } else {
      color = "#B7F34D";
    }
    //STEP 2 - TODO
    // Setting the marker radius for the faultline by passing magnitude into the markerSize function
    // faultlineMarkers.push(
    //   L.circle(earthquakeData[i].coordinates, {
    //     stroke: false,
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: "white",
    //     radius: markerSize(earthquakeData[i].state.mag)
    //   })
    // );
    // console.log(earthquakeData[i].geometry.coordinates);
    // Setting the marker radius for the earthquake by passing magnitude into the markerSize function
    earthquakeMarkers.push(
      L.circle(earthquakeData[i].geometry.coordinates.slice(0, 2).reverse(), {
        stroke: true,
        weight: 0.25,
        fillOpacity: 0.75,
        color: "grey",
        fillColor: color,
        radius: markerSize(earthquakeData[i].properties.mag),
      }).bindPopup(
        "<h3>" +
          earthquakeData[i].properties.place +
          "</h3><hr><p><b>Time: </b>" +
          new Date(earthquakeData[i].properties.time) +
          "</p>" +
          "<p><b>Magnitude: </b>" +
          earthquakeData[i].properties.mag +
          "</p>"
      )
    );
  }

  // Create base layers

  // Satellite Map Layer
  var satellite = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "satellite-streets-v11",
      accessToken: API_KEY,
    }
  );

  // Outdoor Map Layer
    var outdoors = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "outdoors-v11",
      accessToken: API_KEY,
    }
  );

  // Grayscale Map Layer
  var grayscale = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY,
    }
  );
  
  // OTHER MAP LAYER OPTIONS

    // var streetmap = L.tileLayer(
  //   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  //   {
  //     attribution:
  //       "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //     tileSize: 512,
  //     maxZoom: 18,
  //     zoomOffset: -1,
  //     id: "mapbox/streets-v11",
  //     accessToken: API_KEY,
  //   }
  // );

  // var darkmap = L.tileLayer(
  //   "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  //   {
  //     attribution:
  //       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     maxZoom: 18,
  //     id: "dark-v10",
  //     accessToken: API_KEY,
  //   }
  // );

  // var googleSat = L.tileLayer(
  //   "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  //   {
  //     maxZoom: 20,
  //     subdomains: ["mt0", "mt1", "mt2", "mt3"],
  //   }
  // );

  // var googleHybrid = L.tileLayer(
  //   "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  //   {
  //     maxZoom: 20,
  //     subdomains: ["mt0", "mt1", "mt2", "mt3"],
  //   }
  // );

  // var googleTerrain = L.tileLayer(
  //   "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  //   {
  //     maxZoom: 20,
  //     subdomains: ["mt0", "mt1", "mt2", "mt3"],
  //   }
  // );

  // Create two separate layer groups: one for earthquakes and one for fault lines
  // var faultLines = L.layerGroup(faultlineMarkers);
  var earthquakes = L.layerGroup(earthquakeMarkers);

    //STEP 2 - TODO
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  // function onEachFeature(feature, layer) {
  //   layer.bindPopup(
  //     "<h3>" +
  //       feature.properties.place +
  //       "</h3><hr><p>" +
  //       new Date(feature.properties.time) +
  //       "</p>" +
  //       "<p>" +
  //       feature.properties.mag +
  //       "</p>"
  //   );
  //   L.circle(feature.geometry.coordinates, {
  //     stroke: false,
  //     fillOpacity: 0.75,
  //     color: "white",
  //     fillColor: "white",
  //     radius: markerSize(feature.properties.mag)
  //   })
  // }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  // var earthquakes = L.geoJSON(earthquakeData, {
  //   onEachFeature: onEachFeature,
  // });

  // Create a baseMaps object
  var baseMaps = {

    'Satellite': satellite,
    'Grayscale': grayscale,
    'Outdoors': outdoors
    // Satellite: googleSat,
    // Hybrid: googleHybrid,
    // Terrain: googleTerrain,
  };

  // Create an overlay object
  var overlayMaps = {
    // "Fault Lines": faultLines,
    Earthquakes: earthquakes,
  };

  // Define a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [satellite, grayscale, outdoors, earthquakes],
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
    })
    .addTo(myMap);

  // Create a legend to display information about our map
  var legend = L.control({
    position: "bottomright",
  });
  // When the layer control is added, insert a div with the class of "legend"

  // get color depending on earthquake magnitutude value
  function getColor(d) {
    return d > 5
      ? "#F06B6B"
      : d > 4
      ? "#F0A76B"
      : d > 3
      ? "#F3BA4D"
      : d > 2
      ? "#F3DB4D"
      : d > 1
      ? "#E1F34D"
      : "#B7F34D";
  }

  legend.onAdd = function (myMap) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 1, 2, 3, 4, 5],
      labels = [],
      from,
      to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<i style="background:' +
          getColor(from + 1) +
          '"></i> ' +
          from +
          (to ? "&ndash;" + to : "+")
      );
    }

    div.innerHTML = labels.join("<br>");
    return div;
  };
  // Add the info legend to the map
  legend.addTo(myMap);

  // End of createFeatures function
}
