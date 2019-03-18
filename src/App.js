import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/Login' component={Login} />
          <Route path='/register' component={Register} />
          <Route component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
