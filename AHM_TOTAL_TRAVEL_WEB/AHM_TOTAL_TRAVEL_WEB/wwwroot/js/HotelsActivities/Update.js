var imagesArrayUpdate = [];
var imagesArrayPureUpdate = [];

$(document).ready(function () {
    $("#HoAc_ID").hide();
});
var hotelsActivitiesFolder, idHotelsActivities, idHotel, hotelMenusUrl;

$("#createHotelsActivities").click(() => {
    $("#modalCreate").modal('show');
});
$("#closeHotelsActivities").click(() => {
    $("#modalCreate").modal('hide');
});



function editar(id) {
    var response = ajaxRequest(urlAPI + "/API/HotelsActivities/Find?id=" + id);
    if (response.code == 200) {
        console.log(response.data);

        $("#id").val(id);
        $("#Descripcion_up").val(response.data.descripcion);
        $("#Precio_up").val(response.data.precio);
        idHotelsActivities = response.data.id;
        idHotel = response.data.iD_Hotel;
        hotelsActivitiesFolder = "Hotels/Hotel-" + idHotel + "/Activities/Hotel_Activity-" + idHotelsActivities;
        SetDropDownValue($("#tHoTe_ID_up"), defaultValue = response.data.iD_Hotel);
        SetDropDownValue($("#tActv_ID_up"), defaultValue = response.data.iD_Actividad);
        GetImageUpdate(response.data.image_URL);

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
    fileData.fileName = "Hotel_Activity" + idHotelsActivities + "_photo-1.jpg";
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


function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese la descripcion.", Jqueryinput: $("#modalUpdate #Descripcion_up") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#modalUpdate #Precio_up") },
        { validateMessage: "Ingrese el hotel.", Jqueryinput: $("#modalUpdate #tHoTe_ID_up") },
        { validateMessage: "Ingrese la actividad.", Jqueryinput: $("#modalUpdate #tActv_ID_up") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    var id = $("#id").val();
    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("HoAc_Descripcion", $("#modalUpdate #Descripcion_up").val());
        data.append("HoAc_Precio", parseFloat($("#modalUpdate #Precio_up").val()));
        data.append("HoAc_UsuarioModifica", Client_User_ID);
        data.append("HoTe_ID", parseInt($("#modalUpdate #tHoTe_ID_up").val()));
        data.append("Actv_ID", parseInt($("#modalUpdate #tActv_ID_up").val()));
        for (var i = 0; i != imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }
        var status = uploadFile(urlAPI + `/API/HotelsActivities/Update?id=${id}`, data, "PUT");
        if (status.code == 200) {
            location.reload();
            if (status.data.codeStatus > 0) {
                window.location.href = '/HotelsActivities?success=true';
            }
        }

    }

}