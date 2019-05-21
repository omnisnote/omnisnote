/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from '@emotion/core'

import MaterialIcon from "material-icons-react"


export default function DotButton(props) { 
  const size = props.size || 44
  return (
    <button onClick={ e => props.onClick && props.onClick(e) } css={ theme => ({
      height: size + "px",
      width: size + "px",
      overflow: "hidden",
      backgroundColor: "transparent",
      margin: "0 4px",
      cursor: "pointer",
      position: "relative",
      ...(props.style ? props.style(theme) : {}),
      i: {
       zIndex: 1,
       position: "relative",
       transition: theme.transition("0.1s"),
       color: theme.textColor + " !important",
       opacity: 0.7
      },
      "::after": {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "50%",
        height: 0,
        width: 0,
        borderRadius: "50%",
        opacity: 0.2,
        backgroundColor: theme.main,
        zIndex: 0,
        transition: theme.transition("0.1s")
      },
      ":hover": {
        "::after": {
          width: "100%",
          height: "100%",
          top: 0,
          left: 0
        },
        i: { opacity: 1 }
      }
    }) }>
      <MaterialIcon icon={ props.icon } size={ size * (5/8) } />
    </button>
  )
}