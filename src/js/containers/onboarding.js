/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import Pagination from "react-js-pagination";

import { Page } from '../components/page';
import { Block } from '../components/block';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';

import { setDrawer } from '../reducers/btc-drawer';

export class OnboardingPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activePage: 1
      };
  }

  handlePageChange(pageNumber) {
    //console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    const image = 'img/onboarding'+ this.state.activePage + '.png';
    return (
      <div style={{height:'100%'}}>
        <img src={image} style={{zIndex:'1200'}} />
        <div style={{zIndex:'1300', display: 'flex', alignItems:'center', justifyContent:'center', position: 'fixed', bottom:'75px'}}>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={1}
            totalItemsCount={5}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {};
}

const actions = { setDrawer };

export default connect( mapStateToProps, actions )( OnboardingPage );
