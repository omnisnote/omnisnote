import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom"

import auth from "../firebase/auth"
import { createUser } from "../firebase/firestore"

import Auth from "./Auth.js"

import UserContext, { defaultUserCtx } from "../UserContext"

class App extends Component {
  constructor(props) {
    super(props)

    auth.onAuthStateChanged(user => this.state.onAuth(user))

    this.state = {
      authed: auth.currentUser || false,
      userData: auth.currentUser || {},
      onAuth: (user => {
        // throw new Error("test")
        if(!user) return
        createUser(user)
        this.setState({ 
          authed: !!user,
          userData: user
        })
      }).bind(this)
    }
  }

  render() { return (
    <div className="app">
      <UserContext.Provider value={ this.state }>
        <Router>
          <>
            { this.state.authed ? (<>
              {/* authed */}
              <Switch>
                <Route exact path="/" render={ _ => (<>
                  <h1>home - authed</h1> 
                  <button onClick={ e => auth.signOut() }>signOut</button>
                </>) }/>
                <Route exact path="/heck" render={ _ => (<>
                  <h1>heck</h1> 
                </>) }/>
                <Redirect to="/"/>
              </Switch>
            </>) : (<>
              {/* unauthed */}
              <Switch>
                <Route exact path="/" render={ _ => (<>
                  <h1>home - unauthed</h1>
                  <Link to="/auth">auth</Link>
                </>) }/>
                <Route exact path="/auth" component={ Auth }/>
  
                <Redirect from="/signup" to="/auth"/>
                <Redirect from="/login" to="/auth"/>
                <Redirect to="/"/>
              </Switch>
            </>) }
          </>
        </Router>
      </UserContext.Provider>
    </div>
  )}
}

export default App
