$(document).ready(function () {
    $("#Rol_ID").hide();
});

function GetRoles(id) {
    $(document).ready(function () {
        $("#Rol_DescripcionUpdate");
    });
    var response = ajaxRequest(urlAPI +"/API/Roles/Find?Id=" + id);
    if (response.code == 200) {
        $('#Rol_ID').val(id);
        $('#Rol_DescripcionUpdate').val(response.data.descripcion);

        if ($('#Rol_DescripcionUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }
    }
}

$("#closeEditRoles").click(() => {
    $("#modalUpdate").modal('hide');
});


$("#sendEditRoles").click(() => {

    validateArrayForm = [
        { validateMessage: "Ingrese el rol.", Jqueryinput: $("#Rol_DescripcionUpdate") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        $('#updateRolesForm').submit()
    }

});