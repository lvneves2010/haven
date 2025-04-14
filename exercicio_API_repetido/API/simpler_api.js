const e = require('express');
const app = e();
const router = e.Router();
const database = require('./data/memory');

const userList = database.users



app.use(e.json());

app.use('/api', router);

const ep1 = router.get('/ep1', (req, res) => {
    res.status(200).send('simpler api connected');
});

const addUser = router.post('/addUser', (req, res) => {
    try {
        let newId = 1;
        const name = req.body.name;
        const age = req.body.age;

        if( userList.length > 0 ){
            let lastId = 1;
            userList.map((u) => {
                if ( u.id >= lastId ) {
                    lastId = u.id;
                    newId = lastId + 1;
                    return
                }
            })
        }

        if( !name || typeof name !== 'string' ) {
            res.status(400).send('invalid value for name');
        };
        if( !age|| isNaN(age) ) {
            res.status(400).send('invalid value for age');
        }
        const newUser = {
            id: newId,
            name: req.body.name,
            age: req.body.age
        };

        userList.push(newUser);
        res.status(201).send(`sucess creating user ${newUser.name}`);
    } catch (error) {
        res.status(500).send('error creating new user');
    }
});

const users = router.get('/users', (req, res) => {
    try {

        userList.sort((a, b) => a.age - b.age);
        res.status(200).send(userList);

    } catch (error) {
        res.status(500).send('error retrieving list of users');
    }
});


const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});