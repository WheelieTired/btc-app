// ES6
import ReactMapboxGl, { Layer, Feature, Marker, Cluster } from "react-mapbox-gl";
import MapboxGl from "mapbox-gl";

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pick, values } from 'lodash';
import { Point } from 'btc-models';

import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({accessToken: "pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ"});
const ClusterMarkerStyle = {
                               width: 30,
                               height: 30,
                               borderRadius: '50%',
                               backgroundColor: '#51D5A0',
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center',
                               color: 'white',
                               border: '2px solid #56C498',
                               cursor: 'pointer'
                             };
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
    /**const clusterMarker = (
                    coordinates: GeoJSON.Position,
                    pointCount: number,
                    getLeaves: (
                      limit?: number,
                      offset?: number
                    ) => Array<React.ReactElement<any>>
                  ) => (
                    <Marker
                      key={coordinates.toString()}
                      coordinates={coordinates}
                      style={styles.clusterMarker}
                    >
                      <div>{pointCount}</div>
                    </Marker>
              );
    **/
    const { points, tracks, settings, map, filters } = this.props.pointMap;
    const { deselectMarker, selectMarker, children, setFitBoundingBox } = this.props;
    const props = pick(this.props, [
      'selectMarker',
      'deselectMarker',
      'afterMoved',
      'className',
      'addPoint'
    ]);

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
        <Cluster ClusterMarkerFactory={(
          coordinates: GeoJSON.Position,
          pointCount: number,
          getLeaves: (
            limit?: number,
            offset?: number
          ) => Array<React.ReactElement<any>>
        ) => (
          <Marker
          key={coordinates.toString()}
          coordinates={coordinates}
          style={ClusterMarkerStyle}
          >
            <div>{pointCount}</div>
          </Marker>
        )}>
        {markers}
        </Cluster>
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
