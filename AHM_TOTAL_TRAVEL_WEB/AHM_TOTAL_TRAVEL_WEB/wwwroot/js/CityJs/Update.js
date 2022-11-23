$("#form_content").parent().hide();
$(".ui.dropdown").dropdown();
var suburbsList = ajaxRequest(urlAPI+"/API/Suburbs/List");
fillSuburbs(Ciudad_Id);

//------------ EVENTS --------------------------

$("#btnCrear").click((_this) => {
    $("#form_content").attr("data-action-target", "create");
    $("#btnGuardar").prop("href", `javascript: crear()`);
    $(_this.target).hide();
    $("#colonia").val("");
    $("#form_content").parent().show();
});

$("#btnCancelar").click((_this) => {

    getDefault();
});

//------------ FUNCTIONS --------------------------

function fillSuburbs(City_ID) {
    var suburbs = jQuery.grep(suburbsList.data, function (suburb, i) {
        return suburb.ciudadID == City_ID;
    });

    if (suburbsList.code == 200) {

        if (suburbs.length > 0) {

            $("#grdColonias").empty();
            for (var i = 0; i < suburbs.length; i++) {

                const suburb = suburbs[i];
                const fechaCreacion = GetDateFormat({
                    string_date: suburb.fecha_Creacion, hour_format: 12, date_format: "default"
                });

                $("#grdColonias").append(
                    `<tr id="ciudad_${suburb.id}">
                        <td class="ui fluid vertical menu" style="margin:unset">
                            <a class="item">
                                <h1 class="ui medium header" id="colonia_header">Colonia: ${suburb.colonia}</h1>
                                <p>Creado el: ${fechaCreacion.datetime}</p>
                            </a>
                        </td>
                        <td style="text-align:end; vertical-align:middle">
                            <a class="item">
                                <a class="ui large icon btn-edit button" href="javascript: editar(${suburb.id})">
                                    <i class="pencil alternate icon icon-crud"></i>
                                </a>
                                <a class="ui large icon btn-delete button" href="javascript: eliminar(${suburb.id})">
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
            $("#grdColonias").append(
                `<tr>
                    <td class="ui fluid vertical menu" style="margin:unset">
                        <h5 class='ui large red header text-center'>NO SE ENCONTRARON COLONIAS</h5>
                    </td>
                </tr>`
            );
        }
    }

}

function crear() {
    validateArrayForm = [
        { validateMessage: "Este campo no puede estar vacio.", Jqueryinput: $("#colonia") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var suburb = SuburbsViewModel;
        suburb.colo_Descripcion = $("#colonia").val();
        suburb.ciud_ID = parseInt(Ciudad_Id);

        var SuburbInsertStatus = ajaxRequest(urlAPI+"/API/Suburbs/Insert", suburb, "POST");

        if (SuburbInsertStatus.code == 200) {
            iziToastAlert(
                "!Registro creado con exito!", "", "success"
            );
            suburbsList = ajaxRequest(urlAPI+"/API/Suburbs/List");
            fillSuburbs(Ciudad_Id);
            getDefault();
        }
    }
}

function editar(id_colonia) {

    $("#form_content").attr("data-action-target", "update");
    var suburb = jQuery.grep(suburbsList.data, function (suburb, i) {
        return suburb.id == id_colonia;
    });

    $("#colonia").val(suburb[0].colonia);
    $("#form_content").parent().show();
    $(".dotted_button").hide();
    $("#btnGuardar").prop("href", `javascript: actualizar(${id_colonia})`);

}

function actualizar(id_ciudad) {
    validateArrayForm = [
        { validateMessage: "Este campo no puede estar vacio.", Jqueryinput: $("#colonia") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var suburb = SuburbsViewModel;
        SuburbsViewModel.colo_Descripcion = $("#colonia").val();
        SuburbsViewModel.ciud_ID = parseInt(Ciudad_Id);

        var suburbInsertStatus = ajaxRequest(urlAPI+"/API/Suburbs/Update?id=" + id_ciudad, suburb, "PUT");

        if (suburbInsertStatus.code == 200) {
            iziToastAlert(
                "!Registro actualizado con exito!", "", "success"
            );
            $("#colonia").val("");
            suburbsList = ajaxRequest(urlAPI+"/API/Suburbs/List");
            fillSuburbs(Ciudad_Id);
        }

        $("#btnGuardar").prop("href", `javascript: crear()`);
        getDefault();
    }
}

function ActualizarCiudad() {
    validateArrayForm = [
        { validateMessage: "Ingresa un nombre valido", Jqueryinput: $("#ciud_Descripcion") },
        { validateMessage: "Selecciona un pais", Jqueryinput: $("#pais_ID") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#UpdateCityForm").submit();
    }
}

function getDefault() {

    $("#form_content").attr("data-action-target", "");
    $("#form_content").parent().hide();
    $(".dotted_button").show();
    $("#colonia").val("");
}

function eliminar(id) {
    const capsula1 = () => {
        var response = ajaxRequest(urlAPI+`/API/Suburbs/Delete?id=${id}&mod=${Client_User_ID}`, null, "Delete");
        if (response.data.codeStatus > 0) {
            iziToastAlert(
                "!Registro eliminado con exito!", "", "success"
            );
            suburbsList = ajaxRequest(urlAPI+"/API/Suburbs/List");
            fillSuburbs(Ciudad_Id);
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};
