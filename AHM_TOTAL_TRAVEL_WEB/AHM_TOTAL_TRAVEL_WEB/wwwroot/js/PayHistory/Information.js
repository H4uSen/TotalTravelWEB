

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

function ViewReservation(hoteid) {
        var response = ajaxRequest("https://totaltravel.somee.com/API/Hotels/Find?id="+hoteid);

        if (response.code == 200) {
            var imagen = $('#imagen').val();
            var hotels = response.data;
            var imagenes = hotels.image_URL.split(',');
            $('#imagen').attr("src", imagenes[0]);
            $('#hotename').html(hotels.hotel);
        }

    $('#Reservation_Details_Info .item').removeClass("disabled");
    ShowContent("frmReservation_Info", 0);

}


