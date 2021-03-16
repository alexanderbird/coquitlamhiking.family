import { h, FunctionComponent } from 'preact';

import { App } from './App';
import { Map } from './Map';

export const HikeApp: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <App title={`${hike.name} | Coquitlam Family Hikes`}>
    <h1>{hike.name}</h1>
    <pre><code>
      { JSON.stringify(hike, null, 2) }
    </code></pre>
    <Map latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} zoom={16}/>
  </App>
);
