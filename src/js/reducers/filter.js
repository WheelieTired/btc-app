import { cloneDeep } from 'lodash';
import objectAssign from 'object-assign';

const SET_FILTERS = 'SET_FILTERS';

const initState = {
  activeFilters: [],
  openServices: false,
  hideAlert: false
};

export default function filters( state = initState, action ) {
  let newState = cloneDeep(state);
  switch ( action.type ) {
  case SET_FILTERS:
    return objectAssign( {}, newState, {
      activeFilters: [ ...action.filters.activeFilters ],
      openServices: action.filters.openServices,
      hideAlert: action.filters.hideAlert
    } );
  default:
    // By default, return the original, uncloned state.
    // This makes sure that autorehydrate doesn't drop out.
    return state;
  }
  // Catch any cases that decide to mutate without returning.
  return newState;
}

export function setFilters( filters ) {
  return { type: SET_FILTERS, filters };
}
