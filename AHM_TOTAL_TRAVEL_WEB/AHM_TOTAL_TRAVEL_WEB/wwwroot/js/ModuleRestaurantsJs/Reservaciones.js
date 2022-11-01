var reservacionesList = ajaxRequest("https://totaltravel.somee.com/API/ReservationRestaurant/List");

fillReservaciones();

function fillReservaciones() {

    var reservaciones = jQuery.grep(reservacionesList.data, function (reservacion, i) {
        return reservacion.iD_Restaurante == RestauranteID;
    });
    
    for (var i = 0; i < reservaciones.length; i++) {
        const item = reservaciones[i];
        var fecha = item.fecha_Reservacion;
        var split = fecha.split('T');
        var fechaspliteada = split[0];
        var card = `<div class="ui special card">
            <div class="content">
                Cliente: ${item.cliente}
            </div>
            <div class="content">
                Fecha: <span>${fechaspliteada}</span>
            </div>
            <div class="extra content">
                <p>
                    
                    Hora: ${item.hora_Reservacion}:00
                </p>
            </div>
        </div>`;
        $("#reservacionesContainer").append(card);
    }
}
