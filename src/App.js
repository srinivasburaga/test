
import React, { useState } from 'react';
import WeatherService from './WeatherService';
import './styles.css'
import { RotatingLines } from "react-loader-spinner";

const WeatherComponent = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [datastatus, setdatastatus] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async () => {
        setLoading(true);
        setdatastatus(false)
        try {
            const response = await WeatherService.fetchWeatherData(city);
            
             setdatastatus(false)
            if (response.length > 5) {
                setLoading(false);
                setWeatherData(response.slice(0, 5));
            } else {
                setWeatherData(response);
            }
            setdatastatus(response.length === 0);
        } catch (error) {
           console.log(error)
            setdatastatus(true)   
            setWeatherData([]);
        } 
        finally{
        console.log(weatherData)
        if (weatherData &&  weatherData.length > 0)
            setdatastatus(false)
         else {
            setdatastatus(true)
         }
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='main'>
                <div className='title'>Weather in your city</div>
                <div className='main-content'>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button onClick={fetchWeather}>Search</button>
                {loading &&
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="10"
                        visible={true}
                    />}                
                </div>
            </div>
          
            {weatherData ? 
             (
                <div className='wrapper'>
                    {weatherData.map((day, index) => (
                        <div key={index} className="weather-card">

                            <table>
                                <thead>
                                    <tr >
                                        <th colspan="2" className='dateclass'> Date: {new Date(day.dt_txt).toLocaleDateString()}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colspan="2">Temperature</th>
                                    </tr>
                                    <tr>
                                        <th>Min</th>
                                        <th>Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{day.main.temp_min} °C</td>
                                        <td> {day.main.temp_max} °C</td>
                                    </tr>
                                    <tr>
                                        <td >Pressure</td>
                                        <td>{day.main.pressure} hPa</td>

                                    </tr>
                                    <tr>
                                        <td>Humidity</td>
                                        <td>{day.main.humidity} %</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ):(
                datastatus && <div className='error-message'>No weather data found for the given city</div>
            )}
        </div>
    );
};

export default WeatherComponent;
