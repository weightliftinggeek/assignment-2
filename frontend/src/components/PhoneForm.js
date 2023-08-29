import React, { useState } from 'react';


function PhoneForm(props) {
    const [phoneNumber, setPhoneNumber] = useState("");

    function onChange(event) {
        setPhoneNumber(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost/api/contacts/${props.contactId}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Number: phoneNumber })
        })
        .then(response => response.json())
        .then(data => {
            props.setPhones(phones => [...phones, data]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        setPhoneNumber("");
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Add a new phone number" onChange={onChange} />
            <button type="submit">Add phone number</button>
        </form>
    );
}

export default PhoneForm;
