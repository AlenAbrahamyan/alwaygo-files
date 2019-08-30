import React, { Component } from 'react';
import Verify from './components/Verify';
import './style/authenticated.css'
import './style/welcome.css'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {

    return (


      <Provider store={store}>
        <div>
          <Verify />
        </div>
      </Provider>
    )
  }
}

export default App;
