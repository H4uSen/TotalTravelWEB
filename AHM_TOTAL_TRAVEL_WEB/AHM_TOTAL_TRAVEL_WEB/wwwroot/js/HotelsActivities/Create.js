var imagesArray = [];
var imagesArrayPure = [];


$("#File").change(async function () {

    const fileData = await convertImage($("#File").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArray.push(fileData);
    imagesArrayPure.push($("#File").prop("files")[0]);
    LoadImage();

});
function LoadImage() {
    var MenusCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="MenusCarousel" data-auto="false"></div>`;
    $("#MenusCarousel").replaceWith(MenusCarousel);
    $("#image-upload-list").html("");

    for (let i = 0; i < imagesArray.length; i++) {
        var HTML_img = document.createElement('img');
        const item = imagesArray[i];

        HTML_img.src = item.src;
        const fileItem =
            `<div class="item">
                        <div class="right floated content">
                            <button onclick="deleteImage(${i})" class="ui btn-purple icon button">
                                <i class="trash icon"></i>
                            </button>
                        </div>
                        <i class="image big icon"></i>
                        <div class="content text-grap">
                            ${item.fileName}
                        </div>
                    </div>`;

        $("#image-upload-list").append(fileItem);
        $("#MenusCarousel").append(HTML_img);
    }
    $("#MenusCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createHotelsActivities").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeHotelsActivities").click(() => {
    $("#modalCreate").modal('hide');
});



function validar() {
    validateArrayForm = [
        { validateMessage: "Ingrese una descripcion.", Jqueryinput: $("#modalCreate #Descripcion") },
        { validateMessage: "Ingrese un precio.", Jqueryinput: $("#modalCreate #Precio") },
        { validateMessage: "Ingrese un hotel.", Jqueryinput: $("#modalCreate #tHoTe_ID") },
        { validateMessage: "Ingrese una actividad.", Jqueryinput: $("#modalCreate #tActv_ID") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("HoAc_Descripcion", $("#modalCreate #Descripcion").val());
        data.append("HoAc_Precio", $("#modalCreate #Precio").val());
        data.append("HoAc_UsuarioCreacion", Client_User_ID);
        data.append("HoTe_ID", $("#modalCreate #tHoTe_ID").val());
        data.append("Actv_ID", $("#modalCreate #tActv_ID").val());
        for (var i = 0; i != imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }
        var status = uploadFile(urlAPI+"/API/HotelsActivities/Insert", data,"POST");
        if (status.code == 200) {
            window.location.href = '/HotelsActivities?success=true';
        }
    }

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