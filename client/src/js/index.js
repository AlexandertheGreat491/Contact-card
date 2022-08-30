// imports these files
import "./form";
//import "./submit";

// import css files
import "../css/index.css";


// import Bootstrap's npm modules
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/*allows the images to be included in the dependency graph*/

import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

// uses DOM manipulation to insert the images
// add images on load
// imports the initDb function from database.js
import { getDb, initdb, postDb, deleteDb, editDb } from "./database";

// imports the fetchCards() function
import { fetchCards } from "./cards";

window.addEventListener("load", function () {
  initdb();
  fetchCards();
  // temporarily placing the getDb() & postDb() function calls for the test data
  getDb();
  postDb("Lernantino", "learnantino@test.com", 8186601234, "Bear");
  getDb();

  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});

import { toggleForm, clearForm } from "./form";

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    // Obtains values passed into the form element
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;
    // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
    editDb(profileId, name, email, phone, profile);
    fetchCards();
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});

window.deleteCard = (e) => {
  // Grabs the id from the button element attached to the contact
  let id = parseInt(e.id);
  // Deletes the card
  deleteDb(id);
  // Reloads the DOM
  fetchCards();
};

window.editCard = (e) => {
  // grabs the id from the button element attached ot the contact card & sets a global variable that will be used in the form element
  profileId = parseInt(e.dataset.id);

  // grabs information to pre-populate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  // toggles the Submit button so that it now Updates an existing contact instead of posting a new one
  submitBtnToUpdate = true;
};
