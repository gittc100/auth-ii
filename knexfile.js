// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './auth-ii.sqlite3'
    },
    useNullAsDefault: true,
    migrations:{
      directory: './data/migrations'
    }
  }
};
