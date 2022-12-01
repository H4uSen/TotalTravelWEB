var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();
var send = false;
const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}





/*SetDropDownValue($("#Hote_ID"), HotelID);*/
/*SetDropDownValue($("#CaHa_ID"), CaHaID);*/

/*SetDropDownValue($("#Hote_ID"), HoteID);*/
var hotelsRoomsFolder, RoomsFolder, idHotel, hotelMenusUrl;

$(document).ready(async function () {
    await GetImageUpdate();

});
//FUNCIONES QUE SON ESPECIFICAS DEL ACTUALIZAR

function editar(id) {
    var response = ajaxRequest(urlAPI + "/API/Rooms/Find?id=" + id);

    if (response.code == 200) {
        console.log(response.data);
        $("#id").val(id);
        $("#Habi_Nombre").val(response.data.habitacion);
        $("#CaHa_ID").val(response.data.categoriaHabitacionID);
        $("#Habi_capacidad").val(response.data.capacidad);
        $("#Habi_camas").val(response.data.camas);
        $("#Habi_Precio").val(response.data.precio);
        $("#Habi_Descripcion").val(response.data.descripcion);
  
        RoomsFolder = response.data.id;
        idHotel = response.data.iD_Hotel;
        SetDropDownValue($("#Hote_ID"), defaultValue = response.data.hotelID);
        SetDropDownValue($("#CaHa_ID"), defaultValue = response.data.categoriaHabitacionID);
        GetImageUpdate(response.data.imageUrl);

        $("#modalUpdate").modal("show");
    }
}

$("#File").change(async function () {

        const fileData = await convertImage($("#File-update").prop("files")[0])
            .then(function (data) {
                return data;
            });
        imagesArray.push(fileData);
        imagesArrayPure.push($("#File-update").prop("files")[0]);
    LoadImageUpdate();

});

async function GetImageUpdate() {
    var responseImage = ajaxRequest(urlAPI + "/API/RootFiles/GetAllImages?folderName=" + RoomsFolder)
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
        LoadImageUpdate();
    }

//FIN

function LoadImageUpdate() {

    var RoomsCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="RoomsCarousel" data-auto="false"></div>`;
    $("#RoomsCarousel").replaceWith(RoomsCarousel);
    $("#image-upload-list-update").html("");

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

        $("#image-upload-list-update").append(fileItem);
        $("#RoomsCarousel").append(HTML_img);
    }
    $("#RoomsCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImageUpdate();
}


    function updateRooms() {


        validateArrayForm = [
            { validateMessage: "Ingrese una habitación", Jqueryinput: $("#Habi_Nombre") },
            { validateMessage: "Ingrese un hotel", Jqueryinput: $("#Hote_ID") },
            { validateMessage: "Ingrese la capacidad", Jqueryinput: $("#Habi_capacidad") },
            { validateMessage: "Ingrese una descripción", Jqueryinput: $("#Habi_Descripcion") },
            { validateMessage: "Ingrese la categoría", Jqueryinput: $("#CaHa_ID") },
            { validateMessage: "Ingrese un precio", Jqueryinput: $("#Habi_Precio") },
            { validateMessage: "Ingrese las camas", Jqueryinput: $("#Habi_camas") }
        ];

    // retorna bool
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    
        if (ValidateFormStatus) {
            var data = new FormData();
            data.append("Hote_ID", $("#Hote_ID").val());

            data.append("Habi_Descripcion", $("#Habi_Descripcion").val());

            data.append("Habi_Nombre", $("#Habi_Nombre").val());

            data.append("CaHa_ID", parseInt($("#CaHa_ID").val()));

            data.append("Habi_Precio", $("#Habi_Precio").val());

            data.append("Habi_balcon", $("#Habi_balcon").prop("checked") == true ? 1 : 0);

            data.append("Habi_wifi", $("#Habi_wifi").prop("checked") == true ? 1 : 0);

            data.append("Habi_camas", $("#Habi_camas").val());

            data.append("Habi_capacidad", $("#Habi_capacidad").val());

            data.append("Habi_UsuarioModifica", Client_User_ID);

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }
            var response = uploadFile(urlAPI +"/API/Rooms/Update?id=" + roomsID, data, "PUT");
            if (response.data.codeStatus > 0) {
                window.location.href = '/Rooms?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        }
        else { console.log("error") }
      
        //if (ReservacionActividadValidate) {

        //    $("#Habi_wifi").val(false);

        //    if ($("#Habi_wifi").prop('checked')) {

        //        $("#Habi_wifi").val(true);
        //    }
        //    $('#updateRooms').submit()


        //}

        //if (ReservacionActividadValidate) {

        //    $("#Habi_balcon").val(false);

        //    if ($("#Habi_balcon").prop('checked')) {

        //        $("#Habi_balcon").val(true);
        //    }
        //    $('#updateRooms').submit()


        //}

        }



