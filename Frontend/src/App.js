import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import cloudyIcon from './image/sunny.png';
import rainyIcon from './image/rainy.png';
import sunnyIcon from './image/cloudy.png';
import defaultIcon from './image/moon.png';

const weatherIcons = {
  Clouds: cloudyIcon,
  Rain: rainyIcon,
  Drizzle: rainyIcon,
  Thunderstorm: rainyIcon,
  Clear: sunnyIcon,
};

function App() {
  const [cityData, setCityData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const weatherCondition = cityData.weather?.[0]?.main || "";
  const weatherIcon = weatherIcons[weatherCondition] || defaultIcon;

  const getData = async (city) => {
    try {
      const apiKey = "f3f3c91b47ad7a8b69b2d3606ade2fe2n";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setCityData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData('Chennai');
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    getData(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <> 
    {cityData.weather && <>
        <center>
          <h1>Weather Application</h1>
          <input className="temp-input" type="search"
            placeholder="Enter City Name..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button style={{margin:'10px 0 0 0',backgroundColor:'lightblue'}} onClick={handleSearchClick}>
            Search
          </button>
        </center>
        <div id="container">
          <div className="card">
              <div className="name">{cityData?.name}</div>
              <span className="tag">{cityData.weather[0]?.main}</span>
              <span className="tag">Feel Like {(cityData.main?.feels_like - 273.15).toFixed(0)}°C</span>
            <div className="box">
              <img style={{width:'80px',height:'80px'}} src={weatherIcon} alt=""/>
            </div>
            <div>
            <center style={{fontSize:'40px'}}>{(cityData.main.temp - 273.15).toFixed(1)}°C</center>
            </div>
            <div className="card__details">

              
              <center className="infoContainer">
                    <div className="info">
                    <div>Humidity</div>
                    {cityData.main.humidity}
                    </div>
                    <div className="info">
                    <div>Wind</div>
                    {cityData.wind.speed} Km/h
                    </div>
                    <div className="info">
                    <div>Pressure</div>
                    {cityData.main.pressure} mb
                    </div>
                    <div className="info">
                    <div>Visibility</div>
                    {cityData.visibility}
                    </div>
                </center>
            </div>
          </div>
        </div>
    </>}
    </>
  );
}

export default App;