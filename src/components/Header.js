/** @jsx jsx */
import React, { useState } from "react"
import { css, jsx } from '@emotion/core'
import { Link } from "react-router-dom"

import UserContext from "../UserContext.js"

const defaultUserImgURI = "data:image/png;base64,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"

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
      borderBottom: "2px solid transparent",
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
              {/* <NavLink active={props.active === "templates"} href="/templates/">Templates</NavLink> */}
              <NavLink active={props.active === "notebooks"} href="/notebooks/">Notebooks</NavLink>
              {/* <NavLink active={props.active === "tags"} href="/tags/">Tags</NavLink> */}
            </ul>
            <div className="overlay" onClick={ e => toggleNav(false) }></div>
          </nav>
        </div>
        <Link to="/user">
          <img css={ theme => ({
            height: theme.headerHeight,
            width: theme.headerHeight,
          })} src={ user.userData.photoURL || defaultUserImgURI } />
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
