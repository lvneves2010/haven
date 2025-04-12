const express = require('express');
const { routes } = require('./routes/api')
const app = express();

app.use(express.json());

app.use('/api', routes);


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
