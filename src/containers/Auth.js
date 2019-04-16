/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import React, { Component } from 'react'
import { Switch, Route,  Redirect } from "react-router-dom"
import { auth, firebase } from "../firebase"

import UserContext from "../UserContext"

window.auth = auth

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
      { ({ onAuth }) => (<>
        <Global styles={ theme => ({
          body: {
            overflow: "hidden"
          }
        }) } />
        <div className="auth" css={ theme => ({
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }) }>
          <div className="card" css={ theme => ({
            backgroundColor: "#fff",
            width: "90%",
            margin: "0 auto",
            maxWidth: "480px",
            boxShadow: "0 8px 12px -4px rgba(0, 0, 0, 0.3)",
            padding: "16px",
            borderRadius: "2px",
            "input": {
              display: "block",
              width: "100%",
              margin: "0 auto 16px",
              padding: "8px 4px",
              textAlign: "center",
              borderRadius: "2px",
              border: "1px solid " + theme.body,
              outline: "none",
              transition: theme.transition(),
              ":focus, :active": {
                border: "1px solid " + theme.altBody,
                borderBottom: "1px solid " + theme.main,
              },
            },
            "button": {
              borderRadius: "2px",
              padding: "8px 12px",
              border: "1px solid" + theme.main,
              cursor: "pointer",
              display: "block",
              width: "100%",
              margin: "0 0 16px",
              backgroundColor: "transparent",
              transition: theme.transition(),
              outline: "none",
              ":hover, :focus": {
                backgroundColor: theme.body
              }
            }
          }) }>
            <h3 css={ theme => ({ marginBottom: "16px" }) }>Login or Signup</h3>
            <input ref={ el => this.emailIn = el } placeholder="email" type="text"/>
            <input ref={ el => this.passwordIn = el } placeholder="password" type="password"/>
            <button css={{ marginBottom: "0 !important" }} onClick={ 
              e => {
                auth.signInWithEmailAndPassword(this.emailIn.value, this.passwordIn.value)
                  .then(res => this.props.history.push("/"))
                  .catch(res => auth.createUserWithEmailAndPassword(this.emailIn.value, this.passwordIn.value)
                    .then( res => this.props.history.push("/")).catch(console.log))
              } } //TODO: handle this properly
            >Login</button>
            <p css={ theme => ({
              textAlign: "center",
              margin: "8px"
            }) }>or</p>
            <button onClick={ 
              e => auth.signInWithPopup(this.state.googleProvider).then(res => {
                this.props.history.push("/")
              }).catch(console.log) } //TODO: handle this properly
            >Continue with Google</button>
          </div>
        </div>
      </>) }
    </UserContext.Consumer>
  )}
}