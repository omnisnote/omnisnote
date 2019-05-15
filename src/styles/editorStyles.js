export default (theme, userSettings) => console.log(userSettings) || ({
  ".CodeMirror-scroll": {
    height: "auto",
  },
  ".CodeMirror": {
    backgroundColor: theme.background,
    boxShadow: "0 8px 8px -6px rgba(0,0,0,0.2)",
    margin: "0 auto 0",
    fontFamily: `"${userSettings.mainFont}", sans-serif`
  },
  ".CodeMirror-line::selection, .CodeMirror-line>span::selection, .CodeMirror-line>span>span::selection": {
    backgroundColor: theme.selection + " !important"
  },
  ".CodeMirror-line::-moz-selection, .CodeMirror-line>span::-moz-selection, .CodeMirror-line>span>span::-moz-selection": {
    backgroundColor: theme.selection + " !important"
  },
  ".CodeMirror-selected": {
    backgroundColor: theme.selection + " !important"
  },
  ".editor-statusbar": {
    position: "fixed",
    bottom: "12px",
    right: "12px",
    zIndex: 12,
    color: theme.color,
    backgroundColor: theme.background,
    boxShadow: "0 4px 4px -2px rgba(0,0,0,0.2)",
    [theme.mobileBreakpoint]: {
      display: "none"
    }
  },
  ".CodeMirror-cursor, .CodeMirror div.CodeMirror-secondarycursor": {
    borderLeft: "1.5px solid " + theme.main + " !important",
  },
  ".CodeMirror-gutter-filler, .CodeMirror-scrollbar-filler": {
    backgroundColor: theme.background,
  }
})