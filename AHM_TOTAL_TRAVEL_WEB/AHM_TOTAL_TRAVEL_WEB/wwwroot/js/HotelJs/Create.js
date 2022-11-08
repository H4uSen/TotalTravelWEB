
var ciudadesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
var coloniasList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");

var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();

$('#Count_ID').change(function () {

    if (ciudadesList.code == 200) {
        var Count_ID = $('#Count_ID').val();
        var cities = ciudadesList.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Count_ID;
        });
        const dropdownData = {
            dropdown: $("#City_ID"),
            items: {
                list: cities,
                valueData: "id",
                textData: "ciudad"
            },
            placeholder: {
                empty: "No se encontraron ciudades disponibles",
                default: "Seleccione una ciudad",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#City_ID").dropdown();

        $("#City_ID").change((_this) => {
            const City_Id = $(_this.target).val();
            RellenarColonias(City_Id);
        });
    }
});

function RellenarColonias(City_Id) {

    if (coloniasList.code == 200) {

        var colonias = coloniasList.data;
        colonias = jQuery.grep(colonias, function (colonia, i) {
            return colonia.ciudadID == City_Id;
        });

        const dropdownData = {
            dropdown: $("#Subu_ID"),
            items: {
                list: colonias,
                valueData: "id",
                textData: "colonia"
            },
            placeholder: {
                empty: "No se encontraron colonias disponibles",
                default: "Seleccione una colonia",
            },
            semantic: true
        }
        FillDropDown(dropdownData);
        $("#Subu_ID").dropdown();
    }
}

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

    var HotelCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="HotelCarousel" data-auto="false"></div>`;
    $("#HotelCarousel").replaceWith(HotelCarousel);
    $("#image-upload-list").html("");

    for (let i = 0; i < imagesArray.length; i++) {
        var HTML_img = document.createElement('img');
        const item = imagesArray[i];

        HTML_img.src = item.src;
        const fileItem =
            `<div class="item">
                  <div class="right floated content">
                       <button onclick="deleteImage(${i})" class="ui btn-edit icon button">
                           <i class="trash icon"></i>
                       </button>
                  </div>
                  <i class="image big icon"></i>
                  <div class="content text-grap">
                       ${item.fileName}
                  </div>
            </div>`;

        $("#image-upload-list").append(fileItem);
        $("#HotelCarousel").append(HTML_img);
    }
    $("#HotelCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

function createHotel() {

    validateArrayForm = [
        { validateMessage: "Seleccione una colonia.", Jqueryinput: $("#Subu_ID") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_ID") },
        { validateMessage: "Ingrese un hotel.", Jqueryinput: $("#Hote_Nombre") },
        { validateMessage: "Ingrese la descripción del hotel.", Jqueryinput: $("#Hote_Descripcion") },
        { validateMessage: "Seleccione un socio.", Jqueryinput: $("#Part_ID") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

            var direStatus = false;
            var dire = AdressViewModel;

            dire.colo_ID = parseInt($('#Subu_ID').val());
            dire.dire_Calle = $('#Calle').val();
            dire.dire_Avenida = $('#Avenida').val();

        var responseAddress = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Address/Insert", dire, "POST");
            var DireID;
            if (responseAddress.code == 200) {

                DireID = responseAddress.data.codeStatus;
                direStatus = true;
            }

        if (direStatus) {
                var nombre = $("#Hote_Nombre").val();
                var descripcion = $("#Hote_Descripcion").val();
                var partid = $("#Part_ID").val();

                var data = new FormData();
                data.append("dire_ID", parseInt(DireID));
                data.append("hote_Nombre", nombre);
                data.append("hote_Descripcion", descripcion);
                data.append("part_ID", parseInt(partid));
                data.append("hote_UsuarioCreacion", parseInt(Client_User_ID));
                if (imagesArrayPure.length > 0) {
                    for (var i = 0; i != imagesArrayPure.length; i++) {
                        data.append("File", imagesArrayPure[i]);
                    }
                }
                else {
                    data.append("File", null);
                }

                var response = uploadFile("https://totaltravelapi.azurewebsites.net/API/Hotels/Insert", data, "POST");
                if (response.data.codeStatus > 0) {
                    window.location.href = '/Hotel?update_success=true';
                } else {

                    $("#labelvalidatorError").html("Ha ocurrido un error, inténtelo de nuevo.");
                }

            } else {
                $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
            }
        }
    
}