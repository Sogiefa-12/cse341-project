const contactsContainer = document.getElementById('contacts-app');
const getAllBtn = document.getElementById('get-all-btn');
const getSingleBtn = document.getElementById('get-single-btn');
const createBtn = document.getElementById('create-btn');
const updateBtn = document.getElementById('update-btn');
const deleteBtn = document.getElementById('delete-btn');

// Fetch all contacts
async function getContacts() {
    try {
      const response = await fetch('/contacts');
      if (!response.ok) {
        throw new Error('Network error');
      }
      const contacts = await response.json();
      displayContacts(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }
  
  function displayContacts(contacts) {
    const contactsContainer = document.getElementById('contacts-app');
    contactsContainer.innerHTML = '';

    contacts.forEach((contact) => {
      const contactDiv = document.createElement('div');
      contactDiv.innerHTML = `<h3>${contact.firstName} ${contact.lastName}</h3>
        <p>Email: ${contact.email}</p>
        <p>Favorite Color: ${contact.favoriteColor}</p>
        <p>Birthday: ${contact.birthday}</p>`;
      contactsContainer.appendChild(contactDiv);
    });
  }

// Fetch all contacts when the "Get All Contacts" button is clicked
getAllBtn.addEventListener('click', getContacts);


// Fetch a single contact by ID
getSingleBtn.addEventListener('click', () => {
  const contactId = prompt('Please enter the contact ID:');

  if (contactId) {
    fetch(`/contacts/${contactId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then((contact) => {
        displaySingleContact(contact);
      })
      .catch((error) => {
        console.error('Error fetching single contact:', error);
      });
  }
});
// Display a single contact on the page
function displaySingleContact(contact) {
    const contactsContainer = document.getElementById('contacts-app');
  
    // Clear existing contacts
    contactsContainer.innerHTML = '';
  
    // Create contact div
    const contactDiv = document.createElement('div');
    contactDiv.innerHTML = `<h3>${contact.firstName} ${contact.lastName}</h3>
      <p>Email: ${contact.email}</p>
      <p>Favorite Color: ${contact.favoriteColor}</p>
      <p>Birthday: ${contact.birthday}</p>`;
    contactsContainer.appendChild(contactDiv);
  }


// Create a new contact
createBtn.addEventListener('click', () => {
  const newContact = {
    firstName: 'Juliet',
    lastName: 'Hannah',
    email: 'raywhite@gmail.com',
    favoriteColor: 'green',
    birthday: '01/01/2022',
  };

  fetch('/contacts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newContact),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error('Network error');
    }
    return response.json();
    })
    .then((contact) => {
        displaySingleContact(contact);
    }).catch((error) => {
        console.error('Error creating contact:', error);
    });
});

// Update an existing contact
updateBtn.addEventListener('click', () => {
    const contactId = prompt('Please enter the contact ID:');
    const updatedContact = {
      firstName: 'Juliet',
      lastName: 'Fox',
      email: 'julietfox@hotmail.com',
      favoriteColor: 'orange',
      birthday: '02/02/2022',
    };
  
    if (contactId) {
      fetch(`/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network error');
          }
          return response.json();
        })
        .then((contact) => {
          displaySingleContact(contact);
        })
        .catch((error) => {
          console.error('Error updating contact:', error);
        });
    }
  });
  
  // Delete an existing contact
  deleteBtn.addEventListener('click', () => {
    const contactId = prompt('Please enter the contact ID:');
  
    if (contactId) {
      fetch(`/contacts/${contactId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network error');
          }
        })
        .catch((error) => {
          console.error('Error deleting contact:', error);
        });
    }
  });

// // Fetch and display contacts on page load
// window.addEventListener('DOMContentLoaded', () => {
// getContacts();
// });