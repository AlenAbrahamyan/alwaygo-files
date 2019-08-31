import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const socket = openSocket('https://alwaygo-server.herokuapp.com');

class MapContainer extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
}

state = {
  status: false,
  friend_location: {lat: null, lon: null},
  my_location: null
}

componentDidMount() {
  if (navigator.geolocation) {
    console.log('ha');
    
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({my_location: {lat:position.coords.latitude, lon:position.coords.longitude}});
      setInterval( () => {
      socket.emit('location', {
        location: {username: this.props.auth.user.user.username, location: {lat:position.coords.latitude, lon:position.coords.longitude}}
     })}, 5000)
      console.log(this.state.my_location);
    });

  } else { 
    this.setState({my_location: 'no'});
  }

  socket.on('get_location', location_f => {
    if(location_f.location_f.username==window.location.pathname.split('/')[2]){
      console.log('Aysa merna!');
      console.log(location_f); 
      this.setState({friend_location: location_f.location_f.location});
   

    }else if(location_f.location_f.username==this.props.auth.user.user.username){
      this.setState({my_location: location_f.location_f.location});
    }else{
      console.log(location_f.location_f.username)
      console.log(window.location.pathname.split('/')[2])
      console.log('Es mer@ chi');
      console.log(location_f);
      
    }
  });
}

render() {
 
    const mapStyles = {
        width: '100%',
        height: '100%',
      };

      

   
      
    return (
      <div>
        {this.state.my_location!=null && this.state.my_location!='no' ?(
        <Map
          google={this.props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{ lat: this.state.my_location.lat, lng: this.state.my_location.lon}}
        >
            <Marker position={{ lat: this.state.my_location.lat, lng: this.state.my_location.lon}} />
            {this.state.friend_location!='no'?(
            <Marker position={{ lat: this.state.friend_location.lat, lng: this.state.friend_location.lon}} icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} />
            ):(null)}
        </Map>
        ):(this.state.my_location!='no' ?(<div>Please turn on Geolocation</div>):(null))}
        </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, null)(GoogleApiWrapper({
  apiKey: 'AIzaSyCoIunpMrruPoHJm79WSjH7bPJlhhB7C-c'
})(MapContainer));

