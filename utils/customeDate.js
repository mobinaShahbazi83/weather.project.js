const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Tursday",
    "Friday",
    "Saturday",
  ];

const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()]
}

export {getWeekDay}