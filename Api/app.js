const express = require('express');
const cors = require('cors');
const app = express();
const error = {message: "conection error with the server"}
const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join(__dirname, 'fake_db.json');
const json_file = require('./fake_db.json');

// Enable CORS
app.use(cors());


// Middleware to parse JSON requests
app.use(express.json());

app.get('/api', async (req, res) => {
    try {
            const response = await json_file;

            return res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Error fetching users: ' + error.message);
    }
});

app.post('/api/new', async (req,res) => {
    try {
            const newUser = {
                name: req.body.name,
                userType: req.body.userType,
                email: req.body.email,
                discipline: req.body.discipline
            };
            json_file.push(newUser);
            fs.writeFileSync(jsonFilePath, JSON.stringify(json_file, null, 2), 'utf-8');

            return res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send('Error fetching users: ' + error.message);
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});