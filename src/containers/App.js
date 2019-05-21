/** @jsx jsx */
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Global, css, jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import { Helmet } from "react-helmet"

import auth from "../firebase/auth.js"

import Auth from "./Auth.js"
import Notes from "./Notes.js"
import Note from "./Note.js"
import Notebooks from "./Notebooks.js"
import User from "./User.js"

import UserContext, { defaultSettings } from "../UserContext.js"
import store, { onAuth } from "../store.js"

import themes from "../styles/themes.js"

export default class App extends Component {
  constructor(props) {
    super(props)

    auth.onAuthStateChanged(user => {
      onAuth(user).then(e => this.forceUpdate())
    })
  }

  render() { return (
    <div className="app">
      <UserContext.Provider value={ store }>
          <Router>
            <ThemeProvider theme={ themes[store.userSettings.theme] }>
              {/* authed */}
              <Global styles={ theme => ({
                body: {
                  backgroundColor: theme.body,
                  color: theme.textColor,
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
              <Helmet>
                { store.userSettings.mainFont && (
                  <link href={"https://fonts.googleapis.com/css?family=" + store.userSettings.mainFont.replace(/ /g, "+") + ":400,400i,700"} rel="stylesheet" />
                ) }
                { store.userSettings.monoFont && (
                  <link href={"https://fonts.googleapis.com/css?family=" + store.userSettings.monoFont.replace(/ /g, "+")} rel="stylesheet" />
                )}
              </Helmet>
              { store.authed ? (<>
                  <Global styles={ theme => ({
                    body: {
                      marginTop: theme.headerHeight,
                    },
                    ".app": {
                      paddingTop: "12px"
                    }
                  }) }/>
                  <Switch>
                    <Route exact path="/notes" component={ Notes }/>
                    <Route exact path="/notebooks" component={ Notebooks }/>
                    <Route exact path="/user" component={ User }/>
                    <Route exact path="/notebooks/:notebook/notes" component={ Notes }/>
                    <Route exact path="/note/:uid" component={ Note }/>
                    
                    <Redirect from="/settings" to="/user"/>
                    <Redirect to="/notes"/>
                  </Switch>
              </>) : (<>
                {/* unauthed */}
                <Switch>
                  <Route exact path="/auth" component={ Auth }/>
    
                  <Redirect from="/signup" to="/auth"/>
                  <Redirect from="/login" to="/auth"/>
                  <Redirect to="/auth"/>
                </Switch>
              </>) }
            </ThemeProvider>
          </Router>
      </UserContext.Provider>
    </div>
  )}
}
