const { Client } = require('pg');

const obj = require('./configdb.json');

const connectObj = {
  ...obj,
};

const connect = async () => {
  const client = new Client(connectObj);
  try {
    await client.connect();
    console.log("Connected")
  } catch (err) {
    console.log("Connect fail")
  }
  return client;
};

module.exports = { connect };
