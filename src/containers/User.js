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
            <div css={ theme => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "16px"
            }) }>
              <h1 css={ theme => ({
                fontWeight: 300,
                fontSize: "46px"
              }) }>
                Hello { userData.displayName ? userData.displayName.split(" ")[0] : ""}
              </h1>
              <button css={ theme => ({
                float: "right",
                backgroundColor: "transparent",
                padding: "8px 12px",
                borderRadius: "2px",
                fontSize: "18px",
                cursor: "pointer",
                transition: theme.transition("0.1s"),
                ":hover": {
                  backgroundColor: theme.altBody
                }
              }) } onClick={ e => {
                auth.signOut()
                window.location.reload()
              } }>Log out</button>
            </div>
          </div>
      </>) }
    </UserContext.Consumer>
  )}
}