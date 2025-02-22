const {add, subtract, multiply} = require('../operaciones/operaciones.js');

function sumar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
    res.json({
        resultado: result
    });
}

function restar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    })
}

function multiplicar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    })
}
function dividir(req, res) {
    const { body } = req;
    const { number1, number2 } = body;

    if (number2 == 0) {
        return res.status(400).json({ error: "No se puede dividir por cero" });
    }

    const result = number1 / number2;

    res.json({
        resultado: result
    });
}



module.exports = {
    sumar,
    restar,
    multiplicar,
    dividir
}