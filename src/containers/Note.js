/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx, Global } from '@emotion/core'

import EasyMDE from "easymde"

import { getTxtNote, setTxtNote } from "../firebase/firestore.js"

import Header from "../components/Header.js"

import editorStyles from "../styles/editorStyles.js"

export default class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      note: null,
    }

    this.getNote(props.match.params.uid)
  }

  getNote(uid) {
    getTxtNote(uid).then(note => {
      this.setState({ 
        ...note, 
        note: true,
        editor: new EasyMDE({ 
          element: this.editor,
          initialValue: note.content,
          autofocus: true,
          toolbar: true,
          toolbarTips: false,
          parsingConfig: {
            allowAtxHeaderWithoutSpace: true,
            strikethrough: true,
          }, 
        })
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
    this.saveNote(this.props.match.params.uid, {
      ...this.state,
      content: this.state.editor.value()
    })
  }

  componentDidMount() {
    
  }

  render() { return (
    <div className="note">
      <Header />
      <Global styles={ theme => editorStyles(theme, { width: "960px" }) } />
      <div css={ theme => ({
        margin: "84px auto 12px",
        width: "95%",
        maxWidth: theme.maxWidth
      })}>
        { this.state.note ? ( <>
          <h1 css={ theme => ({ 
            marginBottom: "16px" 
          }) }>{ this.state.title }</h1>
        </> ) : "" }
        <textarea ref={ el => this.editor = el }
                  style={{ display: "none" }}></textarea>
      </div>
    </div>
  )}
}
