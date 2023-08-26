const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const contactId = req.params.contactId;
    const phone = {
        Number: req.body.Number,
        type: req.body.type,
        contactId: contactId
    };

    Phones.create(phone)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get all phones
exports.findAll = (req, res) => {
    const contactId = req.params.contactId;
    Phones.findAll({where: { contactId: contactId }})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get one phone by id
exports.findOne = (req, res) => {
    const phoneId = req.params.phoneId;
    const contactId = req.params.contactId;
    Phones.findOne({where: {contactId: contactId, id:phoneId}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Update one phone by id
exports.update = (req, res) => {
    const contactId = req.params.contactId;
    const phoneId = req.params.phoneId;

    Phones.update( req.body, {
         where: {contactId: contactId, id:phoneId}
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

// Delete one phone by id
exports.delete = (req, res) => {
    const contactId = req.params.contactId;
    const phoneId = req.params.phoneId;

    Phones.destroy({
        where: {contactId: contactId, id:phoneId}
    })
    .then(num => {
        if (num == 1) { 
            res.send({
                message: "Task was deleted successfully!"
            });
         } else {
            res.send({
                message: `Cannot delete Task`
            });
         }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Task with id=" + contactId
         });
    });
};