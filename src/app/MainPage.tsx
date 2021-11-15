import { h, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { parseImage } from './parseImage';
import { Map as MapIcon } from './icons/Map';
import { List as ListIcon } from './icons/List';

const previewImageCSS = hike => {
  const thumbnail = getHikeThumbnail(hike);
  if (!thumbnail) return '';
  return `url(https://images.hiker.family/${hike.slug}/${thumbnail}.jpg?nf_resize=smartcrop&w=300&h=400)`;
}

const getHikeThumbnail = hike => {
  try {
    if (hike.thumbnail) return hike.thumbnail;
    if (!hike.images || !hike.images.length) return false;
    const thumbnail = hike.images.map(parseImage).find(x => !x.isMap);
    if (!thumbnail) return false;
    return thumbnail.name;
  } catch(e) {
    e.message = `Cannot find preview image name for ${hike.slug}. ${e.message}`;
    throw e;
  }
}

const MetaTags = () => (<>
  <meta name="description" content="A digital scrapbook of our favorite walks and hikes in the Coquitlam area." />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://hiker.family/"/>
  <meta property="og:title" content="🥾 Coquitlam Family Hikes"/>
  <meta property="og:description" content="A digital scrapbook of our favorite walks and hikes in the Coquitlam area."/>
  <meta property="og:image" content="https://images.hiker.family/deboville-slough/004.jpg?nf_resize=smartcrop&w=800&h=800"/>

  {/* Twitter */}
  <meta property="twitter:card" content="summary_large_image"/>
  <meta property="twitter:url" content="https://hiker.family/"/>
  <meta property="twitter:title" content="🥾 Coquitlam Family Hikes"/>
  <meta property="twitter:description" content="A digital scrapbook of our favorite walks and hikes in the Coquitlam area."/>
  <meta property="twitter:image" content="https://images.hiker.family/deboville-slough/004.jpg?nf_resize=smartcrop&w=800&h=800"/>
</>)

export const MainPage = ({ hikes, mapCenter }) => (
  <App title='Coquitlam Family Hikes' className='main-page' MetaTagsComponent={MetaTags}>
    <div id='map-tab'/>
    <div id='list-tab'/>
    <div class='main'>
      <nav>
        <h1>Coquitlam Family Hikes</h1>
        <a class='map-link' href='/#map-tab'><MapIcon /></a>
        <a class='list-link' href='/#list-tab'><ListIcon /></a>
      </nav>
      <Map longitude={mapCenter.longitude} latitude={mapCenter.latitude} zoom={mapCenter.zoom} >
        { hikes.map(hike => (
          <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title={hike.name} >
            <div
              class='trailhead-map-marker-detail'
              style={`--background: ${previewImageCSS(hike)};`}
              >
              <div class='trailhead-map-marker-detail__text'>
                <h3><a href={`./${hike.slug}.html`}>{hike.name}</a></h3>
                <TrailSummary {...hike} />
              </div>
            </div>
          </MapMarker>
        )) }
      </Map>
      <section class='hike-tiles'>
        { hikes.sort((lhs, rhs) => lhs.area > rhs.area ? 1 : -1).map(hike => (
          <div class='hike-tile'>
            <div class='hike-tile__left-side hike-tile__text'>
              <a href={`./${hike.slug}.html`}>
                <div class='hike-tile__text__name'>{hike.name}</div>
                <div class='hike-tile__text__area'>({hike.area} Area)</div>
              </a>
            </div>
            <div class='hike-tile__right-side'>
              <TrailSummary {...hike} />
            </div>
          </div>
        )) }
      </section>
    </div>
  </App>
);
