var express = require('express');
var app = express();
var MathOperations;
(function (MathOperations) {
    MathOperations["dodaj"] = "dodaj";
    MathOperations["usun"] = "usun";
    MathOperations["podziel"] = "podziel";
    MathOperations["pomnoz"] = "pomnoz";
})(MathOperations || (MathOperations = {}));
app.get('/', function (req, res) {
    var operation = req.query.operations;
    var num1 = +req.query.num1;
    var num2 = +req.query.num2;
    switch (operation) {
        case MathOperations.dodaj:
            res.send("".concat(num1 + num2));
            break;
        case MathOperations.usun:
            res.send("".concat(num1 - num2));
            break;
        case MathOperations.podziel:
            res.send("".concat(num1 / num2));
            break;
        case MathOperations.pomnoz:
            res.send("".concat(num1 * num2));
            break;
    }
});
app.listen(3000);
