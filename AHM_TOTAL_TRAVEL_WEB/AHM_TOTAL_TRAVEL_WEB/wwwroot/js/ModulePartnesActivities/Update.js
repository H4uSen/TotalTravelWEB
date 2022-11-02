$(document).ready(function () {
    $("#Actv_ID").hide();
});
var imagesArray = [];
var imagesArrayPure = [];
$("#closeEditActivities").click(() => {
    $("#modalUpdate").modal('hide');
});
$("#UpdateBottomActivities").click(() => {
    $("#modalUpdate").modal('show');
});


$("#Calle").val(Calle);
$("#Avenida").val(Avenida);

SetDropDownValue($("#Part_ID"), partID);
SetDropDownValue($("#Count_ID"), countID);
GetCitiesUpdate(countID);
SetDropDownValue($("#Actv_IDUpdate"), ID_Actv);
SetDropDownValue($("#City_ID"), ciudID);
GetSuburbUpdate(ciudID);
SetDropDownValue($("#Subu_ID"), coloID);

//=====================Actividades Funciones=======================

function GetActivities(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Activities/Find?id=" + id);
    if (response.code == 200) {
        $('#Actv_ID').val(id);
        $('#ActividadUpdate').val(response.data.descripcion);
        SetDropDownValue($("#TiPoAc_IDUpdate"),response.data.iD_TiAc);


        if ($('#ActividadUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}

$("#sendEditActivities").click(() => {
    ValidarUpdate();
});

function ValidarUpdate() {

    const ValidateArrayActivitiesUpdate = [
        { validateMessage: "Ingrese una Actividad", Jqueryinput: $("#ActividadUpdate") },
        { validateMessage: "Seleccione el tipo de la Actividad", Jqueryinput: $("#TiPoAc_IDUpdate") }
    ];

    const ActivityValidateUpdate = ValidateForm(ValidateArrayActivitiesUpdate);

    if (ActivityValidateUpdate) {
        $("#updateActivitiesForm").submit();
    }
}

//==================Actividades Extras Funciones==================

function GetCitiesUpdate(paisID) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
    if (response.code == 200) {
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == paisID;
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
}

function GetSuburbUpdate(ciudID) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");
    if (response.code == 200) {

        var suburbs = response.data;
        var suburbsFilter = jQuery.grep(suburbs, function (Suburb, i) {
            return Suburb.ciudadID == ciudID;
        });
        ClearDropDownItem($('#Subu_ID'));
        if (suburbsFilter.length > 0) {
            AddDropDownItem($('#Subu_ID'), item = { value: "", text: "Seleccione una colonia." });
            for (var i = 0; i < suburbsFilter.length; i++) {
                var item = suburbsFilter[i];
                AddDropDownItem($('#Subu_ID'), item = { value: item.id, text: item.colonia });
            }
            $('#Subu_ID').parent().find('.text').html('Seleccione una colonia');
        } else {
            SetDropDownPlaceholder($('#Subu_ID'), "No hay colonias disponibles.");
        }
    }
}

$('#Count_ID').change(function () {
    GetCitiesUpdate($('#Count_ID').val());
    SetDropDownPlaceholder($('#Subu_ID'));
});
$('#City_ID').change(function () {
    GetSuburbUpdate($('#City_ID').val());
});

async function UpdateActivitiesExtras() {
    ValidateArrayActivitiesExtraUpdate = [
        { validateMessage: "Ingrese una descripcion", Jqueryinput: $("#AcEx_Descripcion") },
        { validateMessage: "Ingrese un precio", Jqueryinput: $("#AcEx_Precio") },
        { validateMessage: "Seleccione un Socio", Jqueryinput: $("#Part_ID") },
        { validateMessage: "Seleccione una Actividad", Jqueryinput: $("#Actv_IDUpdate") },
        { validateMessage: "Seleccione un País", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una Ciudad", Jqueryinput: $("#City_ID") },
        { validateMessage: "Seleccione una Colonia", Jqueryinput: $("#Subu_ID") },
        { validateMessage: "Ingrese una Calle", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una Avenida", Jqueryinput: $("#Avenida") },
    ];

    const ValFormActivities = ValidateForm(ValidateArrayActivitiesExtraUpdate);

    if (ValFormActivities) {
        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Subu_ID').val());
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
            data.append("Part_ID", parseInt($("#Part_ID").val()));
            data.append("Actv_ID", parseInt($("#Actv_IDUpdate").val()));
            data.append("AcEx_Precio", $("#AcEx_Precio").val());
            data.append("AcEx_Descripcion", $("#AcEx_Descripcion").val());
            data.append("AcEx_UsuarioModifica", parseInt(Client_User_ID));

            if ($("#Imagen").prop("files")[0] != undefined) {
                data.append("file", $("#Imagen").prop("files")[0]);
            }
            else {
                var imageUrl = $(`#actv_${ID_ActvExtra} #imagen`).prop("src");
                var file = await createBlob(imageUrl)
                    .then(function (data) {
                        return data;
                    });
                data.append("file", file);
            }
            var response = uploadFile("https://totaltravel.somee.com/API/ActivitiesExtra/Update?id=" + ID_ActvExtra, data, "PUT");
            console.log(response);
            if (response.data.codeStatus > 0) {
                window.location.href = '/ModulePartnersActivities?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }
    }
}