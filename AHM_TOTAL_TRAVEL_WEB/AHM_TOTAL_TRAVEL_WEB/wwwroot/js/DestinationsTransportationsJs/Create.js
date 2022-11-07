$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createDestinationsTransportations").click(() => {
    $("#modalCreate").modal({ autofocus: false, forceSelection: false }).modal('show');
    /*$("#modalCreate").modal('show');*/
});

$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});

$("#send").click(() => {
    validar();
})

function validar() {

    validateArrayForm = [
        { validateMessage: "Seleccione una Ciudad de Salida.", Jqueryinput: $("#modalCreate #CiudadSalida") },
        { validateMessage: "Seleccione una Ciudad de Destino.", Jqueryinput: $("#modalCreate #CiudadDestino") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createDestinationsTransportationsForm").submit();
    }

}

function editar(destinoTransporteID) {
    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DestinationsTransportations/Find?id=" + destinoTransporteID);
    if (response.code == 200) {
        var item = response.data;
        SetDropDownValue($("#modalUpdate #CiudadSalida"), defaultValue = item.ciudadSalidaID);
        SetDropDownValue($("#modalUpdate #CiudadDestino"), defaultValue = item.ciudadDestinoID);

        $("#modalUpdate #DsTr_ID").val(item.id);

        $("#modalUpdate").modal("show");
        
    }
}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Seleccione una Ciudad de Salida.", Jqueryinput: $("#modalUpdate #CiudadSalida") },
        { validateMessage: "Seleccione una Ciudad de Destino.", Jqueryinput: $("#modalUpdate #CiudadDestino") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#updateDestinationsTransportationsForm").submit();
    }
}