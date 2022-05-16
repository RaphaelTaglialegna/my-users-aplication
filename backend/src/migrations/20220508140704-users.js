module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'user_name',

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',

      },
      password: {
        type: Sequelize.STRING,
      },

    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  },
};