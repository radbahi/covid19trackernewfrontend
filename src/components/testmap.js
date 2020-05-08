import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import {
  fitSelection,
  fitToViewer,
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  zoomOnViewerCenter,
} from "react-svg-pan-zoom";
import { xml } from "d3";

// const user = useSelector(state => state.user);

const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2]);

const handleProvinceClick = (provinceIndex) => {
  console.log("Clicked on province: ", this.state.geographies[provinceIndex]);
};

const handleMarkerClick = (i) => {
  console.log("Marker: ", this.state.infectedAreas[i]);
};
export default class TestMap extends React.PureComponent {
  // const [geographies, setGeographies] = useState([]) // NEED TO USE STATE
  // const [infectedAreas, setInfected] = useState([])

  state = {
    tool: TOOL_NONE,
    value: INITIAL_VALUE,
    geographies: [],
    infectedAreas: [],
  };
  Viewer = null;

  componentDidMount() {
    this.Viewer.fitToViewer();
    Promise.all([
      fetch('"http://localhost:3000/provinces"'),
      fetch("/world-110m.json"),
    ])
      .then(([infectedData, worlddata]) => {
        return Promise.all([infectedData.json(), worlddata.json()]);
      })
      .then(([infectedData, worlddata]) => {
        // console.log(infectedData)
        // setInfected(infectedData)
        this.setState({ infectedAreas: infectedData });
        this.setState({
          geographies: feature(worlddata, worlddata.objects.countries).features,
        });
        console.log(this.state.geographies);
      });
  }

  changeTool(nextTool) {
    this.setState({ tool: nextTool });
  }

  changeValue(nextValue) {
    this.setState({ value: nextValue });
  }

  fitToViewer_1() {
    this.setState((state) => ({ value: fitToViewer(state.value) }));
  }

  fitToViewer_2() {
    this.Viewer.fitToViewer();
  }

  fitSelection_1() {
    this.setState((state) => ({
      value: fitSelection(state.value, 40, 40, 200, 200),
    }));
  }

  fitSelection_2() {
    this.Viewer.fitSelection(40, 40, 200, 200);
  }

  zoomOnViewerCenter_1() {
    this.setState((state) => ({ value: zoomOnViewerCenter(state.value, 1.1) }));
  }

  zoomOnViewerCenter_2() {
    this.Viewer.zoomOnViewerCenter(1.1);
  }

  // componentWillMount() {
  //   // Promise.all([fetch('url'), fetch('url2')])
  //   Promise.all([fetch('"http://localhost:3000/provinces"'), fetch("/world-110m.json")])
  //     fetch("http://localhost:3000/provinces")
  //     .then(([infectedData,worlddata]) => {
  //       return Promise.all([infectedData.json(), worlddata.json()])
  //     })
  //       .then(([infectedData, worlddata]) => {
  //       // console.log(infectedData)
  //         // setInfected(infectedData)
  //         this.setState({infectedAreas: infectedData})
  //         this.setState.geographies(feature(worlddata, worlddata.objects.countries).features)
  //       })
  //   }

  // componentWillMount() {
  //   fetch("/world-110m.json")
  //     .then(response => {
  //         if (response.status !== 200) {
  //         console.log(`There was a problem: ${response.status}`)
  //         return
  //         }
  //         response.json().then(worlddata => {
  //         this.setState.geographies(feature(worlddata, worlddata.objects.countries).features)
  //         })
  //     })
  // }

  // const handleProvinceClick = provinceIndex => {
  //   console.log("Clicked on province: ", geographies[provinceIndex])
  // }

  // const handleMarkerClick = i => {
  //   console.log("Marker: ", infectedAreas[i])
  // }

  // let infectedConfirmed = 0
  // let infectedDead = 0
  // let infectedRecovered = 0

  // infectedAreas.map(city => {
  //     infectedConfirmed = city.confirmed
  //     infectedDead = city.dead
  //     infectedRecovered = city.recovered
  // })

  render() {
    return (
      <div>
        <ReactSVGPanZoom
          width={500}
          height={500}
          ref={(Viewer) => (this.Viewer = Viewer)}
          tool={this.state.tool}
          onChangeTool={(tool) => this.changeTool(tool)}
          value={this.state.value}
          onChangeValue={(value) => this.changeValue(value)}
        >
          <svg width={617} height={316} viewBox="0 0 800 450">
            <g className="provinces">
              {this.state.geographies.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(projection)(d)}
                  className="province"
                  fill={`rgba(38,50,56,${
                    (1 / this.state.geographies.length) * i
                  })`} // maybe this to change opacity?
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  onClick={() => handleProvinceClick(i)}
                />
              ))}
            </g>
            <g className="markers">
              {this.state.infectedAreas.map((city, i) => {
                let coordinates = [city.longitude, city.latitude];
                //  let arr = projection([city.longitude, city.latitude])
                //  console.log(city)

                if (this.props.user.location) {
                  if (
                    parseInt(this.props.user.location) === parseInt(city.id)
                  ) {
                    return (
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
                        onClick={() => handleMarkerClick(i)}
                      />
                    );
                  }
                } else if (
                  !this.props.user.location ||
                  this.props.user.status === 500
                ) {
                  return (
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
                      onClick={() => handleMarkerClick(i)}
                    />
                  );
                }
              })}
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}

let mapStateToProps = (state) => state.user;
connect(mapStateToProps)(TestMap);
