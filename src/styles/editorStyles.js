export default (theme, userSettings) => ({
  ".CodeMirror-scroll": {
    height: "auto",
    fontSize: `${userSettings.editorFontSize}px`,
    lineHeight: `${userSettings.lineHeight}rem`
  },
  ".CodeMirror": {
    backgroundColor: theme.background,
    boxShadow: "0 8px 8px -6px rgba(0,0,0,0.2)",
    margin: "0 auto 0",
    fontFamily: `"${userSettings.mainFont}", sans-serif`
  },
  ".CodeMirror .cm-comment": {
    fontFamily: `"${userSettings.monoFont}", monospace`,
    fontSize: `${userSettings.codeFontSize}px`
  },
  ".cm-s-easymde .cm-comment:only-child::after, .cm-s-easymde .cm-comment.CodeMirror-selectedtext::after, .cm-s-easymde .cm-formatting-code-block:first-of-type::after": {
    borderLeft: `2px solid ${theme.main}`
  },
  ".cm-hr::after": {
    content: "''",
    display: "block",
    position: "absolute",
    height: "1px",
    top: "calc(50% + 0.5px)",
    backgroundColor: theme.textColor,
    opacity: 0.3,
    width: "100%"
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
    boxShadow: "0 4px 8px 2px rgba(0,0,0,0.2)",
    [theme.mobileBreakpoint]: {
      display: "none"
    },
  },
  ".CodeMirror-cursor, .CodeMirror div.CodeMirror-secondarycursor": {
    borderLeft: "1.5px solid " + theme.main + " !important",
  },
  ".CodeMirror-gutter-filler, .CodeMirror-scrollbar-filler": {
    backgroundColor: theme.background,
  }
})