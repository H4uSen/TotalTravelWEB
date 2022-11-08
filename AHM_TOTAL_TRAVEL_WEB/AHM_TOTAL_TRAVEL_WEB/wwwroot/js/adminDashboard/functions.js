const reservationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/REservation/List");

console.log(reservationList);

contructMonthSalesChart();
fillHotelTop();
fillActivitiesTop();

function fillHotelTop() {

    const colors = ["#D4AF37", "#C0C0C0", "#CD7F32"];
    if (modelo.hotel_Top_3.length > 0) {
        for (var i = 0; i < modelo.hotel_Top_3.length; i++) {
            const item = modelo.hotel_Top_3[i];
            const card =
            `<div class="item">
                <h2 class="align-middle" style="padding: 0 1em; color: ${colors[i]}; font-weight: bold;"><br>${i + 1}</h2>
                <div class="image">
                    <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/2659/posts/32230/image/intro_trip-planner-logo-maker-with-airplane-clipart-2504i.jpg">
                </div>
                <div class="content">
                    <h3><b>${item.hotel}</b></h3>
                    <h5 class="blue_text">
                        <i class="map marker alternate blue icon"></i>
                        <b>${item.ciudad}</b>
                    </h5>
                    <div class="extra d-flex">
                        <b>Rating:</b>
                        <div class="ui huge star rating disabled" data-rating="5"><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i></div>
                    </div>
                </div>
            </div>`;

            $("#container_hotels_3").append(card);
        }
    }
    else {
        const item =
            `<div class="item">
                 <div class="content">
                    <h1>NO DATA AVALIABLE</h1>
                 </div>
            </div>`;

        $("#container_hotels_3").append(item);
    }
}

function fillActivitiesTop() {

    if (modelo.activities_top_5.length > 0) {
        for (var i = 0; i < modelo.activities_top_5.length; i++) {
            const item = modelo.activities_top_5[i];
            const card = 
            `<div class="item">
                <div class="content">

                    <h3><b>${item.descripcion}</b></h3>
                    <div class="extra d-flex">
                        <b>Rating:</b>
                        <div class="ui huge star rating disabled" data-rating="5">
                            <i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i>
                        </div>
                    </div>

                </div>
            </div>`;

            $("#container_activities_top_5").append(card);
        }
    }
    else {
        const item =
            `<div class="item">
                 <div class="content">
                    <h1>NO DATA AVALIABLE</h1>
                 </div>
            </div>`;

        $("#container_activities_top_5").append(item);
    }
}

function contructMonthSalesChart() {//fecha_Entrada

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

    const ctxAdmin = document.getElementById('monthSales').getContext('2d');
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

/*
function contructUsersSalesChart() {//fecha_Entrada

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

    const ctxAdmin = document.getElementById('monthSales').getContext('2d');
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
*/