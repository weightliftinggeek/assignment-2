import { useState, useEffect } from 'react';  // import useEffect
import {Contact,ContactList} from './components/Contact';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className='page'>     
            <ContactList heading='Contactor' contacts={contacts} setContacts={setContacts}/>
        </div>
    );
}

export default App;