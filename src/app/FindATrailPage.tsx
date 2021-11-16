import { h, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { getHikeThumbnailUrl } from './getHikeThumbnailUrl';
import { Nav } from './Nav';

const metaTags = {
  title: "🥾 Find A Trail",
  description: "Choose your season, duration, terrain, and incline to find a hike in Coquitlam",
  image: "https://images.hiker.family/deboville-slough/004.jpg?nf_resize=smartcrop&w=800&h=800",
  path: "/find.html"
}

const Checkbox = ({ name, children, checked }) => (<>
  <input type='checkbox' id={name} checked={checked}/>
  <label for={name}>{ children }</label>
</>);

interface HikeTileProps {
  hikes: any[];
  slug: string;
  attributes: string[];
  name?: string;
  notes?: string;
}

const HikeTile = ({ hikes, slug, attributes, notes, name }: HikeTileProps) => {
  const hike = hikes.find(x => x.slug === slug);
  return (
    <a class='hike-tile' href={`/trail/${hike.slug}.html`} data-attributes={'~' + attributes.join('~') + '~'}>
      <img src={getHikeThumbnailUrl(hike)} />
      <h4>{name || hike.name}</h4>
      <p>{notes}</p>
    </a>
  );
}

/*
 * The problem with the pure CSS option is that it doesn't protect you from dead ends. Instead, we should model
 * the hikes as a directed graph from season to duration to terrain to incline to trail. At each step of the wizard,
 * if there are no trail leaf nodes, then don't show the option. 
 *
 * For layer "Season", count each of the seasons as invalid. Do a BFT. Any season that leads to a trail is considered valid. 
 * Allow the user to select any number of valid seasons, at least 1.
 * press next
 * traverse (depth=1) to the durations. Consider each of the durations invalid. Do a BFT. Any duration that leads to a trail is considered valid. 
 * Allow the user to select any number of valid durations.
 * press next.
 * Repeat until we get to trails.
 */

export const FindATrailPage = ({ hikes }) => (
  <App title='Find A Trail' className='find-page' metaTags={metaTags}>
    <div id='map-tab'/>
    <div id='list-tab'/>
    <div class='main'>
      <Nav active='find'/>
      <div>This page is a work in progress</div>
      <div class='trailfinder'>
        <h3>Season</h3>
        <Checkbox checked={false} name='season-summer'>Summer</Checkbox>
        <Checkbox checked={false} name='season-fall'>Fall</Checkbox>
        <Checkbox checked={false} name='season-winter'>Winter</Checkbox>
        <Checkbox checked={false} name='season-spring'>Spring</Checkbox>

        <h3>Duration</h3>
        <Checkbox checked={true} name='duration-30'>&lt;30m</Checkbox>
        <Checkbox checked={true} name='duration-60'>1hr+</Checkbox>
        <Checkbox checked={true} name='duration-120'>2hr+</Checkbox>

        <h3>Terrain</h3>
        <Checkbox checked={true} name='terrain-smooth'>smooth gravel</Checkbox>
        <Checkbox checked={true} name='terrain-small'>small rocks &amp; roots</Checkbox>
        <Checkbox checked={true} name='terrain-large'>large rocks &amp; roots</Checkbox>

        <h3>Incline</h3>
        <Checkbox checked={true} name='incline-flat'>flat</Checkbox>
        <Checkbox checked={true} name='incline-ups-and-downs'>some ups &amp; downs</Checkbox>
        <Checkbox checked={true} name='incline-hilly'>quite hilly</Checkbox>

        <HikeTile hikes={hikes} slug='galette-ave-coquitlam-river'
          attributes={['season-any', 'duration-30', 'terrain-small', 'incline-flat']} />
        <HikeTile hikes={hikes} slug='rocky-point-pier' 
          attributes={['season-any', 'duration-30', 'terrain-smooth', 'incline-flat']} />
        <HikeTile hikes={hikes} slug='minnekhada' notes='Fern Trail, Lodge Trail&comma; or Addington Lookout Trail'
          attributes={['season-any', 'duration-30', 'terrain-small', 'incline-ups-and-downs']} />
        <HikeTile hikes={hikes} slug='harper-park' 
          attributes={['season-any', 'duration-30', 'terrain-smooth', 'incline-hilly']} />
        <HikeTile hikes={hikes} slug='pitt-river' notes="for a loop, try the Deboville Slough. If it's quite windy, consider Colony Farm Regional Park instead."
          attributes={['season-any', 'duration-60', 'terrain-smooth', 'incline-flat']} />
        <HikeTile hikes={hikes} slug='admiralty-point' 
          notes="option to turn back at Cod Rock or Maple Beach"
          attributes={['season-any', 'duration-60', 'terrain-large', 'incline-ups-and-downs']} />
        <HikeTile hikes={hikes} slug='deiner-creek'
          attributes={['season-summer', 'duration-60', 'terrain-large', 'incline-hilly']} />
        <HikeTile hikes={hikes} slug='pinecone-burke' 
          name="Pinecone Burke: Frank's to Hustler via Conifer"
          notes="Frank's &rarr; Conifer Drive &rarr; Hustler"
          attributes={['season-any', 'duration-60', 'terrain-large', 'incline-hilly']} />
        <HikeTile hikes={hikes} slug='pinecone-burke' 
          name="Pinecone Burke: Woodland Walk to Lower Vic's"
          notes="Recycle &rarr; Woodland Walk &rarr Lower Vic's &rarr; wading pools between waterfalls"
          attributes={['season-summer', 'duration-120', 'terrain-large', 'incline-hilly']} />
        <HikeTile hikes={hikes} slug='pinecone-burke' 
          name="Pinecone Burke: Frank's & the Gravel Road Climb to the View"
          notes="Frank's &rarr; Gravel Road Climb"
          attributes={['season-any', 'duration-120', 'terrain-large', 'incline-hilly']} />
        <HikeTile hikes={hikes} slug='jug-island'
          attributes={['season-any', 'duration-120', 'terrain-large', 'incline-hilly']} />
      </div>

    </div>
  </App>
);
