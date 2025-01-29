const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./users.db');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    const { firstName, lastName, username, password, email } = req.body;
    db.run(`INSERT INTO users (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)`, 
        [firstName, lastName, username, password, email], 
        (err) => {
            if (err) {
                return res.status(500).send("Error registering user");
            }
            res.send("User registered successfully");
        }
    );
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});