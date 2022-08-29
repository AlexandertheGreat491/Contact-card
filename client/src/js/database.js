// imports idb and regenerator-runtime/runtime
import { openDB } from "idb";
import "regenerator-runtime/runtime";



export const initdb = async () => {
    // creates a new databased named 'contact_db' & will use version 1 of the database.
    openDB('contact_db', 1, {
        // adds the database schema if it hasn't already been initialized.
        upgrade(db) {
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            // creates a new object store for the data & gives it a key name of 'id' which will increment automatically
            db.createObjectStore('contacts', {keyPath: 'id', autoIncrement: true});
            console.log('contacts store created');
        }
    })
}