/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { replicatePoints } from '../reducers/points';

import { LetterheadPage } from '../components/page';
import { Block } from '../components/block';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class LoadingPage extends Component {
  getPageUrl() {
    const id = encodeURIComponent( this.props.params.id );
    return `loading/${ id }`;
  }

  componentDidMount() {
    const {onlineMode} = this.props.settings;
    if ( onlineMode ){
      replicatePoints().then(()=>{
        this.navigate( 'update-service' );
        console.log("updated points");
        });
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
      ...super.mapDispatchToProps( dispatch ),
      ...bindActionCreators( {
        'replicatePoints': replicatePoints
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
