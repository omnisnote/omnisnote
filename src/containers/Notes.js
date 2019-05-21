/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import { Helmet } from "react-helmet"

import store from "../store.js"

import { getNoteList, setNotebookMeta, createTxtNote, getNotebook } from "../firebase/firestore.js"

import Header from "../components/Header.js"
import Loading from "../components/Loading.js"

import Fab from "../atoms/Fab.js"
import ConfirmInput from "../atoms/ConfirmInput.js"

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
      notebookData: store.notebooks[notebook],
      notes: store.notes[notebook],
    }

    getNoteList(notebook).then(res => {
      store.notes[notebook] = res
      this.setState({ notes: store.notes[notebook] })
    })

    if(props.match.params.notebook) {
      getNotebook(notebook).then(res => {
        store.notebooks[notebook] = res
        this.setState({ notebookData: store.notebooks[notebook] })
      })
    }
  }

  componentDidUpdate(_, prevState) {
    const notebook = this.props.match.params.notebook || "__NONE__"
    if(notebook === prevState.notebook) return

    if(this.props.match.params.notebook) {
      getNotebook(notebook).then(res => this.setState({ notebookData: res }))
    } else if(this.state.notebookData) {
      this.setState({ notebookData: null })
    }
    getNoteList(notebook).then(res => this.setState({ notes: res }))
  }

  createNote() {
    const uid = createTxtNote("new note", this.state.notebook, "")
    this.props.history.push("/note/" + uid)
  }

  renameBook(e) {
    if(this.state.notebook !== "__NONE__") {
      this.setState({
        notebookData: {
          ...this.state,
          title: e.target.value
        }
      })
      setNotebookMeta(this.state.notebook, {
        title: e.target.value
      })
    }
  }

  render() { return ( <>
    <Header active="notes" />
    <Helmet>
      <title>{ (this.state.notebookData && this.state.notebookData.title) || "notes" }</title>
    </Helmet>
    <div className="notes" css={ theme => ({
      margin: "0 auto",
      width: "95%",
      paddingTop: (theme.headerHeight.split("px")[0] / 3) + "px",
      maxWidth: theme.maxWidth
    })}>
      <h1 css={{
        fontSize: "42px",
        fontWeight: 300,
        margin: "8px 0 16px"
      }}>{ this.state.notebookData ? ( <>
        <ConfirmInput defaultValue={ this.state.notebookData.title } style={ theme => ({
          input: {
            fontSize: "2rem",
            background: "transparent !important",
            boxShadow: "none !important",
            border: "1px solid transparent",
            borderRadius: "6px",
            transition: theme.transition(),
            ":hover, :focus": {
              border: `1px solid ${theme.altBody}`
            }
          }
        }) } onConfirm={ e => this.renameBook(e) }/>
      </>) : "Notes" }</h1>
      { this.state.notes ? this.state.notes.length ? this.state.notes.map((note, i) => (
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
      )) : <p>there's nothing here</p> : <>
        <Loading />
      </> }
      <Fab onClick={ this.createNote.bind(this) } icon="add" />
    </div>
  </> )}
}
