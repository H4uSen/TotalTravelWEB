$(document).ready(function () {
    $("#TiPa_ID").hide();

});

function Updatepaymet(id) {
    var response = ajaxRequest(urlAPI+"/API/PaymentTypes/Find?Id=" + id);
    if (response.code == 200) {
        $('#TiPa_ID').val(id);
        $('#TiPa_DescripcionUpdate').val(response.data.descripcion);
        $("#modalUpdate").modal('show');

    }
}

$("#closeEditTipeofpay").click(() => {
    $("#modalUpdate").modal('hide');
});


$("#sendEditTipeofpay").click(() => {



    validateArrayForm = [
        { validateMessage: "Ingrese un tipo de pago .", Jqueryinput: $("#TiPa_DescripcionUpdate") },
    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        $('#updateTipeofpayForm').submit()
    }

});