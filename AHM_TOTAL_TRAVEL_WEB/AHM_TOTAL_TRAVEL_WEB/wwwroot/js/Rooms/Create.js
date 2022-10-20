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

    var RoomsCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="RoomsCarousel" data-auto="false"></div>`;
    $("#RoomsCarousel").replaceWith(RoomsCarousel);
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
        $("#RoomsCarousel").append(HTML_img);
    }
    $("#RoomsCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

function createRooms() {

    validateArrayForm = [
        { validateMessage: "Seleccione una habitacion", Jqueryinput: $("#Habi_Nombre") },
        { validateMessage: "Seleccione un hotel", Jqueryinput: $("#Hote_ID") },
        { validateMessage: "Ingrese la capacidad", Jqueryinput: $("#Habi_capacidad") },
        { validateMessage: "Ingrese el descripcion", Jqueryinput: $("#Habi_Descripcion") },
        { validateMessage: "Ingrese la categoria", Jqueryinput: $("#CaHa_ID") },
        { validateMessage: "Seleccione un precio", Jqueryinput: $("#Habi_Precio") },
        { validateMessage: "Ingrese el balcon", Jqueryinput: $("#Habi_balcon") },
        { validateMessage: "Ingrese el wifi", Jqueryinput: $("#Habi_wifi") },
        { validateMessage: "Ingrese las camas", Jqueryinput: $("#Habi_camas") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {



        var data = new FormData();
        data.append("Hotel", $("#Hotel").val());
        data.append("Habi_Descripcion", $("#Habi_Descripcion").val());
        data.append("Habi_Nombre", $("#Habi_Nombre").val());
        data.append("CaHa_ID", parseInt($("#CaHa_ID").val()));
        data.append("Habi_Precio", $("#Habi_Precio").val());
        data.append("Habi_balcon", $("#Habi_balcon").val());
        data.append("Habi_wifi", $("#Habi_wifi").val());
        data.append("Habi_camas", $("#Habi_camas").val());
        data.append("Habi_capacidad", $("#Habi_capacidad").val());
        data.append("Habi_UsuarioCreacion", Client_User_ID);

        for (var i = 0; i != imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }
        var response = uploadFile("https://totaltravel.somee.com/API/Rooms/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Rooms?success=true';
        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }

    }
    else { console.log("error") }
}
