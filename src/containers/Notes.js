/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'

import Header from "../components/Header.js"

import { getNoteList } from "../firebase/firestore.js"

export default class Notes extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    getNoteList().then(res => this.setState({ notes: res }))
  }

  render() { return ( <>
    <Header />
    <div className="notes" css={{
      margin: "12px auto",
      width: "95%",
      maxWidth: "1280px"
    }}>
      <h1 css={{
        fontSize: "42px",
        fontWeight: 300,
        margin: "8px 0"
      }}>Notes</h1>
      { this.state.notes && this.state.notes.map((note, i) => (
        <div key={i}>
          <p>{ note.title }</p>
        </div>
      ))}
    </div>
  </> )}
}
