//GetObtener();

$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});

function ObtenerDatos(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Menus/Find?id=" + id);
    if (response.code == 200) {
        var item = response.data;
        $("#Menu_ID").val(item.id);
        $("#Rest_ID").val(item.iD_Restaurante);
        $("#Menu_Nombre").val(item.menu);
        $("#Menu_Descripcion").val(item.descripcion);
        $("#Menu_Precio").val(item.precio);
        SetDropDownValue($("#modalUpdate #TiMe_ID"), defaultValue = item.iD_TipoMenu);

        $("#modalUpdate").modal("show");
    }
}

function updateMenus() {

    validateArrayForm = [
        { validateMessage: "Ingrese el nombre del menú.", Jqueryinput: $("#Menu_Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Menu_Descripcion") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#Menu_Precio") },
        { validateMessage: "Seleccione una tipo menú.", Jqueryinput: $("#TiMe_ID") }
    ];

    // retorna bool
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("Time_ID", $("#TiMe_ID").val());
        data.append("Menu_Descripcion", $("#Menu_Descripcion").val());
        data.append("Menu_Nombre", $("#Menu_Nombre").val());
        data.append("Menu_Precio", $("#Menu_Precio").val());
        data.append("Rest_ID", $("#Rest_ID").val());
        data.append("Menu_UsuarioModifica", parseInt(Client_User_ID));

        var menuID = $("#Menu_ID").val();

        //for (let i = 0; i < imagesArrayPure.length; i++) {
        //    data.append("File", imagesArrayPure[i]);
        //}
        if ($("#Imagen").prop("files")[0] != undefined) {
            data.append("Menu_Url", $("#Imagen").prop("files")[0]);
        }
        else {
            data.append("Menu_Url", null);
        }
        var response = uploadFile("https://totaltravel.somee.com/API/Menus/Update?id=" + menuID, data, "PUT");

        if (response.data.codeStatus > 0) {
            window.location.href = '/ModuleRestaurants?success=true';
        }

    }
}