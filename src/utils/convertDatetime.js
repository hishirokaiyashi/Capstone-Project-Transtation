import moment from "moment/moment";

const convertFromTimestamp = (timestamp) => {
  const converted = moment(timestamp.toDate()).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
  return converted;
};

const getDDMMYY = (date) => {
  const formattedDate = moment(date).format("DDMMYY");
  return formattedDate;
};

const reverseDDMMYY = (date) => {
  const formattedDate = moment(date, "DDMMYY").toDate();
  return formattedDate;
};

const substractHHMMToHour = (time1, time2) => {
  const duration = moment.duration(
    moment(time2, "HH:mm").diff(moment(time1, "HH:mm"))
  );

  const hours = duration.hours();

  return hours;
};

const formatDateToWords = (date) => {
  const dateObj = moment(date, "DDMMYY").toDate();
  const formattedDate = moment(dateObj).format("dddd, MMMM Do YYYY");
  return formattedDate;
};

const plusDay = (date, quanty) => {
  const momentDate = moment(date, "DDMMYY");
  const addedDate = momentDate.clone().add(quanty, "days");
  return getDDMMYY(addedDate);
};

const isPastDate = (dateString) => {
  const date = moment(dateString, "DDMMYY");
  const today = moment().startOf("day");
  return date.isBefore(today);
};

export {
  convertFromTimestamp,
  getDDMMYY,
  reverseDDMMYY,
  substractHHMMToHour,
  formatDateToWords,
  plusDay,
  isPastDate,
};
