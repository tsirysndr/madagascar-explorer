import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import MapGL, { NavigationControl } from 'react-map-gl';
import Popover from '../Popover';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'

const COMMUNE = gql`
  query Commune($id: ID!) {
    commune(id:$id) {
      id
      name
      code
      province
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
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAP_STYLE;

// Data to be used by the LineLayer
const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

const Commune = (props) => {
    const { id } = props.match.params
    const { loading, error, data } = useQuery(COMMUNE, { variables: { id }})
    const [layers, setLayers] = useState([]);
    const [expanded, setExpanded] = useState(false)
    const popoverClass = `popover ${expanded ? 'expand' : 'shrink'}`
    const [ viewport, setViewport ] = useState({
      longitude: 47.52186,
      latitude: -18.91449,
      zoom: 11.97,
      bearing: 0,
      pitch: 30
    })

    useEffect(() => {
      if (!loading && !error) {
        const { geometry } = data.commune
        const { type } = geometry
        const [ longitude, latitude ] = type === 'Polygon' ? geometry.polygon.coordinates[0][0] : geometry.multipolygon.coordinates[0][0][0] 
        const location = {
          ...viewport,
          longitude,
          latitude,
          zoom: 9,
        }
        setViewport(location)
        const geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: type === 'Polygon' ? geometry.polygon : geometry.multipolygon,
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
            getFillColor: [250, 84, 28, 127],
          })
        ])
      }
    }, [loading, error, data])

    return (
      <div>
        <DeckGL
          initialViewState={viewport}
          controller={true}
          layers={layers}
          onClick={() => setExpanded(false) }
        >
          <MapGL
            {...viewport}
            width="100vw"
            height="100vh"
            maxPitch={85}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle={MAPBOX_STYLE}
            onViewportChange={value => setViewport(value)}
          >
          </MapGL>
        </DeckGL>
        <Popover {...{ popoverClass, setExpanded }} />
      </div>
    )
}

export default Commune