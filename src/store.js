import { defaultSettings } from "./UserContext.js"

import { createUser, getUser } from "./firebase/firestore.js"

const store = {
  userSettings: { ...defaultSettings, ...getLocalSettings() }
}

window.erots = store

function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(store.userSettings))
}

function getLocalSettings() {
  return JSON.parse(localStorage.getItem("settings") || "{}")
}

function onAuth(user) {
  return new Promise((resolve, reject) => {
    if (!user) reject()
    createUser(user)
    getUser().get().then(res => {
      if (!res.exists) return
      store.authed = !!user
      store.userData = user
      store.userSettings = { ...store.userSettings, ...res.data().settings }
      saveSettings()
      resolve()
    })
  })
}

export default store

export {
  saveSettings,
  onAuth,
  getLocalSettings
}