$('.ui.dropdown').dropdown();

$("#create").click(() => {
    $(".ui.modal").modal('show');

   
});

$("#update").click(() => {
    $(".ui.modal").modal('show');


});


$("#sendCity").click(() => {
    Validacion();
})

function Validacion() {
    
    if ($("#pais_ID").val() == 0) {
        $("#labelvalidatorPais").html("Seleccione un país.");
    } else {
        $("#labelvalidatorPais").html(" ");
    }
    if ($("#ciud_Descripcion").val() == 0 ) {
        $("#labelvalidatorCity").html("Seleccione una ciudad.");
    } else {
        $("#labelvalidatorCity").html(" ");
    }
    if ($("#pais_ID").val() != 0 && $("#ciud_Descripcion").val() != 0)
    {
        $("#createCity").submit();
    }
    
}




// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdCity tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdCity").paginationTdA({
        elemPerPage: 5
    });
});

$("#grdCity").paginationTdA({
    elemPerPage: 5
});