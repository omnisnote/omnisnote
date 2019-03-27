import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom"
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import auth from "../firebase/auth.js"
import { createUser } from "../firebase/firestore.js"

import Auth from "./Auth.js"
import Notes from "./Notes.js"

import UserContext from "../UserContext.js"
import themes from "../styles/themes.js"

import Header from "../components/Header.js"

window.themes = themes

class App extends Component {
  constructor(props) {
    super(props)

    auth.onAuthStateChanged(user => this.state.onAuth(user))

    this.state = {
      authed: auth.currentUser || false,
      userData: auth.currentUser || {},
      userSettings: { theme: "light" }, //TODO: make this fetch settings
      onAuth: (user => {
        // throw new Error("test")
        if(!user) return
        createUser(user)
        this.setState({ 
          authed: !!user,
          userData: user,
          userSettings: { theme: "light" }
        })
      }).bind(this)
    }
  }

  render() { return (
    <div className="app">
      <UserContext.Provider value={ this.state }>
        <ThemeProvider theme={ themes[this.state.userSettings.theme] }>
          <Global styles={ theme => ({
            "*": {
              margin: 0,
              padding: 0
            },
            body: {
              backgroundColor: theme.background
            }
          })} />
          <Router>
            <>
              { this.state.authed ? (<>
                {/* authed */}
                <Header />
                <Switch>
                  <Route exact path="/" render={ _ => (<>
                    <h1>home - authed</h1> 
                    <button onClick={ e => auth.signOut() }>signOut</button>
                  </>) }/>
                  <Route exact path="/notes" component={ Notes }/>
                  <Redirect to="/notes"/>
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
        </ThemeProvider>
      </UserContext.Provider>
    </div>
  )}
}

export default App
