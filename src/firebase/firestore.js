import { firebase } from "./firebase.js"
import auth from "./auth"

const firestore = firebase.firestore()

function getUser() {
  if(!auth.currentUser) throw new Error("user not authed")
  return firestore.collection("users").doc(auth.currentUser.uid)
}

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

function createTxtNote(title = "new note", notebook = "__NONE__", content = "") {
  const uid = getUser().collection("text-notes-meta").doc().id
  // seperated in order to allow for large content without heavy preformance hits
  getUser().collection("text-notes-meta").doc(uid).set({ 
    title,
    notebook,
    lastEdit: new Date().toDateString(),
    tags: []
  })
  getUser().collection("text-notes-content").doc(uid).set({ content })
  return uid
}

window.createTxtNote = createTxtNote

function getTxtNote(uid) {
  return new Promise((resolve, reject) => {
    getUser().collection("text-notes-meta").doc(uid).get().then(meta => {
      getUser().collection("text-notes-content").doc(uid).get().then(content => {
        const note = { 
          ...meta.data(), 
          ...content.data()
        }
        resolve(note)
      })
    })
  })
}

function setTxtNote(uid, data) {
  console.log(data)
  getUser().collection("text-notes-meta").doc(uid).set({
    title: data.title,
    tags: data.tags,
    lastEdit: new Date().toDateString(),
    notebook: data.notebook
  })
  getUser().collection("text-notes-content").doc(uid).set({
    content: data.content,
  })
}

function getNoteList(notebook = "__NONE__") { //TODO: error handling
  return new Promise((resolve, reject) => {
    getUser().collection("text-notes-meta").where("notebook", "==", notebook).get().then(res => {
      resolve(res.docs.map(d => ({ ...d.data(), uid: d.id })))
    })
  })
}

export default firestore
export { getUser, createUser, createTxtNote, getTxtNote, getNoteList, setTxtNote }