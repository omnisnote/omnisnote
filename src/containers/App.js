import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom"
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import auth from "../firebase/auth.js"
import { createUser, getUser } from "../firebase/firestore.js"

import Auth from "./Auth.js"
import Notes from "./Notes.js"
import Note from "./Note.js"

import UserContext from "../UserContext.js"
import themes from "../styles/themes.js"

function getLocalSettings() {
  return JSON.parse(localStorage.getItem("settings"))
}

window.getLocalSettings = getLocalSettings

class App extends Component {
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
    
    window.state = this.state
  }

  render() { return (
    <div className="app">
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
                  })} />
                  <Switch>
                    <Route exact path="/" render={ _ => (<>
                      <h1>home - authed</h1> 
                      <button onClick={ e => auth.signOut() }>signOut</button>
                    </>) }/>
                    <Route exact path="/notes" component={ Notes }/>
                    <Route exact path="/:notebook/notes" component={ Notes }/>
                    <Route exact path="/note/:uid" component={ Note }/>
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
