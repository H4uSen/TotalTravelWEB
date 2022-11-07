const reservationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/REservation/List");

console.log(reservationList);

contructChart();


function contructChart() {//fecha_Entrada

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (reservationList.code == 200) {
        $.each(reservationList.data, function (i, reservation) {

            if (reservation.fecha_Entrada != null) {
                const date = GetDateFormat({
                    string_date: reservation.fecha_Entrada,
                    hour_format: 12,
                    date_format: "default"
                });
                const actual_month = parseInt(date.datetime_data.month);
                const actual_count = data[actual_month];

                data[actual_month - 1] = actual_count + 1;
            }
        });
    }

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
                label: `Total de Reservaciones 2022 (${reservationList.data.length} en total)`,
                data: data,
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