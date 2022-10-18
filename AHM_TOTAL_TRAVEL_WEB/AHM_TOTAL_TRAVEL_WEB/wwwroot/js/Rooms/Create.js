$("#File").change(async function () {


    const fileData = await convertImage($("#File").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArray.push(fileData);
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
    $("#RestaurantCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    LoadImage();
}

function createRooms() {

    validateArrayForm = [
        { validateMessage: "Seleccione un hotel", Jqueryinput: $("#ID_Hote") },
        { validateMessage: "Ingrese la capacidad", Jqueryinput: $("#Capacidad") },
        { validateMessage: "Seleccione un habitacion", Jqueryinput: $("#Habitacion") },
        { validateMessage: "Ingrese el descripcion", Jqueryinput: $("#Descripcion") },
        { validateMessage: "Ingrese la categoria", Jqueryinput: $("#ID_Categoria") },
        { validateMessage: "Seleccione un precio", Jqueryinput: $("#Precio") },
        { validateMessage: "Ingrese el balcon", Jqueryinput: $("#Balcon") },
        { validateMessage: "Ingrese el wifi", Jqueryinput: $("#Wifi") },
        { validateMessage: "Ingrese las camas", Jqueryinput: $("#Camas") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Col_ID').val());
        dire.dire_Calle = $('#Calle').val();
        dire.dire_Avenida = $('#Avenida').val();

        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            DireID = responseAddress.data.codeStatus;
            direStatus = true;
        }

        if (direStatus) {
            var data = new FormData();
            data.append("dire_ID", parseInt(DireID));
            data.append("rest_Nombre", $("#Rest_Nombre").val());
            data.append("part_ID", parseInt($("#Part_ID").val()));
            data.append("rest_UsuarioCreacion", parseInt(Client_User_ID));

            for (let i = 0; i < imagesArray.length; i++) {
                data.append("File", imagesArray[i].src);
            }

            var response = uploadFile("https://totaltravel.somee.com/API/Rooms/Insert", data, "POST");
            if (response.data.codeStatus > 0) {
                window.location.href = '/Rooms?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos .");
        }
    }
}