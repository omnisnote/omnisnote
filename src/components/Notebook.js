/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

export default function Notebook(props) {
  return ( <div css={ theme => ({ margin: "8px", maxWidth: "200px", }) }>
    <Link to={ props.uid + "/notes/"}>
      <div className="notebook-card" css={ theme => ({
        backgroundColor: props.color ?
                          props.color === "__DEFAULT__" 
                            ? theme.background 
                            : props.color 
                        : theme.background,
        boxShadow: "0 4px 12px -8px rgba(0,0,0,0.2)",
        padding: "8px"
      })}>
        <p>{ props.title }</p>
      </div>
    </Link>
  </div> )
}
