/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'

import easyMDE from "easymde"

import { getTxtNote, setTxtNote } from "../firebase/firestore.js"

import Header from "../components/Header.js"

export default class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      note: null,
    }

    this.editor = React.createRef()

    this.getNote(props.match.params.uid)
  }

  getNote(uid) {
    getTxtNote(uid).then(note => {
      this.setState({ 
        ...note, 
        note: true,
      })
    })
  }

  saveNote(uid, state) {
    setTxtNote(uid, state)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps && (prevProps.match.params.uid !== this.props.match.params.uid)) {
      this.getNote(this.props.match.params.uid)
      this.saveNote(prevProps.match.params.uid, prevState)
    }
  }

  componentWillUnmount() {
    this.saveNote(this.props.match.params.uid, this.state)
  }

  componentDidMount() {
  }

  render() { return (
    <div className="note">
      <Header />
      <div css={ theme => ({
        margin: "32px auto 12px",
        width: "95%",
        maxWidth: theme.maxWidth
      })}>
        { this.state.note ? ( <>
          <textarea value={ this.state.content } ref={ this.editor }></textarea>
        </> ) : "" }
      </div>
    </div>
  )}
}
