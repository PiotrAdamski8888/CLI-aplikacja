const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts:", err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts:", err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.log("Contact found:");
      console.table(contact);
    } else {
      console.log("Contact not found.");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts:", err);
      return;
    }

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing contacts:", err);
          return;
        }
        console.log("Contact removed successfully.");
      }
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts:", err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    const updatedContacts = [...contacts, newContact];

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing contacts:", err);
          return;
        }
        console.log("Contact added successfully.");
      }
    );
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
