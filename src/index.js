import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import { auth } from "./firebase"
import UserContext from "./UserContext"


//HACK: used in order to fix automatic url redirection
let authListener = auth.onAuthStateChanged(e => {
    authListener()
    ReactDOM.render((
        <App />
    ), document.getElementById('root'))
})

//TODO: make loading thing
// ReactDOM.render((
//     <Loading />
// ), document.getElementById('root'))

serviceWorker.unregister()
