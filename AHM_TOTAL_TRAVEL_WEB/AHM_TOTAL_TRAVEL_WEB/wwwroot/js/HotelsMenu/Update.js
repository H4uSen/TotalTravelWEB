var imagesArrayUpdate = [];
var imagesArrayPureUpdate = [];
$(document).ready(function () {
    $("#HoMe_ID").hide();
});
    var hotelsMenusFolder, idHotelsMenus, idHotel, hotelMenusUrl;

$("#closeEditHotelsMenu").click(() => {
    $("#modalUpdate").modal('hide');
});
$("#UpdateBottomHotelsMenu").click(() => {
    $("#modalUpdate").modal('show');
});


function editar(id) {
    var response = ajaxRequest(urlAPI + "/API/HotelsMenu/Find?id=" + id);

    if (response.code == 200) {
        $("#id").val(id);
        $("#Descripcion_up").val(response.data.menu);
        $("#Precio_up").val(response.data.precio);
        idHotelsMenus = response.data.id;
        idHotel = response.data.iD_Hotel;
        hotelsMenusFolder = "Hotels/Hotel-" + idHotel + "/Food/Hotel_Menu-" + idHotelsMenus;
        SetDropDownValue($("#tHoTe_ID_up"), defaultValue = response.data.iD_Hotel);
        SetDropDownValue($("#tTime_ID_up"), defaultValue = response.data.iD_TipoMenu);
        GetImageUpdate(response.data.image_Url);

        $("#modalUpdate").modal("show");
    }
}

$("#File-update").change(async function () {

    const fileDataUpdate = await convertImage($("#File-update").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArrayUpdate.push(fileDataUpdate);
    imagesArrayPureUpdate.push($("#File-update").prop("files")[0]);
    LoadImageUpdate();
});

async function GetImageUpdate(url) {
    imagesArrayUpdate = [];
    imagesArrayPureUpdate = [];
    var list = url;
    var file = await createBlob(list)
        .then(function (data) {
            return data;
        });
    imagesArrayPureUpdate.push(file);
    const fileData = await convertImage(file)
        .then(function (data) {
            return data;
        });
    fileData.fileName = "Hotel_Menu" + idHotelsMenus + "_photo-1.jpg";
    imagesArrayUpdate.push(fileData);
    LoadImageUpdate();

}
function LoadImageUpdate() {
    var MenusCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="MenusCarousel-update" data-auto="false"></div>`;
    $("#MenusCarousel-update").replaceWith(MenusCarousel);
    $("#image-upload-list-update").html("");

    for (let i = 0; i < imagesArrayUpdate.length; i++) {
        var HTML_img = document.createElement('img');
        const item = imagesArrayUpdate[i];

        HTML_img.src = item.src;
        const fileItem =
            `<div class="item">
                        <div class="right floated content">
                            <button onclick="deleteImageUpdate(${i})" class="ui btn-purple icon button">
                                <i class="trash icon"></i>
                            </button>
                        </div>
                        <i class="image big icon"></i>
                        <div class="content text-grap">
                            ${item.fileName}
                        </div>
                    </div>`;

        $("#image-upload-list-update").append(fileItem);
        $("#MenusCarousel-update").append(HTML_img);
    }
    $("#MenusCarousel-update").fotorama();
}

function deleteImageUpdate(index) {
    imagesArrayUpdate.splice(index, 1);
    imagesArrayPureUpdate.splice(index, 1);
    LoadImageUpdate();
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

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese la descripcion.", Jqueryinput: $("#modalUpdate #Descripcion_up") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#modalUpdate #Precio_up") },
        { validateMessage: "Ingrese el hotel.", Jqueryinput: $("#modalUpdate #tHoTe_ID_up") },
        { validateMessage: "Ingrese el menu.", Jqueryinput: $("#modalUpdate #tTime_ID_up") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    var id = $("#id").val();
    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("HoMe_Descripcion", $("#modalUpdate #Descripcion_up").val());
        data.append("HoMe_Precio", parseFloat($("#modalUpdate #Precio_up").val()));
        data.append("HoMe_UsuarioModifica", Client_User_ID);
        data.append("Hote_ID", parseInt($("#modalUpdate #tHoTe_ID_up").val()));
        data.append("Time_ID", parseInt($("#modalUpdate #tTime_ID_up").val()));
        for (var i = 0; i != imagesArrayPureUpdate.length; i++) {
            data.append("File", imagesArrayPureUpdate[i]);
        }
        var status = uploadFile(urlAPI + `/API/HotelsMenu/Update?id=${id}`, data, "PUT");
        if (status.code == 200) {
            location.reload();
            if (status.data.codeStatus > 0) {
                window.location.href = '/HotelsMenu?success=true';
            }
        }

    }

}