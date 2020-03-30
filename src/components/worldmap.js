import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { xml } from "d3";

const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2]);

const WorldMap = () => {
  const [geographies, setGeographies] = useState([]); // NEED TO USE STATE
  const [infectedAreas, setInfected] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetch("http://localhost:3000/provinces").then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(infectedData => {
        // console.log(infectedData)
        setInfected(infectedData);
      });
    });
  }, []);

  const handleHover = i => {
    console.log(infectedAreas[i]);
    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{infectedAreas[i].title}</Popover.Title>
        <Popover.Content>
          Infected: {infectedAreas[i].confirmed}
        </Popover.Content>
      </Popover>
    );
  };

  useEffect(() => {
    fetch("/world-110m.json").then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(worlddata => {
        setGeographies(
          feature(worlddata, worlddata.objects.countries).features
        );
      });
    });
  }, []);

  const handleProvinceClick = provinceIndex => {
    console.log("Clicked on province: ", geographies[provinceIndex]);
  };

  const handleMarkerClick = i => {
    console.log("Marker: ", infectedAreas[i]);
  };

  let infectedConfirmed = 0;
  let infectedDead = 0;
  let infectedRecovered = 0;
  const divStyle = {
    backgroundColor: "white"
  };

  infectedAreas.map(city => {
      infectedConfirmed = infectedConfirmed + city.confirmed
      infectedDead = infectedDead + city.deaths
      infectedRecovered = infectedRecovered + city.recovered
  })
  return (
    <div style={divStyle}>
         <h2>Global Stats</h2>
       <h3>Infected: {infectedConfirmed}. Dead: {infectedDead}. Recovered: {infectedRecovered}.</h3> 

      <svg width={900} height={475} viewBox="0 0 900 475">
        <g className="provinces">
          {geographies.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d)}
              className="province"
              fill={`rgba(38,50,56,${(1 / geographies.length) * i})`} // maybe this to change opacity?
              stroke="#FFFFFF"
              strokeWidth={0.5}
              onClick={() => handleProvinceClick(i)}
            />
          ))}
        </g>
        <g className="markers">
          {infectedAreas.map((city, i) => {
            let coordinates = [city.longitude, city.latitude];
            //  let arr = projection([city.longitude, city.latitude])
            //  console.log(city)

            if (user.location && user.location !== 50000) {
              if (parseInt(user.location) === parseInt(city.id)) {
                console.log("hello");
                return (
                  <OverlayTrigger
                    trigger="hover"
                    placement="top"
                    overlay={
                      <Popover id="popover-basic">
                        <Popover.Title as="h3">
                          {infectedAreas[i].title}
                        </Popover.Title>
                        <Popover.Content>
                          Infected: {infectedAreas[i].confirmed}. Dead: {infectedAreas[i].deaths}. Recovered: {infectedAreas[i].recovered}.
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <circle
                      key={`marker-${i}`}
                      cx={projection(coordinates)[0]}
                      cy={projection(coordinates)[1]}
                      r={
                        city.confirmed > 10
                          ? 10 + city.confirmed * 0.01
                          : city.confirmed
                      }
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
              parseInt(user.location) === 50000 ||
              user.status === 500 ||
              !user.location
            ) {
              console.log("hell00000o");
              return (
                <OverlayTrigger
                  trigger="hover"
                  placement="top"
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Title as="h3">
                        {infectedAreas[i].title}
                      </Popover.Title>
                      <Popover.Content>
                      Infected: {infectedAreas[i].confirmed}. Dead: {infectedAreas[i].deaths}. Recovered: {infectedAreas[i].recovered}.
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <circle
                    key={`marker-${i}`}
                    cx={projection(coordinates)[0]}
                    cy={projection(coordinates)[1]}
                    r={
                      city.confirmed > 10
                        ? 10 + city.confirmed * 0.01
                        : city.confirmed
                    }
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
