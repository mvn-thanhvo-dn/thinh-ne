const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const cors = require('cors')

const db = require('./db');
let client
db.connect().then(c => {
  client = c;
})

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors())

app.get('/:id', (req, res, next) => {
  const query = `SELECT * From todo WHERE id = '${req.params.id}'`;
  client.query(query, (err, result) => {
    if (err) {
      res.json(err.message);
    } else {
      res.json(result.rows[0])
    }
  });
});

app.get('/', (req, res, next) => {
  const query = 'SELECT * From todo';
  client.query(query, (err, result) => {
    if (err) {
      res.json(err.message);
    } else {
      res.json(result.rows);
    }
  });
});

app.post('/', (req, res, next) => {
  const query = `INSERT INTO todo (task) VALUES ('${req.body.task}')`;
  client.query(query, (err, result) => {
    if (err) {
      res.json(err.message);
    }
    res.json({ success: true });
  });
});

app.put('/:id', (req, res, next) => {
  const query = `UPDATE todo SET task = '${req.body.task}' WHERE id = '${req.params.id}'`;
  client.query(query, (err, result) => {
    if (err) {
      res.json(err.message);
    }
    res.json({ success: true });
  });
});

app.delete('/:id', (req, res, next) => {
  const query = `DELETE FROM todo WHERE id = '${req.params.id}'`;
  client.query(query, (err, result) => {
    if (err) {
      res.json(err.message);
    }
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
