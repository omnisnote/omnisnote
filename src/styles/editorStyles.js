export default (theme, userSettings) => ({
  ".CodeMirror-scroll": {
    height: "auto",
  },
  ".CodeMirror": {
    backgroundColor: theme.background,
    boxShadow: "0 8px 8px -6px rgba(0,0,0,0.2)",
    margin: "0 auto 40vh",
  },
  ".editor-statusbar": {
    position: "fixed",
    bottom: "12px",
    right: "12px",
    opacity: 0.6,
    zIndex: 12,
    color: theme.color,
    backgroundColor: theme.background,
    boxShadow: "0 4px 4px -2px rgba(0,0,0,0.2)",
  },
  ".CodeMirror-cursor": {
    borderLeft: "1.5px solid " + theme.main + " !important",
  }
})