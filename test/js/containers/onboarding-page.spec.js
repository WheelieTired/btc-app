import chai, { expect } from 'chai';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { OnboardingPage } from '../../../src/js/containers/onboarding';

describe('<OnBoardingPage />', function() {
	  it('should have all pages ', function() {
	    const tree = sd.shallowRender( (
	      <OnboardingPage/>
	      ) );

	    const instance = tree.getMountedInstance();

	    var onBoardingSource = require('../../../src/json/onboardingData.json');
	    var numPages = onBoardingSource.length;
	    
	    expect( instance.totalItems ).to.be.equal(numPages);
	  } );
	  
	  it('page change handler handles transition from first to last', function() {
		    const tree = sd.shallowRender( (
		      <OnboardingPage/>
		      ) );

		    const instance = tree.getMountedInstance();

		    var onBoardingSource = require('../../../src/json/onboardingData.json');
		    instance.handlePageChange(onBoardingSource.length - 1);
		    
		    expect( instance.state.activePage ).to.be.equal(onBoardingSource.length - 1);
		  } );
	  
	  it('page change handler handles transition from last to first', function() {
		    const tree = sd.shallowRender( (
		      <OnboardingPage/>
		      ) );

		    const instance = tree.getMountedInstance();

		    var onBoardingSource = require('../../../src/json/onboardingData.json');
		    instance.activePage = onBoardingSource.length - 1;
		    instance.handlePageChange(1);
		    
		    expect( instance.state.activePage ).to.be.equal(1);
		  } );
} );
