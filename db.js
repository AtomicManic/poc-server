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
  const query = 
  ` INSERT INTO missions (mission_id, drone_id, mission_name, mission_description, mission_start, mission_end, mission_status)
    VALUES (${data.mission_id}, ${data.drone_id}, ${data.mission_name}, ${data.mission_description}, ${data.mission_start}, ${data.mission_end}, ${data.mission_status})
    ON CONFLICT (mission_id) DO NOTHING;`

  try {
    await client.query(query);
    console.log('Data saved to the database');
  } catch (error) {
    console.error('Error saving data to the database', error);
  }
};

module.exports = {connectToDb , saveSensorData};