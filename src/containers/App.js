import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <>
            <Switch>
              <Route exact path="/" render={ _ => <h1>home</h1> }/>
            </Switch>
          </>
        </Router>
      </div>
    )
  }
}

export default App
