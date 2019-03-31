/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import Header from "../components/Header.js"
import Loading from "../components/Loading.js"

import MaterialIcon from "material-icons-react"

import { getNoteList, createTxtNote, getNotebook } from "../firebase/firestore.js"

const P = props => (
  <span css={ theme => ({ 
    borderRight: (props.last ? "" : ("1px solid " + theme.body)),
    padding: "0 8px"
  })}>
    { props.children }
  </span>
)

export default class Notes extends Component {
  constructor(props) {
    super(props)
    const notebook = props.match.params.notebook || "__NONE__"
    this.state = {
      notebook,
      notes: null
    }
    getNoteList(notebook).then(res => this.setState({ notes: res }))
    if(props.match.params.notebook) {
      getNotebook(notebook).then(res => this.setState({ notebookData: res }))
    }
  }

  createNote() {
    const uid = createTxtNote("new note", this.state.notebook, "")
    this.props.history.push("/note/" + uid)
  }

  render() { return ( <>
    <Header />
    <div className="notes" css={ theme => ({
      margin: "14px auto 0",
      width: "95%",
      maxWidth: theme.maxWidth
    })}>
      <h1 css={{
        fontSize: "42px",
        fontWeight: 300,
        margin: "8px 0 16px"
      }}>Notes { this.state.notebookData ? (" - " + this.state.notebookData.title) : "" }</h1>
      { this.state.notes ? this.state.notes.map((note, i) => (
        <Link to={ "/note/" + note.uid } key={i}>
          <div css={ theme => ({
            backgroundColor: theme.background,
            padding: "8px",
            marginBottom: "8px",
            cursor: "pointer",
            borderLeft: "4px transparent solid",
            boxShadow: "0 2px 6px -4px rgba(0,0,0,0.2)",
            transition: theme.transition("0.2s"),
            ":hover": {
              boxShadow: "0 4px 8px -4px rgba(0,0,0,0.2)",
              borderLeft: `4px ${ theme.main } solid`
            }
          })}>
            <P>{ note.title }</P>
            <P last>{ note.lastEdit || "" }</P>
            {/* should also show last edit time, and tags */}
          </div>
        </Link>
      )) : <Loading /> }

      <div css={ theme => ({
        position: "fixed",
        bottom: "24px",
        right: "24px"
      }) }>
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
          ":hover": {
            boxShadow: "0 8px 16px -4px rgba(0,0,0,0.4)",
          }
        })}
        onClick={ this.createNote.bind(this) }
        ><MaterialIcon icon="add" color="#fff" /></button>
      </div>
    </div>
  </> )}
}
