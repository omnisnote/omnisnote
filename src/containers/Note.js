/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'

import { getTxtNote } from "../firebase/firestore.js"

import Header from "../components/Header.js"

export default class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uid: props.match.params.uid,
      note: null
    }

    this.getNoteContent()
  }

  getNoteContent() {
    getTxtNote(this.state.uid).then(note => {
      this.setState({ ...note, note: true })
    })
  }

  static getDerivedStateFromProps(props, state) {
    if(state && (props.match.params.uid === state.uid)) return state
    this.getNoteContent()
    return {
      uid: props.uid,
    }
  }

  render() { console.log(this.state); return (
    <div className="note">
      <Header />
      <div css={ theme => ({
        margin: "32px auto 12px",
        width: "95%",
        maxWidth: theme.maxWidth
      })}>
        { this.state.note ? (
          <p>{ this.state.content }</p>
        ) : "" }
      </div>
    </div>
  )}
}
