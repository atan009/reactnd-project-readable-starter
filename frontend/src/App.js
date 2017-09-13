import React, { Component } from 'react';
import './CSS/App.css';
import './CSS/bootstrap.min.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {

  render() {
    const categories = ['react', 'redux', 'udacity']

    return (
      
      <div className="container">
      <Route exact path ='/' render={() => (
        <div className="row">
          <ul className='categories col-md-12'>
            {categories.map((catType) => (
              <li key={catType} className="Category col-md-4">
                <Link to={catType}>{catType}</Link>
              </li>
              ))}
          </ul>
        </div>
        )}/>
      </div>
    );
  }
}

export default App;
