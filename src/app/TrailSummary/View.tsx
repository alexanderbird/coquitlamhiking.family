import { h } from 'preact';
import { Forest } from '../icons/Forest';
import { Mountain } from '../icons/Mountain';
import { Ocean } from '../icons/Ocean';
import { River } from '../icons/River';
import { Waterfall } from '../icons/Waterfall';
import { Wetland } from '../icons/Wetland';

import { SummaryIcon } from './SummaryIcon';

const ViewTitle = () => 'View: ';

function getIconFor(type) {
  switch(type) {
    case 'forest': return Forest;
    case 'mountain': return Mountain;
    case 'ocean': return Ocean;
    case 'river': return River;
    case 'waterfall': return Waterfall;
    case 'wetland': return Wetland;
  }
}

export const View = ({ type, text }) => {
  const IconComponent = getIconFor(type);
  const label = text + ' ' + (text.match(/&/) ? 'Views' : 'View');
  return <SummaryIcon IconComponent={IconComponent} label={label} />;
};
