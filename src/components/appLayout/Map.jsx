import React, { useContext, useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useGeolocation } from "../../shared/hooks/useGeolocation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchPageContetx } from "../../shared/context/serachPage-context";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const { formIndex } = useContext(SearchPageContetx);
  const { destinationPoints } = useContext(SearchPageContetx);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <button className={styles.mapBtn} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {destinationPoints.map((item, i) => (
          <Marker key={i} position={[item.lat, item.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        {formIndex === 2 && <DetectClick />}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  const {
    setDestinationPoints,
    reverseGeolocation,
    isMatchCountry,
    isRightSelectedPoint,
  } = useContext(SearchPageContetx);
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  console.log(mapLat, mapLng);

  useMapEvents({
    click: (e) => {
      navigate(`search/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

      reverseGeolocation([e.latlng.lat, e.latlng.lng], () => {
        setDestinationPoints((prev) => [
          ...prev,
          { lat: e.latlng.lat, lng: e.latlng.lng },
        ]);
      });
    },
  });
}

export default Map;
