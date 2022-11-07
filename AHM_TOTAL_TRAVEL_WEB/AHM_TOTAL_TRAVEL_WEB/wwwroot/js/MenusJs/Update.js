var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();

SetDropDownValue($("#Rest_ID"), restauranteID);
SetDropDownValue($("#Time_ID"), tipoMenuID);

$(document).ready(async function () {
    await GetImage();

});
//FUNCIONES QUE SON ESPECIFICAS DEL ACTUALIZAR


async function GetImage() {

    var responseImage = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RootFiles/GetAllImages?folderName=" + menuFolder)
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

function updateMenus() {


    validateArrayForm = [
        { validateMessage: "Ingrese el nombre del menú.", Jqueryinput: $("#Menu_Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Menu_Descripcion") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#Menu_Precio") },
        { validateMessage: "Seleccione un restaurante.", Jqueryinput: $("#Rest_ID") },
        { validateMessage: "Seleccione una tipo menú.", Jqueryinput: $("#Time_ID") }
    ];

    // retorna bool
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("Time_ID", $("#Time_ID").val());
        data.append("Menu_Descripcion", $("#Menu_Descripcion").val());
        data.append("Menu_Nombre", $("#Menu_Nombre").val());
        data.append("Menu_Precio", $("#Menu_Precio").val());
        data.append("Rest_ID", $("#Rest_ID").val());
        data.append("Menu_UsuarioModifica", parseInt(Client_User_ID));

        for (let i = 0; i < imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }
        var response = uploadFile("https://totaltravel.somee.com/API/Menus/Update?id=" + menuID, data, "PUT");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Menus?success=true';
        }

    }
}
