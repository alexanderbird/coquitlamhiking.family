import { h, FunctionComponent, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { parseImage } from './parseImage';
import { Map as MapIcon } from './icons/Map';
import { MapPin } from './icons/MapPin';
import { Nav } from './Nav';
import { List as ListIcon } from './icons/List';
import { Share as ShareIcon } from './icons/Share';
import { getHikeThumbnailPath } from './getHikeThumbnailUrl';

function hikeDescription(hike) {
  let result = 'From our digital scrapbook of our favorite hikes in the area: this one has ';
  result += hike.view.text.toLowerCase() + ' views, is ';
  result += hike.hilly === 'yes' ? 'very hilly' : hike.hilly === 'somewhat' ? 'somewhat hilly' : 'relatively flat';
  result += ', and is '
  result += hike.stroller === 'yes' ? 'stroller accessible' : 'not stroller accessible';
  result += '.';
  return result;
}

const metaTags = hike => ({
  title: `${hike.name} | Coquitlam Family Hikes`,
  description: hikeDescription(hike),
  path: `trail/${hike.slug}.html`,
  image: getHikeThumbnailPath(hike)
})


const map = ({ hike, width, height }) => (
  <Map latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} zoom={14} width={width} height={height}>
    <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title='Trailhead' >
      Trailhead:
      <br/><b>{hike.trailhead.name}</b>
      <br/><a href={`https://www.google.com/maps/search/?api=1&query=${hike.trailhead.latitude},${hike.trailhead.longitude}`}>Open in Google Maps</a>
    </MapMarker>
  </Map>
);

const image = ({ width, height, name, hikeSlug }) => (
  <img
    crossOrigin='anonymous'
    style={`--width: ${width}; --height: ${height};`}
    src={`https://images.hiker.family/${hikeSlug}/${name}.jpg?nf_resize=smartcrop&w=${width * 200}&h=${height * 200}`}
    />
)

export const HikePage: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <App title={`${hike.name} | Coquitlam Family Hikes`} className='hike-page' metaTags={metaTags(hike)}>
    <Nav active='find' title={hike.name}/>
    <div class='hike-topmatter'>
      <h4>{hike.area} Area</h4>
      <TrailSummary {...hike} />
      { hike.notes && (<>
          <h5>Notes</h5>
          <div dangerouslySetInnerHTML={{__html: hike.notes.replace(/\n\n/g, '<br/>')}} />
        </>
      )}
      <p class='hike-topmatter__links'>
        <a href={`https://www.google.com/maps/search/?api=1&query=${hike.trailhead.latitude},${hike.trailhead.longitude}`}>
          <MapPin />
          Show Trailhead in Google Maps
        </a>
        <button class='unbutton share-action share-action--not-supported'>
          <ShareIcon />
          Share Hike
        </button>
      </p>
    </div>
    <div class='image-gallery' >
      { hike.images && hike.images.map(parseImage).map(({ isMap, name, width, height }) => (
        isMap
          ? map({ hike, width, height })
          : image({ hikeSlug: hike.slug, name, width, height })
      ))}
    </div>
  </App>
);

