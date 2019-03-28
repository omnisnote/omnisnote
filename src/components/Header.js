/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import UserContext from "../UserContext.js"


const NavLink = props => (
  <li css={ theme => ({
    display: "inline-block",
    margin: "0 8px",
    position: "relative",
    ":hover": {
      color: "#000",
      ":after": {
        opacity: 1,
        bottom: 0
      }
    },
    ":after": {
      content: "''",
      display: "block",
      position: "absolute",
      width: "100%",
      height: "1px",
      bottom: "4px",
      opacity: 0,
      transition: theme.transition("0.1s"),
      left: 0,
      backgroundColor: "#000"
    }
  }) }>
    <Link to={ props.href }>{ props.children }</Link>
  </li>
)


export default function Header(props) {
  return (
    <UserContext.Consumer>{ user => ( 
      <header css={ theme => ({
        position: "fixed",
        height: theme.headerHeight,
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: theme.background,
        boxShadow: "0 8px 12px -4px rgba(0,0,0,0.2)",
        a: { // defined here because of react router Link weirdness
          float: "right",
        }
      }) }>
        <nav css={ theme => ({
          float: "left",
          height: theme.headerHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "16px"
        }) }>
          <ul css={ theme => ({ listStyle: "none" })}>
            <NavLink href="/notes/">Notes</NavLink>
            <NavLink href="/templates/">Templates</NavLink>
            <NavLink href="/notebooks/">Notebooks</NavLink>
            <NavLink href="/tags/">Tags</NavLink>
          </ul>
        </nav>
        <Link to="/user">
          <img css={ theme => ({
            height: theme.headerHeight,
            width: theme.headerHeight,
          })} src={ user.userData.photoURL || "" } />
        </Link>
      </header>
    )}</UserContext.Consumer>
  )
}
