/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        user_name: 'José de Almeirda',
        email: 'admin@gmail.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', // secret_admin
      },
      {
        user_name: 'Valdeci de Moura',
        email: 'valdeci@gmail.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', // secret_user
      },
    ], {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
