import { useState, useEffect } from 'react';
import PhoneForm from './PhoneForm'; // Import the PhoneForm component

function Contact(props){
    console.log("***************************");
    console.log(props.id);
    console.log(props.name);
    
    const [phones, setPhones] = useState([]);
    const [showPhoneDetails, setShowPhoneDetails] = useState(false); // State for showing/hiding phone details

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
    

    function onClickDelete() {
        // Find the contact we want to delete and remove it 
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

      // Function to toggle showing/hiding phone details
    function togglePhoneDetails() {
    setShowPhoneDetails(!showPhoneDetails);
    }

    return (
        <li>
          <span onClick={togglePhoneDetails} style={{ cursor: 'pointer' }}>
            {props.name}
          </span>
          <button type="button" onClick={onClickDelete}>Delete</button>
          {showPhoneDetails && (
            <ul>
              {phones.map((phone) => (
                <li key={phone.id}>
                  {phone.Number} {phone.type}{' '}
                  <button type="button" onClick={() => onClickPhone(props.id, phone.id)}>
                    Delete Phone
                  </button>
                </li>
              ))}
              <PhoneForm contactId={props.id} setPhones={setPhones} />
            </ul>
          )}
        </li>
      );
    }

function ContactList(props) {

    const [newContact, setNewContact] = useState("");
    const [showStats, setShowStats] = useState(false); // State for showing/hiding stats
    
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

    // Function to toggle showing/hiding stats
    function toggleStats() {
        setShowStats(!showStats);
    }

	return (
		<div>
			<h1>{ props.heading }</h1>
			<input type="text" placeholder="Add a new contact" onChange={onChange} value={newContact} />
			<button type="button" onClick={onClick}>Create contact</button>
			<ul>
				{ props.contacts.map(contact => <Contact setContacts={props.setContacts} id={contact.id} name={contact.name} key={contact.id}/>) }
			</ul>

            <button type="button" onClick={toggleStats}>
                {showStats ? 'Hide stats' : 'Show stats'}
            </button>
            {showStats && <Stats />} {/* Show stats based on showStats state */}
		</div>
	);
}

function Stats(){
    const [stats, setStats] = useState({});

    // Function to fetch stats
    function fetchStats() {
        fetch('http://localhost/api/stats') 
          .then((response) => response.json())
          .then((data) => {
            setStats(data);
          })
          .catch((error) => {
            console.error('Error fetching stats:', error);
          });
    }

    // Fetch stats on component mount
    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Statistic</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Contacts</td>
                        <td>{stats.ContactNum}</td>
                    </tr>
                    <tr>
                        <td>Total Phones</td>
                        <td>{stats.PhoneNum}</td>
                    </tr>
                    <tr>
                        <td>Newest Contact</td>
                        <td>{stats.newContact}</td>
                    </tr>
                    <tr>
                        <td>Oldest Contact</td>
                        <td>{stats.oldContact}</td>
                    </tr>
                </tbody>
            </table>

            {/* Add an onClick handler to the refresh button to call fetchStats */}
            <button type="button" onClick={fetchStats}>
                Refresh stats
            </button>
        </div>
    );

    }

export { Contact, ContactList };