/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import Header from "../components/Header.js"
import MaterialIcon from "material-icons-react"
import { getNoteList, createTxtNote } from "../firebase/firestore.js"

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
    this.state = {
      notebook: props.match.params.notebook || "__NONE__"
    }
    getNoteList().then(res => this.setState({ notes: res }))
  }

  createNote() {
    const uid = createTxtNote("new note", this.state.notebook, "")
    this.props.history.push("/note/" + uid)
  }

  render() { return ( <>
    <Header />
    <div className="notes" css={ theme => ({
      margin: "32px auto 12px",
      width: "95%",
      maxWidth: theme.maxWidth
    })}>
      <h1 css={{
        fontSize: "42px",
        fontWeight: 300,
        margin: "8px 0"
      }}>Notes</h1>
      { this.state.notes && this.state.notes.map((note, i) => (
        <Link to={ "/note/" + note.uid } key={i}>
          <div css={ theme => ({
            backgroundColor: theme.background,
            padding: "8px",
            borderRadius: "2px",
            marginBottom: "4px",
            cursor: "pointer",
            borderLeft: "4px transparent solid",
            transition: theme.transition("0.1s"),
            ":hover": {
              boxShadow: "0 6px 12px -4px rgba(0,0,0,0.2)",
              borderLeft: `4px ${ theme.main } solid`
            }
          })}>
            <P>{ note.title }</P>
            <P last>{ note.lastEdit || "" }</P>
            {/* should also show last edit time, and tags */}
          </div>
        </Link>
      ))}

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
