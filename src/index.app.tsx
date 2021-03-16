import { h } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import * as coquitlam from './coquitlam.json';

export const IndexApp = ({ hikes }) => (
  <App title='Coquitlam Family Hikes'>
    <h1>Coquitlam Family Hikes</h1>
    { hikes.map(hike => (
      <div>
        <h3><a href={`./${hike.slug}.html`}>{hike.name}</a></h3>
        <pre><code>
          { JSON.stringify(hike, null, 2) }
        </code></pre>
      </div>
    )) }
    <Map longitude={coquitlam.longitude} latitude={coquitlam.latitude} zoom={coquitlam.zoom} >
      { hikes.map(hike => (
        <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title={hike.name} />
      )) }
    </Map>
  </App>
);
