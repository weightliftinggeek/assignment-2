import { useState, useEffect } from 'react';
import PhoneForm from './PhoneForm'; // Import the PhoneForm component
import '../App.css';

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
    // Function to toggle showing phone details when "Add phone details" button is clicked
    function togglePhone() {
        setShowPhoneDetails(true);
        }

    return (
        <table className="inner-table">
          <tbody>
            <tr>
              <td>
                <div className="contact-info" style={{ display: 'flex', alignItems: 'center' }}>
                  <span onClick={togglePhoneDetails} style={{ cursor: 'pointer' }}className="contact-name">
                    {props.name}
                  </span>
                  <button type="button" onClick={onClickDelete} className="delete-button">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <PhoneForm contactId={props.id} setPhones={setPhones} togglePhone={togglePhone} />
              </td>
            </tr>
      
            {showPhoneDetails && (
              <tr>
                <td colSpan="1">
                  <div className="phone-details-container">
                    <table className="phone-details-table">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {phones.map((phone) => (
                          <tr key={phone.id}>
                            <td>{phone.Number}</td>
                            <td>{phone.type}{' '}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => onClickPhone(props.id, phone.id)}
                              >
                                Delete Phone
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
			<h1 className='heading'>{ props.heading } </h1>
        
            <table className="outter-table">
                <thead>
                    <tr>
                        <th> <h2> Contacts </h2></th>
                    </tr>
                    <tr>
                        <p className='Intro'>Click a contact to view associated phone numbers</p>
                    </tr>
                </thead>
                <tbody>
                    <tr> <td> <input type="text" placeholder="Add a new contact" onChange={onChange} value={newContact} /> </td> </tr>             
                    <tr><td> <button className='Create-contact' type="button" onClick={onClick}>Create contact</button> </td></tr>            
			        <tr>{ props.contacts.map(contact => <Contact setContacts={props.setContacts} id={contact.id} name={contact.name} key={contact.id}/>) }</tr>
                </tbody>
            </table>

            <button type="button" onClick={toggleStats} className='show-stats'>
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
            <table className='stats'>
            <tbody>
                <tr>
                <td><strong>Total Contacts</strong></td>
                </tr>
                <tr>
                <td>{stats.ContactNum}</td>
                </tr>

                <tr>
                <td><strong>Total Phones</strong></td>
                </tr>
                <tr>
                <td>{stats.PhoneNum}</td>
                </tr>

                <tr>
                <td><strong>Newest Contact</strong></td>
                </tr>
                <tr>
                <td>{stats.newContact}</td>
                </tr>

                <tr>
                <td><strong>Oldest Contact</strong></td>
                </tr>
                <tr>
                <td>{stats.oldContact}</td>
                </tr>
                <tr>
                <td colSpan="2">
                    <button type="button" onClick={fetchStats} className='refresh-stats'>
                    Refresh stats
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    );

    }

export { Contact, ContactList };