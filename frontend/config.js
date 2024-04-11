import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',  
  user: 'root',  
  password: '',  
  database: 'labkurs1'
});

connection.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the DB:', error);
    return;
  }
  console.log('Connected to the database successfully!');
});

export default connection;
