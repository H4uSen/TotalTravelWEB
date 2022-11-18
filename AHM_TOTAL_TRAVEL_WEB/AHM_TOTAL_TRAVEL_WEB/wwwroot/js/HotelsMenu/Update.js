$(document).ready(function () {
    $("#HoMe_ID").hide();
});

$("#closeEditHotelsMenu").click(() => {
    $("#modalUpdate").modal('hide');
});
$("#UpdateBottomHotelsMenu").click(() => {
    $("#modalUpdate").modal('show');
});


function GetHotelsMenu(id) {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/HotelsMenu/Find?id=" + id);
    if (response.code == 200) {
        $('#HoMe_ID').val(id);
        $('#Descripcion_up').val(response.data.menu);
        $('#Precio_up').val(response.data.precio);
        //const parent = $("#tHoTe_ID_up").parent();
        //parent.find(`.menu .item[data-value="${response.data.iD_TiAc}"]`).addClass(["selected", "active"]);
        //const parent = $("#tTime_ID_up").parent();
        //parent.find(`.menu .item[data-value="${response.data.iD_TiAc}"]`).addClass(["selected", "active"]);


        if ($('#HotelsMenuUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}

$("#sendEditHotelsMenu").click(() => {
    ValidarUpdate();
});

function ValidarUpdate() {
  
    if ($("#Descripcion").val() != 0 && $("#Precio").val() != 0 && $("#tHoTe_ID").val() != 0 && $("#tTime_ID").val() != 0) {
        $("#updateHotelsMenuForm").submit();
    }
}