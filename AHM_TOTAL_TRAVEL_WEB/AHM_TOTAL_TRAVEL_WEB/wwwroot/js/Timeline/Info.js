
var Reservacion = ajaxRequest("https://totaltravel.somee.com/API/Reservation/List");
var ReservacionActView = ajaxRequest("https://totaltravel.somee.com/API/ReservationActivitiesExtra/List");
var response2 = ajaxRequest("https://totaltravel.somee.com/API/ReservationTransportation/List");
var ReservacionDetView = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/List");
var ReservacionActHotView = ajaxRequest("https://totaltravel.somee.com/API/ReservationActivitiesHotels/List");

$("document").ready(function () {
    prueba();
});
// inicialize code
$("#reservasb").addClass("active");
$('#Reservation_Details_Info .item').removeClass("active");
$('#Reservation_Details_Info .item').addClass("disabled");
ShowContent("Default_Item");

// functions

function ShowContent(content, index) {

    var button = $("#Reservation_Details_Info .item")[index];
    if (!$(button).hasClass('disabled')) {
        $('#Reservation_Details_Content .Reservation_Details_Content_Item').hide();
        $('#Reservation_Details_Content #' + content).show();
        $('#Reservation_Details_Info .item').removeClass("active");
        $(button).addClass("active");
    }
}

function prueba() {
    if (Reservacion.code == 200) {

        var resv = Reservacion.data;
        var Rflitro = resv.filter(resva => resva.id_Cliente == parseInt(Client_User_ID));
        $('#reservacion').empty();
        if (Rflitro.length == 0) {
            actexth =
                `<div class="ui card">
                    <div class="content">
                        <div class="header">No hay reservaciones</div>                     
                    </div>                  
                </div>`
            $('#reservacion').append(actexth);
        }
        else {
            for (var i = 0; i < Rflitro.length; i++) {
                const item = Rflitro[i];
                var entrada = item.fecha_Entrada.split('T');
                var salida = item.fecha_Salida.split('T');
                try {
                    divroom =
                        `<div class="ui card">
                    <div class="content">
                        <div class="header">${item.nombre_Hotel}</div>
                        <div class="description">                                   
                                     ${entrada[0]} al  ${salida[0]}
                        </div>
                        <div class="ui green header"> ${item.precio} LPS</div>
                    </div>
                    <a class="ui bottom attached  button bt" href="javascript: ViewReservation(${item.hotel_ID},${item.id})">
                        <i class="folder open icon"></i>
                        Ver Fechas
                    </a>
                </div>`
                    $('#reservacion').append(divroom);
                }
                catch {
                    divroom =
                        `<div class="ui card">
                    <div class="content">
                        <div class="header">Se elimino este registro</div>                     
                    </div>                  
                </div>`
                    $('#reservacion').append(divroom);
                }
            }
        }
    }
  
}
function ViewReservation(hoteid, resvid) {
    $('#tarjetas').empty();
    if (response2.code == 200) {
        var transp = response2.data;
        var transpo = transp.filter(resv => resv.reservacion == resvid);
        var transpor = transpo[0];
        var transporte = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DetailsTransportation/Find?id=" + transpor.iD_detalle_Transporte);

        if (transporte.code == 200) {
            var t = transporte.data;
            actexth =
                `<li>
                        <span>${t.fecha_Salida.split('T')}</span>
                        <div class="content">
                            <h3>Llegada del transporte</h3>
                            <h4>se abordara en los servicios de ${t.parter}</h4>
                            <p> 
                              a la hora: ${t.hora_Salida}.
                              y se llegara al destino a la hora: ${t.hora_Llegada}.
                            </p>
                        </div>
                    </li>`
            $('#tarjetas').append(actexth);

        }
    }
    if (response2.code == 200) {
        var transp = response2.data;
        var transpo = transp.filter(resv => resv.reservacion == resvid);
        var transpor = transpo[0];
        var transporte = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DetailsTransportation/Find?id=" + transpor.iD_detalle_Transporte);

        if (transporte.code == 200) {
            var t = transporte.data;
            actexth =
                `<li>
                        <span>${t.fecha_Salida.split('T')}</span>
                        <div class="content">
                            <h3>Llegada del transporte</h3>
                            <h4>se abordara en los servicios de ${t.parter}</h4>
                            <p> 
                              a la hora: ${t.hora_Salida}.
                              y se llegara al destino a la hora: ${t.hora_Llegada}.
                            </p>
                        </div>
                    </li>`
            $('#tarjetas').append(actexth);

        }
    }

}


