/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from '@emotion/core'

import MaterialIcon from "material-icons-react"

export default function Fab(props) {
  return (
    <button css={ theme => ({
      width: props.size || "56px",
      height: props.size || "56px",
      backgroundColor: theme.main,
      outline: "none",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 8px -2px rgba(0,0,0,0.4)",
      transition: theme.transition("0.2s"),
      position: "fixed",
      bottom: "32px",
      right: "32px",
      ":hover": {
        boxShadow: "0 8px 16px -4px rgba(0,0,0,0.4)",
      }
    })}
    onClick={ e => props.onClick && props.onClick(e) }
    ><MaterialIcon icon={props.icon} color="#fff" /></button>
  )
}