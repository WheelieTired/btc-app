import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PointPage from './point-page';
import * as tabs from './tabs';
import { loadPoint } from '../../actions/new-point-actions';
import history from '../../history';

export class UpdatePointPage extends PointPage {
  getPageUrl() {
    const { _id } = this.props.newPoint;
    const id = encodeURIComponent( _id );

    return `/update-point/${id}`;
  }

  getTabSet() {
    return [
      tabs.PointDescriptionTab,
      tabs.PointHoursTab,
      tabs.PointAmenitiesTab,
    ];
  }

  onFinal( blob = undefined ) {
    const point = this.props.newPoint;

    console.log( 'implement UpdatePointPage#onFinal()' );

    history.push( '/' );
  }

  componentDidMount() {
    const { params, newPoint } = this.props;
    this.props.loadPoint( params.pointId );
  }
}

function mapStateToProps( state ) {
  return {
    ...PointPage.mapStateToProps.apply( this, arguments )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    ...PointPage.mapDispatchToProps.apply( this, arguments ),
    ...bindActionCreators( {
      'loadPoint': loadPoint
    }, dispatch )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( UpdatePointPage );