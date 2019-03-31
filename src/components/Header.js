/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import UserContext from "../UserContext.js"


const NavLink = props => (
  <Link to={ props.href }>
    <li css={ theme => ({
      display: "inline-block",
      margin: "0 8px 0 0",
      padding: "0 12px",
      position: "relative",
      height: "100%",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      transition: theme.transition(),
      borderBottom: props.active ? ("2px solid " + theme.main) : "2px solid transparent",
      ":hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderBottom: ("2px solid " + theme.main)
      }
    }) }>
      { props.children }
    </li>
  </Link>
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
        zIndex: 4000,
        backgroundColor: theme.background,
        boxShadow: "0 8px 12px -4px rgba(0,0,0,0.2)",
        "a": { // defined here because of react router Link weirdness
          height: "100%"
        },
        ">a": {
          float: "right"
        }
      }) }>
        <div css={ theme => ({
          margin: "0 auto",
          width: "95%",
          maxWidth: theme.maxWidth
        })}>
          <nav css={ theme => ({
            float: "left",
            height: theme.headerHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "0px",
          }) }>
            <ul css={ theme => ({ listStyle: "none", height: "100%" })}>
              <NavLink active={props.active === "notes"} href="/notes/">Notes</NavLink>
              <NavLink active={props.active === "templates"} href="/templates/">Templates</NavLink>
              <NavLink active={props.active === "notebooks"} href="/notebooks/">Notebooks</NavLink>
              <NavLink active={props.active === "tags"} href="/tags/">Tags</NavLink>
            </ul>
          </nav>
        </div>
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
