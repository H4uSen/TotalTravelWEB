var Reservacion = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Reservation/List");
var ReservacionRestaurant = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationRestaurant/List");
var Rflitro = ReservacionRestaurant.data.filter(resva => resva.iD_Parter == parseInt(Client_Partner_ID));
var RestaurantsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Restaurants/List");
var ReservacionT;

var filtrotarjeta = $("#Estado").val();

$('.ui.dropdown').dropdown();
$("document").ready(function () {
    Tarjeta(filtrotarjeta);
});
$("#Estado").change(function () {
    var filtrotarjeta = $("#Estado").val();
    $('#tarjetaT').empty();
    Tarjeta(filtrotarjeta);
});

//Esconder info
//function ShowContent(content, index) {

//    var button = $("#Reservation_Details_Info .item")[index];
//    if (!$(button).hasClass('disabled')) {
//        $('#Reservation_Details_Content .Reservation_Details_Content_Item').hide();
//        $('#Reservation_Details_Content #' + content).show();
//        $('#Reservation_Details_Info .item').removeClass("active");
//        $(button).addClass("active");
//    }
//}

function Tarjeta(esta) {
    if (ReservacionRestaurant.code == 200) {

        var resv = ReservacionRestaurant.data;
        var Rflitro = resv.filter(resva => resva.iD_Parter == parseInt(Client_Partner_ID));
        $('#tarjetaT').empty();
        if (Rflitro.length == 0) {
            actexth =
                `<div class="ui card" style="width:100%>
                    <div class="content">
                        <div class="header">No hay reservaciones</div>                     
                    </div>                  
                </div>`
            $('#tarjetaT').append(actexth);
        }
        else {
            for (var i = 0; i < Rflitro.length; i++) {
                const item = Rflitro[i];
                var itemR = item.resv_ID;
                var fecha = item.fecha_Reservacion.split('T');
                var Confirmacion = Reservacion.data.filter(x => x.id == parseInt(itemR))[0];
                var Estado = Confirmacion.confirmacionRestaurante;
                if (Estado.toString() == esta || esta == "2") {
                    try {
                        divroom = `<br\ >
                <div class="ui card">
                    <div class="content">
                        <div class="header">${item.cliente}</div>
                        <div class="description">
                            Fecha: ${fecha[0]}
                        </div>      
                    </div>
                    <a class="btn btn-edit ui positive button" id="Resv" href="javascript: ViewReservation(${item.iD_Restaurante},${item.id})">
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
    }

}

function ViewReservation(idDetalles, id) {
    $("#Default_Item").hide();
    $("#frmReservation_Info").removeAttr("hidden");
    $("#frmReservation_Info").show();
    $("#InfoDet").removeAttr("hidden");
    $("#InfoDet").show();
    if (RestaurantsList.code == 200) {

        var resv = ReservacionRestaurant.data;
        var Rflitro = resv.filter(resva => resva.id == parseInt(id));
        var transpoinfo = RestaurantsList.data;
        var TranspoFilter = transpoinfo.filter(resva => resva.id == parseInt(idDetalles));

        var R2 = Rflitro[0];
        var Confirmacion2 = Reservacion.data.filter(x => x.id == parseInt(R2.resv_ID))[0];
        var Estado2 = Confirmacion2.confirmacionRestaurante;

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
                var recortado1 = "", recortado2 = "";
                recortado1 = hora.slice(0, 2);
                recortado2 = hora.slice(-2);
                var union = recortado1 + ":" + recortado2;
                const union1 =
                    union.split(":")[0] > 11
                        ? union + " PM"
                        : union + " AM"

                divroom = `<div class="field">
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
                                <label>Fecha: </label>
                                    ${fecha[0]}
                            </div>
                        </div>
                    </center>`;
                if (Estado2 == true) {
                    botones = `<center>
                        <div class="two fields">
                            <div class="field">
                                <label>Hora Reservación:</label>
                                    ${union1}
                            </div><div class="field">
                                <label>Estado: </label>
                                <span class="ui green label">Confirmada</span>
                            </div>
                        </div>
                    <div class="field">
                            <div class="two fields">
                                <div class="field">
                                    <a class="btn btn-edit ui positive button w-100" id="Cancelar" href="javascript: CancelarReservacion(${ResvaFilterItem.id})">
                                        Cancelar
                                    </a>
                                </div>
                                <div class="field">
                                    <textarea class=" w-100" rows="1" placeholder="Razón" id="Razón"></textarea>
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
                                    ${union1}
                            </div><div class="field">
                                <label>Estado: </label>
                                <span class="ui blue label">Pendiente</span>
                            </div>
                        </div>
                        <div class="field">
                            <a class="btn btn-edit ui positive button w-100" id="Confirmar" href="javascript: CancelarReservacion(${ResvaFilterItem.id})">
                                Confirmar
                            </a>
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

function CancelarReservacion(idRT) {
    var ReserData = ReservacionRestaurant.data.filter(x => x.id == idRT)[0];
    var ReserDataT = Reservacion.data.filter(x => x.id == ReserData.resv_ID)[0];
    var Email = EmailSendModel;
    Email.to = ReserDataT.email;
    Email.toName = ReserDataT.nombrecompleto;
    Email.subject = "Estado de la reservación del restaurante";
    if (ReserDataT.confirmacionRestaurante == true) {
        ReserDataT.confirmacionRestaurante = false;
        Email.bodyData = $("#Razón").val();
    } else {
        ReserDataT.confirmacionRestaurante = true;
        Email.bodyData = "Estimado Cliente " + ReserDataT.nombrecompleto + ".\nSe le notifica que se ha confirmado su reservación del restaurante de la empresa " + ReserData.partner_Nombre + " para la fecha " + ReserDataT.fecha_Entrada.split('T')[0];
    }

    var RData = ReservacionUModel;

    RData.resv_ID = ReserDataT.id,
        RData.usua_ID = ReserDataT.id_Cliente,
        RData.paqu_ID = ReserDataT.id_Paquete,
        RData.resv_esPersonalizado = ReserDataT.esPersonalizado,
        RData.resv_CantidadPagos = 3,
        RData.resv_NumeroPersonas = ReserDataT.numeroPersonas,
        RData.resv_ConfirmacionPago = ReserDataT.confirmacionPago,
        RData.resv_ConfirmacionHotel = ReserDataT.confirmacionHotel,
        RData.resv_ConfirmacionRestaurante = ReserDataT.confirmacionRestaurante,
        RData.resv_ConfirmacionTrans = ReserDataT.confirmacionTransporte,
        RData.resv_ConfirmacionActividades = ReserDataT.confirmacionActividades,
        RData.resv_Precio = ReserDataT.precio,
        RData.resv_UsuarioModifica = parseInt(Client_User_ID),
        RData.justConfirmation = true


    //console.log(JSON.stringify(RData))
    var SendEmail;
    if (RData.resv_ConfirmacionRestaurante == true) {
        SendEmail = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Login/ReservationConfirmed", Email, "POST");
    }
    else {
        SendEmail = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Login/ReservationConfirmed", Email, "POST");
    }

    var status = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Reservation/Update?id=" + RData.resv_ID, RData, "PUT");

    if (status.code == 200 && SendEmail.code == 200) {
        window.location.href = '/ModuleRestaurants/Reservations?success=true';
    }
    else {
        console.log(status.message)
    }
}