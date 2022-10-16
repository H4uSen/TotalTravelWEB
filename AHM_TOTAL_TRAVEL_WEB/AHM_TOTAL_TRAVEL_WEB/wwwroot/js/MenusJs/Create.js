function createMenus() {


    validateArrayForm = [
        { validateMessage: "Ingrese el nombre del menú.", Jqueryinput: $("#Menu_Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Menu_Descripcion") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#Menu_Precio") },
        { validateMessage: "Seleccione un restaurante.", Jqueryinput: $("#Rest_ID") },
        { validateMessage: "Seleccione una tipo menú.", Jqueryinput: $("#Time_ID") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var images = [];
        var data = new FormData();
        data.append("Time_ID", $("#Time_ID").val());
        data.append("Menu_Descripcion", $("#Menu_Descripcion").val());
        data.append("Menu_Nombre", $("#Menu_Nombre").val());
        data.append("Menu_Precio", $("#Menu_Precio").val());
        data.append("Rest_ID", $("#Rest_ID").val());
        data.append("Menu_UsuarioCreacion", UserID);

        for (let i = 0; i < $('#File').prop('files').length; i++) {
            const file = $('#File').prop('files')[i];
            images.push(file); //IFORMFILE
        }

        data.append("file", images);
        var response = uploadFile("https://totaltravel.somee.com/API/Menus/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Menus';
        } 

    }
   
}

