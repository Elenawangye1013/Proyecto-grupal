import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'newpassword',
  database: 'idc' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');
});


// API endpoint login
app.post('/api/login', (req, res) => {
  const { email, contrasena } = req.body;
  const query = 'SELECT * FROM trabajadores WHERE email = ? AND contrasena = ?';

  connection.query(query, [email, contrasena], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login correcto' });
    } else {
      res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default connection;
