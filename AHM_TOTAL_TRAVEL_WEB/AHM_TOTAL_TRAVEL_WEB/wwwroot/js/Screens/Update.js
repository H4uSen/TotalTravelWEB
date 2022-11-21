$(document).ready(function () {
    $("#Perm_ID").hide();
    $("#Modu_Id").hide();
});


const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}

function GetPermissions(id) {

    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Permissions/Find?Id=" + id);
    if (response.code == 200) {
        $('#Perm_ID').val(id);
        $('#txtDescripcionUpdate').val(response.data.descripcion);
        $('#txtControllerUpdate').val(response.data.controlador);
        $('#txtActionUpdate').val(response.data.action);
        SetDropDownValue($("#cbbModuloUpdate"), response.data.id_modulo);
        if (response.data.esVisible == true) {
            $("#checkVisible").prop("checked", true);
        } else {
            $("#checkVisible").prop("checked", false);
        }

        if ($('#Perm_ID').val() != 0) {
            $("#mdlUpdateScreen").modal('show');
        }
    }
}

$("#closeUpdate").click(() => {
    $("#mdlUpdateScreen").modal('hide');
});


$("#sendUpdate").click(() => {

    validateArrayForm = [
        { validateMessage: "Ingrese la descripción.", Jqueryinput: $("#txtDescripcionUpdate") },
        { validateMessage: "Ingrese el controlador.", Jqueryinput: $("#txtControllerUpdate") },
        { validateMessage: "Ingrese la acción.", Jqueryinput: $("#txtActionUpdate") },
        { validateMessage: "Seleccione un modulo.", Jqueryinput: $("#cbbModuloUpdate") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        var screen = ScreensViewModel;
        screen.perm_ID = parseInt($("#mdlUpdateScreen #Perm_ID").val());
        screen.modu_ID = parseInt($("#mdlUpdateScreen #cbbModuloUpdate").val());
        screen.perm_Action = $("#mdlUpdateScreen #txtActionUpdate").val();
        screen.perm_Controlador = $("#mdlUpdateScreen #txtControllerUpdate").val();
        screen.perm_Descripcion = $("#mdlUpdateScreen #txtDescripcionUpdate").val();
        screen.perm_esVisible = $("#mdlUpdateScreen #checkVisible").prop("checked");

        const response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Permissions/Update?id=" + screen.perm_ID, screen, "PUT");
        if (response.code == 200) {
            window.location.href = '/Screens?success=true';
        } else {
            Swal.fire("Error al realizar la accion", response.message, "error");
        }
    }

});

function DeletePermissions(id) {
    const capsula1 = () => {
        var response = ajaxRequest("Screens/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Screens?success=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};



function GetModules(id) {

    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Modules/Find?Id=" + id);
    if (response.code == 200) {
        $('#Modu_Id').val(id);
        $('#txtModuloUpdate').val(response.data.modulo);

        if ($('#Modu_Id').val() != 0) {
            $("#mdlUpdateModules").modal('show');
        }
    }
}


$("#sendModulesUpdate").click(() => {

    validateArrayForm = [
        { validateMessage: "Ingrese un nombre", Jqueryinput: $("#mdlUpdateModules #txtModuloUpdate") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        var module = ModulesViewModel;
        module.modu_Id = parseInt($("#mdlUpdateModules #Modu_Id").val());
        module.modu_Descripcion = $("#mdlUpdateModules #txtModuloUpdate").val();


        const response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Modules/Update?id=" + module.modu_Id, module, "PUT");
        if (response.code == 200) {
            window.location.href = '/Screens?success=true';
        } else {
            Swal.fire("Error al realizar la accion", response.message, "error");
        }
    }

});




function DeleteModulos(id) {
    const capsula1 = () => {
        var response = ajaxRequest("Screens/DeleteModule?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Screens?success=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};