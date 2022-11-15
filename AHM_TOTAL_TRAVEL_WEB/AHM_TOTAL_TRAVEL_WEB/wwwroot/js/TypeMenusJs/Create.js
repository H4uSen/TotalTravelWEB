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
        $('#createTypeMenusForm').submit()
    }

});


