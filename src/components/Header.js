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
      },
      [theme.mobileBreakpoint]: {
        display: "block",
        height: "initial",
        margin: "8px 0",
        padding: "8px",
        backgroundColor: props.active ? "rgba(0, 0, 0, 0.05)" : "transparent",
        borderBottom: "2px transparent solid",
        ":hover": { borderBottom: "2px transparent solid" }
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
            [theme.mobileBreakpoint]: {
              "::after": {
                content: "''",
                position: "fixed",
                display: "block",
                top: "0",
                left: "0",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                zIndex: -1
              }
            },
          }) }>
            <ul css={ theme => ({ 
              listStyle: "none", 
              height: "100%",
              [theme.mobileBreakpoint]: {
                position: "fixed",
                top: "0px",
                left: "0px",
                height: "100vh",
                width: "300px",  
                boxShadow: "4px 4px 8px -4px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#fff",
                zIndex: 1,

              },
            })}>
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
