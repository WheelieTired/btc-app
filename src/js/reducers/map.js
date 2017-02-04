import { cloneDeep } from 'lodash';
import objectAssign from 'object-assign';

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const SET_MAP_LOADING = 'SET_MAP_LOADING';
export const SET_GEO_LOCATION = 'SET_GEO_LOCATION';

const USMap = { center: [ 39.8145, -99.9946 ], zoom: 3 };

export default function map( state = { loading: true, center: USMap.center, zoom: USMap.zoom } , action ) {
  let newState = cloneDeep(state);
  switch ( action.type ) {
  case SET_MAP_CENTER:
    return objectAssign( {}, newState, { center: action.center } );
  case SET_MAP_ZOOM:
    return objectAssign( {}, newState, { zoom: action.zoom } );
  case SET_MAP_LOADING:
    return objectAssign( {}, newState, { loading: action.loading } );
  case SET_GEO_LOCATION:
    return objectAssign( {}, newState, { geolocation: action.geolocation } );
  default:
    // By default, return the original, uncloned state.
    // This makes sure that autorehydrate doesn't drop out.
    return state;
  }
  // Catch any cases that decide to mutate without returning.
  return newState;
}

export function setMapCenter( center ) {
  return { type: SET_MAP_CENTER, center };
}

export function setMapZoom( zoom ) {
  return { type: SET_MAP_ZOOM, zoom };
}

export function setMapLoading( loading ) {
  return { type: SET_MAP_LOADING, loading };
}

export function setGeoLocation( geolocation ) {
  return { type: SET_GEO_LOCATION, geolocation };
}
