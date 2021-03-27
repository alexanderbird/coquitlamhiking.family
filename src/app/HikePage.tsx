import { h, FunctionComponent, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { parseImage } from './parseImage';
import { Map as MapIcon } from './icons/Map';
import { List as ListIcon } from './icons/List';
import { Share as ShareIcon } from './icons/Share';

function hikeDescription(hike) {
  let result = 'From our digital scrapbook of our favorite hikes in the area: this one has ';
  result += hike.view.text.toLowerCase() + ' views, is ';
  result += hike.hilly === 'yes' ? 'very hilly' : hike.hilly === 'somewhat' ? 'somewhat hilly' : 'relatively flat';
  result += ', and is '
  result += hike.stroller === 'yes' ? 'stroller accessible' : 'not stroller accessible';
  result += '.';
  return result;
}

const MetaTags: FunctionComponent<{ hike: any }> = ({ hike }) => {
  const title = `${hike.name} | Coquitlam Family Hikes`;
  const description = hikeDescription(hike);
  const url = `https://hiker.family/${hike.slug}.html`;
  const image = hike.images && hike.images.length && `https://images.hiker.family/${hike.slug}/${parseImage(hike.images[0]).name}.jpg?nf_resize=smartcrop&w=800&h=800`;
  return (<Fragment>
    <meta name="description" content={description} />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url}/>
    <meta property="og:title" content={title}/>
    <meta property="og:description" content={description}/>
    { image && <meta property="og:image" content={image}/> }

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:url" content={url}/>
    <meta property="twitter:title" content={title}/>
    <meta property="twitter:description" content={description}/>
    { image && <meta property="twitter:image" content={image}/> }
  </Fragment>);
}

export const HikePage: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <App title={`${hike.name} | Coquitlam Family Hikes`} className='hike-page' MetaTagsComponent={() => <MetaTags hike={hike} />}>
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
      <p class='hike-topmatter__links'>
        <a href={`https://www.google.com/maps/search/?api=1&query=${hike.trailhead.latitude},${hike.trailhead.longitude}`}>
          Show Trailhead in Google Maps <MapIcon />
        </a>
        <button class='unbutton share-action share-action--not-supported'>Share Hike <ShareIcon /></button>
      </p>
    </div>
    <div class='image-gallery'
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
          crossOrigin='anonymous'
          style={`--width: ${width}; --height: ${height};`}
          src={`https://images.hiker.family/${hike.slug}/${name}.jpg?nf_resize=smartcrop&w=${width * 200}&h=${height * 200}`}
          />
      ))}
    </div>
  </App>
);
