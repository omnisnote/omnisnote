/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import MaterialIcon from "material-icons-react"

import store from "../store.js"

import Header from "../components/Header.js"
import Loading from "../components/Loading.js"
import Notebook from "../components/Notebook.js"

import Fab from "../atoms/Fab.js"

import { getNotebooks, createNotebook } from "../firebase/firestore.js"

export default class Notebooks extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      notebooks: Object.entries(store.notebooks).map(n => ({ uid: n[0], ...n[1] }))
    }

    getNotebooks().then(res => {
      res.forEach(n => {
        store.notebooks[n.uid] = n
      })
      this.setState({ notebooks: res })
    })
  }

  createNotebook() {
    const uid = createNotebook(this.notebookName.value || "new notebook")
    this.props.history.push("/notebooks/" + uid + "/notes/")
  }

  render() { return ( <>
    <Header active="notebooks"/>
    <div css={ theme => ({
      margin: "4px auto 0",
      width: "95%",
      paddingTop: (theme.headerHeight.split("px")[0] / 3) + "px",
      maxWidth: theme.maxWidth,
    })}>
      <div css={ theme => ({
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        zIndex: 2000000,
        opacity: this.state.showOverlay ? 1 : 0,
        pointerEvents: this.state.showOverlay ? "auto" : "none",
        transition: theme.transition("0.2s"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }) }>
        <div onClick={e => this.setState({ showOverlay: false })} css={ theme => ({
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }) }>

        </div>
        <div css={ theme => ({
          backgroundColor: theme.background,
          position: "relative",
          opacity: this.state.showOverlay ? 1 : 0,
          top: this.state.showOverlay ? 0 : "-50px",
          transition: theme.transition("0.4s"),
          maxWidth: theme.maxWidth,
          width: "95%",
          padding: "24px",
          borderRadius: "2px",
          boxShadow: "0 8px 32px -16px rgba(0,0,0,0.5)"
        }) }>
          <h1>Create a new Notebook</h1>
          <form css={{ position: "relative" }}>
            <input css={ theme => ({
              fontSize: "4rem",
              margin: "2rem 0 calc(2rem + 64px)",
              padding: "0.3rem",
              borderBottom: "2px solid transparent",
              transition: theme.transition(),
              width: "100%",
              ":focus": {
                borderBottom: `2px solid ${ theme.altBody }`
              }
            }) } type="text" placeholder="name" ref={ el => this.notebookName = el }/>
            {/* TODO: colorpicker */}
            <button css={ theme => ({
              backgroundColor: theme.main,
              padding: "8px 12px",
              position: "absolute",
              bottom: 0,
              right: 0,
              borderRadius: "2px",
              cursor: "pointer",
              color: theme.textOnMain,
            })} onClick={ e => this.createNotebook() }>create</button>
          </form>
        </div>
      </div>
      { this.state.notebooks ? <> {
        this.state.notebooks.map((notebook, i) => <Notebook key={i} { ...notebook }/>)
      } </> : <Loading /> }
      <Fab icon="add" onClick={e => {
        this.notebookName.focus()
        this.setState({ showOverlay: true })
      }} />
    </div>
  </> )}
}
