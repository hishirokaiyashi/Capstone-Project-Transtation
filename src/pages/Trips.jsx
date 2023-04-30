import React, { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  getDateTripsFromId,
  getRouteFromId,
  createSeats,
} from "../firebase/firestore";

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

// const locationList = [
//   {
//     id: "SG",
//     name: "Bến xe miền Tây",
//     geoPoint: "106.6190185,10.7406102",
//   },
//   {
//     id: "CD",
//     name: "Bến xe Châu Đốc",
//     geoPoint: "105.1371585,10.6953553",
//   },
// ];

const Trips = ({ itemsPerPage }) => {
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
  const [route, setRoute] = useState(null);

  // const [openMore, setOpenMore] = useState(false);
  // const [activeTabIndex, setActiveTabIndex] = useState(0);

  const memoizedGetDateTripsFromId = useMemo(
    () => getDateTripsFromId,
    [getDateTripsFromId]
  );

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
  }, [centerPoint]);

  useEffect(() => {
    displayRouteOnMap(route);
  }, [route]);

  // Get trip information
  const getTripRoute = async (routeId) => {
    const res = await getRouteFromId(routeId);
    setRoute(res);
    // displayRouteOnMap(res);
  };

  // Define icon points
  const startIcon = new Icon({
    anchor: [0.5, 1],
    src: "https://i.imgur.com/JXF25tb.png",
  });

  const endIcon = new Icon({
    anchor: [0.5, 1],
    src: "https://i.imgur.com/FC0e57V.png",
  });

  // Display trip route on map
  const displayRouteOnMap = async (routeInfo) => {
    if (!routeInfo) {
      return;
    }

    const latitude1 = routeInfo.startGeo.latitude;
    const longitude1 = routeInfo.startGeo.longitude;

    const latitude2 = routeInfo.endGeo.latitude;
    const longitude2 = routeInfo.endGeo.longitude;

    // Call api to get route from HCD-ChauDok
    const res = await getRoute(
      `${longitude1},${latitude1}`,
      `${longitude2},${latitude2}`
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
      geometry: new Point(
        fromLonLat([longitude1.toString(), latitude1.toString()])
      ),
      name: "Start",
    });

    const endMarker = new Feature({
      geometry: new Point(
        fromLonLat([longitude2.toString(), latitude2.toString()])
      ),
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

  // const handleCreateSeats = () => {
  //   const tripID = "SGAG01052309";
  //   createSeats(tripID);
  // };

  //pagination

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  useEffect(() => {
    const unsubscribe = getDateTripsFromId(
      departureId + destinationId + date,
      (data) => {
        setTrips(data);
        setCurrentItems(data.slice(itemOffset, endOffset));

        getTripRoute(data[0].route_id);
      }
    );

    return unsubscribe;
  }, [memoizedGetDateTripsFromId, departureId, destinationId, date]);
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  if (!trips) {
    return <div>Loading...</div>;
  }

  // const currentItems = trips?.slice(itemOffset, endOffset);
  // setCurrentItems(trips?.slice(itemOffset, endOffset));

  const pageCount = Math.ceil(trips.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % trips.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    setCurrentItems(trips?.slice(newOffset, newOffset + itemsPerPage));
  };

  return (
    <MainLayout>
      <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
        FREE TRANSIT SERVICE FOR EVERY DESTINATION
      </p>
      <div>
        {/* <button
          className="p-2 bg-black text-white"
          onClick={() => handleCreateSeats()}
        >
          Thêm dữ liệu
        </button> */}
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
              <div className="grid grid-cols-3">
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
              <div className="bg-my-bg-gray-trips pl-[43px] pr-[60px] pt-[45px] pb-[150px]">
                {/* {trips?.map((trip, index) => (
                  <TripsInfo key={index} tripInfo={trip} route={route} />
                ))} */}
                {currentItems &&
                  currentItems?.map((trip) => (
                    <TripsInfo
                      key={trip.uid}
                      tripInfo={trip}
                      route={route}
                      itemOffset={itemOffset}
                    />
                  ))}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< "
                  renderOnZeroPageCount={null}
                  containerClassName="flex justify-center items-center gap-[20px]"
                  pageLinkClassName="h-[25px] w-[25px] leading-[18px] p-[5px]"
                  previousClassName="flex justify-center items-center h-[25px] w-[25px] leading-[18px] p-[5px]"
                  nextLinkClassName="flex justify-center items-center h-[25px] w-[25px] leading-[18px] p-[5px]"
                  // activeClassName="underline p-[5px]"
                  activeLinkClassName="border-b-2 border-black "
                />
              </div>
            </div>
          </div>
        </div>
        <div ref={mapRef} className="h-[500px] w-full z-1" />
      </div>
    </MainLayout>
  );
};

export default Trips;
