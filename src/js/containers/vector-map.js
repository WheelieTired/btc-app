// ES6
import ReactMapboxGl from "react-mapbox-gl";
import MapboxGl from "mapbox-gl";

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pick, values } from 'lodash';
import { Point } from 'btc-models';

import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

export class VectorMap extends Component {


  constructor(props) {
    super(props);
    this.centercoordinates = undefined;    
    this.vMap = undefined;
    this.setVMap = this.setVMap.bind(this);
    this.moveToLocation = this.moveToLocation.bind(this);
  }

  setVMap(map) {
    this.vMap = map;
  }

  moveToLocation(LatLon) {
    this.vMap.flyTo({ center: LatLon });
  }

  myLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.centercoordinates = [longitude, latitude]; // eslint-disable-line no-unused-vars
        console.log(this.centercoordinates);
      },
      (err) => {
        alert('Please turn on location services to find your location');
        console.error(err);
      },
      {
        timeout: 5000
      }
    );
  }

  render() {
    const { points, tracks, settings, map, filters } = this.props.pointMap;
    const { deselectMarker, selectMarker, children, setFitBoundingBox } = this.props;
    const props = pick(this.props, [
      'selectMarker',
      'deselectMarker',
      'afterMoved',
      'className',
      'addPoint'
    ]);

    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ"
    });
    this.myLocation();
    var center = [-77.6109, 43.1610];
    if(typeof this.centercoordinates != 'undefined'){
      center = this.centercoordinates;
    }
    let markers = points.filter(point => {
      if (point.isFetching) {
        return false;
      }
      if (Point.uri(point._id).type === 'alert' && filters.hideAlert) {
        return false;
      }
      if (filters.activeFilters.length == 0) {
        return true;
      }

      return filters.activeFilters.some(filterElement => {
        // join the service amenities with the service type
        let serviceTypes = (point.amenities || []).concat(point.type);
        if (serviceTypes.indexOf(filterElement) !== -1) {
          return true;
        }
      });
    }).map(point => {
      // TODO: Don't even include the onClick listener if we're in addPoint mode
      const onClick = () => {
        console.log(point);
        if (!this.props.addPoint) {
          selectMarker(point);
          this.moveToLocation([point.location[1], point.location[0]]);
        }
      };
      if (Point.uri(point._id).type === 'alert') {
        // var alertIcon = Leaflet.icon( {
        //   iconUrl: 'img/icons/alert-icon.png',
        //   shadowUrl: 'img/icons/marker-shadow.png',

        //   iconSize: [ 25, 38 ], // size of the icon
        //   shadowSize: [ 41, 41 ], // size of the shadow
        //   iconAnchor: [ 14, 38 ], // point of the icon which will correspond to marker's location
        //   shadowAnchor: [ 15, 41 ], // the same for the shadow
        //   popupAnchor: [ 0, 0 ] // point from which the popup should open relative to the iconAnchor
        // } );
        var coordinates = [point.location[1], point.location[0]];
        return (
          <Marker key={point._id}
            coordinates={coordinates}
            onClick={onClick}>
            <img src='img/icons/alert-icon.png' />
          </Marker>
        );
      } else {
        var coordinates = [point.location[1], point.location[0]];
        return (
          <Marker key={point._id}
            coordinates={coordinates}
            onClick={onClick}>
            <img src='img/icons/marker-icon.png' />
          </Marker>
        );
      }
    });
    return (
      <Map
        style="mapbox://styles/aca-mapbox/cj8w8rbjnfwit2rpqudlc4msn"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={center}
        onStyleLoad={(map) => {
          map.addControl(new MapboxGl.NavigationControl());
          map.addControl(new MapboxGl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          }));
        }}>
        {markers}
      </Map>
    );
  }
}


function mapStateToProps(state) {
  return {
    pointMap: {
      points: values(state.points.points),
      tracks: state.tracks.toJS(),
      settings: state.settings,
      map: state.map,
      filters: state.filters
    }
  };
}

export default connect(mapStateToProps)(VectorMap);
