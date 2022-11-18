$("#btnCrearhorario").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeSchedule").click(() => {
    $("#modalCreate").modal('hide');
});

$("#SendSchedule").click(() => {
    ValidarCampos();
});

if (Client_Role == "Administrador") {
    $("#Part_ID").removeAttr("hidden");
    $("#Part_ID").show();
}
getDestiny();

function ValidarCampos() {
    const ValidateArraySchedule = [
        { validateMessage: "Seleccione un Destino", Jqueryinput: $("#DsTr_ID") },
        { validateMessage: "Ingrese una Fecha", Jqueryinput: $("#FechaViaje") },
        { validateMessage: "Ingrese una Hora de Salida", Jqueryinput: $("#HoTr_HoraSalida") },
        { validateMessage: "Ingrese una Hora de Llegada", Jqueryinput: $("#HoTr_HoraLlegada") }
    ]

    const ScheduleValidate = ValidateForm(ValidateArraySchedule);

    if (ScheduleValidate) {
        $("#createScheduleForm").submit();
    }
}

function getDestiny() {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DestinationsTransportations/List");


    if (response.code == 200) {

        var DsTr_ID = response.data;
        

        ClearDropDownItem($('#DsTr_ID'));
        $("#DsTr_ID").append(
            `<option value="">Seleccione un Destino. (required)</option>`
        );
        for (var i = 0; i < DsTr_ID.length; i++) {
            var item = DsTr_ID[i];
            AddDropDownItem($('#DsTr_ID'), item = { value: item.id, text: item.ciudadSalida + " - " + item.ciudadDestino});
        }
    }
    var response2 = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Partners/List");

    if (response2.code == 200) {

        var Part_ID2 = response2.data;
        var Part_ID = Part_ID2.filter(resva => resva.tipoPartner == "Agencia de Transporte");

        ClearDropDownItem($('#Partner_ID'));
        $("#Partner_ID").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID'), item = { value: item.id, text: item.nombre});
        }
    }
};