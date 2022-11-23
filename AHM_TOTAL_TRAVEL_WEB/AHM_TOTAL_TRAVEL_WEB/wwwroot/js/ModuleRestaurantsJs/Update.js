
$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});

function ObtenerDatos(id) {
    var response = ajaxRequest(urlAPI+"/API/Menus/Find?id=" + id);
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

async function updateMenus() {

    validateArrayForm = [
        { validateMessage: "Ingrese el nombre del menú.", Jqueryinput: $("#Menu_Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Menu_Descripcion") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#Menu_Precio") },
        { validateMessage: "Seleccione un tipo de menú.", Jqueryinput: $("#TiMe_ID") }
    ];

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

        if ($("#Imagen").prop("files")[0] != undefined) {
            data.append("File", $("#Imagen").prop("files")[0]);
        }
        else {
            var imageUrl = $(`#menu_${menuID} #imagen`).prop("src");
            var file = await createBlob(imageUrl)
                .then(function (data) {
                    return data;
                });
            data.append("File", file);
        }
        var response = uploadFile(urlAPI+"/API/Menus/Update?id=" + menuID, data, "PUT");

        if (response.data.codeStatus > 0) {
            window.location.href = '/ModuleRestaurants?success=true';
        }

    }
}