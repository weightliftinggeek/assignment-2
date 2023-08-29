import { useState, useEffect } from 'react';
import PhoneForm from './PhoneForm'; // Import the PhoneForm component

function Contact(props){
    console.log(props);

    const [phones, setPhones] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/api/contacts/${props.id}/phones`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Add this line to see the structure of the data
                setPhones(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    

    function onClick() {
        // Find the task we want to delete and remove it 
        fetch(`http://localhost/api/contacts/${props.id}`, {
        method: 'DELETE',
    })
    .then(() => {
            // remove it from the state
            props.setContacts(contacts => contacts.filter(contact => contact.id !== props.id));
    })
    .catch((error) => {
            console.error('Error:', error);
    });
    }

    return (
        <li>
          {props.name}
          <button type="button" onClick={onClick}>Delete</button>
          <ul>
            {phones.map(phone => (
              <PhoneForm key={phone.id} id={phone.id} setPhones={setPhones} type={phone.type || "Unknown"}/>
            ))}
          </ul>
        </li>
      );
      
}


function ContactList(props) {

    const [newContact, setNewContact] = useState("");

    function onChange(event) {
		setNewContact(event.target.value);
	}

    function onClick() {
		fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newContact})
        })
            .then(response => response.json())
            .then(data => {
                props.setContacts(contacts => [...contacts, data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setNewContact("");  // Clear the input field
	}

	return (
		<div>
			<h1>{ props.heading }</h1>
			<input type="text" placeholder="Add a new contact" onChange={onChange} />
			<button type="button" onClick={onClick}>Create contact</button>
			<ul>
				{ props.contacts.map(contact => <Contact setContacts={props.setContacts} id={contact.id} name={contact.name}/>) }
			</ul>
		</div>
	);
}


export { Contact, ContactList };