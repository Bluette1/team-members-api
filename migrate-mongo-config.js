// In this file you can configure migrate-mongo

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({path: '.env.development'});
}

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
}
const MONGODB_URL = process.env.MONGODB_URL;
const DB = process.env.DB;
const MIGRATIONS_DIR = process.env.MIGRATIONS_DIR;

const config = {
  mongodb: {
    url: MONGODB_URL,

    databaseName: DB,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: MIGRATIONS_DIR,

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,
};

// Return the config as a promise
module.exports = config;
