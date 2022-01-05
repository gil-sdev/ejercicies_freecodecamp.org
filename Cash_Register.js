let baseCDI = [
    ['ONE HUNDRED', 100],
    ['TWENTY', 20],
    ['TEN', 10],
    ['FIVE', 5],
    ['ONE', 1],
    ['QUARTER', 0.25],
    ['DIME', 0.1],
    ['NICKEL', 0.05],
    ['PENNY', 0.01]
];
function checkCashRegister(price, cash, cid) {
    // Array para guardar las monedas como cambio
    let moneyChange = [];
    // Cantidad de la moneda a devolver como cambio
    let coinChange = 0;
    // nombre de la mondeda para devolvel como cambio
    let coinName = "";
    // variable para calcular la cantidad de dinero disponible
    let totalMoney = 0;

    // se calcula la cantiddd de cambio segun los parametros de price  cash
    let change = cash - price;

    //calculo de cantidad de dinero disponible
    cid.map(item => { totalMoney += item[1] });

    //  si el cambio es igual al dinero disponible
    if (totalMoney == change) return { status: 'CLOSED', change: cid };
    // si la cantidad de disponible es menor al cambio a devolver
    if (totalMoney < change) return { status: 'INSUFFICIENT_FUNDS', change: [] };

    // se ordena de mayor a menor las monedas
    cid = cid.reverse();

    //Se inicia el recorrido del valor de cada moneda y se compara con la cantidad disponible en cada una para devolver el cambio
    baseCDI.map((item, index) => {
        while (cid[index][1] > 0 && change >= item[1]) {

            // se salda el cambio conforme se encuntre la moneda adecuada de acuerdo a los valores de cada moneda
            change -= item[1];

            // se usa el dinero disponible de acuerdo a el valor de cada moneda y su disponiblidad
            cid[index][1] -= item[1];

            // se acumala el valor de la moneda para devolver como cambio 
            coinChange += item[1];

            // se guarda temporalmente el mombre de la moneda para devolver como cambio
            coinName = item[0];

            // se reduce la cantidad de decimales 
            change = Math.round(change * 100) / 100;
        }

        // se valida si el cambio de la moneda a devolver no sea a cero, en caso contrario se registra el nombre de la moneda y su cantidad 
        if (coinChange > 0) moneyChange.push([coinName, coinChange]);

        // se reinicia el valor que tenia la modena 
        coinChange = 0;
    });

    // En caso de que no se tenga almacenado la cantidad de monedas o que el cambio no se haya saldado returnar como fondo isuficiente
    if (moneyChange.length < 1 || change > 0) return { status: 'INSUFFICIENT_FUNDS', change: [] };

    // se returna el cambio con sus respectivas monedas, representado en un objeto y array
    return { status: 'OPEN', change: moneyChange };
}

//let a = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
let a = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
//let a = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(a);
