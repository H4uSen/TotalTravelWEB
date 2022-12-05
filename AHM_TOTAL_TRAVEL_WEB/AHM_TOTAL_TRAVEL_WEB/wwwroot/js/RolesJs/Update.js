$(document).ready(function () {
    $("#Rol_ID").hide();
});

const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success-d");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");

    $("#frmRestrictions").hide();
    $("#frmRoles").show();
    $("#screens_menus .item").removeClass("active");
    $("#screens_menus .item").eq(1).addClass("active");
}


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

function DeleteRoles(id) {
    const capsula1 = () => {
        var response = ajaxRequest(urlAPI + "/API/Roles/Delete?id=" + id + "&Mod=" + Client_User_ID, null, "DELETE");
        if (response.data.codeStatus > 0) {
            window.location.href = '/Restrictions/Index?success-d=true';
        } else {
            console.log(response);
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};