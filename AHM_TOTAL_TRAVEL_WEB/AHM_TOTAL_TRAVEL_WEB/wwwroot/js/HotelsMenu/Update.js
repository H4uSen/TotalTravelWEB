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
    var response = ajaxRequest("https://totaltravel.somee.com/API/Activities/Find?id=" + id);
    if (response.code == 200) {
        $('#Actv_ID').val(id);
        $('#ActividadUpdate').val(response.data.descripcion);
        //$('#TiPoAc_IDUpdate').val(response.data.tipo);

        if ($('#ActividadUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}

$("#sendEditActivities").click(() => {
    ValidarUpdate();
});

function ValidarUpdate() {
    if ($("#ActividadUpdate").val() == 0) {
        $("#labelvalidatorActividadUpdate").html("No se Puede dejar vacio este campo");
    }
    else {
        $("#labelvalidatorActividadUpdate").html(" ");
    }
    if ($("#TiPoAc_IDUpdate").val() == 0) {
        $("#labelvalidatorTipoActividadUpdate").html("Seleccione el tipo de la Actividad");
    }
    else {
        $("#labelvalidatorTipoActividadUpdate").html(" ");
    }
    if ($("#ActividadUpdate").val() != 0 && $("#TiPoAc_IDUpdate").val() != 0) {
        $("#updateActivitiesForm").submit();
    }
}