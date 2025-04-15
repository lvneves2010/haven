const e = require('express');
const app = e();
const router = e.Router();
const database = require('./data/memory');

const companiesList = database.companies;

const activity = []



app.use(e.json());

app.use('/api', router);

const companies = router.get('/companies', (req, res) => {
    try {
        res.status(200).send(companiesList);

    } catch (error) {
        res.status(500).send('error retrieving list of companies');
    }
});

const companiesByTicker = router.get('/companies/:ticker', (req, res) => {
    const { ticker } = req.params;
    try {
        companiesList[0].find((c) => {
            if(c[2] === ticker) {    
                for (let obj of activity) {
                    if (obj.hasOwnProperty(ticker)) {
                        obj[ticker] += 1;
                        return res.status(200).send(c);
                    } 
                }
                const newOBJ = {[ticker]: 1}
                activity.push(newOBJ)

                return res.status(200).send(c);
            }
        })

    } catch (error) {
        res.status(500).send('error retrieving company');
    }
});

const activities = router.get('/activities', (req, res) => {
    try {

        res.status(200).send(activity);

    } catch (error) {
        res.status(500).send('error retrieving list of activities');
    }
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    fetch('https://www.sec.gov/files/company_tickers_exchange.json', {
        headers : {
            "User-Agent": "John Doe (test@example.com)"
        }
    })
    .then(res => res.json())
    .then(data => {
        companiesList.push(data.data);
    })
    console.log(`server started at port ${PORT}`);
});

