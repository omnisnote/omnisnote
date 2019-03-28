/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"
import MaterialIcon from "material-icons-react"


export default function ConfirmInput(props) {
  return (
    <div css={ theme => ({
      display: "flex",
      width: "100%"
    }) }>
      <input type="text" defaultValue={ props.defaultValue } />
      <button><MaterialIcon icon="check" /></button>
    </div>
  )
}
