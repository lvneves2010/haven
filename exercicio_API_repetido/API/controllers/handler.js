const database = require('../data/memory');

const endPoint1 = (req, res) => {
    res.status(200).send({message: "request ok!"});
};

const endPoint2 = (req, res) => {
    try {
        let newId = 1;

        const usersList = database.users;

        if(usersList.length > 0) {
            let lastId = 1;
            usersList.map((u) => {
                if(u.id >= lastId) {
                    lastId = u.id;
                    newId = u.id + 1;
                }
            })
        }

        const newUser = {
            id: newId,
            name: req.body.name,
            age: req.body.age
        }

        database.users.push(newUser);
        res.status(201).send(`succes adding user ${newUser.name}`);

    } catch (error) {
        res.status(500).send('Error adding user: ' + error.message);
    }
};

const endPoint3 = (req, res) => {
    try {
        const usersList = database.users;
        res.status(200).send(usersList);

    } catch (error) {
        res.status(500).send('Error retrieving users: ' + error.message);
    }
};

module.exports = { endPoint1, endPoint2, endPoint3 }