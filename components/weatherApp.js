import React, { useEffect, useState } from 'react'
import "./weather.css"
const WeatherApp = () => {
    const [city, setcity] = useState(null);
    const [search, setsearch] = useState("");
    const [arr, setarr] = useState([]);
    const newArr = [];
    arr.map(item => {
        if (!newArr.includes(item)) {
            newArr.push(item);
        }
    })

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=854aba87a25a35b3c61ba479fd9087c9&units=metric`
            const response = await fetch(url);
            const resJason = await response.json();
            console.log(resJason.main);
            setcity(resJason.main);
        }
        fetchApi();
        console.log(arr);
    }, [search])

    useEffect(() => {
        if (city) {
            setarr([...arr, search])
        }
    }, [city])

    return (
        <>
            <div className="container">
                <h1>Weather App</h1>
                <div>
                    <div className="inputData">
                        <input type="search" onChange={(e) => { setsearch(e.target.value) }} value={search} />
                    </div>
                </div>

                {search == "" ?
                    (<div>
                        <h2 className='Entries'>Last 3 City Entries</h2>
                        {
                            [...newArr].reverse().map((city, index) => (
                                index < 3 &&
                                 <div className='cities'>
                                    <p>{city}</p>
                                </div>
                            ))
                        }
                    </div>) : !city ? (
                        <h1 className="Not">Enter Vallid City Name</h1>) : (

                        <div className="info">
                            <h2 className="location">Weather details of city : {search}</h2>
                            <h2 className="temp">Current Temperature: {city.temp} °C</h2>
                            <h2 className="tempR">Temperature Range: {city.temp_max} °C to {city.temp_min} °C</h2>
                            <h2 className="Humidity">Humidity: {city.humidity}</h2>
                            <h2 className="Sea">Sea Level : {city.sea_level}</h2>
                            <h2 className="Ground">Ground Level : {city.grnd_level}</h2>
                        </div>
                    )
                }
            </div>

        </>
    )
}

export default WeatherApp