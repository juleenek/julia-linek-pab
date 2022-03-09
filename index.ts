const express = require('express')  
const app = express()  

enum MathOperations {
    dodaj = 'dodaj',
    usun = 'usun',
    podziel = 'podziel',
    pomnoz = 'pomnoz'
}

app.get('/', function (req, res) {

const operation: MathOperations = req.query.operations;
   const num1 =  +req.query.num1;
   const num2 = +req.query.num2;

    switch(operation) {
        case MathOperations.dodaj:
            res.send(`${num1 + num2}`);
            break;
        case MathOperations.usun:
            res.send(`${num1 - num2}`);
            break;
        case MathOperations.podziel:
            res.send(`${num1 / num2}`);
            break;
        case MathOperations.pomnoz:
            res.send(`${num1 * num2}`);
            break;
    }
 
})  

app.listen(3000)  