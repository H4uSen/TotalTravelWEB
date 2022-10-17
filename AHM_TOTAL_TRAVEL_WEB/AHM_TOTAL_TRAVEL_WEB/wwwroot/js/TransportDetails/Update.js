$(".ui.dropdown").dropdown();
SetDropDownValue($("#Tprt_ID"), Tprt_ID);
SetDropDownValue($("#HoTr_ID"), HoTr_ID);

getSchedule();
function getSchedule() {
    var response = ajaxRequest("https://totaltravel.somee.com/API/ScheduleTransportation/List");

    if (response.code == 200) {

        var hoTr = response.data;

        ClearDropDownItem($('#HoTr_ID'));
        $("#HoTr_ID").append(
            `<option value="">Seleccione un horario. (required)</option>`
        );
        AddDropDownItem($('#HoTr_ID'), item = { value: "", text: "Seleccione un horario" });
        for (var i = 0; i < hoTr.length; i++) {
            var item = hoTr[i];
            AddDropDownItem($('#HoTr_ID'), item = { value: item.id, text: item.ciudad_Salida + " - " + item.ciudad_Destino + "/ " + item.hora_Salida + "-" + item.hora_Llegada });
        }


        // $('#HoTr_ID').parent().find('.text').html('Seleccione un horario');
    }
};