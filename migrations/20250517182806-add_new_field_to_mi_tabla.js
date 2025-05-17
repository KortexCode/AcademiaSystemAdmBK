'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('personas', 'identificacion', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true // o false, dependiendo de tus necesidades
      // Puedes agregar más opciones como defaultValue, unique, etc.
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('personas', 'identificacion');

  }
};
