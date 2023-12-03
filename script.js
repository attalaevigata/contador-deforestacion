// script.js
const areaInicialHa = 59300000; // Área inicial en hectáreas
const tasaDeforestacionHa = 123517; // Tasa de deforestación anual en hectáreas
const segundosEnUnAño = 365 * 24 * 60 * 60; // Total de segundos en un año
const perdidaPorSegundoHa = tasaDeforestacionHa / segundosEnUnAño; // Pérdida por segundo

function formatearNumero(numero) {
    let numeroConDecimales = numero.toFixed(2).replace('.', ',');
    return numeroConDecimales.replace(/\d(?=(\d{3})+\,)/g, '$&.');
}

function calcularAreaActualHa() {
    const ahora = new Date();
    const inicioDelAño = new Date(ahora.getFullYear(), 0, 1);
    const segundosTranscurridos = (ahora - inicioDelAño) / 1000;
    const perdidaAcumuladaHa = segundosTranscurridos * perdidaPorSegundoHa;
    return Math.max(areaInicialHa - perdidaAcumuladaHa, 0);
}

function actualizarRelojHa() {
    let areaActualHa = calcularAreaActualHa();

    setInterval(() => {
        areaActualHa -= perdidaPorSegundoHa;
        if (areaActualHa < 0) areaActualHa = 0;
        document.getElementById('reloj-deforestacion').innerText = formatearNumero(areaActualHa) + ' ha';
    }, 1000); // Actualiza cada segundo
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', actualizarRelojHa);
} else {
    actualizarRelojHa();
}
