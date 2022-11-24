const params = new URLSearchParams(window.location.search);
const SuccessDelete = params.get("success-d");

if (SuccessDelete == "true") {
    iziToastAlert(title = "Proceso completado", message = "El tipo de menú se ha eliminado exitosamente.", type = "success");
}

const SuccessCreate = params.get("success-c");

if (SuccessCreate == "true") {
    iziToastAlert(title = "Proceso completado", message = "El tipo de menú se ha creado exitosamente.", type = "success");
}

const SuccessUpdate = params.get("success-u");

if (SuccessUpdate == "true") {
    iziToastAlert(title = "Proceso completado", message = "El tipo de menú se ha actualizado exitosamente.", type = "success");
}


var send = false;
$("#createTypeMenus").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeTypeMenus").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendTypeMenus").click(() => {

    validateArrayForm = [
        { validateMessage: "Ingrese un tipo menú.", Jqueryinput: $("#Time_Descripcion") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        $('#createTypeMenusForm').submit();
    }

});


