import { h } from 'preact';
import { YesStroller } from '../icons/YesStroller';
import { NoStroller } from '../icons/NoStroller';

import { SummaryIcon } from './SummaryIcon';

export const Stroller = ({ level }) => {
  switch(level) {
    case 'yes': return <SummaryIcon IconComponent={YesStroller} label='Stroller' />
    case 'no': return <SummaryIcon IconComponent={NoStroller} label='No Stroller' />
  }
}
