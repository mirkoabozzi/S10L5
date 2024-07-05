import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import Search from "./components/Search";

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWether] = useState(null);

  const [country, setCountry] = useState("sedini");

  const params = useParams();
  console.log("params", params);

  const userCountry = (newCountry) => {
    setCountry(newCountry);
  };

  const geolocalFetch = async () => {
    try {
      const resp = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + country + "&limit=2&appid=6136007826f2425e507093e16cf8aade");
      if (resp.ok) {
        const result = await resp.json();
        setLat(result[0].lat);
        setLon(result[0].lon);
      } else {
        throw new Error("Errore nel recupero della località");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeather = async () => {
    try {
      const resp = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6136007826f2425e507093e16cf8aade");

      if (resp.ok) {
        const result = await resp.json();
        setWether(result);
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    geolocalFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  console.log("lat", lat);
  console.log("lon", lon);
  console.log("weather", weather);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search userCountry={userCountry} />} />
          <Route path="/:country" element={weather && <Home weather={weather} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
