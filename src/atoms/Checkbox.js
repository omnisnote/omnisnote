/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from '@emotion/core'

import MaterialIcon from "material-icons-react"

export default function Checkbox(props) {
  const [checked, toggleCheck] = useState(props.defaultChecked)

  return (
    <div css={ theme => ({
      height: "24px",
      width: "24px",
      backgroundColor: checked ? theme.main : "transparent",
      cursor: "pointer",
      borderRadius: "2px",
      border: `2px solid ${ theme.main }`,
      display: "inline",
      overflow: "hidden",
      position: "relative",
      transition: theme.transition(),
      i: { // MaterialIcon
        verticalAlign: "middle",
        display: "block",
        position: "absolute",
        top: "-2px",
        left: "-2px",
      }
    })} onClick={ e => toggleCheck(!checked) }>
      { checked && <MaterialIcon icon="checkmark" />}
    </div>
  )
}