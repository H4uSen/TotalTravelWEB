const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}

var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();

$('#Count_ID').change(function () {

    var response = ajaxRequest(urlAPI +"/API/Cities/List");
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
        } else {
            SetDropDownPlaceholder($('#City_ID'), "No hay ciudades disponibles.");
        }
    }

});

$('#City_ID').change(function () {


    var response = ajaxRequest(urlAPI +"/API/Suburbs/List");
    if (response.code == 200) {

        var City_ID = $('#City_ID').val();
        var suburbs = response.data;
        var suburbsFilter = jQuery.grep(suburbs, function (Suburb, i) {
            return Suburb.ciudadID == City_ID;
        });
        ClearDropDownItem($('#Col_ID'));
        if (suburbsFilter.length > 0) {
            AddDropDownItem($('#Col_ID'), item = { value: "", text: "Seleccione una colonia." });
            for (var i = 0; i < suburbsFilter.length; i++) {
                var item = suburbsFilter[i];
                AddDropDownItem($('#Col_ID'), item = { value: item.id, text: item.colonia });
            }
            $('#Col_ID').parent().find('.text').html('Seleccione una colonia');
        } else {
            SetDropDownPlaceholder($('#Col_ID'), "No hay colonias disponibles.");
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

    var RestaurantCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="RestaurantCarousel" data-auto="false"></div>`;
    $("#RestaurantCarousel").replaceWith(RestaurantCarousel);
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
        $("#RestaurantCarousel").append(HTML_img);
    }
    $("#RestaurantCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}



function createRestaurant() {

    validateArrayForm = [
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#Col_ID") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_ID") },
        { validateMessage: "Ingrese un restaurante.", Jqueryinput: $("#Rest_Nombre") },
        { validateMessage: "Seleccione una socio.", Jqueryinput: $("#Part_ID") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);



    if (ValidateFormStatus) {

        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Col_ID').val());
        dire.dire_Calle = $('#Calle').val();
        dire.dire_Avenida = $('#Avenida').val();

        var responseAddress = ajaxRequest(urlAPI +"/API/Address/Insert", dire, "POST");
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

            //for (let i = 0; i < imagesArray.length; i++) {
            //    data.append("File", imagesArray[i].src);
            //    console.log(JSON.stringify(imagesArray[i]));
            //}
           
            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile(urlAPI +"/API/Restaurants/Insert", data, "POST");
            if (response.data.codeStatus > 0) {
                window.location.href = '/Restaurant?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }
    }
}