import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import i1d from "../assets/weathericon/01d.svg";
import i1n from "../assets/weathericon/01n.svg";
import i2d from "../assets/weathericon/02d.svg";
import i2n from "../assets/weathericon/02n.svg";
import i3d from "../assets/weathericon/03d.svg";
import i3n from "../assets/weathericon/03n.svg";
import i4d from "../assets/weathericon/04d.svg";
import i4n from "../assets/weathericon/04n.svg";
import i9d from "../assets/weathericon/09d.svg";
import i9n from "../assets/weathericon/09n.svg";
import i10d from "../assets/weathericon/10d.svg";
import i10n from "../assets/weathericon/10n.svg";
import i11d from "../assets/weathericon/11d.svg";
import i11n from "../assets/weathericon/11n.svg";
import i13d from "../assets/weathericon/13d.svg";
import i13n from "../assets/weathericon/13n.svg";
import i50d from "../assets/weathericon/50d.svg";
import i50n from "../assets/weathericon/50n.svg";
import colder from "../assets/weathericon/thermometer-colder.svg";
import warmer from "../assets/weathericon/thermometer-warmer.svg";
import wind from "../assets/weathericon/wind.svg";
import humidity from "../assets/weathericon/humidity.svg";
import thermometer from "../assets/weathericon/thermometer-celsius.svg";
import raindrops from "../assets/weathericon/raindrops.svg";

