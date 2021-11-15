import { h } from 'preact';
import type { ComponentChildren } from "preact";

export interface MapProps {
  latitude: number,
  longitude: number,
  zoom: number,
  width?: number,
  height?: number,
  children?: ComponentChildren
}

export const Map = ({ latitude, longitude, zoom, children, width, height }: MapProps) => (
 <div id='map' 
   style={`--map-grid-width: ${width}; --map-grid-height: ${height};`}
   data-latitude={latitude} data-longitude={longitude} data-zoom={zoom}>
   { children }
 </div>
)
