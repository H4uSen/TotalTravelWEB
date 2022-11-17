var Reservacion = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Reservation/List");
var ReservacionHot = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationHotels/List");
var ReservacionDetalle = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationDetails/List");
var Hotel = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Hotels/List");


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
    if (ReservacionHot.code == 200) {

        var resv = ReservacionHot.data;
        var Rflitro = resv.filter(resva => resva.partnerID == parseInt(Client_Partner_ID));
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
                const item = Rflitro[i];
                var hotelist = Hotel.data;
                var hotelfilter = hotelist.filter(x => x.id == item.hotel_ID);
                var hoteitem = hotelfilter[0];
                var fechaS = item.fecha_Salida.split('T');
                var fechaE = item.fecha_Entrada.split('T');
                try {  
                    divroom =
                        `<div class="ui card" style="width:100%">
                    <div class="content">
                        <div class="header">${hoteitem.hotel}</div>
                        <div class="description">
                                    ${item.cliente}
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
                var fecha = TranspoFilterItem.fecha_Salida.split('T');
                var imagensplit = "https://totaltravelapi.azurewebsites.net/Images/" + imagen[0];

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
                            <label>Partner:</label>
                                ${TranspoFilterItem.parter}
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Tipo Transporte:</label>
                                ${TranspoFilterItem.tipo_Transporte}
                        </div>                      
                        <div class="field">
                            <label>Matricula:</label>
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
                                <label>Fecha Salida:</label>
                                    ${fecha[0]}
                            </div>
                            <div class="field">
                                <label>Precio:</label>
                                    L. ${TranspoFilterItem.precio}
                            </div>
                        </div>
                    </center>`

                $('#InfoDet').append(divroom);
            }
            catch {
                divroom =
                    `<div class="ui card">
                        <div class="content">
                            <div class="header">Se elimino este registro</div>                     
                        </div>                  
                    </div>`
                $('#InfoDet').append(divroom);
            }
        }
    }
}