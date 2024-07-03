
// src/server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const server = express();
const PORT = 3000;

server.use(cors());
server.use(bodyParser.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "D0506504003H",
  database: "hazutkitchen"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

server.get('/', (req, res) => {
  res.send("Hello World");
});

server.get('/products', (req, res) => {
  con.query('SELECT * FROM products', (err, results, fields) => {
    if (err) throw err;
    res.json(results);
  });
});

server.post('/submit-purchase', (req, res) => {
  const customerId = req.body.email;
  let productIds = req.body.productIds;

  if (!Array.isArray(productIds)) {
    productIds = [productIds];
  }
  if (productIds.length === 0) {
    alert("you cart is empty");
    return res.status(400).json({ error: 'Customer ID and product IDs are required' });
  }
  const sql = 'INSERT INTO purchases (customer_id, product_id) VALUES (?, ?)';
  let errorOccurred = false;
  productIds.forEach((productId, index) => {
    con.query(sql, [customerId, productId], (err, result) => {
      if (err) {
        console.error('Failed to insert purchase', err);
        errorOccurred = true;
        if (index === productIds.length - 1) {
          return res.status(500).json({ error: 'Failed to make purchase' });
        }
      } else {
        if (index === productIds.length - 1 && !errorOccurred) {
          res.json({ message: 'Purchase recorded successfully' });
        }
      }
    });
  });
});
server.post('/customers', (req, res) => {
  const customer = req.body;
  const query = 'INSERT INTO customers (name, email) VALUES (?, ?)';
  con.query(query, [customer.name, customer.email], (err, results) => {
    if (err) {
      console.error('Error inserting customer:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    customer.id = results.insertId; // Add the inserted ID to the customer object
    res.status(201).send(customer); // Respond with the inserted customer
  });
});


server.post('/login', (req, res) => {
  const { username, email } = req.body;
  const query = 'SELECT * FROM hazutkitchen.customers WHERE name = ? AND email = ?;';
  con.query(query, [username, email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length > 0) {
      res.json({ success: true, message: 'User authenticated', user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  });
});



server.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
