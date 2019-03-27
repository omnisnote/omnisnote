import React, { Component } from 'react'
import { Switch, Route,  Redirect } from "react-router-dom"
import { auth, firebase } from "../firebase"

import UserContext from "../UserContext"


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
      { ({ onAuth }) => (
        <div className="auth">
          <h1>Auth</h1>
          <button onClick={ 
            e => auth.signInWithPopup(this.state.googleProvider).then(res => {
              this.props.history.push("/")
            }).catch(console.log) } //TODO: handle this properly
          >Continue with Google</button>
        </div>
      ) }
    </UserContext.Consumer>
  )}
}