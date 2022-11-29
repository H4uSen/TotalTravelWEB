var Reservacion = ajaxRequest(urlAPI +"/API/Reservation/List");
var ReservacionTra = ajaxRequest(urlAPI +"/API/ReservationTransportation/List");
var Rflitro = ReservacionTra.data.filter(resva => resva.partner_ID == parseInt(Client_Partner_ID));
var TransportDetailsList = ajaxRequest(urlAPI +"/API/DetailsTransportation/List");
var ReservacionT;

var filtrotarjeta = $("#Estado").val();

$('.ui.dropdown').dropdown();
$("document").ready(function () {  
    Tarjeta();
});
$("#Estado").change(function () {
    $("#Default_Item").show();
    $("#frmReservation_Info").hide();
    $("#InfoDet").hide();
    $("a.reservT_trigger_button").addClass("btn-edit").removeClass("btn-view");
    var filtrotarjeta = parseInt($("#Estado").val());

    if (filtrotarjeta == 2) {
        $(`#tarjetaT .ui.card`).show();       
    }
    else if (filtrotarjeta == 0) {
        $(`#tarjetaT .ui.card`).hide();
        $(`#tarjetaT .ui.card[data-estado='0']`).show();
    }
    else if (filtrotarjeta == 1) {
        $(`#tarjetaT .ui.card`).hide();
        $(`#tarjetaT .ui.card[data-estado='1']`).show();
    }
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
        var Rflitro = resv.filter(resva => resva.partner_ID == parseInt(Client_Partner_ID));
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
                var itemR = item.reservacion;
                var Confirmacion = Reservacion.data.filter(x => x.id == parseInt(itemR))[0];
                var Estado = Confirmacion.confirmacionTransporte;             
                try {
                    divroom =
                        `<div class="ui card" style="width:100%" data-estado="${Estado ? 1: 0}">
                            <div class="content">
                                <div class="header">${item.cliente}</div>
                                <div class="description">
                                          Precio:  L ${item.precio}
                                </div>      
                            </div>
                            <a class="btn-edit ui positive button w-100 reservT_trigger_button" onclick="Color()"  href="javascript: ViewReservation(${item.iD_detalle_Transporte},${item.id})">
                                <i class="folder open icon"></i>
                                Ver Detalles
                            </a>
                        </div>` 
                    $('#tarjetaT').append(divroom);
                }
                catch {
                    divroom =
                        `<div class="ui card" style="width:100%>
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
    $("#frmReservation_Info").removeAttr("hidden");
    $("#frmReservation_Info").show();
    $("#InfoDet").removeAttr("hidden");
    $("#InfoDet").show();
    if (TransportDetailsList.code == 200) {

        var resv = ReservacionTra.data;
        var Rflitro = resv.filter(resva => resva.id == parseInt(id));
        var transpoinfo = TransportDetailsList.data;
        var TranspoFilter = transpoinfo.filter(resva => resva.id == parseInt(idDetalles));

        var R2 = Rflitro[0];
        var Confirmacion2 = Reservacion.data.filter(x => x.id == parseInt(R2.reservacion))[0];
        var Estado2 = Confirmacion2.confirmacionTransporte;

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
                var fecha = TranspoFilterItem.fecha_Salida.split('T');
                var imagensplit = urlAPI +"/Images/" + imagen[0];

                divroom =
                `<div class="field">
                    <center>
                        <div class="image">
                            <img src="${imagensplit}">
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
                            <label>Socio:</label>
                                ${TranspoFilterItem.parter}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Tipo Transporte:</label>
                                ${TranspoFilterItem.tipo_Transporte}
                        </div>                      
                        <div class="field">
                            <label>Matrícula:</label>
                                ${TranspoFilterItem.matricula}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Ciudad Salida:</label>
                                ${TranspoFilterItem.ciudad_Salida}
                        </div>
                        <div class="field">
                            <label>Ciudad Llegada:</label>
                                ${TranspoFilterItem.ciudad_Llegada}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Hora Salida:</label>
                                ${TranspoFilterItem.hora_Salida}
                        </div>
                        <div class="field">
                            <label>Hora Llegada:</label>
                                ${TranspoFilterItem.hora_Llegada}
                        </div>
                    </div>                   
                        <div class="two fields">                           
                            <div class="field">
                                <label>Precio:</label>
                                    L ${TranspoFilterItem.precio}
                            </div>
                        </div>
                    </center>`
                if (Estado2 == true) {
                    botones = `<center>
                        <div class="two fields">
                            <div class="field">
                                <label>Fecha Salida:</label>
                                    ${fecha[0]}
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
                                    ${fecha[0]}
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
                            <div class="header">Se eliminó este registro</div>                     
                        </div>                  
                    </div>`
                $('#InfoDet').append(divroom);
            }          
        }
    }
}

function CancelarReservacion(idRT) {
    var ReserData = ReservacionTra.data.filter(x => x.id == idRT)[0];
    var ReserDataT = Reservacion.data.filter(x => x.id == ReserData.reservacion)[0];
    var Email = EmailSendModel;
    Email.to = ReserDataT.email;
    Email.toName = ReserDataT.nombrecompleto;
    Email.subject = "Estado de la reservación del transporte";
    if (ReserDataT.confirmacionTransporte == true) {
        ReserDataT.confirmacionTransporte = false;
        Email.bodyData = $("#Razón").val();
    } else {
        ReserDataT.confirmacionTransporte = true;
        Email.bodyData = "Estimado Cliente " + ReserDataT.nombrecompleto + ".\nSe le notifica que se ha confirmado su reservación de transporte en la empresa " + ReserData.partner_Nombre + " para la fecha " + ReserDataT.fecha_Entrada.split('T')[0];      
    }
    console.log(JSON.stringify(Email));
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


   
    var SendEmail;
    if (RData.resv_ConfirmacionTrans == true) {
        SendEmail = ajaxRequest(urlAPI +"/API/Login/ReservationConfirmed", Email, "POST");
    }
    else {
        SendEmail = ajaxRequest(urlAPI +"/API/Login/ReservationCancel", Email, "POST");
    }
    
    var status = ajaxRequest(urlAPI +"/API/Reservation/Update?id=" + RData.resv_ID, RData, "PUT");

    if (status.code == 200 && SendEmail.code == 200) {
        window.location.href = '/TransportModule?success=true';
    }
    else {
        console.log(status.message)
    }



}
$("Document").ready(function(){

    $("a.reservT_trigger_button").click(function (_this) {
        $("a.reservT_trigger_button").addClass("btn-edit").removeClass("btn-view");
        $(_this.target).addClass("btn-view").removeClass("btn-edit");
    });

})

