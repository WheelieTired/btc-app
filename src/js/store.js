/*global process*/
import notifications from './reducers/notifications';
import points from './reducers/points';
import tracks from './reducers/tracks';
import settings from './reducers/settings';
import network from './reducers/network';
import map from './reducers/map';
import filters from './reducers/filter';
import account from './reducers/account';
import drawer from './reducers/btc-drawer';

import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate, createTransform } from 'redux-persist'
import thunk from 'redux-thunk';

const devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;

const args = [ autoRehydrate(), applyMiddleware( thunk )];
if ( process.env.NODE_ENV === 'development' ) {
  args.push( devTools );
}

const theStore = compose.apply( null, args )( createStore )( combineReducers( {
  notifications,
  points,
  tracks,
  settings,
  network,
  map,
  filters,
  account,
drawer } ) );

function specialSerializeMakeMutable(inboundState, key) {
	return inboundState.toJS();
}

function specialDeserializeMakeImmutable(outboundState, key) {
	return(fromJS(outboundState));
}

// The tracks reducer wraps its state in the immutable library's imutableness.
// We need to add these extra steps on serialize and deserialize.
let immutableTransformer = createTransform(
  (inboundState, key) => specialSerializeMakeMutable(inboundState, key),
  (outboundState, key) => specialDeserializeMakeImmutable(outboundState, key),
  {whitelist: ['tracks']}
);

persistStore(theStore, {transforms: [immutableTransformer]});

export default theStore;
