var Reservacion = ajaxRequest("https://totaltravel.somee.com/API/Reservation/List");
$("document").ready(function () {
    Tarjeta();
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

function Tarjeta() {
    if (Reservacion.code == 200) {

        var resv = Reservacion.data;
        var Rflitro = resv.filter(resva => resva.partnerID == parseInt(Client_Partner_ID));
        $('#TargetRese').empty();
        if (Rflitro.length == 0) {
            actexth =
                `<div class="ui card">
                    <div class="content">
                        <div class="header">No hay reservaciones</div>                     
                    </div>                  
                </div>`
            $('#TargetRese').append(actexth);
        }
        else {
            for (var i = 0; i < Rflitro.length; i++) {
                const item = Rflitro[i];
                try {
                    divroom =
                        `<div class="ui card">
                    <div class="content">
                        <div class="header">${item.nombre_Hotel}</div>
                        <div class="description">
                                    ${item.nombrecompleto}
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
                        `<div class="ui card">
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