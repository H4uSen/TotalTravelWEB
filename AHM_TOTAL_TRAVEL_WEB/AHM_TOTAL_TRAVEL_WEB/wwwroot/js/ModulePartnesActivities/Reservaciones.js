var Reservacion = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Reservation/List");
var ReservacionTra = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationActivitiesExtra/List");
var TransportDetailsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ActivitiesExtra/List");
$('.ui.dropdown').dropdown();
$("document").ready(function () {
    Tarjeta();
});
// inicialize code
//$("#reservasb").addClass("active");
//$('#Reservation_Details_Info .item').removeClass("active");
//$('#Reservation_Details_Info .item').addClass("disabled");
//ShowContent("Default_Item");

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

function Tarjeta() {
    if (ReservacionTra.code == 200) {

        var resv = ReservacionTra.data;
        var Rflitro = resv.filter(resva => resva.iD_Partner == parseInt(Client_Partner_ID));
        $('#tarjetaT').empty();
        if (Rflitro.length == 0) {
            actexth =
                `<div class="ui card">
                    <div class="content">
                        <div class="header">No hay reservaciones</div>                     
                    </div>                  
                </div>`
            $('#tarjetaT').append(actexth);
        }
        else {
            for (var i = 0; i < Rflitro.length; i++) {
                const item = Rflitro[i];
                var fecha = item.fecha_Reservacion.split('T');
                try {
                    divroom =
                        `<br\ >
                <div class="ui card">
                    <div class="content">
                        <div class="header">${item.cliente}</div>
                        <div class="description">
                                  Fecha: ${fecha[0]}
                        </div>      
                    </div>
                    <a class="ui bottom attached blue button" id="Resv" href="javascript: ViewReservation(${item.id_Actividad_Extra},${item.id})">
                        <i class="folder open icon"></i>
                        Ver Detalles
                    </a>
                </div>`
                    $('#tarjetaT').append(divroom);
                }
                catch {
                    divroom =
                        `<div class="ui card">
                    <div class="content">
                        <div class="header">Se eliminó este registro</div>                     
                    </div>                  
                </div>`
                    $('#tarjetaT').append(divroom);
                }
            }
        }
    }

}
function ViewReservation(idDetalles, id) {
    $("#Default_Item").hide();
    $("#InfoDet").removeAttr("hidden");
    $("#InfoDet").show();
    if (TransportDetailsList.code == 200) {

        var resv = ReservacionTra.data;
        var Rflitro = resv.filter(resva => resva.id == parseInt(id));
        var transpoinfo = TransportDetailsList.data;
        var TranspoFilter = transpoinfo.filter(resva => resva.id == parseInt(idDetalles));

        $('#InfoDet').empty();
        if (TranspoFilter.length == 0) {
            actexth =
                `<div class="ui card">
                    <div class="content">
                        <div class="header">No hay reservaciones</div>                     
                    </div>                  
                </div>`
            $('#InfoDet').append(actexth);
        }
        else {
            try {
                var ResvaFilterItem = Rflitro[0];
                var TranspoFilterItem = TranspoFilter[0];
                var fecha = ResvaFilterItem.fecha_Reservacion.split('T');
                var hora = ResvaFilterItem.hora_Reservacion;
                var recortado1 = "";
                var recortado2 = "";
                recortado1 = hora.slice(0, 2);
                recortado2 = hora.slice(-2);
                var union = recortado1 + ":" + recortado2;

                divroom =
                    `<div class="field">
                    <center>
                    <div class="image">
                        <img src="${partnerID}">
                    </div>
                    </center>

                    </div>
                    <center>
                    <div class="two fields">
                        <div class="field">
                            <label>Cliente: </label>
                                ${ResvaFilterItem.cliente}
                        </div>
                        <div class="field">
                            <label>Socio: </label>
                                ${TranspoFilterItem.partner}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Actividad: </label>
                                ${TranspoFilterItem.actividad}
                        </div>
                        <div class="field">
                            <label>Descripción: </label>
                                ${TranspoFilterItem.descripcion}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Precio: </label>
                                L ${ResvaFilterItem.precio}
                        </div>
                        <div class="field">
                            <label>Cantidad: </label>
                                ${ResvaFilterItem.cantidad}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Fecha Reservación: </label>
                                ${fecha[0]}
                        </div>
                        <div class="field">
                            <label>Hora Reservación: </label>
                                ${union}
                        </div>
                    </div>
                    </center>`

                $('#InfoDet').append(divroom);
            }
            catch {
                divroom =
                    `<div class="ui card">
                        <div class="content">
                            <div class="header">Se eliminó este registro</div>                     
                        </div>                  
                    </div>`
                $('#InfoDet').append(divroom);
            }
        }
    }
}