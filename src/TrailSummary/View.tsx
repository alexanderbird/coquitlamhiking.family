import { h } from 'preact';

import { SummaryIcon } from './SummaryIcon';

const ViewTitle = () => 'View';

export const View = ({ label }) => (
  <SummaryIcon IconComponent={ViewTitle} label={label} />
)
