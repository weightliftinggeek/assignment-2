module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        type:{
            type: Sequelize.STRING
        },
        Number:{
            type: Sequelize.STRING
        }
    });
    //Phone.belongsTo(Contact);
    Phone.associate = (models) => {
        Phone.belongsTo(models.Contact, {
            foreignKey: 'contactId' // This is the foreign key in the Phone model
        });
    };
    return Phone;
};

