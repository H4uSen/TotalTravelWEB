const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}



var send = false;

$(document).ready(function () {
    $("#CaHa_ID").hide();

});

function Updatecategory(id) {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Categoriesrooms/Find?Id=" + id);
    if (response.code == 200) {
        $('#CaHa_ID').val(id);
        $('#CaHa_DescripcionUpdate').val(response.data.descripcion);
        $("#modalUpdate").modal('show');

    }
}

$("#closeEditCategoryrooms").click(() => {
    $("#modalUpdate").modal('hide');
});


$("#sendEditCategoryrooms").click(() => {



    validateArrayForm = [
        { validateMessage: "Ingrese un tipo de pago .", Jqueryinput: $("#CaHa_DescripcionUpdate") },
    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        $('#updateCategoryroomsForm').submit()
    }

});