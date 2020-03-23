import React, { useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import MapGL from 'react-map-gl'
import Popover from '../Popover'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import MDSpinner from 'react-md-spinner'

const DISTRICT = gql`
  query District($id: ID!) {
    district(id: $id) {
      id
      name
      code
      province
      region
      geometry {
        type
        polygon {
          type
          coordinates
        }
        multipolygon {
          type
          coordinates
        }
      }
    }
  }
`

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const MAPBOX_STYLE = process.env.REACT_APP_MAP_STYLE

const District = (props) => {
  const { id } = props.match.params
  const { loading, error, data } = useQuery(DISTRICT, { variables: { id } })
  console.log(loading, error, data)
  const [layers, setLayers] = useState([])
  const [expanded, setExpanded] = useState(false)
  const popoverClass = `popover ${expanded ? 'expand' : 'shrink'}`
  const [viewport, setViewport] = useState({
    longitude: 47.52186,
    latitude: -18.91449,
    zoom: 11.97,
    bearing: 0,
    pitch: 30
  })

  useEffect(() => {
    setLayers([])
  }, [id])

  useEffect(() => {
    if (!loading && !error) {
      const { geometry } = data.district
      const { type } = geometry
      const [longitude, latitude] = type === 'Polygon' ? geometry.polygon.coordinates[0][0] : geometry.multipolygon.coordinates[0][0][0]
      const location = {
        ...viewport,
        longitude,
        latitude,
        zoom: 8
      }
      setViewport(location)
      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: type === 'Polygon' ? geometry.polygon : geometry.multipolygon
          }
        ]
      }
      setLayers([
        new GeoJsonLayer({
          id: 'geojson-layer',
          data: geojson,
          pickable: true,
          stroked: false,
          filled: true,
          extruded: false,
          lineWidthScale: 20,
          lineWidthMinPixels: 2,
          getElevation: 1,
          getFillColor: [47, 84, 235, 127]
        })
      ])
    }
  }, [loading, error, data])

  if (loading) {
    return (
      <div className='spinner'>
        <MDSpinner />
      </div>
    )
  }

  return (
    <div>
      <DeckGL
        initialViewState={viewport}
        controller
        layers={layers}
        onClick={() => setExpanded(false)}
      >
        <MapGL
          {...viewport}
          width='100vw'
          height='100vh'
          maxPitch={85}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={value => setViewport(value)}
        />
      </DeckGL>
      <Popover {...{ popoverClass, setExpanded }} />
    </div>
  )
}

export default District
