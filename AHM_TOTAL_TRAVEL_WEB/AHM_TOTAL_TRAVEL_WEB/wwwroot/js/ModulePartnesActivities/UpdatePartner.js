const params = new URLSearchParams(window.location.search);

var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();
$(document).ready(async function () {
    await GetImage();

});
async function GetImage() {
    var responseImage = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RootFiles/GetAllImages?folderName=" + folderName)
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
    $("#PartnersCarouselHeader").hide();

    const fileData = await convertImage($("#File").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArray.push(fileData);
    imagesArrayPure.push($("#File").prop("files")[0]);
    LoadImage();

});
function LoadImage() {

    var PartnersCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="PartnersCarousel" data-auto="false"></div>`;
    $("#PartnersCarousel").replaceWith(PartnersCarousel);
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
        $("#PartnersCarousel").append(HTML_img);
    }
    $("#PartnersCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

function updatePartners() {

    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese un Email.", Jqueryinput: $("#Email") },
        { validateMessage: "Ingrese un teléfomo.", Jqueryinput: $("#Telefono") },
        { validateMessage: "Seleccione un tipo de partner.", Jqueryinput: $("#TiPart_Id") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("part_Nombre", $("#Nombre").val());
        data.append("part_Email", $("#Email").val());
        data.append("part_Telefono", $("#Telefono").val());
        data.append("tiPart_Id", parseInt($("#TiPart_Id").val()));
        data.append("part_UsuarioModifica", parseInt(Client_User_ID));
        for (let i = 0; i < imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }
        if ($("#File").prop("files")[0] == undefined) {
            data.append("File", null);
        }

        var response = uploadFile("https://totaltravelapi.azurewebsites.net/API/Partners/Update?id=" + partnersID, data, "PUT");

        if (response.data.codeStatus > 0) {
            window.location.href = '/ModulePartnersActivities/Info?success=true';
        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }
    }
}