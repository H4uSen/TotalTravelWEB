$(document).ready(function () {
    $("#ID_Horario").hide();
});

$("#UpdateBottomSchedule").click(() => {
    $("#modalUpdate").modal('show');
});

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
        SetDropDownValue($("#DsTr_IDUpdate"), response.data.ciudad_Salida_ID);

        if ($("#ID_Horario").val != 0) {
            $("#modalUpdate").modal('show');
        }
    }
}