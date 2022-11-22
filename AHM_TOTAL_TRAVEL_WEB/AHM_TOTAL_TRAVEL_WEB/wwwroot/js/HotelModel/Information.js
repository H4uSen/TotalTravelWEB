var Reservacion = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Reservation/List");
var ReservacionHot = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationHotels/List");
var ReservacionDetalle = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationDetails/List");
var Hotel = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Hotels/List");
var ReservacionH;

var filtrotarjeta = $("#Estado").val();

$("document").ready(function () {
    fillreservaciones(filtrotarjeta);
    Tarjeta();
});
$("#Estado").change(function () {
    var filtrotarjeta = $("#Estado").val();
    fillreservaciones(filtrotarjeta);
    $('#TargetRese').empty();
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
    if (ReservacionHot.code == 200) {

        var Rflitro = ReservacionH.filter(resva => resva.partnerID == parseInt(Client_Partner_ID));
        $('#TargetRese').empty();
        if (Rflitro.length == 0) {
            actexth =
                `<div class="ui card" style="width:100%">
                    <div class="content">
                        <div class="header">No hay reservaciones</div>                     
                    </div>                  
                </div>`
            $('#TargetRese').append(actexth);
        }
        else {
            for (var i = 0; i < Rflitro.length; i++) {
                
                const itemH = Rflitro[i];
                var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationHotels/Find?id=" + itemH.reservacionHotelID);
                var item = response.data;
                var hotelist = Hotel.data;
                var hotelfilter = hotelist.filter(x => x.id == item.hotel_ID);
                var hoteitem = hotelfilter[0];
                var fechaS = item.fecha_Salida.split('T');
                var fechaE = item.fecha_Entrada.split('T');
                var resI = Reservacion.data.filter(x => x.id == item.reservacionID)[0];
                try {  
                    divroom =
                        `<div class="ui card" style="width:100%">
                    <div class="content">
                        <div class="header">${hoteitem.hotel}</div>
                        <div class="description">
                                    ${item.cliente}
                        </div>
                        <div class="description">
                                    ${resI.email}
                        </div>
                        <div class="description">
                                   Fecha Entrada: ${fechaE[0]} <br> Fecha Salida: ${fechaS[0]}
                        </div>
                    </div>
                    <a class="ui bottom attached blue button" href="javascript: ViewReservation(${item.hotel_ID},${item.id})">
                        <i class="folder open icon"></i>
                        Ver Detalles
                    </a>
                </div>`
                    $('#TargetRese').append(divroom);
                }
                catch {
                    divroom =
                        `<div class="ui card" style="width:100%">
                    <div class="content">
                        <div class="header">Se elimino este registro</div>                     
                    </div>                  
                </div>`
                    $('#TargetRese').append(divroom);
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
    if (ReservacionHot.code == 200) {

        var resv = ReservacionHot.data;
        var Rflitro = resv.filter(resva => resva.id == parseInt(id));
        var hoteinfo = Hotel.data;
        var hoteFilter = hoteinfo.filter(resva => resva.id == parseInt(idDetalles));

        var habitacioneslist = ReservacionDetalle.data;
        var habitacionesfilter = habitacioneslist.filter(x => x.reservacionHotelID == id);
        var habitacionesinfo = "";
        var habitacionesTinfo = "";
        var habiTotal = 0;
        for (var i = 0; i < habitacionesfilter.length; i++) {
            var item = habitacionesfilter[i];
            habitacionesinfo += item.nombre_Habitacion + "<br>";
            habitacionesTinfo += item.categoria_Habitacion + "<br>";
            habiTotal += parseInt(item.precio_Habitacion);
        }

        var R2 = Rflitro[0];
        var Confirmacion2 = Reservacion.data.filter(x => x.id == parseInt(R2.reservacionID))[0];
        var Estado2 = Confirmacion2.confirmacionHotel;

        $('#InfoDet').empty();
        if (Rflitro.length == 0) {
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
                var hoteFilterItem = hoteFilter[0];
                var imagen = hoteFilterItem.image_URL.split(',');
                var fechaS = item.fecha_Salida.split('T');
                var fechaE = item.fecha_Entrada.split('T');
                var resI = Reservacion.data.filter(x => x.id == ResvaFilterItem.reservacionID)[0];
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
                            <label>Cliente:</label>
                                ${ResvaFilterItem.cliente}
                        </div>
                        <div class="field">
                            <label>Correo Electronico:</label>
                                ${resI.email}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Hotel:</label>
                                ${hoteFilterItem.hotel}
                        </div>                      
                        <div class="field">
                            <label>Descripcion Hotel:</label>
                                ${hoteFilterItem.descripcion}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field" align="right">
                            <label>Habitacion:</label>
                                ${habitacionesinfo}
                        </div>
                        <div class="field"align="left">
                            <label>Categoria:</label>
                                ${habitacionesTinfo}
                        </div>
                    </div>                   
                    <div class="two fields">
                        <div class="field">
                            <label>Fecha Entrada:</label>
                                ${fechaE[0]}
                        </div>
                        <div class="field">
                            <label>Fecha Salida:</label>
                                ${fechaS[0]}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Direccion:</label>
                                Ciudad: ${hoteFilterItem.ciudad}<br>
                                Colonia: ${hoteFilterItem.colonia}<br>
                                Avenida: ${hoteFilterItem.avenida} 
                                Calle: ${hoteFilterItem.calle}
                        </div>
                        <div class="field">
                            <label>Precio:</label>
                                L. ${habiTotal}
                        </div>
                    </div>
                    </center>`
                if (Estado2 == true) {
                    botones = `<center>
                        <div class="two fields">
                            <div class="field">
                                <label>Fecha Salida:</label>
                                    ${fechaS[0]}
                            </div>
                            <div class="field">
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
                                <label>Fecha Salida:</label>
                                    ${fechaS[0]}
                            </div>
                            <div class="field">
                                <label>Estado: </label>
                                <span class="ui blue label">Pendiente</span>
                            </div>
                        </div>
                        <center>
                            <div class="field">
                                <a class="btn btn-edit ui positive button w-100" id="Confirmar" href="javascript: CancelarReservacion(${ResvaFilterItem.id})">
                                    Confirmar
                                </a>
                            </div>                          
                        </center>
                    </center>`;
                }
                $('#InfoDet').append(divroom);
                $('#InfoDet').append(botones);
            }
            catch {
                divroom =
                    `<div class="ui card">
                        <div class="content">
                            <div class="header">Se elimino o no exiten datos para este registro</div>                     
                        </div>                  
                    </div>`
                $('#InfoDet').append(divroom);
            }
        }
    }
}



function fillreservaciones(estadoReservaciones) {

    if (estadoReservaciones == "false") {
        ReservacionH = Reservacion.data.filter(x => x.confirmacionHotel == false);
    }
    else if (estadoReservaciones == "true") {
        ReservacionH = Reservacion.data.filter(x => x.confirmacionHotel == true);
    }
    else {
        ReservacionH = Reservacion.data;
    }
}

function CancelarReservacion(idRT) {
    var ReserData = ReservacionHot.data.filter(x => x.id == idRT)[0];
    var ReserDataT = Reservacion.data.filter(x => x.id == ReserData.reservacionID)[0];
    var Email = EmailSendModel;
    Email.to = ReserDataT.email;
    Email.toName = ReserDataT.nombrecompleto;
    Email.subject = "Estado de la reservación del transporte";
    if (ReserDataT.confirmacionHotel == true) {
        ReserDataT.confirmacionHotel = false;
        Email.bodyData = $("#Razón").val();
    } else {
        ReserDataT.confirmacionHotel = true;
        Email.bodyData = "Estimado Cliente " + ReserDataT.nombrecompleto + ".\nSe le notifica que se ha confirmado su reservación de transporte en la empresa " + ReserData.partner_Nombre + " para la fecha " + ReserDataT.fecha_Entrada.split('T')[0];
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


    console.log(JSON.stringify(RData))
    var SendEmail;
    if (RData.resv_ConfirmacionHotel == true) {
        SendEmail = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Login/ReservationConfirmed", Email, "POST");
    }
    else {
        SendEmail = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Login/ReservationConfirmed", Email, "POST");
    }

    var status = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Reservation/Update?id=" + RData.resv_ID, RData, "PUT");

    if (status.code == 200 && SendEmail.code == 200) {
        window.location.href = '/HotelModel?success=true';
    }
    else {
        console.log(status.message)
    }



}