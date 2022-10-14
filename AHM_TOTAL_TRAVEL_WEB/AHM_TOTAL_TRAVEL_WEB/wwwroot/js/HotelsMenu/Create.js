$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createHotelsMenu").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeHotelsMenu").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendHotelsMenu").click(() => {
    validar();
})

function validar() {
    if ($("#Descripcion").val() != 0 && $("#Precio").val() != 0 && $("#tHoTe_ID").val() != 0 && $("#tTime_ID").val() != 0) {
        $("#createHotelsMenuForm").submit();
    }

}

