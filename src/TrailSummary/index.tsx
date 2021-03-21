import { h } from 'preact';
import { Hilly } from './Hilly';
import { View } from './View';
import { Stroller } from './Stroller';

export const TrailSummary = ({ hilly, stroller, view }) => (
  <div class='trail-summary'>
    <Hilly level={hilly} />
    <Stroller level={stroller} />
    <View label={view} />
  </div>
)
