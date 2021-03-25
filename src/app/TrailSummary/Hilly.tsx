import { h } from 'preact';
import { Hilly as HillyIcon } from '../icons/Hilly';
import { SomewhatHilly } from '../icons/SomewhatHilly';
import { NotHilly } from '../icons/NotHilly';

import { SummaryIcon } from './SummaryIcon';

export const Hilly = ({ level }) => {
  switch(level) {
    case 'yes': return <SummaryIcon IconComponent={HillyIcon} label='Hilly' />
    case 'somewhat': return <SummaryIcon IconComponent={SomewhatHilly} label='Somewhat Hilly' />
    case 'no': return <SummaryIcon IconComponent={NotHilly} label='Flat' />
  }
}
