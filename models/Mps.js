/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mps', {
        /**
         * Reddit username of MP
         * @type string
         */
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    }, {
        paranoid: true,
        timestamps: true,
    });
};