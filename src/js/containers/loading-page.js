/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { replicatePointsWithCallback } from '../reducers/points';

import { LetterheadPage } from '../components/page';
import { Block } from '../components/block';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import history from '../history';

export class LoadingPage extends Component {
  componentDidMount() {
    const {onlineMode} = this.props.settings;
    if ( onlineMode ){
	
    let handler = (function(me){
    	return function(){
    		return history.push(`update-service/${ encodeURIComponent( me.props.params.id ) }`);
    	}
    }(this));
      this.props.replicatePointsWithCallback(handler);
    }
  }

  render() {
    return (
      <LetterheadPage>
        <Block header='Loading most up-to-date service information...' />
      </LetterheadPage>
      );
  }

  static mapDispatchToProps( dispatch ) {
    return {
      ...bindActionCreators( {
        'replicatePointsWithCallback': replicatePointsWithCallback
      }, dispatch )
    };
  }

  static mapStateToProps( state ) {
    return {
      settings: state.settings
    };
  }
}

export default connect( LoadingPage.mapStateToProps, LoadingPage.mapDispatchToProps )( LoadingPage );
