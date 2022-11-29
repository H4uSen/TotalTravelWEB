$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createTipeofpay").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeTipeofpay").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendTipeofpay").click(() => {
    validar();
})

function validar() {
    if ($("#Tipopago").val() == 0) {
        $("#labelvalidatort").html("Ingrese una Descripción");
    }
    else {
        $("#labelvalidatort").html(" ");
    }
    if ($("#Transporte").val() != 0) {
        $("#createTipeofpayForm").submit();
    }

}