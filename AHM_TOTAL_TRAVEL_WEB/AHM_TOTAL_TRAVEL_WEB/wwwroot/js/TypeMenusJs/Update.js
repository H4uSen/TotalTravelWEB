$(document).ready(function () {
    $("#Time_ID").hide();
});

function GetTypeMenus(id) {
    $(document).ready(function () {
        $("#Time_DescripcionUpdate");
    });
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/MenuTypes/Find?Id=" + id);
    if (response.code == 200) {
        $('#Time_ID').val(id);
        $('#Time_DescripcionUpdate').val(response.data.descripcion);

        if ($('#Time_DescripcionUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}


$("#closeEditTypeMenus").click(() => {
    $("#modalUpdate").modal('hide');
});


$("#sendEditTypeMenus").click(() => {

    validateArrayForm = [
        { validateMessage: "Ingrese un tipo menú.", Jqueryinput: $("#Time_DescripcionUpdate") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        $('#updateTypeMenusForm').submit()
    }

});