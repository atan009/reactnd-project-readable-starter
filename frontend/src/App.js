import React, { Component } from 'react';
import './CSS/App.css';
import './CSS/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllPosts } from './Actions'

class App extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const categories = ['react', 'redux', 'udacity']
    const { Posts, Comments } = this.props
    console.log(this.props)

    return (
      
      <div className="container">
      <Route exact path ='/' render={() => (
        <div className="row">
          <ul className='categories col-md-12'>
            {categories.map((catType) => (
              <li key={catType} className="Category col-md-4 text-center">
                <Link to={`/${catType}`}>{catType}</Link>
              </li>
              ))}
          </ul>
        </div>
        )}/>
      <Switch>
        <Route path ='/react' render={() => (
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

function mapStateToProps ({Posts, Comments}) {
  return {
    Posts,
    Comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: () => dispatch(fetchAllPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);