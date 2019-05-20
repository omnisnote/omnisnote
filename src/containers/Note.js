/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx, Global } from '@emotion/core'

import { Helmet } from "react-helmet"

import EasyMDE from "easymde"

import { getTxtNote, setTxtNote } from "../firebase/firestore.js"

import Header from "../components/Header.js"
import Loading from "../components/Loading.js"

import ConfirmInput from "../atoms/ConfirmInput.js"

import editorStyles from "../styles/editorStyles.js"

import UserContext from "../UserContext"

export default class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      note: null,
    }

    this.getNote(props.match.params.uid)
  }

  static contextType = UserContext

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
          spellChecker: false,
        })
      }, () => {
        this.state.editor.codemirror.on("focus", e => {
          this.setState({ hideHeader: true })
        })
        this.state.editor.codemirror.on("blur", e => {
          this.setState({ hideHeader: false })
        })
        this.state.editor.codemirror.setOption("extraKeys", {
          ["Ctrl-S"]: e => {
            this.saveNote(this.state.editor.value())
          }
        })

        if(this.context.userSettings.autosave) {
          this.autosave = setInterval(() => {
            this.saveNote(this.state.editor.value())
          }, 30000) // every 30sec
        }
      })
    })
  }

  saveNote(content) {
    setTxtNote(this.props.match.params.uid, {
      ...this.state,
      content
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps && (prevProps.match.params.uid !== this.props.match.params.uid)) {
      this.getNote(this.props.match.params.uid)
      this.saveNote(prevProps.match.params.uid, prevState)
    }
  }

  componentWillUnmount() {
    if(this.state.editor) this.saveNote(this.state.editor.value())

    clearInterval(this.autosave)
  }
  
  rename(e) {
    this.setState({ title: e.target.value })
  }

  render() { return (
    <div className="note">
      <UserContext.Consumer>{({ userSettings }) => <>
        <Header active="note" hide={this.state.hideHeader}/>
        <Global styles={ theme => editorStyles(theme, userSettings) } />
        <div css={ theme => ({
          margin: "4px auto 0",
          width: "95%",
          maxWidth: theme.maxWidth,
          [theme.mobileBreakpoint]: {
            width: "100%",
            margin: 0
          }
        })}>
          { this.state.note ? ( <>
            <Helmet>
              <title>{ this.state.title }</title>
            </Helmet>
            <ConfirmInput defaultValue={ this.state.title } style={theme => ({
              maxWidth: "480px",
              margin: "8px 0 32px",
              input: { fontSize: "24px" },
              [theme.mobileBreakpoint]: {
                maxWidth: "100%",
                margin: "0 0 8px",
              }
            })} placeholder="title" onConfirm={ this.rename.bind(this) } />
          </> ) : <Loading /> }
          <textarea ref={ el => this.editor = el }
                    style={{ display: "none" }}></textarea>
        </div>
      </> }</UserContext.Consumer>
    </div>
  )}
}
