// imports idb and regenerator-runtime/runtime
import { openDB } from "idb";
import "regenerator-runtime/runtime";

export const initdb = async () => {
  // creates a new databased named 'contact_db' & will use version 1 of the database.
  openDB("contact_db", 1, {
    // adds the database schema if it hasn't already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts store already exists");
        return;
      }
      // creates a new object store for the data & gives it a key name of 'id' which will increment automatically
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts store created");
    },
  });
};

// exports a function that is used retrieve or READ data from the IndexedDB database
// export async getDb()
export const getDb = async () => {
  console.log("GET from the database");

  // creates a connection to the IndexedDB database & the version
  const contactDb = await openDB("contact_db", 1);

  // creates a new transaction & specifies the store & data privileges
  const tx = contactDb.transaction("contacts", "readonly");

  // opens the desired object store
  const store = tx.objectStore("contacts");

  // uses the .getAll() method to get all data in the database
  const request = store.getAll();

  // gets the confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result;
};

// export the postDb() function to POST to the database
export const postDb = async (name, email, phone, profile) => {
  console.log("POST to the database");

  // creates a connection to the database & specifies the version
  const contactDb = await openDB("contact_db", 1);

  // creates a new transaction & specifies the store & data privileges
  const tx = contactDb.transaction("contacts", "readwrite");

  // opens up the desired object store
  const store = tx.objectStore("contacts");

  // uses the .add() method on the store & passes  in the content
  // the .add() method takes in an object as a parameter that is populated by a form input
  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });

  // gets confirmation of the request
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};
