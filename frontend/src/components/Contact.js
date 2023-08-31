import { useState, useEffect } from 'react';
import PhoneForm from './PhoneForm'; // Import the PhoneForm component

function Contact(props){
    console.log("***************************");
    console.log(props.id);
    console.log(props.name);
    
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/api/contacts/${props.id}/phones`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Add this line to see the structure of the data
                if(Array.isArray(data)) {setPhones(data);}
                else{//Handle the case where data is not an array
                console.error('Data is not an arry:', data);
                }
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

    function onClickPhone(contactId,phoneId) {
        // Find the phone we want to delete and remove it 
        fetch(`http://localhost/api/contacts/${contactId}/phones/${phoneId}`, {
        method: 'DELETE',
    })
    .then(() => {
            // remove it from the state
            setPhones(phones => phones.filter(phone => phone.id !== phoneId));
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
              <li key={phone.id}>
                {phone.Number} {phone.type} <button type="button" onClick={() => onClickPhone(props.id,phone.id)}>Delete Phone</button></li>
            ))}

                <PhoneForm contactId = {props.id} setPhones={setPhones} />
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
                setNewContact("");  // Clear the input field
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        
	}

	return (
		<div>
			<h1>{ props.heading }</h1>
			<input type="text" placeholder="Add a new contact" onChange={onChange} value={newContact} />
			<button type="button" onClick={onClick}>Create contact</button>
			<ul>
				{ props.contacts.map(contact => <Contact setContacts={props.setContacts} id={contact.id} name={contact.name} key={contact.id}/>) }
			</ul>
		</div>
	);
}


export { Contact, ContactList };