
$('.ui.dropdown').dropdown();

$("#Create").click(() => {
    $(".ui.modal").modal('show');
});

$("#createCity").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeCity").click(() => {
    $("#modalCreate").modal('hide');
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
    if ($("#pais_ID").val() != 0 && $("#ciud_Descripcion").val() != 0) {
        $("#createCityform").submit();
    }
 
    
}




// ----------------------------------- EVENTS ------------------------------------