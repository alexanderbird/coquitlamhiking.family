import { h } from 'preact';
import type { ComponentChildren } from "preact";

export interface MapProps {
  latitude: number,
  longitude: number,
  zoom: number,
  children?: ComponentChildren
}

export const Map = ({ latitude, longitude, zoom, children }: MapProps) => (
 <div id='map' data-latitude={latitude} data-longitude={longitude} data-zoom={zoom}>
   { children }
 </div>
)
