import { h, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { getHikeThumbnailCSSUrl } from './getHikeThumbnailUrl';
import { Nav } from './Nav';

const metaTags = {
  title: "🥾 Coquitlam Family Hikes",
  description: "A digital scrapbook of our favorite walks and hikes in the Coquitlam area." ,
  image: "deboville-slough/004.jpg",
  path: ""
}

export const MainPage = ({ hikes, mapCenter }) => (
  <App title='Coquitlam Family Hikes' className='main-page' metaTags={metaTags}>
    <div id='map-tab'/>
    <div id='list-tab'/>
    <div class='main'>
      <Nav active='map' title='Coquitlam Family Hikes' />
      <Map longitude={mapCenter.longitude} latitude={mapCenter.latitude} zoom={mapCenter.zoom} >
        { hikes.map(hike => (
          <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title={hike.name} >
            <div
              class='trailhead-map-marker-detail'
              style={`--background: ${getHikeThumbnailCSSUrl(hike)};`}
              >
              <div class='trailhead-map-marker-detail__text'>
                <h3><a href={`./trail/${hike.slug}.html`}>{hike.name}</a></h3>
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
              <a href={`./trail/${hike.slug}.html`}>
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
