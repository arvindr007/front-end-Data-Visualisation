import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const ChoroplethMap = ({ regionNames, geojsonData }) => {
  const getColor = (regionName) => {
    switch (regionName) {
      case "Region A":
        return "red";
      case "Northern America":
        return "blue";
      case "Western Africa":
        return "green";
      case "Eastern Europe":
        return "orange";
      case "South-Eastern Asia":
        return "purple";
      case "Eastern Asia":
        return "yellow";
      case "Southern Asia":
        return "pink";
      case "Europe":
        return "cyan";
      case "World":
        return "gray";
      default:
        return "black";
    }
  };

  const style = (feature) => {
    const regionName = feature.properties.name;
    const color = getColor(regionName);

    return {
      fillColor: color,
      fillOpacity: 0.8,
      color: "white",
      weight: 1,
    };
  };

  const onEachFeature = (feature, layer) => {
    const regionName = feature.properties.name;

    // Find the index of the current feature's region name in the regionNames array
    const regionIndex = geojsonData.features.findIndex((f) => f.properties.name === regionName);

    // Bind a mouseover event to the layer
    layer.on({
      mouseover: () => {
        // Display the corresponding region name from regionNames array on mouse hover
        const region = regionNames[regionIndex];
        layer.bindPopup(region);
        layer.openPopup();
      },
      mouseout: () => {
        // Remove the popup on mouseout
        layer.unbindPopup();
        layer.closePopup();
      },
    });
  };

  return (
    <MapContainer style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geojsonData.features} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default ChoroplethMap;