﻿

$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createHotelsMenu").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeHotelsMenu").click(() => {
    $("#modalCreate").modal('hide');
});



function validar() {
    validateArrayForm = [
        { validateMessage: "Ingrese la descripcion.", Jqueryinput: $("#modalCreate #Descripcion") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#modalCreate #Precio") },
        { validateMessage: "Ingrese el hotel.", Jqueryinput: $("#modalCreate #tHoTe_ID") },
        { validateMessage: "Ingrese el menu.", Jqueryinput: $("#modalCreate #tTime_ID") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("HoMe_Descripcion", $("#modalCreate #Descripcion").val());
        data.append("HoMe_Precio", $("#modalCreate #Precio").val());
        data.append("HoMe_UsuarioCreacion", Client_User_ID);
        data.append("HoTe_ID", $("#modalCreate #tHoTe_ID").val());
        data.append("Time_ID", $("#modalCreate #tTime_ID").val());
        if ($("#modalCreate #file").prop("files")[0] != undefined) {
            data.append("File", $("#modalCreate #file").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }
        var status = uploadFile("https://apitotaltravel.azurewebsites.net/API/HotelsMenu/Insert", data,"POST");
        if (status.code == 200) {
            window.location.href = '/HotelsMenu?success=true';

        }
    }

}
function editar(id) {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/HotelsMenu/Find?id=" + id);
    if (response.code == 200) {
        $("#id").val(id);
        $("#Descripcion_up").val(response.data.menu);
        $("#Precio_up").val(response.data.precio);
        SetDropDownValue($("#tHoTe_ID_up"), defaultValue = response.data.iD_Hotel);
        SetDropDownValue($("#tTime_ID_up"), defaultValue = response.data.iD_TipoMenu);
        $("#modalUpdate").modal("show");
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
        data.append("HoMe_Precio",parseFloat( $("#modalUpdate #Precio_up").val()));
        data.append("HoMe_UsuarioModifica", Client_User_ID);
        data.append("HoTe_ID",parseInt( $("#modalUpdate #tHoTe_ID_up").val()));
        data.append("Time_ID",parseInt( $("#modalUpdate #tTime_ID_up").val()));
        if ($("#modalUpdate #file_up").prop("files")[0] != undefined) {
            data.append("File", $("#modalUpdate #file_up").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }
        var status = uploadFile(`https://apitotaltravel.azurewebsites.net/API/HotelsMenu/Update?id=${id}`, data, "PUT");
        if (status.code == 200) {
            location.reload();
            if (status.data.codeStatus > 0) {
                window.location.href = '/HotelsMenu?success=true';
            }
        }
        
    }

}

var imagesArray = [];
var imagesArrayPure = [];

$(document).ready(async function () {
    await GetImage();
});

async function GetImage() {
    var responseImage = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/RootFiles/GetAllImages?folderName=" + folderName)
    if (responseImage.code == 200) {
        var list = responseImage.data
        for (var i = 0; i < list.length; i++) {
            var imageUrl = list[i].imageUrl;

            var split = imageUrl.split("/");
            var fileName = split[split.length - 1];
            var file = await createBlob(imageUrl)
                .then(function (data) {
                    return data;
                });

            imagesArrayPure.push(file);
            const fileData = await convertImage(file)
                .then(function (data) {
                    return data;
                });

            fileData.fileName = fileName;
            imagesArray.push(fileData);
        }
        LoadImage();
    }
}

function LoadImage() {

    var HotelCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="HotelCarousel" data-auto="false"></div>`;
    $("#HotelCarousel").replaceWith(HotelCarousel);
    $("#image-upload-list").html("");

    for (let i = 0; i < imagesArray.length; i++) {
        var HTML_img = document.createElement('img');
        const item = imagesArray[i];

        HTML_img.src = item.src;
        //const fileItem =
        //    `<div class="item">
        //         <div class="right floated content">
        //              <button onclick="deleteImage(${i})" class="ui btn-edit icon button">
        //                  <i class="trash icon"></i>
        //              </button>
        //         </div>
        //         <i class="image big icon"></i>
        //         <div class="content text-grap">
        //              ${item.fileName}
        //         </div>
        //    </div>`;

        //$("#image-upload-list").append(fileItem);
        $("#HotelCarousel").append(HTML_img);
    }
    $("#HotelCarousel").fotorama();
}


