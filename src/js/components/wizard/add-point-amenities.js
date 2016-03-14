/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, CardText, FontIcon } from 'material-ui';

import DropDown from '../drop-down';
/*eslint-disable no-unused-vars*/

import { types, displayType } from '../../types';
import WizardPage from './wizard-page';

export class AddPointAmenities extends WizardPage {
  constructor( props ) {
    super( props );
    this.state = {
      amenity: null
    };
  }

  componentDidMount() {
    const {setDrawer, newPoint} = this.props;
    setDrawer( newPoint._id ? 'Update Amenities' : 'Add Amenities' );
  }

  addAmenity() {
    const {addPointAmenity} = this.props;
    addPointAmenity( this.state.amenity );
  }

  removeAmenity( index ) {
    const {removePointAmenity} = this.props;
    removePointAmenity( index );
  }

  selectAmenity( amenity ) {
    this.setState( { amenity } );
  }

  getPageContent() {
    const amenityOptions = types.map( ( amenity ) => {
      return (<option key={ amenity } value={ amenity }>
                { displayType( amenity ) }
              </option>);
    } );

    let addAmenityButton = (
    <RaisedButton secondary
      disabled={ !( this.state.amenity || this.props.newPoint.amenities.indexOf( this.state.amenity ) !== -1 ) }
      onClick={ this.addAmenity.bind( this ) }
      label="Add Amenity" />
    );
    if ( this.props.newPoint.amenities && this.props.newPoint.amenities.indexOf( this.state.amenity ) !== -1 ) {
      addAmenityButton = (
        <RaisedButton secondary
          disabled
          label="Add Amenity" />
      );
    }

    const amenities = this.props.newPoint.amenities.map( ( amenity, index ) => {
      return (
        <RaisedButton key={ amenity }
          style={ { margin: 8 } }
          onClick={ this.removeAmenity.bind( this, amenity ) }
          label={ displayType( amenity ) }
          labelPosition="before"
          icon={ <FontIcon className="material-icons">
                   clear
                 </FontIcon> } />
        );
    } );

    return (
      <div className="wizard-page">
        <DropDown options={ types }
          text="Amenity"
          textTransform={ displayType }
          onSelectFunction={ this.selectAmenity.bind( this ) } />
        <div>
          { amenities }
        </div>
        <div className="wizard-page__spacer" />
        { addAmenityButton }
      </div>
      );
  }

  getTransition() {
    return WizardPage.transitions.submit;
  }
}

export default AddPointAmenities;