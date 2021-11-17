import { h, Fragment } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import { getHikeThumbnailCSSUrl } from './getHikeThumbnailUrl';
import { Nav } from './Nav';

const metaTags = {
  title: "🥾 Find A Trail",
  description: "Choose your weather, duration, terrain, and incline to find a walk or hike in Coquitlam",
  image: "deboville-slough/004.jpg",
  path: "/find.html"
}

interface HikeTileProps {
  hikes: any[];
  slug: string;
  genome: string;
  image?: string;
  name?: string;
  notes?: string;
}

const HikeTile = ({ hikes, slug, genome, notes, name, image }: HikeTileProps) => {
  const hike = hikes.find(x => x.slug === slug);
  return (
    <a
      class='hike-tile'
      href={`./trail/${hike.slug}.html`}
      data-genome={genome}
      style={`--background: ${getHikeThumbnailCSSUrl(hike, image)};`}
      >
      <div class='hike-tile__text'>
        <h3>{name || hike.name}</h3>
        <TrailSummary {...hike} />
        <p>{notes}</p>
      </div>
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
  explanation?: string;
  id: string;
  constructor(code, label, explanation = '') {
    this.id = 'attribute-value--' + toID(label) + '--' + code;
    Object.assign(this, { code, label, explanation });
  }
}

const options = [
  new AttributeType({ index: 0, label: 'Weather', values: [
    new AttributeValue('h', 'Very Hot', 'something with water to cool off in'),
    new AttributeValue('f', 'Foggy', 'something sheltered that looks beautiful in the fog'),
    new AttributeValue('e', 'Anything Else')
  ] }),
  new AttributeType({ index: 1, label: 'Duration', values: [
    new AttributeValue('1', 'Short', 'less than one hour'),
    new AttributeValue('2', 'Medium', 'one to two hours'),
    new AttributeValue('3', 'Long', 'two or more hours'),
  ] }),
  new AttributeType({ index: 2, label: 'Terrain', values: [
    new AttributeValue('g', 'Smooth Gravel', 'suitable for strollers and casual walking'),
    new AttributeValue('s', 'Small Rocks & Roots', 'they\'re there, but you can mostly ignore them'),
    new AttributeValue('l', 'Large Rocks & Roots', 'obstacles will require big steps and a conscious effort to cross'),
  ] }),
  new AttributeType({ index: 3, label: 'Incline', values: [
    new AttributeValue('f', 'Flat'),
    new AttributeValue('s', 'Some Ups & Downs', 'some gentle inclines throughout the trail'),
    new AttributeValue('h', 'Quite Hilly', 'stairs or steep hills for some or all of the hike'),
  ] }),
]

const OptionFieldSet = ({ option }: { option: AttributeType }) => {
  return (
    <fieldset class='option-field-set' id={option.id} data-index={option.index}>
      <legend>{option.label}</legend>
      <div class='option-field-set__input-area generic-row-of-elements'>
        { option.values.map(optionValue => <OptionInput value={optionValue} />) }
      </div>
      <hr />
      <div class='option-field-set__button-area generic-row-of-elements'>
        <button class='option-field-set__button-previous'>Previous</button>
        <button class='option-field-set__button-next'>Next</button>
      </div>
    </fieldset>
  );
}

const OptionInput = ({ value }: { value: AttributeValue }) => {
  return (<>
    <input class='option-input__checkbox' type='checkbox' id={value.id} data-code={value.code} />
    <label class='option-input__label' for={value.id}>
      <b>{ value.label }</b>
      <i>{value.explanation}</i>
    </label>
  </>);
}

export const FindATrailPage = ({ hikes }) => (
  <App title='Find A Trail' className='find-page' metaTags={metaTags}>
    <div id='map-tab'/>
    <div id='list-tab'/>
    <div class='main'>
      <Nav active='find' title='Find A Trail'/>
      <div class='trailfinder'>
        <p class='trailfinder__prompt'>What type of hike or walk are you looking for?</p>
        {
          options.map(option => <OptionFieldSet option={option} />)
        }

        <div class='trails'>
          <HikeTile hikes={hikes} slug='pinecone-burke' genome='f1sh' image="002"
            name="Pinecone Burke: Downhill of Harper Access Road"
            notes="Park at the yellow gate. There's a trail 100m south of the gate. It's not a listed mountain bike trail so you don't have to worry about cyclists" />
          <HikeTile hikes={hikes} slug='galette-ave-coquitlam-river' genome='e1sf' />
          <HikeTile hikes={hikes} slug='rocky-point-pier' genome='e1gf' />
          <HikeTile hikes={hikes} slug='minnekhada' genome='e1ss'
            notes='Fern Trail, Lodge Trail&comma; or Addington Lookout Trail' />
          <HikeTile hikes={hikes} slug='harper-park' genome='e1gh' />
          <HikeTile hikes={hikes} slug='pitt-river' genome='e2gf'
            notes="for a loop, try the Deboville Slough. If it's quite windy, consider Colony Farm Regional Park instead." />
          <HikeTile hikes={hikes} slug='admiralty-point' genome='f2ls'
            notes="option to turn back at Cod Rock or Maple Beach" />
          <HikeTile hikes={hikes} slug='deiner-creek' genome='h2lh' image="004" />
          <HikeTile hikes={hikes} slug='pinecone-burke' genome='e2lh' image="005"
            name="Pinecone Burke: Frank's to Hustler via Conifer"
            notes="Frank's &rarr; Conifer Drive &rarr; Hustler" />
          <HikeTile hikes={hikes} slug='pinecone-burke' genome='h3lh' image="008"
            name="Pinecone Burke: Woodland Walk to Lower Vic's"
            notes="Recycle &rarr; Woodland Walk &rarr Lower Vic's &rarr; wading pools between waterfalls" />
          <HikeTile hikes={hikes} slug='pinecone-burke' genome='e3lh' image="007"
            name="Pinecone Burke: Frank's & the Gravel Road Climb to the View"
            notes="Frank's &rarr; Gravel Road Climb" />
          <HikeTile hikes={hikes} slug='jug-island' genome='f3lh' />
          <div class='find-page__button-area'>
            <button class='find-page__button-previous'>Previous</button>
            <button class='find-page__button-reset'>Start Over</button>
          </div>
        </div>

      </div>

    </div>
  </App>
);
