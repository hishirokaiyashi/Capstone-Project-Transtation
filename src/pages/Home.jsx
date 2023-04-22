import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";

import getRoute from "../utils/getRoute";

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
import Messager from "../components/ChatSection/Messager";

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

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Define states
  const [map, setMap] = useState(null);
  const [centerPoint, setCenterPoint] = useState(HCMCenterGeoPoint);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const navigate = useNavigate();

  const mapRef = useRef(null);

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

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <MainLayout>
      <div className="relative">
        <button
          className="bg-blue-400 px-3 py-2 rounded-lg"
          onClick={goToLogin}
        >
          Login
        </button>
        <h1 className="text-black text-4xl">
          Hello there <br />
          My name is Jeo peo
        </h1>
        <Link to="/trips">Qua trang Trips</Link>
      </div>
      {/* <div ref={mapRef} className="h-[500px] w-full z-1" />
      <div
        className="py-1.5 px-3 bg-black text-white text-center cursor-pointer"
        onClick={displayCDSG}
      >
        Chau Doc - Sai Gon
      </div> */}
      {isAuthenticated && <Messager />}
    </MainLayout>
  );
};

export default Home;
