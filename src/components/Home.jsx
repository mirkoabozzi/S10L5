import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = ({ weather }) => {
  const iconCode = weather.weather[0].icon;
  let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

  const navigate = useNavigate();

  const tempToC = (value) => (value / 10).toFixed(1);
  const speedToKm = (value) => (value * 3.6).toFixed(2);

  return (
    <Container className="mainContainer mt-5 rounded-4">
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
        <Container className="d-flex justify-content-center">
          <Image src={iconUrl} width={200} />
          <h1>{tempToC(weather.main.temp)}°</h1>
        </Container>
        <Container>
          <h1 className="text-center mb-4">{weather.weather[0].main}</h1>
          {/* <p className="text-center">data</p> */}
        </Container>
      </main>
      <Container className="bg-white text-black border border rounded">
        <section>
          <Container>
            <h2>Weader Information</h2>
            <Row>
              {/* <h5 className="mt-4">Temp</h5> */}
              <Col className="mb-4">
                <p className="mb-0">Feels Like</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-thermometer-half me-2" viewBox="0 0 16 16">
                  <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                </svg>{" "}
                {tempToC(weather.main.feels_like)}°
              </Col>
              {/* <h5 className="mt-4">Wind</h5> */}
              <Col className="mb-4">
                <p className="mb-0">Wind Speed</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-wind me-2" viewBox="0 0 16 16">
                  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                </svg>
                {speedToKm(weather.wind.speed)} km/h
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="mb-0">Precipitation</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud me-2" viewBox="0 0 16 16">
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                {weather.weather[0].description}
              </Col>
              <Col>
                <p className="mb-0">Umidity</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-droplet" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                  />
                  <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z" />
                </svg>{" "}
                {weather.main.humidity} %
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="mt-4">
            <Row className="justify-content-between">
              <Col sm="2">
                <h5>Today</h5>
                <Image src={iconUrl} width={50} />
                <p>{tempToC(weather.main.temp)}°</p>
              </Col>
              <Col sm="2">Tomorrow</Col>
              <Col sm="2">The Day After Tomorrow</Col>
            </Row>
          </Container>
        </section>
      </Container>
    </Container>
  );
};

export default Home;
