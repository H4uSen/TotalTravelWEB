$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createCountries").click(() => {
    $("#modalCreate").modal('show');
});


$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});

$("#send").click(() => {
    validar();
})

function validar() {

    validateArrayForm = [
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#modalCreate #Pais_Descripcion") },
        { validateMessage: "Ingrese una nacionalidad.", Jqueryinput: $("#modalCreate #Pais_Nacionalidad") },
        { validateMessage: "Ingrese un código.", Jqueryinput: $("#modalCreate #Pais_Codigo") },
        { validateMessage: "Ingrese un ISO.", Jqueryinput: $("#modalCreate #Pais_ISO") },


    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createCountriesForm").submit();
    }

}

function editar(CountriesID) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Countries/Find?id=" + CountriesID);
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
        { validateMessage: "Ingresar una descripcion", Jqueryinput: $("#modalUpdate #Pais_Descripcion") },
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