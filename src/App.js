import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import MapGL, { NavigationControl } from 'react-map-gl';
import Popover from './components/Popover';
import './App.css';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAP_STYLE;

// Data to be used by the LineLayer
const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

const App = (props) => {

    const layers = [
      // new LineLayer({id: 'line-layer', data})
    ];
    const [expanded, setExpanded] = useState(false)
    const popoverClass = `popover ${expanded ? 'expand' : 'shrink'}`
    const [ viewport, setViewport ] = useState({
      longitude: 47.52186,
      latitude: -18.91449,
      zoom: 11.97,
      bearing: 0,
      pitch: 30
    })

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

export default App