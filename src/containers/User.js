/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { auth, firebase } from "../firebase"

import UserContext from "../UserContext"

import Header from "../components/Header.js"

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      googleProvider: new firebase.auth.GoogleAuthProvider()
    }
  }

  static contextType = UserContext

  render() { return (
    <UserContext.Consumer>
      { ({ userData }) => (<>
          <Header />
          <div className="settings" css={ theme => ({
            margin: "4px auto 0",
            width: "95%",
            maxWidth: theme.maxWidth,
            [theme.mobileBreakpoint]: {
              width: "100%",
              margin: 0
            }
          })}>
            <h1>Hello { userData.displayName.split(" ")[0] }</h1>
          </div>
      </>) }
    </UserContext.Consumer>
  )}
}