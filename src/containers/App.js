import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route,  Redirect } from "react-router-dom"
import auth from "../firebase/auth"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
    }
  }

  render() {
    return (
      <div className="app">
        <Router>
          <>
              { this.state.loggedIn ? (<>
                <Switch>
                  <Route exact path="/" render={ _ => <h1>home - authed</h1> }/>
    
                  <Redirect to="/"/>
                </Switch>
              </>) : (<>
                <Switch>
                  <Route exact path="/" render={ _ => <h1>home - unauthed</h1> }/>
    
                  <Redirect to="/"/>
                </Switch>
              </>) }
          </>
        </Router>
      </div>
    )
  }
}

export default App
