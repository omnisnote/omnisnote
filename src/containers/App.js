/** @jsx jsx */
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom"
import { Global, css, jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import auth from "../firebase/auth.js"
import { createUser, getUser } from "../firebase/firestore.js"

import Auth from "./Auth.js"
import Notes from "./Notes.js"
import Note from "./Note.js"
import Notebooks from "./Notebooks.js"
import User from "./User.js"

import UserContext from "../UserContext.js"
import themes from "../styles/themes.js"

function getLocalSettings() {
  return JSON.parse(localStorage.getItem("settings"))
}

console.log(themes)

export default class App extends Component {
  constructor(props) {
    super(props)

    auth.onAuthStateChanged(user => this.state.onAuth(user))

    this.state = {
      authed: auth.currentUser || false,
      userData: auth.currentUser || {},
      userSettings: getLocalSettings() || { theme: "light" },
      onAuth: (user => {
        if(!user) return
        createUser(user)
        getUser().get().then(res => {
          if(!res.exists) return
          this.setState({ 
            authed: !!user,
            userData: user,
            userSettings: res.data().settings
          })
        })
      }).bind(this),
      saveSettings: () => {
        localStorage.setItem("settings", JSON.stringify(this.state.userSettings))
      }
    }
  }

  render() { return (
    <div className="app" css={{ paddingTop: "12px" }}>
      <UserContext.Provider value={ this.state }>
          <Router>
            <>
              { this.state.authed ? (<>
                <ThemeProvider theme={ themes[this.state.userSettings.theme] }>
                  {/* authed */}
                  <Global styles={ theme => ({
                    body: {
                      backgroundColor: theme.body,
                      color: theme.textColor,
                      marginTop: theme.headerHeight,
                    },
                    "::-webkit-scrollbar": {
                      width: "6px",
                      background: "transparent"
                    },
                    "::-webkit-scrollbar-thumb": {
                      backgroundColor: theme.main
                    },
                    "::selection": {
                      backgroundColor: theme.selection
                    },
                  })} />
                  <Switch>
                    <Route exact path="/notes" component={ Notes }/>
                    <Route exact path="/notebooks" component={ Notebooks }/>
                    <Route exact path="/user" component={ User }/>
                    <Route exact path="/notebooks/:notebook/notes" component={ Notes }/>
                    <Route exact path="/note/:uid" component={ Note }/>
                    
                    <Redirect from="/settings" to="/user"/>
                    <Redirect to="/notes"/>
                  </Switch>
                </ThemeProvider>
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
                  <Redirect to="/auth"/>
                </Switch>
              </>) }
            </>
          </Router>
      </UserContext.Provider>
    </div>
  )}
}
