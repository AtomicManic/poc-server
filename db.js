const { Pool } = require('pg');

const connectToDb = () => {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    connectionString: process.env.POSTGRES_URL,
  });

  pool.connect((err,client) => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to the database');
      return client;
    }
  });
}


const saveSensorData = async (client, data) => {

    const queryText = `
    INSERT INTO data_readings (reading_id, mission_id, timestamp, accelX, accelY, accelZ, temperature, humidity)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (reading_id) DO NOTHING;
  `;

  const queryParams = [
    "1",
    Date.now(),
    data.accelX,
    data.accelY,
    data.accelZ,
    data.temperature,
    data.humidity,
  ];

  try {
    await client.query(queryText, queryParams);
    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data', err.stack);
  }

};

module.exports = {connectToDb , saveSensorData};