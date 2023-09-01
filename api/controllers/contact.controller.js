const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const contact = {
        name: req.body.name,
     };
  
     Contacts.create(contact)
         .then(data => {
             res.send(data);
         })
         .catch(err => {
             res.status(500).send({
                 message:
                 err.message || "Some error occurred"
             });
         });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const contactId = req.params.contactId;

    Contacts.findOne({
         where: { id: contactId}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Update one contact by id
exports.update = (req, res) => {
    const contactId = req.params.contactId;

    Contacts.update( req.body, {
         where: { id: contactId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Task was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Task`
            });
        }
    })
    .catch(err => {
       res.status(500).send({
           message: "Error updating Task with id=" + contactId
       });
    });
};

// Delete one contact by id

exports.delete = (req, res) => {
    const contactId = req.params.contactId;

    Phones.destroy({ where: { contactId } })
        .then(() => {
            return Contacts.destroy({ where: { id: contactId } });
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Contact with id=${contactId} not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting Contact with id=${contactId}`
            });
        });
};