$(document).ready(function () {
    $("#CaHa_ID").hide();

});

function Updatecategory(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Categoriesrooms/Find?Id=" + id);
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