/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { auth, firebase } from "../firebase"

import { setSettings } from "../firebase/firestore.js"

import UserContext from "../UserContext"

import Header from "../components/Header.js"
import Loading from "../components/Loading.js"
import Dropdown from "../atoms/Dropdown.js"

import themes from "../styles/themes.js"

const Option = props => (
  <div css={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "8px auto",
    maxWidth: "720px",
  }}>
    <p>{ props.name }</p>
    { props.children }
  </div>
)

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static contextType = UserContext

  applySettings() {
    setSettings({
      ...this.context.userSettings,
      ...this.state
    }).then(_ => {
      window.location.replace("/")
    })
  }

  render() { return (
    <UserContext.Consumer>
      { ({ userData, userSettings, authed }) => authed ? (<>
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
            margin: "16px 0 32px"
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
              color: theme.textColor,
              cursor: "pointer",
              transition: theme.transition("0.2s"),
              ":hover": {
                backgroundColor: theme.altBody
              }
            }) } onClick={ e => {
              auth.signOut().then(_ => {
                window.location.reload()
              })
            } }>Log out</button>
          </div>
          <div css={ theme => ({
            "input": {
              backgroundColor: theme.altBody,
              color: theme.textColor,
              padding: "8px 16px"
            }
          }) }>
            <Option name="Editor font">
              <input 
                type="text" 
                name="mainFont"
                defaultValue={ userSettings.mainFont }
                onChange={ e => this.setState({ [e.target.name]: e.target.value }) }
              />
            </Option>
            <Option name="Editor font size">
              <input 
                type="number" 
                name="editorFontSize"
                defaultValue={userSettings.editorFontSize} 
                onChange={ e => this.setState({ [e.target.name]: e.target.value }) }
              />
            </Option>
            <Option name="Code font">
              <input 
                type="text" 
                name="monoFont"
                defaultValue={ userSettings.monoFont }
                onChange={ e => this.setState({ [e.target.name]: e.target.value }) }
              />
            </Option>
            <Option name="Code font size">
              <input 
                type="number" 
                name="codeFontSize"
                defaultValue={userSettings.codeFontSize} 
                onChange={ e => this.setState({ [e.target.name]: e.target.value }) }
              />
            </Option>
            <Option name="Line height">
              <input 
                type="number" 
                name="lineHeight"
                defaultValue={ userSettings.lineHeight }
                onChange={ e => this.setState({ [e.target.name]: e.target.value }) }
              />
            </Option>
            <Option name="Autosave">
              <input 
                type="checkbox" 
                name="autosave"
                defaultChecked={ userSettings.autosave }
                onChange={ e => this.setState({ [e.target.name]: e.target.value }) }
              />
            </Option>
            <Option name="Theme">
              <Dropdown 
                defaultValue={ userSettings.theme }
                options={ Object.entries(themes).map(theme => ({ name: theme[0], ...theme[1] })) }
                onChange={ e => this.setState({ theme: e.value }) }
              />
            </Option>
            <button css={ theme => ({
              margin: "0 auto",
              backgroundColor: "transparent",
              padding: "8px 12px",
              borderRadius: "2px",
              display: "block",
              border: `4px solid ${theme.main}`,
              color: theme.textColor,
              cursor: "pointer",
              boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.2)",
              transition: theme.transition(),
              ":hover": {
                backgroundColor: theme.main
              }
            }) } onClick={ this.applySettings.bind(this) }>Apply Settings</button>
          </div>
        </div>
      </>) : <Loading /> }
    </UserContext.Consumer>
  )}
}