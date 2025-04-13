const e = require('express');
const app = e();
const {routes} = require('./routes/api');

app.use(e.json());

app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});