import { assign, cloneDeep } from 'lodash';

export const SET_SNACKBAR = 'btc-app/dialog/SET_SNACKBAR';
export const CLOSE_SNACKBAR = 'btc-app/dialog/CLOSE_SNACKBAR';

const initState = {
  message: '',
  open: false,
  autoHideDuration: 4000
};

export default function dialog( state = initState, action ) {
  let newState = cloneDeep(state);
  switch ( action.type ) {
  case SET_SNACKBAR:
    return assign( {}, newState, action.dialog, { open: true } );
  case CLOSE_SNACKBAR:
    return assign( {}, initState );
  default:
    // By default, return the original, uncloned state.
    // This makes sure that autorehydrate doesn't drop out.
    return state;
  }
  // Catch any cases that decide to mutate without returning.
  return newState;
}

export function setSnackbar( dialog, timeout ) {
  if ( timeout ) {
    return dispatch => {
      setTimeout( ( ) => {
        dispatch( setSnackbar( dialog ) );
      }, timeout );
    };
  } else {
    return { type: SET_SNACKBAR, dialog };
  }
}

export function closeSnackbar() {
  return { type: CLOSE_SNACKBAR };
}
