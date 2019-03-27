import { firebase } from "./firebase.js"
import auth from "./auth"

const firestore = firebase.firestore()

function getUser() {
  if(!auth.currentUser) throw new Error("user not authed")
  return firestore.collection("users").doc(auth.currentUser.uid)
}

window.getUser = getUser


function createUser(user) {
  getUser().get().then(res => {
    if(!res.exists) {
      firestore.collection("users").doc(user.uid).set({
        settings: {
          theme: "light",
          email: user.email // strictly for identification in the db, should not be used in the app
        }
      })
      createTxtNote("Welcome to Omnisnote!", "TODO: write this")
    }    
  })
}

function createTxtNote(title = "new note", content = "") {
  const uid = getUser().collection("text-notes-titles").doc().id
  getUser().collection("text-notes-title").doc(uid).set({ title })
  getUser().collection("text-notes-content").doc(uid).set({ content })
  return uid
}

window.createTxtNote = createTxtNote

export default firestore
export { getUser, createUser }