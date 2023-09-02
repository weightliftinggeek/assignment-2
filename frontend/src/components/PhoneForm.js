import React, { useState } from 'react';
import '../App.css';


function PhoneForm(props) {
    console.log(props)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneType, setPhoneType] = useState("");

    function onChange(event) {
        setPhoneNumber(event.target.value);
    }

    function onChangeType(event) {
        setPhoneType(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost/api/contacts/${props.contactId}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Number: phoneNumber,
                                   type: phoneType})
        })
        .then(response => response.json())
        .then(data => {
            props.setPhones(phones => [...phones, data]);
            setPhoneNumber("");  // Clear phoneNumber state
            setPhoneType("");    // Clear phoneType state
            props.togglePhone(); // Call the togglePhone function to show phone details
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        
        <form onSubmit={onSubmit}>
            <div className='phone-form-table' style={{ display: 'flex' }}>
                <input type="text" placeholder="Add a new phone number" onChange={onChange} value={phoneNumber} />
                <input type="text" placeholder="Add phone type" onChange={onChangeType} value={phoneType}/>
                <button className='Phone-detail-button' type="submit">Add phone details</button>
            </div>
        </form>

    );
}

export default PhoneForm;
