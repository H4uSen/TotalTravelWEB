$('.ui.dropdown').dropdown();


function updateDefaultPackages() {

    

    if ($('#Nombre').val() == 0) {
        $("#labelvalidatorNombre").html("Ingrese un Nombre.");
    }
    else {
        $("#labelvalidatorNombre").html(" ");
    }
    if ($('#Descripcion').val() == 0) {
        $("#labelvalidatorDescripcion").html("Ingrese una Descripcion.");
    }
    else {
        $("#labelvalidatorDescripcion").html(" ");
    }
    if ($('#Precio').val() == 0) {
        $("#labelvalidatorPrecio").html("Ingrese un Precio.");
    }
    else {
        $("#labelvalidatorPrecio").html(" ");
    }
    if ($('#Duracion').val() == 0) {
        $("#labelvalidatorDuracion").html("Ingrese una Duracion.");
    } else {
        $("#labelvalidatorDuracion").html(" ");
    }
    if ($('#hote_ID').val() == 0) {
        $("#labelvalidatorHotel").html("Seleccione un Hotel.");
    } else {
        $("#labelvalidatorHotel").html(" ");
    }
    if ($('#rest_ID').val() == 0) {
        $("#labelvalidatorRestaurantes").html("Seleccione un Restaurante.");
    } else {
        $("#labelvalidatorRestaurantes").html(" ");
    }

    if ($('#rest_ID').val() != 0 && $('#Nombre').val() != 0 && $('#Descripcion').val() != 0 && $('#Precio').val() != 0 && $('#Duracion').val() != 0 && $('#hote_ID').val() != 0) {
        $("#frmUpdateDefaultPackagues").submit();
    }



}
