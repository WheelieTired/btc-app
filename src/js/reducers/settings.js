import { merge, cloneDeep } from 'lodash';

const ONLINE_MODE = 'btc-app/settings/ONLINE_MODE';
const SHOWN_ONBOARDING = 'btc-app/settings/SHOWN_ONBOARDING';

const initState = {
  onlineMode: true,
  repIvalM: 10,
  shownOnboarding: false
};

export default function reducer( state = initState, action ) {
  let newState = cloneDeep(state);
  switch ( action.type ) {
  case ONLINE_MODE:
    return merge( {}, newState, { onlineMode: action.onlineMode } );
  case SHOWN_ONBOARDING:
    return merge( {}, newState, { shownOnboarding: true } );
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

/*
 * Show the onboarding panels only on first app load
 */
export function setShownOnboarding( shownOnboarding ) {
  return { type: SHOWN_ONBOARDING, shownOnboarding };
}

