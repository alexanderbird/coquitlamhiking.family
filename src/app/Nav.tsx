import { h } from 'preact';
import { Map as MapIcon } from './icons/Map';
import { List as ListIcon } from './icons/List';

export const Nav = () => (
  <nav>
    <h1>Coquitlam Family Hikes</h1>
    <a class='map-link' href='/#map-tab'><MapIcon /></a>
    <a class='list-link' href='/#list-tab'><ListIcon /></a>
  </nav>
);
