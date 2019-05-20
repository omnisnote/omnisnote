/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import MaterialIcon from "material-icons-react"

import Header from "../components/Header.js"
import Loading from "../components/Loading.js"
import Notebook from "../components/Notebook.js"

import { getNotebooks, createNotebook } from "../firebase/firestore.js"

export default class Notebooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notebooks: null
    }
    getNotebooks().then(res => this.setState({ notebooks: res }))
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }) }>

        </div>
        <div css={ theme => ({
          backgroundColor: theme.background,
          position: "relative",
          opacity: this.state.showOverlay ? 1 : 0,
          top: this.state.showOverlay ? 0 : "-100px",
          transition: theme.transition("0.2s"),
          width: theme.maxWidth,
          padding: "24px",
          borderRadius: "2px",
          boxShadow: "0 8px 12px -16px rgba(0, 0, 0, 0.2)"
        }) }>
          <h1>Create a new Notebook</h1>
          <form>
            <input type="text" placeholder="name" ref={ el => this.notebookName = el }/>
            {/* TODO: colorpicker */}
            <button onClick={ e => this.createNotebook() }>create</button>
          </form>
        </div>
      </div>
      { this.state.notebooks ? <>{
        this.state.notebooks.map((notebook, i) => <Notebook key={i} { ...notebook }/>)
      }</> : <Loading /> }
      <button css={theme => ({
        width: "56px",
        height: "56px",
        backgroundColor: theme.main,
        outline: "none",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 8px -2px rgba(0,0,0,0.4)",
        transition: theme.transition("0.3s"),
        position: "fixed",
        bottom: "24px",
        right: "24px",
        ":hover": {
          boxShadow: "0 8px 16px -4px rgba(0,0,0,0.4)",
        }
      })}
        onClick={ e => {
          this.notebookName.focus()
          this.setState({ showOverlay: true })
        } }
      ><MaterialIcon icon="add" color="#fff" /></button>
    </div>
  </> )}
}
