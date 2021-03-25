import { h } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { parseImage } from './parseImage';
import { Map as MapIcon } from './icons/Map';
import { List as ListIcon } from './icons/List';

const previewImageCSS = hike => {
  if (!hike.images || !hike.images.length) return '';
  const { name } = parseImage(hike.images[0]);
  return `url(https://images.hiker.family/${hike.slug}/${name}.jpg?nf_resize=smartcrop&w=300&h=400)`;
}

export const MainPage = ({ hikes, mapCenter }) => (
  <App title='Coquitlam Family Hikes' className='main-page'>
    <div id='map-tab'/>
    <div id='list-tab'/>
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
  </App>
);
