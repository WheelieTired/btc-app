import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton,
          CardText, CardMenu, Button } from 'react-mdl';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';
import {  peekMarker,
          fullscreenMarker,
          deselectMarker } from '../actions/map-actions';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];

// export class for testing (use default export in application)
export class PointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  getDays(seasons) {
    let seasonDays = seasons[0].days;
    const date = (new Date());
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    seasons.forEach((season)=>{
      if ((season.seasonStart) && (season.seasonEnd) &&
        (season.seasonStart.month <= currentMonth <= season.seasonEnd.month) &&
        (season.seasonStart.date <= currentDate <= season.seasonEnd.date))
      {
        seasonDays = season.days;
      }
    });
    return seasonDays;
  }

  render() {
    const { dispatch } = this.props;

    // if we have an image, use that
    // otherwise, use an mdl-blue for the title,
    // and make the card a bit smaller
    let backgroundStyle;
    let titleHeight;
    let smallHeight;

    if (this.props.point.coverUrl) {
      backgroundStyle = `url(${this.props.point.coverUrl}) center / cover`;
      titleHeight = '176px';
      smallHeight = 300 - this.props.heightOffset;
    }
    else {
      backgroundStyle = '#3f51b5';
      titleHeight = '100px';
      smallHeight = 224 - this.props.heightOffset;
    }

    const headerHeight = Math.max(55,  55 + this.props.heightOffset);
    const headerHeightCSS = `calc(100% - ${headerHeight}px)`;
    const smallHeightCSS = `${smallHeight}px`;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: ( (this.props.show=='hide') ? '-300px' : '0px'),
      height: ( (this.props.show=='full') ? headerHeightCSS : smallHeightCSS),
      transition: (this.props.heightOffset == 0 ? 'all 300ms ease' : ''),
      zIndex:'8'
    }

    let cardTitleStyle = {
      color: '#fff',
      height: titleHeight,
      background: backgroundStyle
    }

    let seeButton = (
      <Button colored onClick={() => {
        dispatch(fullscreenMarker());
      }}>See More</Button>
    );
    if (this.props.show=='full') {
      seeButton = (
        <Button colored onClick={() => {
          dispatch(peekMarker());
        }}>See Less</Button>
      );
    }

    // this logic is for points with hour / schedule information
    // TODO: consider revising logic placement
    let point = this.props.point;
    let seasonalDetails = <br/>;
    let timeDetails = "";
    let hoursDetails = "";
    if (point.schedule && point.schedule.length > 0){
      let day = this.getDays(point.schedule).filter(
        (dayEle)=>{
          return dayMap.indexOf(dayEle.day) == (new Date()).getDay();
        })[0]; // get the day that matches today.

      // when is the service open
      timeDetails = (<span>{(day) ?
          <span className="open-until"> Open until: {day.closes}</span>
        :
          <span className="open-until"> Not Open Today </span>
        }</span>);

        // is this point seasonal?
        if (point.seasonal) {
          seasonalDetails = (
            <CardText>
              These hours are seasonal.
              Call or check online for more information.
            </CardText>
          )
        }

        // hours for service
        hoursDetails = <HoursTable hours={this.getDays(point.schedule)}/>
    }

    // small screen details
    let cardDetails = (
      <CardText>
        {point.description}
        {timeDetails}
      </CardText>
    );

    // large screen details
    if (this.props.show=='full') {
      if (point.type === 'alert') {
        cardDetails = (
          <div id="point-details">
            <CardText> {point.description} </CardText>
          </div>
        );
      } else {
        cardDetails = (
          <div id="point-details">
            <CardText> {point.description} {timeDetails}</CardText>
            <CardText>
              {point.type} <br/>
              <span className="amenities"> {point.amenities.join(", ")} </span>
            </CardText>

            <CardText> {point.phone} </CardText>
            <CardText>
              Visit <a href={point.website}>{point.website}</a> for more details
            </CardText>
            { hoursDetails }
            { seasonalDetails }
          </div>
        );
      }
    }

    return (
      <Card id="mdl-map-card" shadow={5} style={cardStyle}>
        <CardTitle style={cardTitleStyle}>{this.props.point.name}</CardTitle>
        { cardDetails }
        <CardActions border className="view-button">
          { seeButton }
          <Button colored onClick={() => {
            dispatch(deselectMarker());
          }}>Close</Button>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
      </Card>
    );
  }
}

export default connect()(PointCard);