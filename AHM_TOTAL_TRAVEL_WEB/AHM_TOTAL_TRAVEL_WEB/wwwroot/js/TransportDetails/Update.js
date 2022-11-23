$(".ui.dropdown").dropdown();

if (Client_Partner_ID == 0) {
    getSchedule();
}
else {
    getSchedule2();
}
function getSchedule() {
    var response = ajaxRequest(urlAPI +"/API/ScheduleTransportation/List");

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

        SetDropDownValue($('#HoTr_ID'),horarioID);
        // $('#HoTr_ID').parent().find('.text').html('Seleccione un horario');
    }
};

function getSchedule2() {
    var response = ajaxRequest(urlAPI +"/API/ScheduleTransportation/List");

    if (response.code == 200) {

        var hoTr = response.data.filter(x => x.partner_ID == parseInt(Client_Partner_ID));

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