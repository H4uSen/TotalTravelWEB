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

function GetScheduleID(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/ScheduleTransportation/Find?id=" + id);
    if (response.code == 200) {
        $('#ID_Horario').val(id);
        $('#FechaViajeUpdate').val(response.data.fecha);
        $('#HoTr_HoraSalidaUpdate').val(response.data.hora_Salida);
        $('#HoTr_HoraLlegadaUpdate').val(response.data.hora_Llegada);

        if ($("#ID_Horario").val != 0) {
            SetDropDownValue($("#DsTr_IDUpdate"), response.data.iD_Destino);
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