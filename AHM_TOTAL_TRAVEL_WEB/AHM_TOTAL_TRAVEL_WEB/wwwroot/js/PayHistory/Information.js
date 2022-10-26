

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

function ViewReservation(hoteid,transid) {
        var response = ajaxRequest("https://totaltravel.somee.com/API/Hotels/Find?id="+hoteid);

        if (response.code == 200) {
            
            var hotels = response.data;
            var imagenes = hotels.image_URL.split(',');
            $('#imagen').attr("src", imagenes[0]);
            $('#hotename').html(hotels.hotel);
        }
        
        var response2 = ajaxRequest("https://totaltravel.somee.com/API/ReservationTransportation/List");

        if (response2.code == 200) {
            var transp = response2.data;
            var transpo = transp.filter(resv => resv.reservacion = transid);
            var transpor = transpo[0];
            
            $('#trcategory').html(transpor.tipo_Transporte);
            var response3 = ajaxRequest("https://totaltravel.somee.com/API/Transports/Find?id=" + transpor.iD_detalle_Transporte);
            if (response3.code == 200) {
                var t = response3.data;
                var response4 = ajaxRequest("https://totaltravel.somee.com/API/Partners/Find?id=" + t.partnerID);
                if (response4.code == 200) {
                    var partner = response4.data;                   
                    $('#partnername').html(partner.nombre);
                    var imagenes = partner.image_Url.split(',');
                    $('#imagenpar').attr("src", imagenes[0]);
                }
                             
            }
        }
        
        

    $('#Reservation_Details_Info .item').removeClass("disabled");
    ShowContent("frmReservation_Info", 0);

}


