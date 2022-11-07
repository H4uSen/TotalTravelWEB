$("#form_content").parent().hide();
var CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
fillCities(Pais_ID);

//------------ EVENTS --------------------------

$("#btnCrear").click((_this) => {
    $("#form_content").attr("data-action-target", "create");
    $("#btnGuardar").prop("href", `javascript: crear()`);
    $(_this.target).hide();
    $("#Ciudad").val("");
    $("#form_content").parent().show();
});

$("#btnCancelar").click((_this) => {

    getDefault();
});

//------------ FUNCTIONS --------------------------

function fillCities(Pais_ID) {
    var cities = jQuery.grep(CitiesList.data, function (city, i) {
        return city.paisID == Pais_ID;
    });

    if (CitiesList.code == 200) {

        if (cities.length > 0) {

            $("#grdCiudades").empty();
            for (var i = 0; i < cities.length; i++) {

                const city = cities[i];
                const fechaCreacion = GetDateFormat({
                    string_date: city.fechaCrea, hour_format: 12, date_format: "default"
                });

                $("#grdCiudades").append(
                    `<tr id="ciudad_${city.id}">
                        <td class="ui fluid vertical menu" style="margin:unset">
                            <a class="item">
                                <h1 class="ui medium header" id="ciudad_header">Ciudad: ${city.ciudad}</h1>
                                <p>Creado el: ${fechaCreacion.datetime}</p>
                            </a>
                        </td>
                        <td style="text-align:end; vertical-align:middle">
                            <a class="item">
                                <a class="ui large icon btn-edit button" href="../../City/Update?City_ID=${city.id}">
                                    <i class="pencil alternate icon icon-crud"></i>
                                </a>
                                <a class="ui large icon btn-delete button" href="javascript: eliminar(${city.id})">
                                    <i class="trash alternate icon icon-crud"></i>
                                </a>
                            </a>
                        </td>
                    </tr>
                    `
                );
            }
        }
        else {
            $("#grdCiudades").append(
                `<tr>
                    <td class="ui fluid vertical menu" style="margin:unset">
                        <h5 class='ui large red header text-center'>NO SE ENCONTRARON CIUDADES</h5>
                    </td>
                </tr>`
            );
        }
    }

}

function crear() {
    validateArrayForm = [
        { validateMessage: "Este campo no puede estar vacio.", Jqueryinput: $("#Ciudad") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var city = CitiesViewModel;
        city.ciud_Descripcion = $("#Ciudad").val();
        city.pais_ID = parseInt(Pais_ID);

        var CitiesInsertStatus = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/Insert", city, "POST");

        if (CitiesInsertStatus.code == 200) {
            iziToastAlert(
                "!Registro creado con exito!", "", "success"
            );
            CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
            fillCities(Pais_ID);
            getDefault();
        }
    }
}

function editar(id_ciudad) {

    $("#form_content").attr("data-action-target", "update");
    var city = jQuery.grep(CitiesList.data, function (city, i) {
        return city.id == id_ciudad;
    });

    $("#Ciudad").val(city[0].ciudad);
    $("#form_content").parent().show();
    $(".dotted_button").hide();
    $("#btnGuardar").prop("href", `javascript: actualizar(${id_ciudad})`);

}

function actualizar(id_ciudad) {
    validateArrayForm = [
        { validateMessage: "Este campo no puede estar vacio.", Jqueryinput: $("#Ciudad") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var city = CitiesViewModel;
        city.ciud_Descripcion = $("#Ciudad").val();
        city.pais_ID = parseInt(Pais_ID);

        var CitiesInsertStatus = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/Update?id=" + id_ciudad, city, "PUT");

        if (CitiesInsertStatus.code == 200) {
            iziToastAlert(
                "!Registro actualizado con exito!", "", "success"
            );
            $("#Ciudad").val("");
            CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
            fillCities(Pais_ID);
        }

        $("#btnGuardar").prop("href", `javascript: crear()`);
        getDefault();
    }
}

function ActualizarPais() {
    validateArrayForm = [
        { validateMessage: "Ingresa el nombre del pais", Jqueryinput: $("#Pais_Descripcion") },
        { validateMessage: "Ingresa el codigo telefonico del pais", Jqueryinput: $("#Pais_Codigo") },
        { validateMessage: "Ingresa el nombre de la nacionalidad del pais", Jqueryinput: $("#Pais_Nacionalidad") },
        { validateMessage: "Ingresa la nomeclatura ISO del pais", Jqueryinput: $("#Pais_ISO") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createCountriesForm").submit();
    }
}

function getDefault() {

    $("#form_content").attr("data-action-target", "");
    $("#form_content").parent().hide();
    $(".dotted_button").show();
    $("#Ciudad").val("");
}

function eliminar(id) {
    const capsula1 = () => {
        var response = ajaxRequest(`https://totaltravelapi.azurewebsites.net/API/Cities/Delete?id=${id}&mod=${Client_User_ID}`, null, "Delete");
        if (response.data.codeStatus > 0) {
            iziToastAlert(
                "!Registro eliminado con exito!", "", "success"
            );
            CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
            fillCities(Pais_ID);
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};