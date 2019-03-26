import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route,  Redirect } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <>
            <Switch>
              {/* unauthed paths */}
              <Route exact path="/" render={ _ => <h1>home</h1> }/>

              <Redirect to="/"/>

              {/* authed paths */}
            </Switch>
          </>
        </Router>
      </div>
    )
  }
}

export default App
