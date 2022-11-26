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



function createMenus() {


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
        data.append("Menu_UsuarioCreacion", UserID);

        for (var i = 0; i != imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }
        var response = uploadFile(urlAPI+"/API/Menus/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Menus?success-c=true';
        } 

    }
   
}

