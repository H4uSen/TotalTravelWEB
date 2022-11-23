$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});


$("#closeTypeMenus").click(() => {
    $("#modalCreateTypeMenu").modal('hide');
});

$("#agregartipo").click(() => {
    $("#modalCreateTypeMenu").modal('show');
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

async function createMenus() {

    validateArrayForm = [
        { validateMessage: "Ingrese el nombre del menú.", Jqueryinput: $("#Menu_Nombre_C") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Menu_Descripcion_C") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#Menu_Precio_C") },
        { validateMessage: "Seleccione un tipo de menú.", Jqueryinput: $("#TiMe_ID_C") }
    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("Time_ID", $("#TiMe_ID_C").val());
        data.append("Menu_Descripcion", $("#Menu_Descripcion_C").val());
        data.append("Menu_Nombre", $("#Menu_Nombre_C").val());
        data.append("Menu_Precio", $("#Menu_Precio_C").val());
        data.append("Rest_ID", parseInt(RestauranteID));
        data.append("Menu_UsuarioCreacion", parseInt(Client_User_ID));

        if ($("#Imagen_C").prop("files")[0] != undefined) {
            data.append("File", $("#Imagen_C").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }
        var response = uploadFile(urlAPI+"/API/Menus/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/ModuleRestaurants?success=true';
        }

    }
}