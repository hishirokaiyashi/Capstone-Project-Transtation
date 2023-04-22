import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getDateTripsFromId } from "../firebase/firestore";

import MainLayout from "../layouts/MainLayout";
import SearchTrip from "../components/SearchTrip";
import InputFilter from "../components/InputFilter";
import TripsInfo from "../components/TripsInfo";

import getRoute from "../utils/getRoute";
import {
  plusDay,
  formatDateToWords,
  isPastDate,
} from "../utils/convertDatetime";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Overlay from "ol/Overlay";
import { OSM, Vector as VectorSource } from "ol/source";
import { Style, Icon, Stroke } from "ol/style";

const HCMCenterGeoPoint = [106.660172, 10.762622];

const locationList = [
  {
    id: "SG",
    name: "Bến xe miền Tây",
    geoPoint: "106.6190185,10.7406102",
  },
  {
    id: "CD",
    name: "Bến xe Châu Đốc",
    geoPoint: "105.1371585,10.6953553",
  },
];

const Trips = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const departureId = params.get("departureId");
  const destinationId = params.get("destinationId");
  const date = params.get("date");

  const mapRef = useRef(null);

  // Define states
  const [map, setMap] = useState(null);
  const [centerPoint, setCenterPoint] = useState(HCMCenterGeoPoint);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const [trips, setTrips] = useState(null);

  const getTrips = async () => {
    try {
      const res = await getDateTripsFromId(departureId + destinationId + date);
      setTrips(res.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (departureId && destinationId && date) {
      getTrips();
    }
  }, [departureId, destinationId, date]);

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(centerPoint),
        zoom: 9,
      }),
    });
    setMap(initialMap);
    return () => initialMap.dispose();
    // map = initialMap;
  }, [centerPoint]);

  // Define icon points
  const startIcon = new Icon({
    anchor: [0.5, 1],
    src: "https://openlayers.org/en/latest/examples/data/icon.png",
  });

  const endIcon = new Icon({
    anchor: [0.5, 1],
    src: "https://openlayers.org/en/latest/examples/data/icon.png",
  });

  // Display SG-CD
  const displayCDSG = async () => {
    // setStartPoint(fromLonLat(locationList[0].geoPoint));
    // setEndPoint(fromLonLat(locationList[1].geoPoint));

    // Call api to get route from HCD-ChauDok
    const res = await getRoute(
      locationList[0].geoPoint,
      locationList[1].geoPoint
    );
    const routeData = res.features[0].geometry.coordinates;

    // Define vector layer for SG-CD route
    const routeFeature = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            type: "route",
            geometry: new LineString(
              routeData.map((coord) => fromLonLat(coord))
            ),
          }),
        ],
      }),
      style: new Style({
        stroke: new Stroke({
          color: [255, 0, 0, 0.8],
          width: 6,
        }),
      }),
    });

    const startMarker = new Feature({
      geometry: new Point(fromLonLat(locationList[0].geoPoint.split(","))),
      name: "Start",
    });

    const endMarker = new Feature({
      geometry: new Point(fromLonLat(locationList[1].geoPoint.split(","))),
      name: "End",
    });

    const markerSource = new VectorSource({
      features: [startMarker, endMarker],
    });

    const markerStyle = new Style({
      image: startIcon,
    });

    // Define vector layer as a route from SG-CD
    const markerLayer = new VectorLayer({
      source: markerSource,
      style: markerStyle,
    });

    map.addLayer(routeFeature);
    map.addLayer(markerLayer);
  };

  const handleTomorrow = () => {
    const params = {
      departureId,
      destinationId,
      date: plusDay(date, 1),
    };

    navigate(`/trips?${new URLSearchParams(params).toString()}`);
  };

  const handleYesterday = () => {
    if (!isPastDate(plusDay(date, -1))) {
      const params = {
        departureId,
        destinationId,
        date: plusDay(date, -1),
      };
      navigate(`/trips?${new URLSearchParams(params).toString()}`);
    }
  };
  return (
    <MainLayout>
      <div>
        <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
          FREE TRANSIT SERVICE FOR EVERY DESTINATION
        </p>
        <div className="bg-banner-trip bg-no-repeat bg-cover h-[157px]"></div>
        <div className="max-w-screen-xl mx-auto flex mt-[19px]">
          <div className="w-[25%] pr-[65px]">
            <p className="text-[0.75rem] text-my-text-gray-third tracking-wide font-Amata mb-[105px]">
              <Link to="/">Homepage</Link> / Trips
            </p>
            <InputFilter name="SORT" />
            <InputFilter name="CATEGORIES" />
            <InputFilter name="DEPARTURE TIME" />
            <InputFilter name="PICK UP POINT" />
            {/* <InputFilter name="PRICE" /> */}
          </div>
          <div className="w-[75%]">
            <SearchTrip from={departureId} to={destinationId} date={date} />
            <div>
              <div className="grid grid-cols-3 ">
                <p
                  className="text-center py-[12px] px-[30px] cursor-pointer"
                  onClick={handleYesterday}
                >
                  {formatDateToWords(plusDay(date, -1))}
                </p>
                <p className="text-center py-[12px] px-[30px] bg-my-bg-gray-trips">
                  {formatDateToWords(date)}
                </p>
                <p
                  className="text-center py-[12px] px-[30px] cursor-pointer"
                  onClick={handleTomorrow}
                >
                  {formatDateToWords(plusDay(date, 1))}
                </p>
              </div>
              <div className=" bg-my-bg-gray-trips pl-[43px] pr-[60px] pt-[45px] pb-[150px]">
                {trips?.map((trip) => (
                  <TripsInfo key={trip.uid} tripInfo={trip} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div ref={mapRef} className="h-[500px] w-full z-1" />
      <div
        className="py-1.5 px-3 bg-black text-white text-center cursor-pointer"
        onClick={displayCDSG}
      >
        Chau Doc - Sai Gon
      </div> */}
    </MainLayout>
  );
};

export default Trips;
