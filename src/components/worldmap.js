import React, { useState, useEffect } from 'react'
import { scaleQuantile } from 'd3-scale'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'

const geoUrl = require('./world-110m.json')

const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618',
]

const WorldMap = () => {
  const [infectedAreas, setInfected] = useState([])

  const colorScale = scaleQuantile()
    .domain(infectedAreas.map((d) => d.active))
    .range(COLOR_RANGE)

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 0.65 })

  const user = useSelector((state) => state.user)

  const [tooltipContent, setTooltipContent] = useState('')

  const onMouseEnter = (
    current = {
      country: 'Cannot find country',
      active: 'Cannot find data',
      confirmed: 'Cannot find data',
      deaths: 'Cannot find data',
      recovered: 'Cannot find data',
    }
  ) => {
    return () => {
      setTooltipContent(
        `${current.country}: Active: ${current.active}. Confirmed: ${current.confirmed}. Deaths: ${current.deaths}. Recovered: ${current.recovered}.`
      )
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
    const fetchInfected = async () => {
      try {
        const { data } = await axios.get(
          'https://sheltered-crag-77668.herokuapp.com/locations'
        )
        setInfected(data)
      } catch (error) {
        console.log(`There was a problem: ${error}`)
        return
      }
    }
    fetchInfected()
  }, [])

  if (infectedAreas.length > 0) {
    return (
      <div>
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
                    (location) => location.ISO === geo.properties.ISO_A3
                  )
                  if (
                    current &&
                    parseInt(user.locations_id) === parseInt(current.id)
                  ) {
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={onMouseEnter(current)}
                        onMouseLeave={onMouseLeave}
                        fill={current ? colorScale(current.active) : '#EEE'}
                      />
                    )
                  } else if (user.status === 500 || !user.locations_id) {
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={onMouseEnter(current)}
                        onMouseLeave={onMouseLeave}
                        fill={current ? colorScale(current.active) : '#EEE'}
                      />
                    )
                  }
                })
              }
            </Geographies>
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
  } else {
    return <h1>Loading...</h1>
  }
}

export default WorldMap
