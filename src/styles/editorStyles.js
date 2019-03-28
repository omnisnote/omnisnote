export default theme => ({
  ".CodeMirror-scroll": {
    // maxHeight: "calc(100vh - (" + theme.headerHeight + "))",
    height: "auto"
  },
  ".editor-statusbar": {
    position: "fixed",
    bottom: 0,
    right: 0
  }
})