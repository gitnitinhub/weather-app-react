import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
 
const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);
    const [background, setBackground] = useState('linear-gradient(45deg, #2f4680, #500ae4)')
    const inputRef = useRef(null);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03n": cloud_icon,
        "03d": cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }

    const updateBackground = (icon)=>{
        if (icon === rain_icon){
            setBackground('linear-gradient(45deg, #575A5E , #3C4E58');
        } else if (icon === cloud_icon || icon === drizzle_icon){
            setBackground('linear-gradient(to right, rgba(189, 195, 199, 0.6), rgba(44, 62, 80, 0.6))');
        }
        else{
            setBackground('linear-gradient(45deg, #2f4680, #500ae4)');
        }

    };

    const search = async (city)=>{
        if(city === ""){
            alert('Enter City Name');
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=
            ${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url); //to fetch response
            const data = await response.json();// to make it easy to use in json
            console.log(data);

            if(response.ok){ 
                const icon = allIcons[data.weather[0].icon] || clear_icon;//icons to be displayed
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon
                });
                updateBackground(icon);
            }else if (data.cod === '404'){
                alert(data.message);
            }
           
        }catch(error){
            setWeatherData(false);
            console.error(error);
        }
    }

    useEffect(()=>{
        search('Delhi');
    },[])

  return (
    <div className='weather' style={{ background: background}}>
        <div className="search-bar">
           <input type="text" placeholder='Search' ref={inputRef}/> 
           <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='city'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
       
    </div>
  )
}
export default Weather 


































