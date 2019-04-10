/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import Header from "../components/Header.js"
import Loading from "../components/Loading.js"
import Notebook from "../components/Notebook.js"

import { getNotebooks, createTxtNote } from "../firebase/firestore.js"

export default class Notebooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notebooks: null
    }
    getNotebooks().then(res => this.setState({ notebooks: res }))
  }

  createNote() {
    const uid = createTxtNote("new note", this.state.notebook, "")
    this.props.history.push("/note/" + uid)
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
    </div>
  </> )}
}
