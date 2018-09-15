const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'immigrant'
});

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

// get hash address using passport# + country code
app.get('/', (req, res, next) => {
    const passportNumber = req.query.passportNumber;

    if (passportNumber) {
        connection.query('select * from immigrant where PassportNumber=?', [passportNumber], (error, results, fields) => {
            if (error)
                next(error);
            res.status(200).json(results[0]);
        });
    } else {
        connection.query('select * from immigrant', function (err, result, field) {
            if (err)
                next(err);
            res.status(200).json(result);
        });
    }
});

// insert row
app.post('/', (req, res, next) => {
    const passportNumber = req.body.passportNumber;
    const hashAddress = req.body.hashAddress;
    connection.query('insert into immigrant (PassportNumber, HashAddress) values (?,?)', [passportNumber, hashAddress], (error, result, fields) => {
        if (error)
            next(error);
        const insertedId = result.insertId;
        connection.query('select * from immigrant where Id=?', insertedId, (err, results, fields) => {
            if (error)
                next(error);
            res.status(200).json(results[0]);
        });
    });
});

app.put('/', (req, res, next) => {
    const passportNumber = req.body.passportNumber;
    const hasAddress = req.body.hashAddress;
    connection.query('update immigrant set HashAddress=? where PassportNumber=?', [hasAddress, passportNumber], (error, result, field) => {
        if (error)
            next(error);
        res.status(200).json();
    });
});

app.use((err, req, res, next) => {
    res.status(500).json();
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
