const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
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


