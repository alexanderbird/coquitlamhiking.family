import { h } from 'preact';

import { App } from './App';
import { Map } from './Map';

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
    <Map latitude={hikes[0].trailhead.latitude} longitude={hikes[0].trailhead.longitude} zoom={4}/>
  </App>
);
