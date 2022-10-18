﻿$("#errorDiv").hide();
var imagesArray = [];

$(".ui.dropdown").dropdown();

SetDropDownValue($("#Count_ID"), Pais_ID);
RellenarCiudades(Pais_ID);
SetDropDownValue($("#City_ID"), Ciudad);
SetDropDownValue($("#Part_ID"), Part_ID);

$('#Count_ID').change(function () {
    RellenarCiudades($('#Count_ID').val());
})

//$(document).ready(async function () {
//    await GetImage();

//});

//async function GetImage() {
//    var responseImage = ajaxRequest("https://totaltravel.somee.com/API/RootFiles/GetAllImages?folderName=" + folderName)
//    if (responseImage.code == 200) {
//        var list = responseImage.data
//        for (var i = 0; i < list.length; i++) {
//            var imageUrl = list[i].imageUrl;
//            var split = imageUrl.split("/");
//            var fileName = split[split.length - 1];
//            var file = await createBlob(imageUrl)
//                .then(function (data) {
//                    return data;
//                });
//            const fileData = await convertImage(file)
//                .then(function (data) {
//                    return data;
//                });
//            fileData.fileName = fileName;
//            imagesArray.push(fileData);
//        }
//        LoadImage();
//    }
//}

function RellenarCiudades(Country_Id) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");

    if (response.code == 200) {

        var cities = response.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Country_Id;
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

        //$("#City_ID").change((_this) => {
        //    const City_Id = $(_this.target).val();
        //    FillSuburbs(City_Id);
        //});
    }
}


$("#File").change(async function () {

    const fileData = await convertImage($("#File").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArray.push(fileData);
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
        $("#HotelCarousel").append(HTML_img);
    }
    $("#HotelCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    LoadImage();
}


function updateHotel() {

    validateArrayForm = [
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#Colonia") },
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

        var coloStatus = false;
        var colo = SuburbsViewModel;

        colo.colo_Descripcion = ($("#Colonia").val());
        colo.ciud_ID = parseInt($("#City_ID").val());
        var responseSuburb = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/Insert", colo, "POST");
        var ColoID;
        if (responseSuburb.code == 200) {
            ColoID = responseSuburb.data.codeStatus;
            coloStatus = true;
        }
        else {
            console.log(responseSuburb)
        }

        if (coloStatus) {
            var direStatus = false;
            var dire = AdressViewModel;

            dire.colo_ID = parseInt(ColoID);
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
                data.append("hote_Nombre", $("#Hote_Nombre").val());
                data.append("hote_Descripcion", $("#Hote_Descripcion").val());
                data.append("part_ID", parseInt($("#Part_ID").val()));
                data.append("hote_UsuarioModifica", parseInt(Client_User_ID));

                for (let i = 0; i < imagesArray.length; i++) {
                    data.append("File", imagesArray[i].src);
                }

                var response = uploadFile("https://totaltravel.somee.com/API/Hotels/Update?id=" + Hote_ID, data, "PUT");
                if (response.data.codeStatus > 0) {
                    window.location.href = '/Hotel?success=true';
                } else {

                    $("#labelvalidatorError").html("Ha ocurrido un error, inténtelo de nuevo.");
                }

            } else {
                $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
            }
        }
    }
}