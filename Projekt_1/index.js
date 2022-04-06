var express = require('express');
var app = express();
// enum domyślnie: 0, 1, 2, 3
var MathOperations;
(function (MathOperations) {
    MathOperations["dodaj"] = "dodaj";
    MathOperations["usun"] = "usun";
    MathOperations["podziel"] = "podziel";
    MathOperations["pomnoz"] = "pomnoz";
})(MathOperations || (MathOperations = {}));
// http://localhost:3000/?num1=10&num2=20&operations=dodaj
app.get('/:num1/:num2/:operation', function (req, res) {
    var operation = req.params.operations;
    var num1 = +req.params.num1; // Convert to number, default is string
    var num2 = +req.parms.num2;
    switch (operation) {
        case MathOperations.dodaj:
            res.send("Wynik ".concat(num1, " + ").concat(num2, " = ").concat(num1 + num2));
            break;
        case MathOperations.usun:
            res.send("Wynik ".concat(num1, " - ").concat(num2, " = ").concat(num1 - num2));
            break;
        case MathOperations.podziel:
            res.send("Wynik ".concat(num1, " / ").concat(num2, " = ").concat(num1 / num2));
            break;
        case MathOperations.pomnoz:
            res.send("Wynik ".concat(num1, " * ").concat(num2, " = ").concat(num1 * num2));
            break;
    }
});
app.listen(3000);
