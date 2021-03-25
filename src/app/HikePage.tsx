import { h, FunctionComponent, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { parseImage } from './parseImage';
import { Map as MapIcon } from './icons/Map';
import { List as ListIcon } from './icons/List';

export const HikePage: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <App title={`${hike.name} | Coquitlam Family Hikes`} className='hike-page'>
    <nav>
      <h2>{hike.name}</h2>
      <a class='map-link' href='/#map-tab'><MapIcon /></a>
      <a class='list-link' href='/#list-tab'><ListIcon /></a>
    </nav>
    <div class='hike-topmatter'>
      <h4>{hike.area} Area</h4>
      <TrailSummary {...hike} />
      { hike.notes && (<>
          <h5>Notes</h5>
          <div dangerouslySetInnerHTML={{__html: hike.notes.replace(/\n\n/g, '<br/>')}} />
        </>
      )}
    </div>
    <div class={`image-gallery ${hike.images && hike.images.length ? '' : 'image-gallery--only-map'}`}
      style={`--map-grid-width: ${hike.map && hike.map.width}; --map-grid-height: ${hike.map && hike.map.height};`}
      >
      <Map latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} zoom={14}>
        <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title='Trailhead' >
          Trailhead:
          <br/><b>{hike.trailhead.name}</b>
          <br/><a href={`https://www.google.com/maps/search/?api=1&query=${hike.trailhead.latitude},${hike.trailhead.longitude}`}>Open in Google Maps</a>
        </MapMarker>
      </Map>
      { hike.images && hike.images.map(parseImage).map(({ name, width, height }) => (
        <img
          style={`--width: ${width}; --height: ${height};`}
          src={`https://images.hiker.family/${hike.slug}/${name}.jpg?nf_resize=smartcrop&w=${width * 200}&h=${height * 200}`}
          />
      ))}
    </div>
  </App>
);
