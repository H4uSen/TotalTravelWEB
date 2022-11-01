var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();
/*SetDropDownValue($("#Hote_ID"), HotelID);*/
/*SetDropDownValue($("#CaHa_ID"), CaHaID);*/

/*SetDropDownValue($("#Hote_ID"), HoteID);*/


$(document).ready(async function () {
    await GetImage();

});
//FUNCIONES QUE SON ESPECIFICAS DEL ACTUALIZAR


async function GetImage() {

    var responseImage = ajaxRequest("https://totaltravel.somee.com/API/RootFiles/GetAllImages?folderName=" + RoomsFolder)
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

    function updateRooms() {


        validateArrayForm = [
            { validateMessage: "Seleccione una habitacion", Jqueryinput: $("#Habi_Nombre") },
            { validateMessage: "Seleccione un hotel", Jqueryinput: $("#Hote_ID") },
            { validateMessage: "Ingrese la capacidad", Jqueryinput: $("#Habi_capacidad") },
            { validateMessage: "Ingrese una descripcion", Jqueryinput: $("#Habi_Descripcion") },
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
        data.append("Hote_ID", $("#Hote_ID").val());

        data.append("Habi_Descripcion", $("#Habi_Descripcion").val());

        data.append("Habi_Nombre", $("#Habi_Nombre").val());

        data.append("CaHa_ID", parseInt($("#CaHa_ID").val()));

        data.append("Habi_Precio", $("#Habi_Precio").val());

        data.append("Habi_balcon", $("#Habi_balcon").prop("checked") == true ? 1 : 0);

        data.append("Habi_wifi", $("#Habi_wifi").prop("checked") == true ? 1 : 0);

        data.append("Habi_camas", $("#Habi_camas").val());

        data.append("Habi_capacidad", $("#Habi_capacidad").val());

        data.append("Habi_UsuarioModifica", parseInt(Client_User_ID));
        for (var i = 0; i != imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }


        var response = uploadFile("https://totaltravel.somee.com/API/Rooms/Update?id=" + roomsID, data, "PUT");

                if (response.data.codeStatus > 0) {
        window.location.href = '/Rooms?success=true';
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



