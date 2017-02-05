import { cloneDeep } from 'lodash';

export const SET_DRAWER_TITLE = 'SET_DRAWER_TITLE';

/* sets a new title on the top nav bar */
export function setDrawer( newTitle ) {
  return { type: SET_DRAWER_TITLE, newTitle };
}

export default function drawer( state = '', action ) {
  let newState = cloneDeep(state);
  switch ( action.type ) {
  case SET_DRAWER_TITLE:
    return action.newTitle;
  default:
  	// By default, return the original, uncloned state.
    // This makes sure that autorehydrate doesn't drop out.
    return state;
  }
  // Catch any cases that decide to mutate without returning.
  return newState;
}
