import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Room from './Rooms'

import './App.css';

class App extends React.Component {
    render(){
      return(
        <Fragment>
          <Route path='/' component={Room} exact />
        </Fragment>
      )
    }
}

export default App;
