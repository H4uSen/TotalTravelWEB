var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();
$(document).ready(async function () {
    await GetImage();

});
async function GetImage() {
    var responseImage = ajaxRequest(urlAPI + "/API/RootFiles/GetAllImages?folderName=" + PackageFolder)
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
//FIN

$("#File").change(async function () {
    $("#DefaultPackageCarouselHeader").hide();

    const fileData = await convertImage($("#File").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArray.push(fileData);
    imagesArrayPure.push($("#File").prop("files")[0]);
    LoadImage();

});
function LoadImage() {

    var PartnersCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="DefaultPackageCarousel" data-auto="false"></div>`;
    $("#DefaultPackageCarousel").replaceWith(PartnersCarousel);
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
        $("#DefaultPackageCarousel").append(HTML_img);
    }
    $("#DefaultPackageCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

function updateDefaultPackages() {

    
    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Descripcion") },
        { validateMessage: "Ingrese un precio.", Jqueryinput: $("#Precio") },
        { validateMessage: "Ingrese una Duración.", Jqueryinput: $("#Duracion") },
        { validateMessage: "Seleccione un hotel.", Jqueryinput: $("#hote_ID") },
        { validateMessage: "Ingrese una cantidad de personas.", Jqueryinput: $("#CantPers") },

    ];

    validateArrayForm2 = [
        { validateMessage: "Seleccione un restaurante.", Jqueryinput: $("#rest_ID") },

    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);
    const ValidateFormStatus2 = ValidateForm(validateArrayForm2);

    if ($("#checkResta").prop("checked") == true) {
        if (ValidateFormStatus && ValidateFormStatus2) {
            var data = new FormData();
            data.append("Paqu_Nombre", $("#Nombre").val());
            data.append("Paqu_Descripcion", $("#Descripcion").val());
            data.append("Paqu_Duracion", $("#Duracion").val());
            data.append("Hote_ID", $("#hote_ID").val());
            data.append("Paqu_Precio", $("#Precio").val());
            data.append("Rest_ID", $("#rest_ID").val());
            data.append("Paqu_UsuarioModifica", parseInt(Client_User_ID));
            data.append("Paqu_CantPersonas", $("#CantPers").val());

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile(urlAPI+"/API/DefaultPackages/Update?id=" + PaqueteID, data, "PUT");
            if (response.data.codeStatus > 0) {
                window.location.href = '/DefaultPackages?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }
        }
    }
    else {
        if (ValidateFormStatus) {
            var data = new FormData();
            data.append("Paqu_Nombre", $("#Nombre").val());
            data.append("Paqu_Descripcion", $("#Descripcion").val());
            data.append("Paqu_Duracion", $("#Duracion").val());
            data.append("Hote_ID", $("#hote_ID").val());
            data.append("Paqu_Precio", $("#Precio").val());
            data.append("Paqu_UsuarioModifica", parseInt(Client_User_ID));
            data.append("Paqu_CantPersonas", $("#CantPers").val());

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile(urlAPI+"/API/DefaultPackages/Update?id=" + PaqueteID, data, "PUT");
            if (response.data.codeStatus > 0) {
                window.location.href = '/DefaultPackages?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }
        }
    }


}
