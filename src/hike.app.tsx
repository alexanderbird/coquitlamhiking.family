import { h, FunctionComponent } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';

export const HikeApp: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <App title={`${hike.name} | Coquitlam Family Hikes`}>
    <div class='hike__header'><a href="/">Home</a> &gt; <h1>{hike.name}</h1></div>
    <Map latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} zoom={14}>
      <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title='Trailhead' >
        Trailhead:
        <br/><b>{hike.trailhead.name}</b>
        <br/><a href={`https://www.google.com/maps/search/?api=1&query=${hike.trailhead.latitude},${hike.trailhead.longitude}`}>Open in Google Maps</a>
      </MapMarker>
    </Map>
    <pre><code>
      { JSON.stringify(hike, null, 2) }
    </code></pre>
  </App>
);
