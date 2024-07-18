"use client";
import { useState, useEffect, useMemo } from "react";
import Map, {
  Layer,
  Marker,
  Source,
  Popup,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { circle as turfCircle } from "@turf/turf";
import { Slider } from "antd";
import "./styles.scss";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import ShortText from "@/util/ShortText";

type Props = {
  setData: any;
  data: any;
  listMarker?: any;
};

const MapRadiusComponent = (props: Props) => {
  const { pushBlank } = useRouterCustom();
  const listMarkerMap = props.listMarker;
  const { handleShortTextHome } = ShortText();
  const [viewChoose, setViewChoose] = useState<any>(undefined);
  const [listChoose, setListChoose] = useState<any>([]);
  const [viewport, setViewport] = useState<any>({
    latitude: props.data.latitude,
    longitude: props.data.longitude,
    zoom: 10,
  });
  const [itemChoose, setItemChoose] = useState<any>();
  const [radius, setRadius] = useState<any>(props.data.radius * 1000);
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
  const handleChangeRadius = (e: any) => {
    setRadius(e * 1000);
    props.setData({ ...props.data, radius: e });
  };
  const circleGeoJson = useMemo(() => {
    return turfCircle([viewport.longitude, viewport.latitude], radius / 1000, {
      steps: 64,
      units: "kilometers",
    });
  }, [radius, viewport]);
  useEffect(() => {
    const dataNew = listMarkerMap?.filter((dt: any) => {
      return (
        viewChoose?.longitude == dt?.longitude &&
        viewChoose?.latitude == dt?.latitude
      );
    });
    if (dataNew?.length > 1) {
      setListChoose(dataNew);
    } else {
      setListChoose([]);
    }
  }, [viewChoose]);
  return (
    <>
      <div className="w-full h-full relative transi">
        <Map
          {...viewChoose}
          mapboxAccessToken="pk.eyJ1IjoidHJ1bmdwaGFuOTkiLCJhIjoiY2txZmI3cDl5MG42ODJvc2N1emRqcndqYyJ9.-QdtnY-bLP8PSXMwwXuQEA"
          initialViewState={viewport}
          onDblClick={handleChange}
          onMove={(e: any) => {
            if (viewChoose) {
              setViewChoose({
                ...viewChoose,
                zoom: e.viewState.zoom,
              });
            }
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {/* <Marker
            color="blue"
            longitude={viewport.longitude}
            latitude={viewport.latitude}
          /> */}
          {listMarkerMap?.map((dt: any, ikey: any) => {
            return (
              <>
                {/* {ikey === 0 && ( */}
                <>
                  {!viewChoose && (
                    <Marker
                      color="blue"
                      longitude={Number(dt.longitude)}
                      latitude={Number(dt.latitude)}
                      onClick={() => {
                        setViewChoose({
                          longitude: Number(dt.longitude),
                          latitude: Number(dt.latitude),
                          zoom: 17,
                        });
                        setItemChoose(ikey);
                      }}
                    />
                  )}
                  {viewChoose?.latitude == dt.latitude &&
                    viewChoose?.longitude == dt.longitude &&
                    itemChoose === ikey && (
                      <Popup
                        closeOnClick={false}
                        closeButton={false}
                        longitude={dt.longitude}
                        latitude={dt.latitude}
                        className="flex flex-col"
                        style={{ width: "384px" }}
                      >
                        <div className="w-full text-end ">
                          <button
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setViewChoose(undefined);
                            }}
                          >
                            <IoIosCloseCircleOutline className="text-2xl" />
                          </button>
                        </div>
                        <div className="flex-1 flex flex-col max-h-28 overflow-y-scroll gap-4">
                          {listChoose?.length > 1 ? (
                            <>
                              {listChoose?.map((dtt: any, i: any) => {
                                return (
                                  <>
                                    <div
                                      className="flex gap-2 items-center cursor-pointer hover:shadow-xl rounded-lg"
                                      key={i}
                                      onClick={() => {
                                        pushBlank(`/post-detail/${dtt.id}`);
                                      }}
                                    >
                                      <div className="rounded-full overflow-hidden w-14 h-14">
                                        <Image
                                          className="w-full h-full"
                                          alt=""
                                          src={dtt?.image ?? "/goapply.png"}
                                          width={70}
                                          height={70}
                                        />
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold">
                                          {handleShortTextHome(dtt.title, 30)}
                                        </p>
                                        <p className=" font-medium text-gray-500">
                                          Lương :
                                          <span className="font-bold text-blue-500">
                                            {dtt.salary_max}{" "}
                                            {dtt.money_type_text}
                                          </span>
                                        </p>
                                        <p className="font-medium text-gray-500">
                                          Địa chỉ :
                                          <span className="font-bold text-blue-500">
                                            {dtt.address}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            <div
                              className="flex gap-2 items-center cursor-pointer hover:shadow-xl rounded-lg"
                              onClick={() => {
                                pushBlank(`/post-detail/${dt.id}`);
                              }}
                            >
                              <div className="rounded-full overflow-hidden w-14 h-14">
                                <Image
                                  className="w-full h-full"
                                  alt=""
                                  src={dt?.image ?? "/goapply.png"}
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-bold">
                                  {handleShortTextHome(dt.title, 30)}
                                </p>
                                <p className=" font-medium text-gray-500">
                                  Lương :
                                  <span className="font-bold text-blue-500">
                                    {dt.salary_max} {dt.money_type_text}
                                  </span>
                                </p>
                                <p className="font-medium text-gray-500">
                                  Địa chỉ :
                                  <span className="font-bold text-blue-500">
                                    {dt.address}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </Popup>
                    )}
                </>
                {/* )} */}
              </>
            );
          })}
          {/* {!viewChoose && (
            <>
              <Marker
                color="red"
                longitude={106.70183}
                latitude={10.761955}
                onClick={() => {
                  setViewChoose({
                    longitude: 106.70183,
                    latitude: 10.761955,
                    zoom: 17,
                  });
                }}
              />
              <Marker
                color="red"
                longitude={106.7}
                latitude={10.6}
                onClick={() => {
                  setViewChoose({ longitude: 106.7, latitude: 10.6, zoom: 17 });
                }}
              />
            </>
          )} */}
          {/* {viewChoose?.latitude === 10.761955 &&
            viewChoose?.longitude === 106.70183 && ( */}

          {/* )}
          {viewChoose?.latitude === 10.6 && viewChoose?.longitude === 106.7 && (
            <>
              <Popup
                closeOnClick={false}
                closeButton={false}
                className=""
                longitude={106.7}
                latitude={10.6}
              >
                <button
                  onClick={() => {
                    setViewChoose(undefined);
                  }}
                >
                  x
                </button>
              </Popup>
            </>
          )} */}
          <Source id="circle" type="geojson" data={circleGeoJson}>
            <Layer
              id="circle-fill"
              type="fill"
              paint={{
                "fill-color": "#088",
                "fill-opacity": 0.4,
              }}
            />
            <Layer
              id="circle-outline"
              type="line"
              paint={{
                "line-color": "#088",
                "line-width": 2,
              }}
            />
          </Source>
          <NavigationControl
            style={{ transform: "translateX(-70px)" }}
            position="bottom-right"
          />
        </Map>
        <div className="absolute bottom-2 left-8">
          <p className="font-semibold text-blue-500 text-sm text-center">
            {radius / 1000}x
          </p>

          <div className="h-28 py-4 px-1 rounded-full bg-blue-900 flex justify-center">
            <Slider
              className="text-white"
              min={0}
              max={100}
              vertical
              defaultValue={10}
              onChange={(e: any) => {
                handleChangeRadius(e);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MapRadiusComponent;
