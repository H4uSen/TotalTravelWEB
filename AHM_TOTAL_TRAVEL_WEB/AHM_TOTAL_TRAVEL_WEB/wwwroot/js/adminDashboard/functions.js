const reservationList = ajaxRequest("https://totaltravel.somee.com/API/REservation/List");

console.log(reservationList);

contructChart();


function contructChart() {//fecha_Entrada

    if()

    const ctxAdmin = document.getElementById('lineCahrt').getContext('2d');
    const months = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
    ]
    const myChart = new Chart(ctxAdmin, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Total de Reservaciones 2022',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}