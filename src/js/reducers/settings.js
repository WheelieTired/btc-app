import { merge, cloneDeep } from 'lodash';

const ONLINE_MODE = 'btc-app/settings/ONLINE_MODE';

const initState = {
  onlineMode: true,
  repIvalM: 10
};

export default function reducer( state = initState, action ) {
  let newState = cloneDeep(state);
  switch ( action.type ) {
  case ONLINE_MODE:
    return merge( {}, newState, { onlineMode: action.onlineMode } );
  default:
    // By default, return the original, uncloned state.
    // This makes sure that autorehydrate doesn't drop out.
    return state;
  }
  // Catch any cases that decide to mutate without returning.
  return newState;
}

/*
 * Go into either online or offline mode
 */
export function setOnlineMode( onlineMode ) {
  return { type: ONLINE_MODE, onlineMode };
}
