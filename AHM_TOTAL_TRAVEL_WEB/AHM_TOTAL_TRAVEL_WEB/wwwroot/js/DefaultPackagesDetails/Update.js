$(document).ready(function () {
    $("#Actv_ID").hide();
});

$("#closeEditActivities").click(() => {
    $("#modalUpdate").modal('hide');
});
$("#UpdateBottomActivities").click(() => {
    $("#modalUpdate").modal('show');
});


function GetActivities(id) {
    var response = ajaxRequest(urlAPI+"/API/Activities/Find?id=" + id);
    if (response.code == 200) {
        $('#Actv_ID').val(id);
        $('#ActividadUpdate').val(response.data.descripcion);
        const parent = $("#TiPoAc_IDUpdate").parent();
        parent.find(`.menu .item[data-value="${response.data.iD_TiAc}"]`).addClass(["selected", "active"]);

        if ($('#ActividadUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}

$("#sendEditActivities").click(() => {
    ValidarUpdate();
});

function ValidarUpdate() {

    const ValidateArrayActivitiesUpdate = [
        { validateMessage: "Ingrese una Actividad", Jqueryinput: $("#ActividadUpdate") },
        { validateMessage: "Seleccione el tipo de la Actividad", Jqueryinput: $("#TiPoAc_IDUpdate") }
    ];

    const ActivityValidateUpdate = ValidateForm(ValidateArrayActivitiesUpdate);

    if (ActivityValidateUpdate) {
        $("#updateActivitiesForm").submit();
    }
}