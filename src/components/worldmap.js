import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'

const geoUrl = require('./world-110m.json')

const WorldMap = () => {
  const [infectedAreas, setInfected] = useState([])

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 0.65 })

  const user = useSelector((state) => state.user)

  const [tooltipContent, setTooltipContent] = useState('')

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`)
    }
  }

  const onMouseLeave = () => {
    setTooltipContent('')
  }

  function handleZoomIn() {
    if (position.zoom >= 4) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }))
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }))
  }

  function handleMoveEnd(position) {
    setPosition(position)
  }

  useEffect(() => {
    fetch('https://sheltered-crag-77668.herokuapp.com/locations').then(
      (response) => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then((infectedData) => {
          setInfected(infectedData)
          // console.log(infectedData)
        })
      }
    )
    console.log(infectedAreas)
  }, [])

  return (
    <div>
      {/* {infectedAreas.map((location, i) => {
        console.log(location.id)
      })} */}
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap widith={400} height={300} data-tip=''>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const current = infectedAreas.find(
                  (infectedLocation) =>
                    infectedLocation.country === geo.properties.name
                )
                console.log(geo)
                console.log(current)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                    // fill={current.active > 1000 ? 14 : current.active * 0.01}
                  />
                )
              })
            }
          </Geographies>
          {/* {infectedAreas.map((location) => {
            if (location && location.id !== 50000) {
              return (
                <Marker
                  key={location.id}
                  coordinates={[location.lon, location.lat]}
                >
                  <circle
                    r={location.active > 1000 ? 14 : location.active * 0.01}
                    fill='#E91E63'
                    fillOpacity='0.7'
                    stroke='#FFFFFF'
                    className='marker'
                  />
                </Marker>
              )
            }
          })} */}
        </ZoomableGroup>
      </ComposableMap>
      <div className='controls'>
        <button onClick={handleZoomIn}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='3'
          >
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='3'
          >
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
        </button>
      </div>
    </div>
  )

  // const [geographies, setGeographies] = useState([])
  // useEffect(() => {
  //   // POSSIBLY THIS CAUSING A HEROKU REQUEST TIMEOUT?
  //   fetch(
  //     'https://github.com/d3/d3.github.com/blob/master/world-110m.v1.json'
  //   ).then((response) => {
  //     if (response.status !== 200) {
  //       console.log(`There was a problem: ${response.status}`)
  //       return
  //     }
  //     response.json().then((worlddata) => {
  //       setGeographies(feature(worlddata, worlddata.objects.countries).features)
  //     })
  //   })
  // }, [])
  // let infectedActive = 0
  // let infectedConfirmed = 0
  // let infectedDead = 0
  // let infectedRecovered = 0
  // const divStyle = {
  //   backgroundColor: 'white',
  // }
  // infectedAreas.map((location) => {
  //   infectedActive = infectedActive + location.active
  //   infectedConfirmed = infectedConfirmed + location.confirmed
  //   infectedDead = infectedDead + location.deaths
  //   infectedRecovered = infectedRecovered + location.recovered
  // })
  // return (
  //   <div style={divStyle}>
  //     <h2>Global Stats</h2>
  //     <h3>
  //       Infected: {infectedConfirmed}. Dead: {infectedDead}. Recovered:{' '}
  //       {infectedRecovered}.
  //     </h3>
  //     <svg width={900} height={475} viewBox='0 0 900 475'>
  //       <g className='cities'>
  //         {geographies.map((d, i) => (
  //           <path
  //             key={`path-${i}`}
  //             d={geoPath().projection(projection)(d)}
  //             className='province'
  //             fill={`rgba(38,50,56,${(1 / geographies.length) * i})`} // maybe this to change opacity?
  //             stroke='#FFFFFF'
  //             strokeWidth={0.5}
  //           />
  //         ))}
  //       </g>
  //       <g className='markers'>
  //         {infectedAreas.map((location, i) => {
  //           let coordinates = [location.lon, location.lat]
  //           if (user.locations_id && user.locations_id !== 500000) {
  //             if (parseInt(user.locations_id) === parseInt(location.id)) {
  //               return (
  //                 <OverlayTrigger
  //                   trigger='hover'
  //                   placement='top'
  //                   overlay={
  //                     <Popover id='popover-basic'>
  //                       <Popover.Title as='h3'>
  //                         {infectedAreas[i].country}
  //                       </Popover.Title>
  //                       <Popover.Content>
  //                         Confirmed: {infectedAreas[i].confirmed}. Active:{' '}
  //                         {infectedAreas[i].active} Dead:{' '}
  //                         {infectedAreas[i].deaths}. Recovered:{' '}
  //                         {infectedAreas[i].recovered}.
  //                       </Popover.Content>
  //                     </Popover>
  //                   }
  //                 >
  //                   <circle
  //                     key={`marker-${i}`}
  //                     cx={projection(coordinates)[0]}
  //                     cy={projection(coordinates)[1]}
  //                     r={location.active > 1000 ? 14 : location.active * 0.01}
  //                     fill='#E91E63'
  //                     fill-opacity='0.7'
  //                     stroke='#FFFFFF'
  //                     className='marker'
  //                     // onClick={() => handleMarkerClick(i)}
  //                     // onMouseEnter={handleHover}
  //                   />
  //                 </OverlayTrigger>
  //               )
  //             }
  //           }
  //           if (
  //             parseInt(user.locations_id) === 500000 ||
  //             user.status === 500 ||
  //             !user.locations_id
  //           ) {
  //             return (
  //               <OverlayTrigger
  //                 key={infectedAreas[i].id}
  //                 trigger='hover'
  //                 placement='top'
  //                 overlay={
  //                   <Popover id='popover-basic'>
  //                     <Popover.Title as='h3'>
  //                       {infectedAreas[i].country}
  //                     </Popover.Title>
  //                     <Popover.Content>
  //                       Confirmed: {infectedAreas[i].confirmed}. Active:{' '}
  //                       {infectedAreas[i].active} Dead:{' '}
  //                       {infectedAreas[i].deaths}. Recovered:{' '}
  //                       {infectedAreas[i].recovered}.
  //                     </Popover.Content>
  //                   </Popover>
  //                 }
  //               >
  //                 <circle
  //                   key={`marker-${i}`}
  //                   cx={projection(coordinates)[0]}
  //                   cy={projection(coordinates)[1]}
  //                   r={location.active > 1000 ? 14 : location.active * 0.01}
  //                   fill='#E91E63'
  //                   fillOpacity='0.7'
  //                   stroke='#FFFFFF'
  //                   className='marker'
  //                   // onClick={() => handleMarkerClick(i)}
  //                   // onMouseEnter={() => handleHover(i)}
  //                 />
  //               </OverlayTrigger>
  //             )
  //           }
  //         })}
  //       </g>
  //     </svg>
  //     <h1>News on the virus below</h1>
  //   </div>
  // )
}

export default WorldMap
