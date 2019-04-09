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
      backgroundColor: props.active ? ("rgba(0, 0, 0, 0.05)") : "transparent",
      ":hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderBottom: ("2px solid " + theme.main)
      },
      [theme.mobileBreakpoint]: {
        width: "100%",
        display: "block",
        height: "initial",
        margin: "4px 0",
        padding: "8px 16px",
        border: "2px transparent solid",
        ":hover": { border: "2px transparent solid", }
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
        },
        [theme.mobileBreakpoint]: {
          "nav": {
            position: "fixed",
            backgroundColor: "#fff",
            boxShadow: "4px 4px 8px -4px rgba(0, 0, 0, 0.2)",
            top: 0,
            left: "-350px",
            height: "100vh",
            width: "90%",
            maxWidth: "300px",
            "::after": {
              content: "''",
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100%",
              zIndex: -1,
              pointerEvents: "none",
              backgroundColor: "transparent"
            },
            "&.active": {
              left: 0,
              "::after": {
                top: 0,
                pointerEvents: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.2)"
              }
            }
          },
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
            <ul css={ theme => ({ 
              listStyle: "none", 
              height: "100%", 
              [theme.mobileBreakpoint]: {
                position: "fixed",
                backgroundColor: "#fff",
                boxShadow: "4px 4px 8px -4px rgba(0, 0, 0, 0.2)",
                top: 0,
                left: 0,
                height: "100vh",
                width: "90%",
                maxWidth: "300px",
              }
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
