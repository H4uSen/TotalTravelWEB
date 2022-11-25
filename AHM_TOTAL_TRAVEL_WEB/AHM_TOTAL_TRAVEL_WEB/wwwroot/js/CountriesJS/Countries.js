$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createCountries").click(() => {
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
        { validateMessage: "Ingresa el nombre del país", Jqueryinput: $("#modalCreate #Pais_Descripcion") },
        { validateMessage: "Ingresa el código telefónico del país", Jqueryinput: $("#modalCreate #Pais_Codigo") },
        { validateMessage: "Ingresa el nombre de la nacionalidad del país", Jqueryinput: $("#modalCreate #Pais_Nacionalidad") },
        { validateMessage: "Ingresa la nomeclatura ISO del país", Jqueryinput: $("#modalCreate #Pais_ISO") }
    ]
    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createCountriesForm").submit();
    }

}

function editar(CountriesID) {
    var response = ajaxRequest(urlAPI+"/API/Countries/Find?id=" + CountriesID);
    if (response.code == 200) {
        var item = response.data;


        $("#modalUpdate #Pais_ID").val(item.id);
        $("#modalUpdate #Pais_Descripcion").val(item.pais);
        $("#modalUpdate #Pais_Codigo").val(item.codigo);
        $("#modalUpdate #Pais_Nacionalidad").val(item.nacionalidad);
        $("#modalUpdate #Pais_ISO").val(item.iso);

        $("#modalUpdate").modal("show");

    }

}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingresar un país", Jqueryinput: $("#modalUpdate #Pais_Descripcion") },
        { validateMessage: "Ingresar una nacionalidad", Jqueryinput: $("#modalUpdate #Pais_Nacionalidad") },
        { validateMessage: "Ingresar un código", Jqueryinput: $("#modalUpdate #Pais_Codigo") },
        { validateMessage: "Ingresar un ISO", Jqueryinput: $("#modalUpdate #Pais_ISO") },

    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#updateCountriesForm").submit();
    }
}