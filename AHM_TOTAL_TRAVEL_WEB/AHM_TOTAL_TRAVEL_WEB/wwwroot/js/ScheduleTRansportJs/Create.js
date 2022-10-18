$("#btnCrearhorario").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeSchedule").click(() => {
    $("#modalCreate").modal('hide');
});

$("#SendSchedule").click(() => {
    ValidarCampos();
});

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
    var response = ajaxRequest("https://totaltravel.somee.com/API/DestinationsTransportations/List");

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


        // $('#HoTr_ID').parent().find('.text').html('Seleccione un horario');
    }
};