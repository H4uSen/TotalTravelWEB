$(".ui.dropdown").dropdown();

getSchedule();
function getSchedule() {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationActivitiesExtra/List");

    if (response.code == 200) {

        var hoTr = response.data;

        ClearDropDownItem($('#ReAE_ID'));
        $("#ReAE_ID").append(
            `<option value="">Seleccione una actividad. (required)</option>`
        );
        AddDropDownItem($('#ReAE_ID'), item = { value: "", text: "Seleccione un " });
        for (var i = 0; i < hoTr.length; i++) {
            var item = hoTr[i];
            AddDropDownItem($('#ReAE_ID'), item = { value: item.actividadID, text: item.descripcion });
        }

        SetDropDownValue($('#ReAE_ID'), actividadID);
    }
};