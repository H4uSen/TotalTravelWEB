var Reservacion = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Reservation/List");
var ReservacionTra = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationRestaurant/List");
var TransportDetailsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Restaurants/List");
$('.ui.dropdown').dropdown();
$("document").ready(function () {
    fillreservaciones(0);
});

function ShowContent(content, index) {

    var button = $("#Reservation_Details_Info .item")[index];
    if (!$(button).hasClass('disabled')) {
        $('#Reservation_Details_Content .Reservation_Details_Content_Item').hide();
        $('#Reservation_Details_Content #' + content).show();
        $('#Reservation_Details_Info .item').removeClass("active");
        $(button).addClass("active");
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
                var imagen = TranspoFilterItem.image_URL.split(',');
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
                        <img src="${imagen[0]}">
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

$("#Estado").change(function (_this) {
    var idReservaciones = $(_this.target).val();
    fillreservaciones(idReservaciones);
});

function fillreservaciones(estadoReservaciones) {

    if (estadoReservaciones == "0") {
        var reservaciones = jQuery.grep(Reservacion.data, function (reservacion, i) {
            return reservacion;
        });
    }
    else if (estadoReservaciones == "1") {
        var reservaciones = jQuery.grep(Reservacion.data, function (reservacion, i) {
            return reservacion.confirmacionRestaurante == false;
        });
    }
    else {
        var reservaciones = jQuery.grep(Reservacion.data, function (reservacion, i) {
            return reservacion.confirmacionRestaurante == true;
        });
    }

    $('#tarjetaT').empty();

    for (var i = 0; i < reservaciones.length; i++) {

        //if (ReservacionTra.code == 200 &&) {

                var resv = ReservacionTra.data;
                var Rflitro = resv.filter(resva => resva.iD_Parter == parseInt(Client_Partner_ID) && reservaciones.id == ReservacionTra.resv_ID);
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
                            <a class="ui bottom attached blue button" id="Resv" href="javascript: ViewReservation(${item.iD_Restaurante},${item.id})">
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
           // }

    }

    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//var Reservacion = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Reservation/List");
//var ReservacionTra = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationRestaurant/List");
//var TransportDetailsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Restaurants/List");
//$('.ui.dropdown').dropdown();
//$("document").ready(function () {
//    Tarjeta();
//});


//function ShowContent(content, index) {

//    var button = $("#Reservation_Details_Info .item")[index];
//    if (!$(button).hasClass('disabled')) {
//        $('#Reservation_Details_Content .Reservation_Details_Content_Item').hide();
//        $('#Reservation_Details_Content #' + content).show();
//        $('#Reservation_Details_Info .item').removeClass("active");
//        $(button).addClass("active");
//    }
//}

//function Tarjeta() {
//    if (ReservacionTra.code == 200) {

//        var resv = ReservacionTra.data;
//        var Rflitro = resv.filter(resva => resva.iD_Parter == parseInt(Client_Partner_ID));
//        $('#tarjetaT').empty();
//        if (Rflitro.length == 0) {
//            actexth =
//                `<div class="ui card">
//                    <div class="content">
//                        <div class="header">No hay reservaciones</div>                     
//                    </div>                  
//                </div>`
//            $('#tarjetaT').append(actexth);
//        }
//        else {
//            for (var i = 0; i < Rflitro.length; i++) {
//                const item = Rflitro[i];
//                var fecha = item.fecha_Reservacion.split('T');
//                try {
//                    divroom =
//                        `<br\ >
//                <div class="ui card">
//                    <div class="content">
//                        <div class="header">${item.cliente}</div>
//                        <div class="description">
//                                  Fecha: ${fecha[0]}
//                        </div>      
//                    </div>
//                    <a class="ui bottom attached blue button" id="Resv" href="javascript: ViewReservation(${item.iD_Restaurante},${item.id})">
//                        <i class="folder open icon"></i>
//                        Ver Detalles
//                    </a>
//                </div>`
//                    $('#tarjetaT').append(divroom);
//                }
//                catch {
//                    divroom =
//                        `<div class="ui card">
//                    <div class="content">
//                        <div class="header">Se eliminó este registro</div>                     
//                    </div>                  
//                </div>`
//                    $('#tarjetaT').append(divroom);
//                }
//            }
//        }
//    }

//}