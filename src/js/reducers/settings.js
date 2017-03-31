const ONLINE_MODE = 'btc-app/settings/ONLINE_MODE';
const SHOWN_ONBOARDING = 'btc-app/settings/SHOWN_ONBOARDING';

const initState = {
  onlineMode: true,
  repIvalM: 10,
  shownOnboarding: false
};

export default function reducer( state = initState, action ) {
  switch ( action.type ) {
  case ONLINE_MODE:
    return { ...state, onlineMode: action.onlineMode };
  case SHOWN_ONBOARDING:
    return { ...state, shownOnboarding: true };
  default:
    return state;
  }
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

