var params = process.argv.slice(2);

console.log(params);

var num1 = parseFloat(params[0]);
var num2 = parseFloat(params[1]);

var plantilla = `
La suma es: ${num1 + num2} 
La resta es: ${num1 - num2} 
La multiplicacion es: ${num1 * num2} 
La división es: ${num1 / num2} 
`;

console.log(plantilla);