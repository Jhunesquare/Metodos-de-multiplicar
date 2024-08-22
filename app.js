const readline = require('readline');

// Función para obtener la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Método ruso para multiplicar
function multiplicacionRusa(a, b) {
    let resultado = 0;
    while (a > 0) {
        if (a % 2 !== 0) { // Si 'a' es impar
            resultado += b;
        }
        a = Math.floor(a / 2); // Dividimos 'a' entre 2
        b *= 2; // Multiplicamos 'b' por 2
    }
    return resultado;
}

// Método común para multiplicar
function multiplicacionAmericanan(num1, num2) {
    const num1Str = num1.toString();
    const num2Str = num2.toString();

    // Crear una matriz para almacenar los resultados parciales
    const resultados = Array(num1Str.length + num2Str.length).fill(0);

    // Multiplicar cada dígito de num1 por cada dígito de num2
    for (let i = num1Str.length - 1; i >= 0; i--) {
        for (let j = num2Str.length - 1; j >= 0; j--) {
            const producto = parseInt(num1Str[i]) * parseInt(num2Str[j]);
            const pos1 = i + j;
            const pos2 = i + j + 1;

            const suma = producto + resultados[pos2];

            resultados[pos1] += Math.floor(suma / 10);
            resultados[pos2] = suma % 10;
        }
    }

    // Convertir el array de resultados en el número final
    let resultadoFinal = resultados.join('');

    // Eliminar ceros iniciales
    while (resultadoFinal[0] === '0' && resultadoFinal.length > 1) {
        resultadoFinal = resultadoFinal.slice(1);
    }

    return parseInt(resultadoFinal, 10);
}

// Función para medir el tiempo de ejecución
function medirTiempo(fn, ...args) {
    const inicio = process.hrtime();
    const resultado = fn(...args);
    const fin = process.hrtime(inicio);
    const tiempo = fin[0] * 1e9 + fin[1]; // Convertir a nanosegundos
    return { resultado, tiempo: tiempo / 1e6 }; // Convertir a milisegundos
}

// Función principal para ejecutar los métodos
function ejecutar() {
    rl.question('Ingrese el primer número: ', (input1) => {
        rl.question('Ingrese el segundo número: ', (input2) => {
            const num1 = parseInt(input1);
            const num2 = parseInt(input2);

            const resultadoRuso = medirTiempo(multiplicacionRusa, num1, num2);
            const resultadoAmericana = medirTiempo(multiplicacionAmericanan, num1, num2);

            console.log('\n--- Resultados ---');
            console.log(`Método Ruso: ${resultadoRuso.resultado} (Tardó ${resultadoRuso.tiempo.toFixed(6)} ms)`);
            console.log(`Método Común: ${resultadoAmericana.resultado} (Tardó ${resultadoAmericana.tiempo.toFixed(6)} ms)`);

            rl.close();
        });
    });
}

ejecutar();
