import { h } from 'preact';

import type { ComponentChildren } from "preact";

export interface MapMarkerProps {
  latitude: number,
  longitude: number,
  title: string,
  children?: ComponentChildren
}

export const MapMarker = ({ latitude, longitude, title, children }: MapMarkerProps) => (
  <div class='map__marker'
    data-latitude={latitude}
    data-longitude={longitude}
    data-title={title}>
    { children }
  </div>
)
