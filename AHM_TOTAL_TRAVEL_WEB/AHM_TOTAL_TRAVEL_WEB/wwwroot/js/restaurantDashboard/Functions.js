﻿const reservationList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationRestaurant/List");

contructChart();

function contructChart() {//fecha_Entrada

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var total = 0;
    if (reservationList.code == 200) {
        $.each(reservationList.data, function (i, reservation) {
            
            if (reservation.fecha_Reservacion != null && reservation.iD_Restaurante == idRestaurante) {
                const date = GetDateFormat({
                    string_date: reservation.fecha_Reservacion,
                    hour_format: 12,
                    date_format: "default"
                });
                const actual_month = parseInt(date.datetime_data.month) - 1;
                const actual_count = data[actual_month];

                data[actual_month] = actual_count + 1;
                total += 1;
            }
        });
    }

    const ctxAdmin = document.getElementById('lineCahrt').getContext('2d');
    const months = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
    const myChart = new Chart(ctxAdmin, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: `Total de Reservaciones 2022 (${total} en total)`,
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