/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"
import { getPositivePatterns } from 'fast-glob/out/managers/tasks';


//TODO: actually think about the way you wrote this
function getColor(color) {
  let raw = color.replace(/#/g, "")
  let c = raw.length === 3 ? raw + raw : raw
  let channels = {
    r: parseInt(c.substr(0, c.length / 3), 16),
    g: parseInt(c.substr(c.length / 3, c.length / 3), 16),
    b: parseInt(c.substr(c.length * 2 / 3, c.length / 3), 16)
  }

  let lum = (channels.r + channels.g + channels.b) / 3

  return lum < 127 ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)"
}


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
        padding: "8px",
        transition: theme.transition("0.3s"),
        color: getColor(props.color ?
          props.color === "__DEFAULT__"
            ? theme.background
            : props.color
          : theme.background),
        ":hover": {
          boxShadow: "0 4px 16px -4px rgba(0,0,0,0.2)",
        }
      })}>
        <p>{ props.title }</p>
      </div>
    </Link>
  </div> )
}
