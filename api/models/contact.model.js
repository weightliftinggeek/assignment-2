module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: Sequelize.STRING
        }
        // DEFINE YOUR MODEL HERE
    });
    //Contact.hasMany(Phone);
    Contact.associate = (models) => {
        Contact.hasMany(models.Phone, {
            foreignKey: 'contactId', // This is the foreign key in the Phone model
            as: 'phones' // Alias for the association
        });
    };
    return Contact;
};

