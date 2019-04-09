/** @jsx jsx */
import React, { useState } from "react"
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
  const [showNav, toggleNav] = useState(false)

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
          },
        }
      }) }>
        <div css={ theme => ({
          margin: "0 auto",
          width: "95%",
          maxWidth: theme.maxWidth
        })}>
          <nav className={ showNav ? "active" : "" } css={ theme => ({
            float: "left",
            height: theme.headerHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "0px",
            [theme.mobileBreakpoint]: {
              ".overlay": {
                position: "fixed",
                display: "block",
                top: "0",
                left: "0",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                opacity: 0,
                pointerEvents: "none",
                transition: theme.transition("0.2s"),
             },
              "&.active": {
                ".overlay": {
                  opacity: 1,
                  pointerEvents: "auto"
                },
                ul: {
                  left: "0px",
                }
              }
            },
          }) }>
            <ul css={ theme => ({ 
              listStyle: "none", 
              height: "100%",
              [theme.mobileBreakpoint]: {
                position: "fixed",
                top: "0px",
                left: "-320px",
                height: "100vh",
                width: "300px",  
                maxWidth: "90%",
                boxShadow: "4px 4px 8px -4px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#fff",
                zIndex: 4,
                transition: theme.transition("0.2s")
              },
            })}>
              <NavLink active={props.active === "notes"} href="/notes/">Notes</NavLink>
              <NavLink active={props.active === "templates"} href="/templates/">Templates</NavLink>
              <NavLink active={props.active === "notebooks"} href="/notebooks/">Notebooks</NavLink>
              <NavLink active={props.active === "tags"} href="/tags/">Tags</NavLink>
            </ul>
            <div className="overlay" onClick={ e => toggleNav(false) }></div>
          </nav>
        </div>
        <Link to="/user">
          <img css={ theme => ({
            height: theme.headerHeight,
            width: theme.headerHeight,
          })} src={ user.userData.photoURL || "" } />
        </Link>
        <div onClick={ e => toggleNav(!showNav) } css={ theme => ({
          height: theme.headerHeight,
          width: theme.headerHeight,
          position: "relative",
          left: "8px",
          display: "none",
          cursor: "pointer",
          zIndex: -1,
          [theme.mobileBreakpoint]: {
            display: "block"
          },
          "span": {
            width: "60%",
            height: "2px",
            backgroundColor: theme.main,
            display: "block",
            left: "20%",
            position: "absolute"
          }
        }) }>
          <span css={{ top: "calc(50% - 8px)" }}></span>
          <span css={{ bottom: "calc(50% - 8px)" }}></span>
        </div>
      </header>
    )}</UserContext.Consumer>
  )
}
