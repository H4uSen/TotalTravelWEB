$(document).ready(function () {
    $("#HoMe_ID").hide();
});

$("#closeEditHotelsMenu").click(() => {
    $("#modalUpdate").modal('hide');
});
$("#UpdateBottomHotelsMenu").click(() => {
    GetImage();
    $("#modalUpdate").modal('show');
});

async function GetImage() {


    var list = menusImage;
    var file = await createBlob(list)
        .then(function (data) {
            return data;
        });
    imagesArrayPure.push(file);
    const fileData = await convertImage(file)
        .then(function (data) {
            return data;
        });
    fileData.fileName = "Menu-" + menuID + "_photo-1.jpg";
    imagesArray.push(fileData);
    LoadImage();

}

function GetHotelsMenu(id) {
    var response = ajaxRequest(urlAPI+"/API/HotelsMenu/Find?id=" + id);
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