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
        padding: "4px 0",
        minWidth: "140px",
        cursor: "pointer",
      }) }>
        <MaterialIcon 
          icon="keyboard_arrow_down" 
          color={ themes[userSettings.theme].textColor }
          size="24"
        />
        <span css={ theme => ({
          padding: "12px"
        }) }>{ selected }</span>
        { focused &&
          props.options.map((option, i) => (
            <div css={theme => ({
              padding: "4px 36px",
              cursor: "pointer",
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
    )}</UserContext.Consumer>
  )
}