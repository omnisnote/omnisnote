import React from 'react'

const UserContext = React.createContext()

const defaultSettings = {
  mainFont: "Open Sans",
  editorFontSize: 18,
  monoFont: "Roboto Mono",
  codeFontSize: 16,
  lineHeight: 1.8,
  autosave: true,
  theme: "light"
}

export default UserContext

export { defaultSettings }