import mysql from 'mysql';

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',  // or your database server address
  user: 'root',  // your database username
  password: '',  // your database password
  database: 'labkurs1'  // your database name
});

// Connect to the database
connection.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the DB:', error);
    return;
  }
  console.log('Connected to the database successfully!');
});

export default connection;
