import { firebase } from "./firebase.js"
import auth from "./auth"

const firestore = firebase.firestore()

function getUser() {
  if(!auth.currentUser) throw new Error("user not authed")
  return firestore.collection("users").doc(auth.currentUser.uid).get()
}

window.getUser = getUser


function createUser(user) {
  getUser().then(res => {
    if(!res.exists) {
      firestore.collection("users").doc(user.uid).set({
        settings: {
          theme: "light",
          email: user.email // strictly for identification in the db, should not be used in the app
        }
      })
    }
  })
}


export default firestore
export { getUser, createUser }