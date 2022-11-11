var ciudadesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
var coloniasList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");

$('.ui.dropdown').dropdown();

$("#createTypesActivities").click(() => {
    $("#modalCreate").modal('show');
});

$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#send").click(() => {
    validar();
})

function validar() {

    validateArrayForm = [
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#modalCreate #TiAc_Descripcion") },

    ];
    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        $("#createTypesActivitiesForm").submit();
    }
}

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

function CreateActividad() {

    const ValidateArrayActivitiesFunction = [
        { validateMessage: "Seleccione una actividad", Jqueryinput: $("#Actv_ID") },
        { validateMessage: "Ingrese un precio", Jqueryinput: $("#AcEx_Precio") },
        { validateMessage: "Ingrese una descripción", Jqueryinput: $("#AcEx_Descripcion") },
        { validateMessage: "Seleccione un país", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad", Jqueryinput: $("#City_ID") },
        { validateMessage: "Seleccione una colonia", Jqueryinput: $("#Subu_ID") },
        { validateMessage: "Ingrese una calle", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenida", Jqueryinput: $("#Avenida") },
    ];

    const ActivitiesExtraCreateValidate = ValidateForm(ValidateArrayActivitiesFunction);

    if (ActivitiesExtraCreateValidate) {

        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Subu_ID').val());
        dire.dire_Calle = $('#Calle').val();
        dire.dire_Avenida = $('#Avenida').val();

        var responseDireccion = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Address/Insert", dire, "POST");
        var DirecID;
        if (responseDireccion.code == 200) {
            DirecID = responseDireccion.data.codeStatus;
            direStatus = true;
        }

        if (direStatus) {
            var data = new FormData();
            data.append("Part_ID", parseInt($("#Part_ID").val()));
            data.append("Actv_ID", parseInt($("#Actv_ID").val()));
            data.append("AcEx_Precio", $("#AcEx_Precio").val());
            data.append("AcEx_Descripcion", $("#AcEx_Descripcion").val());
            data.append("AcEx_UsuarioCreacion", parseInt(Client_User_ID));
            data.append("Dire_ID", parseInt(DirecID));

            if ($("#Imagen").prop("files")[0] != undefined) {
                data.append("file", $("#Imagen").prop("files")[0]);
            }
            else {
                data.append("file", null);
            }

            var response = uploadFile("https://totaltravelapi.azurewebsites.net/API/ActivitiesExtra/Insert", data, "POST");

            if (response.code == 200) {
                if (response.data.codeStatus > 0) {
                    window.location.href = '/ModulePartnersActivities?success=true';
                } else {
                    $("#labelvalidatorError").html("Ha ocurrido un error, inténtelo de nuevo.");
                }
            }
            else {
                console.log(response);
            }
        }
    }
}