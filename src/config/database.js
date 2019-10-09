const Sequelize = require('sequelize');

const mysqlConnection = new Sequelize('login_basic', 'root', '', {

  dialect: 'mysql'

});

mysqlConnection.authenticate().then(() => {

    console.log('La conexión se ha establecido con éxito.');

  })

  .catch(err => {

    console.error('No se puede conectar a la base de datos.', err);

  });

module.exports = mysqlConnection;
