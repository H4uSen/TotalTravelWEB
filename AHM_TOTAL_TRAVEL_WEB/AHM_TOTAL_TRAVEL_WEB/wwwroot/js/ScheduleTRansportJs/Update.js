$(document).ready(function () {
    $("#ID_Horario").hide();
});

$("#UpdateBottomSchedule").click(() => {
    $("#modalUpdate").modal('show');
});

$("#SendScheduleEdit").click(() => {
    ValidarupdateSchedule();
})

$("#closeScheduleEdit").click(() => {
    $("#modalUpdate").modal('hide');
});

if (Client_Role == "Administrador") {
    $("#Part_ID2").removeAttr("hidden");
    $("#Part_ID2").show();
}
getDropD()
function getDropD() {  
    var response2 = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Partners/List");

    if (response2.code == 200) {

        var Part_ID2 = response2.data;
        var Part_ID = Part_ID2.filter(resva => resva.tipoPartner == "Agencia de Transporte");

        ClearDropDownItem($('#Partner_ID22'));
        $("#Partner_ID22").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID22'), item = { value: item.id, text: item.nombre });
        }
    }
};

function GetScheduleID(id) {
    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ScheduleTransportation/Find?id=" + id);
    if (response.code == 200) {
        $('#ID_Horario').val(id);
        $('#FechaViajeUpdate').val(response.data.fecha);
        $('#HoTr_HoraSalidaUpdate').val(response.data.hora_Salida);
        $('#HoTr_HoraLlegadaUpdate').val(response.data.hora_Llegada);

        if ($("#ID_Horario").val != 0) {
            SetDropDownValue($("#DsTr_IDUpdate"), response.data.iD_Destino);
            SetDropDownValue($("#Partner_ID22"), response.data.partner_ID);
            $("#DsTr_IDUpdate").addClass('disabled');
            $("#modalUpdate").modal('show');
        }
    }
}

function ValidarupdateSchedule() {

    const ValidateArraySchedule = [
        { validateMessage: "Seleccione un Destino", Jqueryinput: $("#DsTr_IDUpdate") },
        { validateMessage: "Seleccione una Fecha", Jqueryinput: $("#FechaViajeUpdate") },
        { validateMessage: "Rellene el Campo Hora Salida", Jqueryinput: $("#HoTr_HoraSalidaUpdate") },
        { validateMessage: "Rellene el Campo Hora Llegada", Jqueryinput: $("#HoTr_HoraLlegadaUpdate") },
    ];

    const ScheduleValidateUpdate = ValidateForm(ValidateArraySchedule);

    if (ScheduleValidateUpdate) {
        $("#UpdateScheduleForm").submit();
    }
}