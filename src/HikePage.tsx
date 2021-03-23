import { h, FunctionComponent, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';

export const HikePage: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <App title={`${hike.name} | Coquitlam Family Hikes`}>
    <nav><h1><a href="/">Coquitlam Family Hikes</a></h1> &gt; <h2>{hike.name}</h2></nav>
    <div class='hike-topmatter'>
      <h4>{hike.area} Area</h4>
      <TrailSummary {...hike} />
      { hike.notes && (<>
          <h5>Notes</h5>
          <div dangerouslySetInnerHTML={{__html: hike.notes.replace(/\n\n/g, '<br/>')}} />
        </>
      )}
    </div>
    <Map latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} zoom={14}>
      <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title='Trailhead' >
        Trailhead:
        <br/><b>{hike.trailhead.name}</b>
        <br/><a href={`https://www.google.com/maps/search/?api=1&query=${hike.trailhead.latitude},${hike.trailhead.longitude}`}>Open in Google Maps</a>
      </MapMarker>
    </Map>
    <div class='image-gallery'>
      { hike.images && hike.images.map(image => {
        const [_, name, _width, _height] = image.match(/([0-9]+)@(\d+)x(\d+)/)
        const width = Number(_width);
        const height = Number(_height);

        return (
          <img
            style={`--width: ${width}; --height: ${height};`}
            src={`https://images.hiker.family/${hike.slug}/${name}.jpg?nf_resize=fit&w=${width * 200}&h=${height * 200}`}
            />
        );
      }) }
    </div>
  </App>
);
