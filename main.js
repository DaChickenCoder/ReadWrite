//------------DATABASE SECTION: Grabs all the functions from the database api that we need and gets the database------------\\
// Note: DO NOT change any of the code in the database section as doing so will mess up accessing your database
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { get, set, getDatabase, ref} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcIOL_iI101QnQkR_fa2OMHXKaxWw-RS0",
  authDomain: "readwrite-451d0.firebaseapp.com",
  projectId: "readwrite-451d0",
  storageBucket: "readwrite-451d0.appspot.com",
  messagingSenderId: "24459142527",
  appId: "1:24459142527:web:42c121dc8612525f35664a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

//------------ELEMENTS SECTION: These are all the html elements on our project that we'll need------------\\
const connectionLabel = document.getElementById("connectionLabel") // Displays what database we're connected to
const keyInput = document.getElementById("keyInput") // Enter in the key here
const valueInput = document.getElementById("valueInput") // Enter in the key value here
const setButton = document.getElementById("setButton") // Click on this button to set the value of a key
const getButton = document.getElementById("getButton") // Click on this button to get the value of a key

//------------CONNECTIVITY SECTION: Code that changes the "connectionLabel" text if we're connected to our database------------\\
if(db){ // Checks if the database, db, exists
    connectionLabel.innerText = "Database Connection: " + firebaseConfig.projectId // The project id contains the name of our database
} else {
    connectionLabel.innerText = " Database Connection: Not Connected"
}

//------------WRITING SECTION: Allows us to CHANGE values in our database------------\\
setButton.addEventListener("click", function(){ // Detect clicks of the set button
    if(keyInput.value != "" && valueInput.value != ""){ // Checks if both input boxes have something in them
        /*
            ref() is a function that gives us a reference to a specific part of our database. This allows the set method to change 
            our desired value. 
        
            In this case, we want the set function to look into our database and change the value with the key of "keyInput.value" 
            to "valueInput.value". We also want to do this in a sub section called data, which is what the "data/ +" is for.

            ALSO if you put in a key that doesn't exist in the database already, Firebase will automatically create a new key with
            the value of "valueInput.value." Pretty nice!
        */
        set(ref(db, "data/" + keyInput.value), { 
            value: valueInput.value
        }).then(function(){ // .then() calls a function only IF the set() method succeeds
            alert("Successfully set the value of key '" + keyInput.value + "' to '" + valueInput.value + "'") // Success message
        }).catch(function(err){ // .catch calls a function IF set() fails. It also gives us the error
            alert("Failed to update. Error: " + err) // Error message
        })
    } else {
        alert("You must enter a string into both the key and value boxes.") // This alerts us if we have nothing written in the boxes.
    }
})

//------------READING SECTION: Allows us to SEE values in our database------------\\
getButton.addEventListener("click", function(){ // Detect clicks of the get button
    if(keyInput.value != ""){ // Checks if the key input box have something in it
        /*
            Again, we use the ref() method mentioned earlier in union with the .then() method. When using the get() 
            method, we recieve a "snapshot" of the data provided. By calling snapshop.val(), we get a data object.
            This data object holds a value property which tells us the value stored in the key. 
            
            Calling snapshot.val().value gets us our value stored in the key
        */
        get(ref(db, "data/" + keyInput.value)).then(function(snapshot){
            valueInput.value = snapshot.val().value // Inserts the value into the value input box
        }).catch(function(err){ // .catch calls a function IF set() fails. It also gives us the error
            valueInput.value = ""
            alert("Failed to get data. Error: " + err) // Error message
        })
    } else {
        alert("You must enter a string into the key box.") // This alerts us if nothing is written in the key box
    }
})

