import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import addPost from './Components/addPost'
import mainPage from './Components/mainPage'
import fullPost from './Components/fullPost'
import addComment from './Components/addComment'

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="container">
      <Switch>
        <Route exact path ='/' component={mainPage}/>
        <Route exact path ='/addPost' component={addPost}/>
        <Route exact path ='/:category' component={mainPage}/>
        
        <Route exact path ='/:category/:post_id/addComment' component={addComment}/>
        <Route exact path ='/:category/:post_id' component={fullPost}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect() (App));