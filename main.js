// today
let today = document.getElementById("today"),
  day = document.getElementById("day"),
  month = document.getElementById("month"),
  city = document.getElementById("city"),
  todayTemp = document.getElementById("todayTemp"),
  todayIcon = document.getElementById("todayIcon"),
  todayDesc = document.getElementById("todayDesc"),
  humidity = document.getElementById("humidity"),
  wind = document.getElementById("wind"),
  direction = document.getElementById("direction"),
  // days after
  daysAfter = document.getElementsByClassName("dayAfter"),
  dayAfterIcon = document.getElementsByClassName("dayAfterIcon"),
  maxDeg = document.getElementsByClassName("maxDeg"),
  minDeg = document.getElementsByClassName("minDeg"),
  daysAfterDesc = document.getElementsByClassName("dayAfterDesc"),
  // global
  cityName = "gharbia",
  locationApi,
  forcastApi,
  responce,
  days = [
    "Sunday",
    "Monday",
    "Tuesady",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  // search bar
  searchBar = document.getElementById("searchBar");
  
async function getData() {
    // locationApi = await fetch(
    //   "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=%09aqanRqecwWftGtX2idsz7vfGS4xunv2y&q=cairo"
    // );
    // let locationkey = await locationApi.json();
    // forcastApi = await fetch(
    //   `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationkey[0].Key}?apikey=aqanRqecwWftGtX2idsz7vfGS4xunv2y`
    // );
    forcastApi = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${cityName}&days=3`
    );
    responce = await forcastApi.json();
    console.log(responce)
    setToday();
    setDaysAfter();
}
getData();

let date = new Date();


function setToday() {
    today.innerHTML = `${days[date.getDay()]}`;
    day.innerHTML=`${date.getDate()}`
    month.innerHTML = `${months[date.getMonth()]}`;
    city.innerHTML = `${responce.location.name}`;
    todayTemp.innerHTML = `${responce.current.temp_c}`;
    todayIcon.setAttribute('Src', `https:${responce.current.condition.icon}`);
    todayDesc.innerHTML = `${responce.current.condition.text}`;
    humidity.innerHTML = `${responce.current.humidity}`;
    wind.innerHTML = `${responce.current.wind_kph} k/h`;
    direction.innerHTML = `${responce.current.wind_dir}`;
}

function setDaysAfter() {
    for (let i = 0; i < daysAfter.length;i++){
        daysAfter[i].innerHTML = `${days[date.getDay() + i+1]}`;
        dayAfterIcon[i].setAttribute("Src",`https:${responce.forecast.forecastday[i + 1].day.condition.icon}`);
        maxDeg[i].innerHTML = `${responce.forecast.forecastday[i + 1].day.maxtemp_c}`;
        minDeg[i].innerHTML = `${responce.forecast.forecastday[i + 1].day.mintemp_c}`;
        daysAfterDesc[i].innerHTML = `${responce.forecast.forecastday[i + 1].day.condition.text}`;
    }
}

function search(value) {
    
}

searchBar.addEventListener('keyup', () => {
    cityName = searchBar.value;
    getData();
 })