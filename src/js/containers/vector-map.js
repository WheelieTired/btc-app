// ES6
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import React, { Component } from 'react';
import { connect } from 'react-redux';



export class VectorMap extends Component {

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ"
    });
    return (
      <Map
        style="mapbox://styles/aca-mapbox/cj8w8rbjnfwit2rpqudlc4msn"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}/>
    );
  }
}

export default connect( )( VectorMap );
