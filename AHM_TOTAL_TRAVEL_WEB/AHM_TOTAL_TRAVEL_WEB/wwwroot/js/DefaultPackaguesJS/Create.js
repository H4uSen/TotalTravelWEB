$('.ui.dropdown').dropdown();
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

    var DefaultPackageCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="DefaultPackageCarousel" data-auto="false"></div>`;
    $("#DefaultPackageCarousel").replaceWith(DefaultPackageCarousel);
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

function createDefaultPackages() {

    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Descripcion") },
        { validateMessage: "Ingrese un precio.", Jqueryinput: $("#Precio") },
        { validateMessage: "Ingrese una Duración.", Jqueryinput: $("#Duracion") },
        { validateMessage: "Seleccione un hotel.", Jqueryinput: $("#hote_ID") },
        
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
            data.append("Paqu_UsuarioCreacion", parseInt(Client_User_ID));

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile("https://totaltravelapi.azurewebsites.net/API/DefaultPackages/Insert", data, "POST");
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
            data.append("Paqu_UsuarioCreacion", parseInt(Client_User_ID));

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile("https://totaltravelapi.azurewebsites.net/API/DefaultPackages/Insert", data, "POST");
            if (response.data.codeStatus > 0) {
                window.location.href = '/DefaultPackages?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }
        }
    }
    

}
