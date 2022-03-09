const express = require('express')  
const app = express()  

// enum domyślnie: 0, 1, 2, 3

enum MathOperations {
    dodaj = 'dodaj',
    usun = 'usun',
    podziel = 'podziel',
    pomnoz = 'pomnoz'
}

// http://localhost:3000/?num1=10&num2=20&operations=dodaj

app.get('/', function (req, res) {

    const operation: MathOperations = req.query.operations;
    const num1 =  +req.query.num1; // Convert to number, default is string
    const num2 = +req.query.num2;

    switch(operation) {
        case MathOperations.dodaj:
            res.send(`Wynik ${num1} + ${num2} = ${num1 + num2}`);
            break;
        case MathOperations.usun:
            res.send(`Wynik ${num1} - ${num2} = ${num1 - num2}`);
            break;
        case MathOperations.podziel:
            res.send(`Wynik ${num1} / ${num2} = ${num1 / num2}`);
            break;
        case MathOperations.pomnoz:
            res.send(`Wynik ${num1} * ${num2} = ${num1 * num2}`);
            break;
    }
 
})  

app.listen(3000)  
