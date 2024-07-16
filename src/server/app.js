
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
  password: "D0506504003xH",
  database: "hazutkitchen"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
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

server.post('/products', (req, res) => {
  const { name, title, price, description } = req.body;
  if (!name || !title || price == null || !description) {
    return res.status(400).json({ error: 'All product fields must be provided' });
  }
  const query = 'INSERT INTO products (name, title, price, description) VALUES (?, ?, ?, ?)';
  con.query(query, [name, title, price, description], (err, result) => {
    if (err) {
      console.error('Error inserting product:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).json({ id: result.insertId, name, title, price, description });
  });
});

server.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  con.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json('Internal Server Error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).json('Product not found');
    }
    res.status(200).json('Product deleted successfully');
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
