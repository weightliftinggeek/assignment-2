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

    return Contact;
};



