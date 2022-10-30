var reservacionesList = ajaxRequest("https://totaltravel.somee.com/API/ReservationRestaurant/List");

fillReservaciones();

function fillReservaciones() {

    var reservaciones = jQuery.grep(reservacionesList.data, function (reservacion, i) {
        return reservacion.iD_Restaurante == RestauranteID;
    });
    
    for (var i = 0; i < reservaciones.length; i++) {
        const item = reservaciones[i];
        var card = `<div class="ui special card">
            <div class="content">
                ${item.cliente}
            </div>
            <div class="content">
                <span>${item.fecha_Reservacion}</span>
            </div>
            <div class="extra content">
                <p>
                    <b>L </b>
                    ${item.hora_Reservacion}
                </p>
            </div>
        </div>`;
        $("#reservacionesContainer").append(card);
    }
}
