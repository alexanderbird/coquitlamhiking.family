import { h, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { ViewIcon } from './TrailSummary';
import { getHikeThumbnailUrl } from './getHikeThumbnailUrl';
import { Nav } from './Nav';

const metaTags = {
  title: "🥾 Find A Trail",
  description: "Choose your weather, duration, terrain, and incline to find a walk or hike in Coquitlam",
  image: "deboville-slough/004.jpg",
  path: "/find.html"
}

const Checkbox = ({ name, children, checked }: { name: string, children: any, checked?: boolean }) => (<>
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
      <ViewIcon {...hike} />
      <p>{notes}</p>
    </a>
  );
}

class AttributeType {
  index: number;
  values: AttributeValue[];
  label: string;
  id: string;

  constructor({ index, values, label }) {
    this.id = 'attribute-type--' + toID(label);
    Object.assign(this, { index, values, label });
  }
}

function toID(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

class AttributeValue {
  code: string;
  label: string;
  id: string;
  constructor(code, label) {
    this.id = 'attribute-value--' + toID(label) + '--' + code;
    Object.assign(this, { code, label });
  }
}

const options = [
  new AttributeType({ index: 0, label: 'Weather', values: [
    new AttributeValue('h', 'Very Hot'),
    new AttributeValue('f', 'Very Foggy'),
    new AttributeValue('e', 'Everything Else')
  ] }),
  new AttributeType({ index: 1, label: 'Duration', values: [
    new AttributeValue('1', '<30m'),
    new AttributeValue('2', '1hr+'),
    new AttributeValue('3', '2hr+'),
  ] }),
  new AttributeType({ index: 2, label: 'Terrain', values: [
    new AttributeValue('g', 'Smooth Gravel'),
    new AttributeValue('s', 'Small Rocks & Roots'),
    new AttributeValue('l', 'Large Rocks & Roots'),
  ] }),
  new AttributeType({ index: 3, label: 'Incline', values: [
    new AttributeValue('f', 'Flat'),
    new AttributeValue('s', 'Some Ups & Downs'),
    new AttributeValue('h', 'Quite Hilly'),
  ] }),
]

const OptionFieldSet = ({ option }: { option: AttributeType }) => {
  return (
    <fieldset class='option-field-set' id={option.id} data-index={option.index}>
      <legend>{option.label}</legend>
      { option.values.map(optionValue => <OptionInput value={optionValue} />) }
      <button class='option-field-set__button-previous'>Previous</button>
      <button class='option-field-set__button-next'>Next</button>
    </fieldset>
  );
}

const OptionInput = ({ value }: { value: AttributeValue }) => {
  return (<>
    <input type='checkbox' id={value.id} />
    <label for={value.id}>{ value.label }</label>
  </>);
}

export const FindATrailPage = ({ hikes }) => (
  <App title='Find A Trail' className='find-page' metaTags={metaTags}>
    <div id='map-tab'/>
    <div id='list-tab'/>
    <div class='main'>
      <Nav active='find' title='Find A Trail'/>
      <div>This page is a work in progress</div>
      <div class='trailfinder'>
        {
          options.map(option => <OptionFieldSet option={option} />)
        }

        <div class='trails'>
          <HikeTile hikes={hikes} slug='galette-ave-coquitlam-river'
            attributes={['weather-any', 'duration-30', 'terrain-small', 'incline-flat']} />
          <HikeTile hikes={hikes} slug='rocky-point-pier' 
            attributes={['weather-any', 'duration-30', 'terrain-smooth', 'incline-flat']} />
          <HikeTile hikes={hikes} slug='minnekhada' notes='Fern Trail, Lodge Trail&comma; or Addington Lookout Trail'
            attributes={['weather-any', 'duration-30', 'terrain-small', 'incline-ups-and-downs']} />
          <HikeTile hikes={hikes} slug='harper-park' 
            attributes={['weather-any', 'duration-30', 'terrain-smooth', 'incline-hilly']} />
          <HikeTile hikes={hikes} slug='pitt-river' notes="for a loop, try the Deboville Slough. If it's quite windy, consider Colony Farm Regional Park instead."
            attributes={['weather-any', 'duration-60', 'terrain-smooth', 'incline-flat']} />
          <HikeTile hikes={hikes} slug='admiralty-point' 
            notes="option to turn back at Cod Rock or Maple Beach"
            attributes={['weather-any', 'duration-60', 'terrain-large', 'incline-ups-and-downs']} />
          <HikeTile hikes={hikes} slug='deiner-creek'
            attributes={['weather-summer', 'duration-60', 'terrain-large', 'incline-hilly']} />
          <HikeTile hikes={hikes} slug='pinecone-burke' 
            name="Pinecone Burke: Frank's to Hustler via Conifer"
            notes="Frank's &rarr; Conifer Drive &rarr; Hustler"
            attributes={['weather-any', 'duration-60', 'terrain-large', 'incline-hilly']} />
          <HikeTile hikes={hikes} slug='pinecone-burke' 
            name="Pinecone Burke: Woodland Walk to Lower Vic's"
            notes="Recycle &rarr; Woodland Walk &rarr Lower Vic's &rarr; wading pools between waterfalls"
            attributes={['weather-summer', 'duration-120', 'terrain-large', 'incline-hilly']} />
          <HikeTile hikes={hikes} slug='pinecone-burke' 
            name="Pinecone Burke: Frank's & the Gravel Road Climb to the View"
            notes="Frank's &rarr; Gravel Road Climb"
            attributes={['weather-any', 'duration-120', 'terrain-large', 'incline-hilly']} />
          <HikeTile hikes={hikes} slug='jug-island'
            attributes={['weather-any', 'duration-120', 'terrain-large', 'incline-hilly']} />
          <button class='find-page__button-reset'>Reset</button>
        </div>

      </div>

    </div>
  </App>
);
