const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");
if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}
$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createActivities").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeActivity").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendActivity").click(() => {
    validar();
})

var imagesArray = [];
var imagesArrayPure = [];

function validar() {

    const ValidateArrayActivities = [
        { validateMessage: "Ingrese una Actividad", Jqueryinput: $("#Actividad") },
        { validateMessage: "Seleccione el tipo de la Actividad", Jqueryinput: $("#TiPoAc_ID") }
    ];

    const ActivityValidate = ValidateForm(ValidateArrayActivities);

    if (ActivityValidate) {
        $("#createActivitiesForm").submit();
        window.location.href = '/Activities?success=true';
    }

}

$("#btnGuardarActvExtra").click(() => {
    CreateActivityExtra();
})

$('#Count_ID').change(function () {

    var response = ajaxRequest(urlAPI + "/API/Cities/List");
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


    var response = ajaxRequest(urlAPI + "/API/Suburbs/List");
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

    var ActivityExtraCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="ActivityExtraCarousel" data-auto="false"></div>`;
    $("#ActivityExtraCarousel").replaceWith(ActivityExtraCarousel);
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
        $("#ActivityExtraCarousel").append(HTML_img);
    }
    $("#ActivityExtraCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}


function CreateActivityExtra() {

    const ValidateArrayActivitiesFunction = [
        { validateMessage: "Seleccione un Socio", Jqueryinput: $("#Part_ID") },
        { validateMessage: "Seleccione una Actividad", Jqueryinput: $("#Actv_ID") },
        { validateMessage: "Ingrese un Precio", Jqueryinput: $("#acEx_Precio") },
        { validateMessage: "Ingrese una Descripcion", Jqueryinput: $("#acEx_Descripcion") },
    ];

    const ActivitiesExtraCreateValidate = ValidateForm(ValidateArrayActivitiesFunction);

    if (ActivitiesExtraCreateValidate) {

        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Col_ID').val());
        dire.dire_Calle = $('#Calle').val();
        dire.dire_Avenida = $('#Avenida').val();

        var responseDireccion = ajaxRequest(urlAPI+"/API/Address/Insert", dire, "POST");
        var DirecID;
        if (responseDireccion.code == 200) {
            DirecID = responseDireccion.data.codeStatus;
            direStatus = true;
        }

        if (direStatus) {
            var data = new FormData();
            data.append("Part_ID", parseInt($("#Part_ID").val()));
            data.append("Actv_ID", parseInt($("#Actv_ID").val()));
            data.append("AcEx_Precio", $("#acEx_Precio").val());
            data.append("AcEx_Descripcion", $("#acEx_Descripcion").val());
            data.append("AcEx_UsuarioCreacion", parseInt(Client_User_ID));
            data.append("Dire_ID", parseInt(DirecID));

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }
            var response = uploadFile(urlAPI+"/API/ActivitiesExtra/Insert", data, "POST");

            if (response.code == 200) {
                if (response.data.codeStatus > 0) {
                    window.location.href = '/ActivitiesExtra?success=true';


                } else {

                    $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
                }
            
            }
            else {
                console.log(response);
            }

        }
        
    }
}
