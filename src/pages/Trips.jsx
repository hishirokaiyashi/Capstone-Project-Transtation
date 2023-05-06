import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  getDateTripsFromId,
  getRouteFromId,
  createSeats,
} from "../firebase/firestore";
import { motion } from "framer-motion";

import { setTrips, setPrice, resetFilter } from "../redux/trips.slice";
import TripSkeleton from "../components/TripsInfo/Skeleton";
import MainLayout from "../layouts/MainLayout";
import SearchTrip from "../components/SearchTrip";
import InputFilter from "../components/InputFilter";
import TripsInfo from "../components/TripsInfo";
import MultiRangeSlider from "../components/Slider";
import Loader from "../components/Loader";
import OutOfStock from "../assets/images/Trips/OutOfStock.gif";

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

const Trips = ({ itemsPerPage }) => {
  const dispatch = useDispatch();

  const { isLoading, trips, filteredTrips, price } = useSelector(
    (state) => state.trips
  );

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const departureId = params.get("departureId");
  const destinationId = params.get("destinationId");
  const date = params.get("date");

  const mapRef = useRef(null);
  const firstItemRef = useRef(null);
  // Define states
  const [map, setMap] = useState(null);
  const [centerPoint, setCenterPoint] = useState(HCMCenterGeoPoint);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [trips, setTrips] = useState(null);
  const [route, setRoute] = useState(null);

  const memoizedGetDateTripsFromId = useMemo(
    () => getDateTripsFromId,
    [getDateTripsFromId]
  );

  useEffect(() => {
    if (!map) {
      const timeoutId = setTimeout(() => {
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
      }, 1000); // adjust the delay as needed
      return () => clearTimeout(timeoutId);
    }
  }, [centerPoint]);

  useEffect(() => {
    if (map && route) displayRouteOnMap(route);
  }, [map, route]);

  // Get trip information
  const getTripRoute = async (routeId) => {
    const res = await getRouteFromId(routeId);
    setRoute(res);
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
    const middlePoint = routeData[Math.round(routeData.length / 2)];
    setCenterPoint(middlePoint);
    map.getView().setCenter(fromLonLat(middlePoint));

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
  //   const tripID = "SGAG10052317";
  //   createSeats(tripID);
  // };

  /* Pagination */
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    const unsubscribe = getDateTripsFromId(
      departureId + destinationId + date,
      (data) => {
        if (data) {
          dispatch(setTrips(data));
          setCurrentItems(data.slice(itemOffset, endOffset));
          getTripRoute(data[0].route_id);
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, [memoizedGetDateTripsFromId, departureId, destinationId, date]);

  useEffect(() => {
    if (filteredTrips) {
      handlePageClick(0);
    }
  }, [filteredTrips, price]);

  if (!trips) {
    return <Loader />;
  }

  const pageCount = Math.ceil(filteredTrips.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (pageNumber) => {
    // Current page number = pageNumber = event.selected
    setCurrentPage(pageNumber);
    const newOffset = (pageNumber * itemsPerPage) % filteredTrips.length;
    setItemOffset(newOffset);
    setCurrentItems(
      filteredTrips
        ?.filter((item) => {
          return item.ticketPrice >= price[0] && item.ticketPrice <= price[1];
        })
        .slice(newOffset, newOffset + itemsPerPage)
    );
    firstItemRef.current.scrollIntoView({ behavior: "smooth" });
  };

  //Animation framer motion

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
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
            <p className="text-[0.75rem] text-my-text-gray-third tracking-wide mb-[105px]">
              <Link to="/">Homepage</Link> / Trips
            </p>
            <InputFilter name="SORT" />
            <InputFilter name="CATEGORIES" />
            <InputFilter name="DEPARTURE TIME" />
            <InputFilter name="ARRIVAL TIME" />
            <p className="text-[#6A6A6B] mb-[20px] font-semibold  text-[1rem] tracking-wide">
              Price
            </p>
            <MultiRangeSlider
              min={150000}
              max={1000000}
              onChange={({ min, max }) => {
                const priceRange = [min, max];
                dispatch(setPrice(priceRange));
              }}
            />
            <button
              onClick={() => {
                dispatch(resetFilter());
              }}
              className="rounded-[5px] mt-[50px] text-[0.875rem] w-full px-[30px] py-[4px] bg-[#E04141] text-white cursor-pointer"
            >
              Reset
            </button>
          </div>
          <div className="w-[75%] " ref={firstItemRef}>
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
                {loading ? (
                  <TripSkeleton trips={2} />
                ) : currentItems && currentItems?.length > 0 ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                    {currentItems?.map((trip, index) => (
                      <motion.div key={trip.uid + index} variants={item}>
                        <TripsInfo
                          key={trip.uid}
                          tripInfo={trip}
                          route={route}
                          itemOffset={itemOffset}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-[20px]">
                    <h1 className="font-semibold text-[1.375rem]">
                      There is no trip available at the moment! ☹️{" "}
                    </h1>
                    <img
                      src={OutOfStock}
                      alt={OutOfStock}
                      className="h-[350px] w-[350px]"
                    />
                  </div>
                )}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={(e) => handlePageClick(e.selected)}
                  pageRangeDisplayed={5}
                  forcePage={currentPage}
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
        <div ref={mapRef} className="h-[500px] w-full z-1 mt-8" />
      </div>
    </MainLayout>
  );
};

export default Trips;
