const express = require('express');
const logger = require('pino')()
const app = express();
const PORT = 8080;
const probe = 9000;
crash = false;

app.get('/', (req, res) => {
    //console.log(JSON.stringify(outlog))
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains') 
    res.send('Hello from NodeJS App !');
});

app.get('/crash', (req, res) => {
    crash = !crash;
    res.send('healthz endpoint crashed !');
});

app.get('/healthz', (req, res) => {
    if(!crash){
        return res.send('healthz endpoint recovered');
        
    };
    res.status(500).send('Server Error');
});

app.listen(PORT, () => console.log(`Running on port:${PORT}`));
;

app.listen(probe, () => console.log(`Running on port:${probe}`));
;