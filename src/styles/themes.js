import light from "./themes/light.js"
import dark from "./themes/dark.js"

const global = {
  mobileBreakpoint: "@media (max-width: 480px)"
}

const themes = { 
  light: { ...global, ...light }, 
  dark: { ...global, ...dark } 
}

export default themes