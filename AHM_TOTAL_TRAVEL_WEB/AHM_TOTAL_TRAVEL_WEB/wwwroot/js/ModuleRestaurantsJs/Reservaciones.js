var ReservacionRestaurant = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationRestaurant/List");
var RestaurantsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Restaurants/List");
$('.ui.dropdown').dropdown();
$("#frmReservation_Info").hide();

$("document").ready(function () {
    fillreservaciones(0);
});

$("#Estado").change(function (_this) {
    var idReservaciones = $(_this.target).val();
    fillreservaciones(idReservaciones);
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


function ViewReservation(idDetalles, id) {
    $("#Default_Item").hide();
    $("#frmReservation_Info").show();
    $("#InfoDet").removeAttr("hidden");
    $("#InfoDet").show();
    if (RestaurantsList.code == 200) {

        var resv = ReservacionRestaurant.data;
        var Rflitro = resv.filter(resva => resva.id == parseInt(id));
        var transpoinfo = RestaurantsList.data;
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
                var recortado1 = "", var recortado2 = "";
                recortado1 = hora.slice(0, 2);
                recortado2 = hora.slice(-2);
                var union = recortado1 + ":" + recortado2;

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
                                <label>Socio: </label>
                                    ${TranspoFilterItem.partner}
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                <label>Restaurante: </label>
                                    ${TranspoFilterItem.restaurante}
                            </div>
                            <div class="field">
                                <label>Fecha: </label>
                                    ${fecha[0]}
                            </div>
                        </div>
                    </center>`;
                if (ResvaFilterItem.confirmacionReservacion == true) {
                    botones = `<center>
                        <div class="two fields">
                            <div class="field">
                                <label>Hora Reservación:</label>
                                    ${union}
                            </div><div class="field">
                                <label>Estado: </label>
                                    Confirmada
                            </div>
                        </div>
                    <div class="field">
                            <div class="two fields">
                                <div class="field">
                                    <a class="btn btn-edit ui positive button w-100" href="javascript: CancelarReservacion(${ResvaFilterItem.resv_ID})">
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
                                    Confirmada
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
        var resv = jQuery.grep(ReservacionRestaurant.data, function (reservacion, i) {
            return reservacion.iD_Parter == PartnerID;
        });
    }
    else if (estadoReservaciones == 1) {
        var resv = jQuery.grep(ReservacionRestaurant.data, function (reservacion, i) {
            return reservacion.confirmacionReservacion == false && reservacion.iD_Parter == PartnerID;
        });
    }
    else {
        var resv = jQuery.grep(ReservacionRestaurant.data, function (reservacion, i) {
            return reservacion.confirmacionReservacion == true && reservacion.iD_Parter == PartnerID;
        });
    }
    //console.log(resv);

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
                    <a class="ui bottom attached blue button" id="Resv" href="javascript: ViewReservation(${item.iD_Restaurante},${item.id})">
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
        var reservation = new FormData();

        reservation.append("Usua_ID", parseInt(item.id_Cliente));
        reservation.append("Paqu_ID", parseInt(item.id_Paquete));
        reservation.append("Resv_esPersonalizado", item.esPersonalizado);
        reservation.append("Resv_CantidadPagos", parseInt(item.cantidadPagos));
        reservation.append("Resv_NumeroPersonas", parseInt(item.numeroPersonas));
        reservation.append("Resv_ConfirmacionPago", item.confirmacionPago);
        reservation.append("Resv_ConfirmacionHotel", item.confirmacionHotel);
        reservation.append("Resv_ConfirmacionRestaurante", false);
        reservation.append("Resv_ConfirmacionTrans", item.confirmacionTransporte);
        reservation.append("Resv_ConfirmacionActividades", item.confirmacionActividades);
        reservation.append("Resv_Precio", item.precio);
        reservation.append("Resv_UsuarioModifica", parseInt(Client_User_ID));

        //var response = uploadFile("https://apitotaltravel.azurewebsites.net/API/Reservation/Update?id=" + id, reservation, "PUT");
        //console.log(response);
        //if (response > 0) {
        //    window.location.href = "/ModuleRestaurants/Info?success=true";
        //}

        ReservationUpdate();

        function ReservationUpdate() {
            const SendToken = true;
            const method = "PUT";
            const data = reservation;
            const url = "https://apitotaltravel.azurewebsites.net/API/Reservation/Update?id=" + id;
            const response = uploadFile(url, reservation, method);
            console.log(response);
            if (response > 0) {
                window.location.href = "/ModuleRestaurants/Info?success=true";
            }

            //var dataResponse = null;
            //var Token = null;
            //var HTTPError = {
            //    message: "",
            //    code: 0,
            //    success: false,
            //    data: null
            //}

            //if (SendToken == true) {
            //    Token = GetCookie("Token");
            //}

            //$.ajax({
            //    url: url,
            //    data: data,
            //    mimeType: "application/json",
            //    async: false,
            //    processData: false,
            //    contentType: false,
            //    type: method,
            //    beforeSend: function () {
            //        $("#loaderAnimation").show();
            //    },
            //    complete: function () {
            //        $("#loaderAnimation").hide();
            //    },
            //    success: function (httpResponse) {
            //        console.log(httpResponse);
            //        window.location.href = "/ModuleRestaurants/Info";
            //    }
            //});
        }
    }
}