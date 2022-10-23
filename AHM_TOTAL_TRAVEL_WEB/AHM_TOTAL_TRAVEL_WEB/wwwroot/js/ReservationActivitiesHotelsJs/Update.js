$(".ui.dropdown").dropdown();

getSchedule();
function getSchedule() {
    var response = ajaxRequest("https://totaltravel.somee.com/API/ReservationActivitiesHotels/List");

    if (response.code == 200) {

        var hoTr = response.data;

        ClearDropDownItem($('#ReAH_ID'));
        $("#ReAH_ID").append(
            `<option value="">Seleccione una actividad. (required)</option>`
        );
        AddDropDownItem($('#ReAH_ID'), item = { value: "", text: "Seleccione un " });
        for (var i = 0; i < hoTr.length; i++) {
            var item = hoTr[i];
            AddDropDownItem($('#ReAH_ID'), item = { value: item.actividadID, item. });
        }

        SetDropDownValue($('#ReAH_ID'), actividadID);
    }
};