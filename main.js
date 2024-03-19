// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { get, set, getDatabase, ref} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcIOL_iI101QnQkR_fa2OMHXKaxWw-RS0",
  authDomain: "readwrite-451d0.firebaseapp.com",
  projectId: "readwrite-451d0",
  storageBucket: "readwrite-451d0.appspot.com",
  messagingSenderId: "24459142527",
  appId: "1:24459142527:web:42c121dc8612525f35664a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Elements
const keyInput = document.getElementById("keyInput")
const valueInput = document.getElementById("valueInput")
const setButton = document.getElementById("setButton")
const getButton = document.getAnimations("getButton")

setButton.addEventListener("click", function(){
  if(keyInput.value != "" && valueInput.value != ""){
      set(ref(db, keyInput.value), {
          value: valueInput.value
      }).then(function(){
          alert("Success!")
      }).catch(function(err){
          alert("Failed to update. Error: " + err)
      })
  } else {
      alert("You must enter a string into both the key and value boxes.")
  }
})

getButton.addEventListener("click", function(){
    if(keyInput.value != ""){
        get(ref(db, keyInput.value)).then(function(snapshot){
          // STOPPED HERE
        })
    } else {
        alert("You must enter a string into the key box.")
    }
})
