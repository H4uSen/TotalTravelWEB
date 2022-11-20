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

if (Client_Role == "Administrador") {
    $("#Part_ID").removeAttr("hidden");
    $("#Part_ID").show();
    $("#Part_ID2").removeAttr("hidden");
    $("#Part_ID2").show();
}

function validar() {

    validateArrayForm = [
        { validateMessage: "Seleccione una Ciudad de Salida.", Jqueryinput: $("#modalCreate #CiudadSalida") },
        { validateMessage: "Seleccione una Ciudad de Destino.", Jqueryinput: $("#modalCreate #CiudadDestino") },
        { validateMessage: "Seleccione un Socio.", Jqueryinput: $("#modalCreate #Partner_ID") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createDestinationsTransportationsForm").submit();
    }

}

getPartners()
function getPartners() {
    var response2 = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Partners/List")
    if (response2.code == 200) {

        var Part_ID2 = response2.data;
        var Part_ID = Part_ID2.filter(resva => resva.tipoPartner == "Agencia de Transporte");
        ClearDropDownItem($('#Partner_ID'));
        $("#Partner_ID").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID'), item = { value: item.id, text: item.nombre });
        }

        ClearDropDownItem($('#Partner_ID2'));
        $("#Partner_ID2").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID2'), item = { value: item.id, text: item.nombre });
        }

    }


};


function editar(destinoTransporteID) {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DestinationsTransportations/Find?id=" + destinoTransporteID);
    if (response.code == 200) {
        var item = response.data;
        SetDropDownValue($("#modalUpdate #CiudadSalidaUpdate"), defaultValue = item.ciudadSalidaID);
        SetDropDownValue($("#modalUpdate #CiudadDestinoUpdate"), defaultValue = item.ciudadDestinoID);
        SetDropDownValue($("#modalUpdate #Partner_ID2"), defaultValue = item.partner_ID);

        $("#modalUpdate #DsTr_ID").val(item.id);

        $("#modalUpdate").modal({ autofocus: false, forceSelection: false }).modal('show');
        
    }
}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Seleccione una Ciudad de Salida.", Jqueryinput: $("#modalUpdate #CiudadSalidaUpdate") },
        { validateMessage: "Seleccione una Ciudad de Destino.", Jqueryinput: $("#modalUpdate #CiudadDestinoUpdate") },
        { validateMessage: "Seleccione un Socio.", Jqueryinput: $("#modalUpdate #Partner_ID2") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#updateDestinationsTransportationsForm").submit();
    }
}