$(document).ready(function () {
    $("#Ciud_ID").hide();
});

$("#closeEditCity").click(() => {
    $("#modalUpdate").modal('hide');
});

$("#UpdateBottomCity").click(() => {
    $("#modalUpdate").modal('show');
});


function GetCity(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/Find?id=" + id);
    if (response.code == 200) {
        $('#Ciud_ID').val(id);
        $('#ciud_Descripcion').val(response.data.descripcion);

        if ($('#ciud_Descripcion').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}



$("#sendEditCity").click(() => {
    ValidarUpdate();
});

function ValidarUpdate() {
    if ($("#ciud_Descripcion").val() == 0) {
        $("#labelvalidatorCity").html("No se Puede dejar vacio este campo");
    }
    else {
        $("#labelvalidatorCity").html(" ");
    }
    if ($("#pais_ID").val() == 0) {
        $("#labelvalidatorPais").html("Seleccione el pais");
    }
    else {
        $("#labelvalidatorPais").html(" ");
    }
    if ($("#ciud_Descripcion").val() != 0 && $("#pais_ID").val() != 0) {
        $("#updateCity").submit();
    }
}