const Home = () => {
  const params = useParams();
  const country = params.country;
  // console.log("Country params", country);

  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState([]);

  const tomorrow = forecast[7];
  const inTwoDays = forecast[15];
  const inThreeDays = forecast[23];
  const inFourDays = forecast[31];
  const inFiveDays = forecast[39];

  const navigate = useNavigate();

  const upperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const tempToC = (value) => (value - 273).toFixed(1);
  const speedToKm = (value) => (value * 3.6).toFixed(1);
  const dataConverter = (timeStamp) => {
    const data = new Date(timeStamp * 1000);
    return data.toLocaleString("en-En", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      // minute: "numeric",
    });
  };

  const allIcon = {
    "01d": i1d,
    "01n": i1n,
    "02d": i2d,
    "02n": i2n,
    "03d": i3d,
    "03n": i3n,
    "04d": i4d,
    "04n": i4n,
    "09d": i9d,
    "09n": i9n,
    "10d": i10d,
    "10n": i10n,
    "11d": i11d,
    "11n": i11n,
    "13d": i13d,
    "13n": i13n,
    "50d": i50d,
    "50n": i50n,
  };

  const fetchWeather = async () => {
    try {
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?${country}&appid=6136007826f2425e507093e16cf8aade`);

      if (resp.ok) {
        const result = await resp.json();
        setWeather(result);
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchForecast = async () => {
    try {
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${country}&appid=6136007826f2425e507093e16cf8aade`);
      if (resp.ok) {
        const result = await resp.json();
        // console.log("Forecast", result);
        setForecast(result.list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    fetchForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  // console.log("Home Weader", weather);
  // console.log("Home forecast", forecast);
  // console.log("Tomorrow", tomorrow);
  // console.log("Icon", weather.weather[0].icon);

  return (
    weather && (
      <Container className="mainContainer rounded-4">
        <header>
          <Row>
            <Col>
              <svg onClick={() => navigate("/")} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
            </Col>
          </Row>
          <h1 className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt mx-2" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            {weather.name}
          </h1>
        </header>
        <main>
          <Container className="d-flex justify-content-center  align-items-center">
            <Image src={allIcon[weather.weather[0].icon]} alt="dynamic sky image" width={200} />
            <h1 className="mainTemp">{tempToC(weather.main.temp)}°</h1>
          </Container>
          <h1 className="text-center mb-4">{weather.weather[0].main}</h1>
          <Row className="justify-content-center">
            <Col xs="2">
              <div className="text-center">
                <Image fluid className="bg-white shadow rounded-circle mb-2" src={colder} alt="thermometer cold" width={50} />
              </div>
              <p className="text-center">{tempToC(weather.main.temp_min)}°</p>
            </Col>
            <Col xs="2">
              <div className="text-center">
                <Image fluid className="bg-white shadow rounded-circle mb-2" src={warmer} alt="thermometer warm" width={50} />
              </div>
              <p className="text-center">{tempToC(weather.main.temp_max)}°</p>
            </Col>
            <p className="text-center">{dataConverter(weather.dt)}</p>
          </Row>
        </main>
        <Container className=" section bg-white border rounded-4">
          <section>
            <Container className="borderBottom">
              <p className="mt-4 fw-bolder text-center">Weather Information</p>
              <Row className="justify-content-around">
                <Col xs="4" className="mb-4 text-center">
                  <p className="mb-0">Feels Like</p>
                  <Image src={thermometer} alt="thermometer" width={50} />
                  {tempToC(weather.main.feels_like)}°
                </Col>
                <Col xs="4" className="mb-4 text-center">
                  <p className="mb-0">Wind Speed</p>
                  <Image src={wind} alt="wind image" width={50} />
                  {speedToKm(weather.wind.speed)} km/h
                </Col>
              </Row>
              <Row className="justify-content-around">
                <Col xs="4" className="mb-4 text-center">
                  <p className="mb-0">Precipitation</p>
                  <Image src={raindrops} alt="rain drops" width={50} />
                  {upperCase(weather.weather[0].description)}
                </Col>
                <Col xs="4" className="mb-4 text-center">
                  <p className="mb-0">Umidity</p>
                  <Image src={humidity} alt="rain drop" width={50} />
                  {weather.main.humidity} %
                </Col>
              </Row>
            </Container>
          </section>
          <section>
            <Container className="mt-4 borderBottom">
              <Row className="justify-content-around flex-nowrap overflow-x-auto">
                {forecast.map((day, index) => {
                  if (index < 8) {
                    return (
                      <Col key={index} xs="6" sm="3" className="text-center">
                        {/* <h5>Next Hours </h5> */}
                        <p>{dataConverter(day.dt)}</p>
                        <Image src={allIcon[day.weather[0].icon]} alt="dynamic sky image" width={50} />
                        <p>{tempToC(day.main.temp)}°</p>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Container>
          </section>
          <section>
            <Container className="mt-4">
              {tomorrow && (
                <Row className="justify-content-around flex-nowrap overflow-x-auto">
                  <Col xs="6" sm="3" className="text-center">
                    <p className="fw-bolder">Tomorrow </p>
                    <p>{dataConverter(tomorrow.dt)}</p>
                    <Image src={allIcon[tomorrow.weather[0].icon]} alt="dynamic sky image" width={50} />
                    <p>{tempToC(tomorrow.main.temp)}°</p>
                  </Col>
                  <Col xs="6" sm="3" className="text-center">
                    <p className="fw-bolder">In Two Days</p>
                    <p>{dataConverter(inTwoDays.dt)}</p>
                    <Image src={allIcon[inTwoDays.weather[0].icon]} alt="dynamic sky image" width={50} />
                    <p>{tempToC(inTwoDays.main.temp)}°</p>
                  </Col>
                  <Col xs="6" sm="3" className="text-center">
                    <p className="fw-bolder">In Three Days</p>
                    <p>{dataConverter(inThreeDays.dt)}</p>
                    <Image src={allIcon[inThreeDays.weather[0].icon]} alt="dynamic sky image" width={50} />
                    <p>{tempToC(inThreeDays.main.temp)}°</p>
                  </Col>
                  <Col xs="6" sm="3" className="text-center">
                    <p className="fw-bolder">In Four Days</p>
                    <p>{dataConverter(inFourDays.dt)}</p>
                    <Image src={allIcon[inFourDays.weather[0].icon]} alt="dynamic sky image" width={50} />
                    <p>{tempToC(inFourDays.main.temp)}°</p>
                  </Col>
                  <Col xs="6" sm="3" className="text-center">
                    <p className="fw-bolder">In Five Days</p>
                    <p>{dataConverter(inFiveDays.dt)}</p>
                    <Image src={allIcon[inFiveDays.weather[0].icon]} alt="dynamic sky image" width={50} />
                    <p>{tempToC(inFiveDays.main.temp)}°</p>
                  </Col>
                </Row>
              )}
            </Container>
          </section>
        </Container>
      </Container>
    )
  );
};

export default Home;
