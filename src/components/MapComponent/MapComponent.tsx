"use client";
import { useState, useEffect, useMemo } from "react";
import Map, { Layer, Marker, Source, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Slider } from "antd";
import "./styles.scss";
type Props = {
  setData?: any;
  data: any;
};

const MapComponent = (props: Props) => {
  const [viewport, setViewport] = useState<any>({
    latitude: props.data.latitude,
    longitude: props.data.longitude,
    zoom: 10,
  });
  const handleChange = (e: any) => {
    props.setData({
      ...props.data,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
    setViewport({
      ...viewport,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
  };

  return (
    <>
      <div className="w-full h-full relative">
        <Map
          mapboxAccessToken="pk.eyJ1IjoidHJ1bmdwaGFuOTkiLCJhIjoiY2txZmI3cDl5MG42ODJvc2N1emRqcndqYyJ9.-QdtnY-bLP8PSXMwwXuQEA"
          initialViewState={viewport}
          onClick={(e: any) => {
            if (props.setData) {
              handleChange(e);
            }
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            color="blue"
            longitude={viewport.longitude}
            latitude={viewport.latitude}
          />

          <NavigationControl
            style={{ transform: "translateX(-70px)" }}
            position="bottom-right"
          />
        </Map>
      </div>
    </>
  );
};

export default MapComponent;
