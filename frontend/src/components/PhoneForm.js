import React, { useState } from 'react';


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
        })
        
        .catch((error) => {
            console.error('Error:', error);
        })

    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Add a new phone number" onChange={onChange} value={phoneNumber} />
            <input type="text" placeholder="Add phone type" onChange={onChangeType} value={phoneType}/>
            <button type="submit">Add phone details</button>
        </form>
    );
}

export default PhoneForm;
