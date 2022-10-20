var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();

$('#Count_ID').change(function () {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
    if (response.code == 200) {
        var Count_ID = $('#Count_ID').val();
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == Count_ID;
        });
        ClearDropDownItem($('#City_ID'));
        if (cityFilter.length > 0) {
            AddDropDownItem($('#City_ID'), item = { value: "", text: "Seleccione una ciudad." });
            for (var i = 0; i < cityFilter.length; i++) {
                var item = cityFilter[i];
                AddDropDownItem($('#City_ID'), item = { value: item.id, text: item.ciudad });
            }
            $('#City_ID').parent().find('.text').html('Seleccione una ciudad');
        }
        else {
            SetDropDownPlaceholder($('#City_ID'), "No hay ciudades disponibles.");
        }
    }
});

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
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

function createHotel() {

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
                data.append("hote_UsuarioCreacion", parseInt(Client_User_ID));

                for (var i = 0; i != imagesArrayPure.length; i++) {
                    data.append("File", imagesArrayPure[i]);
                }

                var response = uploadFile("https://totaltravel.somee.com/API/Hotels/Insert", data, "POST");
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