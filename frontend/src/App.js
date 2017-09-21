import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import addPost from './Components/addPost'
import mainPage from './Components/mainPage'

class App extends Component {
  render() {
    return (
      
      <div className="container">
      <Switch>
        <Route exact path ='/' component={mainPage}/>
        <Route exact path ='/addPost' component={addPost}/>
        <Route exact path='/react' render={() => (
          <div className="row">
            REACT PAGE
          </div>
          )}/>
        <Route exact path ='/redux' render={() => (
          <div className="row">
            REDUX PAGE
          </div>
          )}/>
        <Route exact path ='/udacity' render={() => (
          <div className="row">
            udacity PAGE
          </div>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect() (App));