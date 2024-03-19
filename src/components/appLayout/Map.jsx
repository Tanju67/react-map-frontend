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
import { SearchFormContext } from "../../shared/context/searchForm-context";
import { SearchFormRequestContetx } from "../../shared/context/searchFormRequest-context";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const { searchFormState } = useContext(SearchFormContext);

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
        {searchFormState.selectedCountry.destinationPoints.map((item, i) => (
          <Marker key={i} position={[item.lat, item.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        {searchFormState.formIndex === 2 && <DetectClick />}
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

  const { dispatch } = useContext(SearchFormContext);
  const { reverseGeolocation } = useContext(SearchFormRequestContetx);

  useMapEvents({
    click: (e) => {
      navigate(`search/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

      reverseGeolocation([e.latlng.lat, e.latlng.lng], () => {
        dispatch({
          type: "UPDATE_DESTINATION_POINTS",
          payload: { lat: e.latlng.lat, lng: e.latlng.lng },
        });
      });
    },
  });
}

export default Map;
