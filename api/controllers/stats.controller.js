const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = async (req, res) => {
    const phone = await Phones.count();
    const contact = await Contacts.count();
    const newstContact = await Contacts.max('createdAt');
    const oldestContact = await Contacts.min('createdAt');

    const stats = {
        ContactNum: contact,
        PhoneNum: phone,
        newContact: newstContact,
        oldContact: oldestContact
    };
    
    res.send(stats);
};
