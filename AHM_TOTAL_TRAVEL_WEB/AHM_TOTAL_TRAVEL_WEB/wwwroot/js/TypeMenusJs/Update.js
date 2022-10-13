$(document).ready(function () {
    $("#Time_ID").hide();
});
function GetTypeMenus(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/MenuTypes/Find?Id=" + id);
    if (response.code == 200) {
        $('#Time_ID').val(id);
        $('#Time_DescripcionUpdate').val(response.data.descripcion);

        if ($('#Time_DescripcionUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}

$("#closeEditTypeMenus").click(() => {
    $("#modalUpdate").modal('hide');
});

$("#sendEditTypeMenus").click(() => {

    console.log("a")
    if ($('#Time_DescripcionUpdate').val() == 0) {
        $("#labelvalidatorUpdateError").html("Ingrese un tipo menú.");
    }
    else {
        $("#labelvalidatorUpdateError").html(" ");
    }

    if ($('#Time_DescripcionUpdate').val() != 0) {

        $('#updateTypeMenusForm').submit()

    }
});