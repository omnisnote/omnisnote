/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from '@emotion/core'

import MaterialIcon from "material-icons-react"

import themes from "../styles/themes.js"
import UserContext from "../UserContext.js"

export default function Dropdown(props) {
  const [selected, setSelected] = useState(props.defaultValue)
  const [focused, setFocus] = useState(false)

  return (
    <UserContext.Consumer>{({ userSettings }) => (
      <div onClick={ e => {
        setFocus(!focused)
      } } css={ theme => ({
        background: theme.altBody,
        borderRadius: "2px",
        padding: "4px 8px",
        minWidth: "140px",
        cursor: "pointer",
        position: "relative",
        "*::selection": {
          background: "transparent"
        },
        i: { // MaterialIcon
          transform: focused ? "rotate(-180deg)" : "rotate(0)",
          transition: theme.transition("0.15s"),
          position: "relative",
          top: "-2px"
        }
      }) }>
        <MaterialIcon 
          icon="keyboard_arrow_down" 
          color={ themes[userSettings.theme].textColor }
          size="24"
        />
        <span css={ theme => ({
          padding: "12px"
        }) }>{ selected }</span>
        <div css={ theme => ({ 
            position: "absolute",
            background: theme.altBody,
            width: "100%",
            top: "100%",
            left: 0
          })}>
          { focused &&
            props.options.map((option, i) => (
              <div css={ theme => ({
                padding: "6px 44px",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: theme.transition("0.1s"),
                borderBottom: i !== props.options.length - 1 ? "1px solid " + theme.main : "none",
                ":hover": {
                  backgroundColor: theme.main,
                },
              })} key={i}
              onClick={ e => {
                setSelected(option.name)
                props.onChange && props.onChange({ value: option.name })
              } }>{ option.name }</div>
            ))
          }
        </div>
      </div>
    )}</UserContext.Consumer>
  )
}