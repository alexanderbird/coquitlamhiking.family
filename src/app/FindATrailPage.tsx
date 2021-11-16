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

export const FindATrailPage = ({ hikes }) => (
  <App title='Find A Trail' className='main-page' metaTags={metaTags}>
    <div id='map-tab'/>
    <div id='list-tab'/>
    <div class='main'>
      <Nav active='find'/>
      <div>Coming soon</div>
      <ul>
        <li>Season? (summer | fall,winter,spring)</li>
        <li>Duration? (&lt;30m | 1hr+ | 2hr+ | no preference)</li>
        <li>Terrain? Select up to and including (smooth gravel &gt; small rocks & roots &gt; rocks & roots)</li>
        <li>Incline? Select up to and including (flat &gt; some ups and downs &gt; quite hilly)</li>
      </ul>
      <pre>

season , duration , terrain                   , incline            , view                    , hike slug                   , hike                              , notes<br/>
any    , &lt;30m     , small rocks & roots       , flat               , river                   , galette-ave-coquitlam-river , Galette Ave Coquitlam River Trail ,<br/>
any    , &lt;30m     , smooth gravel             , flat               , ocean inlet             , rocky-point-pier            , Rocky Point Park Pier             ,<br/>
any    , &lt;30m     , boardwalk & smooth gravel , some ups and downs , forest & wetland        , minnekhada                  , Minnekhada                        , Fern Trail&comma; Lodge Trail&comma; or Addington Lookout Trail<br/>
any    , &lt;30m     , smooth gravel             , quite hilly        , forest                  , harper-park                 , Harper Park                       ,<br/>
any    , 1hr+     , smooth gravel             , flat               , river between mountains , pitt-river                  , Poco Trail @ Prairie Ave          , for a loop&comma; try the Deboville Slough. If it's quite windy                       , consider Colony Farm Regional Park instead.<br/>
any    , 1hr+     , rocks & roots             , some ups and downs , ocean inlet             , admiralty-point             , Admiralty Point                   , option to turn back at Cod Rock or Maple Beach<br/>
summer , 1hr+     , rocks & roots             , quite hilly        , forest & waterfall      , deiner-creek                , Deiner Creek Falls<br/>
any    , 1hr+     , rocks & roots             , quite hilly        , forest                  , pinecone-burke              , Pinecone Burke                    , Frank's &rarr; Conifer Drive &rarr; Hustler<br/>
summer , 2hr+     , rocks & roots             , quite hilly        , forest & waterfall      , pinecone-burke              , Pinecone Burke                    , Recycle &rarr; Woodland Walk &rarr Lower Vic's &rarr; wading pools between waterfalls<br/>
any    , 2hr+     , rocks & roots             , quite hilly        , forest & Fraser Valley  , pinecone-burke              , Pinecone Burke                    , Frank's &rarr; Gravel Road Climb<br/>
any    , 2hr+     , rocks & roots             , quite hilly        , ocean inlet             , jug-island                  , Jug Island<br/>
      </pre>

    </div>
  </App>
);
