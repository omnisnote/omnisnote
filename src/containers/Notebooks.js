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

  createBook() {
    const uid = createNotebook("new notebook")
    this.props.history.push("/notebooks/" + uid + "/notes/")
  }

  render() { return ( <>
    <Header active="notebooks"/>
    <div css={ theme => ({
      margin: "4px auto 0",
      width: "95%",
      maxWidth: theme.maxWidth,
    })}>
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
        onClick={ this.createBook.bind(this) }
      ><MaterialIcon icon="add" color="#fff" /></button>
    </div>
  </> )}
}
