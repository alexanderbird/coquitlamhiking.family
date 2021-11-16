import { h } from 'preact';
import { Map as MapIcon } from './icons/Map';
import { List as ListIcon } from './icons/List';
import { Help as HelpIcon } from './icons/Help';

interface NavProps {
  active?: String;
}


export const Nav = ({ active }: NavProps) => {
  const activeClass = page => active === page ? 'nav-link--active' : '';
  return (
    <nav>
      <h1>Coquitlam Family Hikes</h1>
      <a class={'nav-link find-link ' + activeClass('find')}title="Find a trail" href='/find.html'><HelpIcon /></a>
      <a class={'nav-link map-link ' + activeClass('map')} title="Browse by map" href='/#map-tab'><MapIcon /></a>
      <a class={'nav-link list-link ' + activeClass('list')} title="Browse list" href='/#list-tab'><ListIcon /></a>
    </nav>
  );
}
