/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"
import MaterialIcon from "material-icons-react"


export default function ConfirmInput(props) {
  return (
    <div css={ theme => ({
      display: "flex",
      width: "100%",
      marginBottom: "16px",
      ...props.style
    }) }>
      <input type="text" placeholder={ props.placeholder }
        defaultValue={ props.defaultValue } 
        css={ theme => ({
          flex: 1,
          border: "none",
          outline: "none",
          boxShadow: "0 8px 8px -6px rgba(0,0,0,0.1)",
          padding: "8px 16px",
          color: theme.textColor,
          backgroundColor: theme.background,
        }) } onBlur={ e => props.confirm && props.confirm(e) }/>
    </div>
  )
}
