/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React, { Component } from 'react'

import Header from "../components/Header.js"

export default class Notes extends Component {
  constructor(props) {
    super(props)
  }

  render() { return ( <>
    <Header />
    <div className="notes">
      <h1 css={{
        fontSize: "42px",
        fontWeight: 300
      }}>Notes</h1>
      
    </div>
  </> )}
}
