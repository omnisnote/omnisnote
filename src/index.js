import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import { auth } from "./firebase"

import "./styles/style.css"
import "./styles/easymde.css"
import Loading from "./components/Loading.js"

ReactDOM.render((
    <App />
), document.getElementById('root'))

serviceWorker.register()
