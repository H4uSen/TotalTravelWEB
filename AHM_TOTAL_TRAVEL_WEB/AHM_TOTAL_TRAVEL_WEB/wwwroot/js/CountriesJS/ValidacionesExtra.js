
$('.ui.checkbox').checkbox();
const campoNumerico = document.getElementById('Pais_Descripcion');

campoNumerico.addEventListener('keydown', function (evento) {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida =
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        teclaPresionada != 'Space' &&
        teclaPresionadaEsUnNumero;
    const comienzaPorCero =
        campoNumerico.value.length === 0 &&
        teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault();
    }

});

const campoNumerico2 = document.getElementById('Pais_Codigo');

campoNumerico2.addEventListener('keydown', function (evento) {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida =
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        teclaPresionada != 'Space' &&
        !teclaPresionadaEsUnNumero;
    const comienzaPorCero =
        campoNumerico2.value.length === 0 &&
        teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault();
    }

    if (campoNumerico2.value.length > 2) {
        if (teclaPresionada != 'Backspace') {
            evento.preventDefault();
        }
    }
   

});


const campoNumerico3 = document.getElementById('Pais_Nacionalidad');

campoNumerico3.addEventListener('keydown', function (evento) {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida =
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        teclaPresionada != 'Space' &&
        teclaPresionadaEsUnNumero;
    const comienzaPorCero =
        campoNumerico3.value.length === 0 &&
        teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault();
    }

});


const campoNumerico4 = document.getElementById('Pais_ISO');

campoNumerico4.addEventListener('keydown', function (evento) {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida =
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        teclaPresionada != 'Space' &&
        teclaPresionadaEsUnNumero;
    const comienzaPorCero =
        campoNumerico4.value.length === 0 &&
        teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault();
    }

});

function mayus(e) {
    e.value = e.value.toUpperCase();
}