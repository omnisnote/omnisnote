import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import { auth } from "./firebase"

import "./styles/style.css"
import "./styles/easymde.css"
import Loading from "./components/Loading.js"

//HACK: used in order to fix automatic url redirection
let authListener = auth.onAuthStateChanged(e => {
    authListener()
    ReactDOM.render((
        <App />
    ), document.getElementById('root'))
})

ReactDOM.render((
    <Loading />
), document.getElementById('root'))

serviceWorker.unregister()
