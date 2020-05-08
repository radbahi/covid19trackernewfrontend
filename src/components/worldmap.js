import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { Popover, OverlayTrigger } from "react-bootstrap";


const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2]);

const WorldMap = () => {
  const [geographies, setGeographies] = useState([]); // NEED TO USE STATE
  const [infectedAreas, setInfected] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch("http://localhost:3000/locations").then((response) => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then((infectedData) => {
        // console.log(infectedData)
        setInfected(infectedData);
      });
    });
  }, []);

  // const handleHover = (i) => {
  //   console.log(infectedAreas[i]);
  //   return (
  //     <Popover id="popover-basic">
  //       <Popover.Title as="h3">{infectedAreas[i].title}</Popover.Title>
  //       <Popover.Content>
  //         Infected: {infectedAreas[i].confirmed}
  //       </Popover.Content>
  //     </Popover>
  //   );
  // };

  useEffect(() => {
    fetch("/world-110m.json").then((response) => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then((worlddata) => {
        setGeographies(
          feature(worlddata, worlddata.objects.countries).features
        );
      });
    });
  }, []);

  const handleCityClick = (cityIndex) => {
    console.log("Clicked on city: ", geographies[cityIndex]);
  };

  // const handleMarkerClick = (i) => {
  //   console.log("Marker: ", infectedAreas[i]);
  // };
  let infectedActive = 0
  let infectedConfirmed = 0;
  let infectedDead = 0;
  let infectedRecovered = 0;
  const divStyle = {
    backgroundColor: "white",
  };

  infectedAreas.map((location) => {
    infectedActive = infectedActive + location.active
    infectedConfirmed = infectedConfirmed + location.confirmed;
    infectedDead = infectedDead + location.deaths;
    infectedRecovered = infectedRecovered + location.recovered;
  });
  return (
    <div style={divStyle}>
      <h2>Global Stats</h2>
      <h3>
        Infected: {infectedConfirmed}. Dead: {infectedDead}. Recovered:{" "}
        {infectedRecovered}.
      </h3>

      <svg width={900} height={475} viewBox="0 0 900 475">
        <g className="cities">
          {geographies.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d)}
              className="province"
              fill={`rgba(38,50,56,${(1 / geographies.length) * i})`} // maybe this to change opacity?
              stroke="#FFFFFF"
              strokeWidth={0.5}
              onClick={() => handleCityClick(i)}
            />
          ))}
        </g>
        <g className="markers">
          {infectedAreas.map((location, i) => {
            let coordinates = [location.lon, location.lat];
            //  let arr = projection([city.longitude, city.latitude])
            //  console.log(city)

            if (user.locations_id && user.locations_id !== 500000) {
              if (parseInt(user.locations_id) === parseInt(location.id)) {
                console.log("hello");
                return (
                  <OverlayTrigger
                    trigger="hover"
                    placement="top"
                    overlay={
                      <Popover id="popover-basic">
                        <Popover.Title as="h3">
                        {infectedAreas[i].country}
                        </Popover.Title>
                        <Popover.Content>
                          Confirmed: {infectedAreas[i].confirmed}. Active:{' '}{infectedAreas[i].active} Dead:{" "}
                          {infectedAreas[i].deaths}. Recovered:{" "}
                          {infectedAreas[i].recovered}.
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <circle
                      key={`marker-${i}`}
                      cx={projection(coordinates)[0]}
                      cy={projection(coordinates)[1]}
                      r={location.active > 1000 ? 14 : location.active * 0.01}
                      fill="#E91E63"
                      fill-opacity="0.7"
                      stroke="#FFFFFF"
                      className="marker"
                      // onClick={() => handleMarkerClick(i)}
                      // onMouseEnter={handleHover}
                    />
                  </OverlayTrigger>
                );
              }
            }
            if (
              parseInt(user.locations_id) === 500000 ||
              user.status === 500 ||
              !user.locations_id
            ) {
              console.log("hell00000o");
              return (
                <OverlayTrigger
                  trigger="hover"
                  placement="top"
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Title as="h3">
                      {infectedAreas[i].country}
                      </Popover.Title>
                      <Popover.Content>
                      Confirmed: {infectedAreas[i].confirmed}. Active:{' '}{infectedAreas[i].active} Dead:{" "}
                          {infectedAreas[i].deaths}. Recovered:{" "}
                          {infectedAreas[i].recovered}.
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <circle
                    key={`marker-${i}`}
                    cx={projection(coordinates)[0]}
                    cy={projection(coordinates)[1]}
                    r={location.active > 1000 ? 14 : location.active * 0.01}
                    fill="#E91E63"
                    fill-opacity="0.7"
                    stroke="#FFFFFF"
                    className="marker"
                    // onClick={() => handleMarkerClick(i)}
                    // onMouseEnter={() => handleHover(i)}
                  />
                </OverlayTrigger>
              );
            }
          })}
        </g>
      </svg>
    </div>
  );
};

export default WorldMap;
