$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createSuburbs").click(() => {
    $("#modalCreate").modal('show');
});

$("#close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#send").click(() => {
    validar();
})

function validar() {
    if ($("#Colonia").val() == 0) {
        $("#labelvalidatorColonia").html("Ingrese una colonia.");
    }
    else {
        $("#labelvalidatorColonia").html(" ");
    }
    if ($("#City_ID").val() == 0) {
        $("#labelvalidatorCiudad").html("Seleccione una ciudad.");
    }
    else {
        $("#labelvalidatorCiudad").html(" ");
    }
    if ($("#Colonia").val() != 0 && $("#City_ID").val() != 0) {
        $("#createSuburbsForm").submit();
    }

}