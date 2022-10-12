function createMenus() {

    if ($('#Menu_Nombre').val() == 0) {
        $("#labelvalidatorMenu").html("Ingrese un menú");
    }
    else {
        $("#labelvalidatorMenu").html(" ");
    }
    if ($('#Menu_Descripcion').val() == 0) {
        $("#labelvalidatorDescripcion").html("Ingrese una descripción.");
    }
    else {
        $("#labelvalidatorDescripcion").html(" ");
    }
    if ($('#Menu_Precio').val() == 0) {
        $("#labelvalidatorPrecio").html("Ingrese un precio.");
    }
    else {
        $("#labelvalidatorPrecio").html(" ");
    }
    if ($('#Rest_ID').val() == 0) {
        $("#labelvalidatorRest").html("Seleccione un restaurante.");
    } else {
        $("#labelvalidatorRest").html(" ");
    }
    if ($('#Time_ID').val() == 0) {
        $("#labelvalidatorTipo").html("Seleccione un tipo de menú");
    } else {
        $("#labelvalidatorTipo").html(" ");
    }



    if ($('#Menu_Nombre').val() != 0 && $('#Menu_Descripcion').val() != 0 && $('#Menu_Precio').val() != 0 && $('#Rest_ID').val() != 0
        && $('#Time_ID').val() != 0) {


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
        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }


    }
   
}

