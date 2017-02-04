/*eslint-disable no-unused-vars*/
import React from 'react';
import { Card, CardActions, CardText, FlatButton, Paper, TextField, List, ListItem } from 'material-ui';

import PointCard from './point-card';
import { FormBlock } from '../block';
import RatingSelector from '../rating-selector';
/*eslint-enable no-unused-vars*/

import { bindAll, cloneDeep } from 'lodash';
import history from '../../history';

import uuid from 'node-uuid';
import { Service } from 'btc-models';



export class FlagPointCard extends PointCard {
 
  constructor( props ) {
    super( props );
    bindAll( this, 'callToFlagPoint' );
    this.errorMessage = "";
  }

  getCardState() {
    return 'point-card--flag';
  }

  getCardAction() {
    const goBack = history.goBack.bind( history );
    return <FlatButton label="Go Back"
             onTouchTap={ goBack } />;
  }

  getCardContent() {
    return (
      <div className="point-card__content">
        { this.getFlagEntry() }
      </div>
      );
  }

callToFlagPoint( values ) {
    const {flagPoint} = this.props;
    flagPoint( this.point._id, values.reason );
  }

  getFlagEntry() {
    // See the FormBlock class in block.js for how this tree works.
    const fields = [ {
      rowClassName: 'flag-entry',
      row: [ {
        name: 'reason',
        hint: 'Why are you flagging this point?',
        className: 'entry__flagging'
      } ]
    } ];
    return (
      <FormBlock onAction={ this.callToFlagPoint}
        thinActionButton
        zDepth={ 0 }
        actionText="Flag"
        fields={ fields }
        problemText={ this.errorMessage } />
      );
  }
}

export default FlagPointCard;