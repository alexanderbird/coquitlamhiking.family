import { h } from 'preact';

export const SummaryIcon = ({ IconComponent, label }) => (
  <div class='summary-icon'>
    <IconComponent />
    <span>{label}</span>
  </div>
);
