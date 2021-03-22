import { h, FunctionComponent, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';

export const HikeApp: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <App title={`${hike.name} | Coquitlam Family Hikes`}>
    <nav><h1><a href="/">Coquitlam Family Hikes</a></h1> &gt; <h2>{hike.name}</h2></nav>
    <div>{hike.area} Area</div>
    <TrailSummary {...hike} />
    { hike.notes && (<>
        <h4>Notes</h4>
        <div dangerouslySetInnerHTML={{__html: hike.notes.replace(/\n\n/g, '<br/>')}} />
      </>
    )}
    <Map latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} zoom={14}>
      <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title='Trailhead' >
        Trailhead:
        <br/><b>{hike.trailhead.name}</b>
        <br/><a href={`https://www.google.com/maps/search/?api=1&query=${hike.trailhead.latitude},${hike.trailhead.longitude}`}>Open in Google Maps</a>
      </MapMarker>
    </Map>
  </App>
);
