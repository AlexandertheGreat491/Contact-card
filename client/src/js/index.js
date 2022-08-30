// imports these files
import "./form";
import "./submit";

// import css files
import "../css/index.css";
// my custom css
import "../css/custom.css";

/*allows the images to be included in the dependency graph*/

import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

// uses DOM manipulation to insert the images
// add images on load
// imports the initDb function from database.js
import { getDb, initdb, postDb } from './database';

window.addEventListener('load', function() {
  initdb();

  // temporarily placing the getDb() & postDb() function calls for the test data
  getDb();
  postDb("Lernantino", "learnantino@test.com", 8186601234, "Bear");
  getDb();
  
  document.getElementById('logo').src = Logo;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});

// import Bootstrap's npm modules
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



