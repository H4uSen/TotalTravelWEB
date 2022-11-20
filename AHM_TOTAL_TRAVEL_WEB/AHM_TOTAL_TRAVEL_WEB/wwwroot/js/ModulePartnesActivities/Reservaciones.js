var ReservacionActividadExtra = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationActivitiesExtra/List");
var ActividadExtraDetailsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ActivitiesExtra/List");
$('.ui.dropdown').dropdown();
$("#frmReservation_Info").hide();

$("document").ready(function () {
    fillreservaciones(0);
});

$("#Estado").change(function (_this) {
    var idReservaciones = $(_this.target).val();
    fillreservaciones(idReservaciones);
});

//function ShowContent(content, index) {

//    var button = $("#Reservation_Details_Info .item")[index];
//    if (!$(button).hasClass('disabled')) {
//        $('#Reservation_Details_Content .Reservation_Details_Content_Item').hide();
//        $('#Reservation_Details_Content #' + content).show();
//        $('#Reservation_Details_Info .item').removeClass("active");
//        $(button).addClass("active");
//    }
//}

function ViewReservation(idDetalles, id) {
    $("#Default_Item").hide();
    $("#frmReservation_Info").show();
    $("#InfoDet").removeAttr("hidden");
    $("#InfoDet").show();
    if (ActividadExtraDetailsList.code == 200) {

        var resv = ReservacionActividadExtra.data;
        var Rflitro = resv.filter(resva => resva.id == parseInt(id));
        var ActividadExtraInfo = ActividadExtraDetailsList.data;
        var ActividadExtraFilter = ActividadExtraInfo.filter(resva => resva.id == parseInt(idDetalles));

        $('#InfoDet').empty();
        if (ActividadExtraFilter.length == 0) {
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
                var ReservaFilterItem = Rflitro[0];
                var ActividadExtraFilterItem = ActividadExtraFilter[0];
                var fecha = ReservaFilterItem.fecha_Reservacion.split('T');
                var hora = ReservaFilterItem.hora_Reservacion;
                var recortado1 = "", recortado2 = "";
                recortado1 = hora.slice(0, 2);
                recortado2 = hora.slice(-2);
                var union = recortado1 + ":" + recortado2;
                divroom = `<div class="field">
                    <center>
                        <div class="image">
                            <img src="${partnerImage}">
                        </div>
                    </center>

                    </div>
                    <center>
                    <div class="two fields">
                        <div class="field">
                            <label>Cliente: </label>
                                ${ReservaFilterItem.cliente}
                        </div>
                        <div class="field">
                            <label>Socio: </label>
                                ${ReservaFilterItem.partner_Nombre}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Actividad: </label>
                                ${ActividadExtraFilterItem.actividad}
                        </div>
                        <div class="field">
                            <label>Descripción: </label>
                                ${ActividadExtraFilterItem.descripcion}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Precio: </label>
                                L ${ReservaFilterItem.precio}
                        </div>
                        <div class="field">
                            <label>Fecha Reservación: </label>
                                ${fecha[0]}
                        </div>
                    </div>
                    </center>`;
                if (ReservaFilterItem.confirmacionReservacion == true) {
                    botones = `<center>
                    <div class="two fields">
                        <div class="field">
                            <label>Hora Reservación: </label>
                                ${union}
                        </div>
                        <div class="field">
                            <label>Estado: </label>
                                Confirmada
                        </div>
                    </div>
                    <div class="field">
                            <div class="two fields">
                                <div class="field">
                                    <a class="btn btn-edit ui positive button w-100" href="javascript: CancelarReservacion(${ReservaFilterItem.reservacion})">
                                        Cancelar
                                    </a>
                                </div>
                                <div class="field">
                                    <textarea class=" w-100" rows="1" placeholder="Razón"></textarea>
                                </div>
                            </div>
                    </div>
                </center>`;
                }
                else {
                    botones = `<center>
                        <div class="two fields">
                            <div class="field">
                                <label>Hora Reservación:</label>
                                    ${union}
                            </div><div class="field">
                                <label>Estado: </label>
                                    Pendiente
                            </div>
                        </div>
                        <div class="field">
                            <input type="button" value="Confirmar" id="boton" class="btn btn-edit ui positive button w-100" />
                        </div>
                    </center>`;
                }

                $('#InfoDet').append(divroom);
                $('#InfoDet').append(botones);
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

function fillreservaciones(estadoReservaciones) {

    if (estadoReservaciones == 0) {
        var resv = jQuery.grep(ReservacionActividadExtra.data, function (reservacion, i) {
            return reservacion.iD_Partner == partnerID;
        });
    }
    else if (estadoReservaciones == 1) {
        var resv = jQuery.grep(ReservacionActividadExtra.data, function (reservacion, i) {
            return reservacion.confirmacionReservacion == false && reservacion.iD_Partner == partnerID;
        });
    }
    else {
        var resv = jQuery.grep(ReservacionActividadExtra.data, function (reservacion, i) {
            return reservacion.confirmacionReservacion == true && reservacion.iD_Partner == partnerID;
        });
    }
    $('#tarjetaT').empty();

    if (resv.length == 0) {
        actexth =
            `<div class="ui card">
                    <div class="content">
                        <div class="header">No hay reservaciones</div>                     
                    </div>                  
                </div>`
        $('#tarjetaT').append(actexth);
    }
    else {
        for (var i = 0; i < resv.length; i++) {
            const item = resv[i];
            var fecha = item.fecha_Reservacion.split('T');
            try {
                divroom = `<br\ >
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
                </div>`;
                $('#tarjetaT').append(divroom);
            }
            catch {
                divroom = `<div class="ui card">
                    <div class="content">
                        <div class="header">Se eliminó este registro</div>                     
                    </div>                  
                </div>`;
                $('#tarjetaT').append(divroom);
            }
        }
    }
}

function CancelarReservacion(id) {

    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Reservation/Find?id=" + id);
    if (response.code == 200) {
        var item = response.data;

        console.log(item);
    }

}