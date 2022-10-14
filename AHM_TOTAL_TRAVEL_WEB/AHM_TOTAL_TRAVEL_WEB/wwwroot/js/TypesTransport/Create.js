$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createTypesTransport").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeTypesTransport").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendTypesTransport").click(() => {
    validar();
})

function validar() {
    if ($("#Transporte").val() == 0) {
        $("#labelvalidatort").html("Ingrese una Descripcion");
    }
    else {
        $("#labelvalidatort").html(" ");
    }   
    if ($("#Transporte").val() != 0) {
        $("#createTypesTransportForm").submit();
    }

}
