var ReservacionActView = ajaxRequest(urlAPI+"/API/ReservationActivitiesExtra/List");
var response2 = ajaxRequest(urlAPI+"/API/ReservationTransportation/List");
var ReservacionDetView = ajaxRequest(urlAPI+"/API/ReservationDetails/List");
var ReservacionActHotView = ajaxRequest(urlAPI+"/API/ReservationActivitiesHotels/List");

var response = ajaxRequest(urlAPI + "/API/Hotels/List");
var transporte = ajaxRequest(urlAPI + "/API/ReservationActivitiesHotels/List");
var ReservacionView = ajaxRequest(urlAPI + "/API/ReservationActivitiesHotels/List");
var ReservacionActHotView = ajaxRequest(urlAPI + "/API/ReservationActivitiesHotels/List");
var ReservacionActHotView = ajaxRequest(urlAPI + "/API/ReservationActivitiesHotels/List");
var ReservacionActHotView = ajaxRequest(urlAPI + "/API/ReservationActivitiesHotels/List");


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
var HotelPrecio = 0;
var TransportePrecio = 0;
var SubtotalR = 0;
var ImpuestoR = 0;
var TotalR = 0;
var SubtotalH = 0;
var ImpuestoH = 0;
var TotalH= 0;
function ViewReservation(hoteid,transid) {
    var response = ajaxRequest(urlAPI + "/API/Hotels/Find?id=" + hoteid);
    try {
        if (response.code == 200) {

            var hotels = response.data;
            var imagenes = hotels.image_URL.split(',');
            $('#imagen').attr("src", imagenes[0]);
            $('#hotedescription').html(hotels.descripcion);
            $('#hotename').html(hotels.hotel);
            
        }
    }
    catch {
        $('#imagen').attr("src", "https://totaltravel.somee.com/Images/Default/DefaultPhoto.jpg");
        $('#hotedescription').html("");
        $('#hotename').html("Esta reservación no contiene un hotel");
        
    }
    try {
        if (response2.code == 200) {
            var transp = response2.data;
            var transpo = transp.filter(resv => resv.reservacion == transid);
            var transpor = transpo[0];

            $('#trcategory').html(transpor.tipo_Transporte);
            var transporte = ajaxRequest(urlAPI + "/API/DetailsTransportation/Find?id=" + transpor.iD_detalle_Transporte);

            if (transporte.code == 200) {
                var t = transporte.data;
                var response4 = ajaxRequest(urlAPI + "/API/Partners/Find?id=" + t.partner_ID);
                if (response4.code == 200) {
                    var partner = response4.data;
                    $('#trciudad').html(t.ciudad);
                    $('#partnername').html(partner.nombre);
                    var imagenes = partner.image_Url.split(',');
                    $('#imagenpar').attr("src", imagenes[0]);
                    $('#TotalTT').html("L " + t.precio.toString());
                    var TransportePrecio = parseInt(t.precio);

                }

            }
        }
    }
    catch {
        $('#trcategory').html("");
        $('#trciudad').html("");
        $('#partnername').html("Esta reservación no contiene un transporte");
        $('#imagenpar').attr("src", "https://totaltravel.somee.com/Images/Default/DefaultPhoto.jpg");
        $('#TotalTT').html("L 0");
    }

    var ReservacionView = ajaxRequest(urlAPI+"/API/Reservation/Find?id=" + transid);

        if (ReservacionView.code == 200) {

            var resv = ReservacionView.data;
            var reshotid = resv.reservacionHotelID;
            

            if (ReservacionDetView.code == 200) {

                var resv = ReservacionDetView.data;
                var rooms = resv.filter(resva => resva.reservacionHotelID == reshotid);
                $('#rooms').empty();
                if (rooms.length == 0)
                {
                    actexth =
                        `<div class="item">
                                <div class="content">
                                    <a class="header">No se han asignado habitaciones a este registro</a>                                                      
                                </div>
                            </div>`
                    $('#rooms').append(actexth);
                }
                else
                {
                for (var i=0; i < rooms.length; i++){
                    const item = rooms[i];
                    var RoomFind = ajaxRequest(urlAPI+"/API/Rooms/Find?id=" + item.habitacionID);
                    try {
                        var room = RoomFind.data;
                        var imagenes = room.imageUrl.split(',');
                        var wifi, balcon;
                        if (room.wifi = true) { wifi = "si"; }
                        else { wifi = "no"; }
                        if (room.balcon == 1) { balcon = "si"; }
                        else { balcon = "no"; }
                        divroom =
                            `<div class="item">
                        <div class="image">
                            <img
                                src="${imagenes[0]}">
                        </div>
                        <div class="content">
                            <a class="header">${item.nombre_Habitacion} <div class="ui large label">${item.categoria_Habitacion}
                            </div></a>
                            <div class="meta">
                                <span class="cinema">
                                    ${room.descripcion}
                                </span>
                            </div>
                            <div class="extra">
                                <div class="ui label">Wifi: ${wifi}</div>
                                <div class="ui label">Balcon: ${balcon}</div>
                                <div class="ui label">Camas ${room.camas}</div>
                            </div><br>
                        </div>
                        <div class="content left floated" style="text-align: end;">
                            <a class="ui huge green tag label">L ${room.precio}</a>
                        </div>
                     </div>`
                        $('#rooms').append(divroom);
                        HotelPrecio += parseInt(room.precio)
                    }
                    catch {
                        divroom =
                            `<div class="item">
                                <div class="image">
                                    <img
                                        src="${urlAPI}/Images/Default/DefaultPhoto.jpg">
                                </div>
                                <div class="content">
                                    <a class="header">ESTA HABITACION FUE ELIMINADA
                                    </a>
                                </div>                     
                            </div>`
                        $('#rooms').append(divroom);
                    }
                    }
                }
                SubtotalH = HotelPrecio;
                HotelPrecio = 0;
            }
            
        }               
        if (ReservacionActView.code == 200) {

            var resvacts = ReservacionActView.data;
            var activities = resvacts.filter(resva => resva.reservacion == transid);
            $('#actext').empty();
            if (activities.length == 0) {
                actexth =
                    `<div class="item">
                                <div class="content">
                                    <a class="header">Esta reservacion no tiene actividades extras</a>                                                      
                                </div>
                            </div>`
                $('#actext').append(actexth);
            }
            else {
                for (var i = 0; i < activities.length; i++)
                {
                    const item = activities[i];
                                       
                    var ActivitieFind = ajaxRequest(urlAPI+"/API/Activities/Find?id=" + item.id_Actividad_Extra);
                    
                    var Activitie = ActivitieFind.data;
                    try {
                        actext =
                            `<div class="item">
                            <div class="content">
                                <a class="header">${item.actividad_Extra}</a>
                                <div class="description">
                                    Tipo de actividad: ${Activitie.tipo}
                                </div>                         
                            </div>
                        </div>`
                        $('#actext').append(actext);
                    } catch {
                        actext =
                            `<div class="item">
                                <div class="content">
                                    <a class="header">Actividad Borrada</a>                                                      
                                </div>
                            </div>`
                        $('#actext').append(actext);
                    }
                }
            }
        }
        if (ReservacionActHotView.code == 200) {
            
            var resvact = ReservacionActHotView.data;
            var activitiesh = resvact.filter(resva => resva.reservacionID == transid);
            $('#acthot').empty();
            if (activitiesh.length == 0) {
                actexth =
                    `<div class="item">
                                <div class="content">
                                    <a class="header">Esta reservación no tiene actividades de hoteles</a>                                                      
                                </div>
                            </div>`
                $('#acthot').append(actexth);
            }
            else {
                for (var i = 0; i < activitiesh.length; i++)
                {
                    const item = activitiesh[i];                            
                    try {
                        actexth =
                            `<div class="item">
                                <div class="content">
                                    <a class="header">${item.nombre}</a>
                                    <div class="description">
                                        Descripción: ${item.descripcion}
                                    </div>                         
                                </div>
                            </div>`
                        $('#acthot').append(actexth);
                    } catch {
                        actexth =
                            `<div class="item">
                                <div class="content">
                                    <a class="header">Actividad Borrada</a>                                                      
                                </div>
                            </div>`
                        $('#acthot').append(actexth);
                    }
                }
            }
        }

      
    $('#Reservation_Details_Info .item').removeClass("disabled");
    ShowContent("frmReservation_Info", 0);

    ImpuestoH = SubtotalH * 0.15;
    TotalH = ImpuestoH + SubtotalH;
    if (TransportePrecio === undefined) {
        SubtotalR = TotalH + 0;
    }
    else {
        SubtotalR = TotalH + parseInt(TransportePrecio);
    }

    ImpuestoR = SubtotalR * 0.15;
    TotalR = SubtotalR + ImpuestoR;
    $('#SubTotalH').html("L " + SubtotalH.toString());
    $('#ImpuestoH').html("L " + ImpuestoH.toString());
    $('#TotalH').html("L " + TotalH.toString());
    $('#TotalHH').html("L " + TotalH.toString());
    $('#SubTotalR').html("L " + SubtotalR.toString());
    $('#ImpuestoR').html("L " + ImpuestoR.toString());
    $('#TotalR').html("L " + TotalR.toString());
}


$("a.reserv_trigger_button").click(function (_this) {
    $("a.reserv_trigger_button").addClass("btn-edit").removeClass("btn-view");
    $(_this.target).addClass("btn-view").removeClass("btn-edit");
});


