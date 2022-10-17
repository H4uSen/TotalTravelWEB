$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createSuburbs").click(() => {
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
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#modalCreate #Colonia") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#modalCreate #City_ID") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#modalCreate #Count_ID") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createSuburbsForm").submit();
    }
}

function editar(coloniaIDm) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/Find?id=" + coloniaIDm);
    if (response.code == 200) {
         var itemSubu = response.data;
            
         //SetDropDownValue($("#modalUpdate #Count_ID"), defaultValue = item.);
            
    }

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/Find?id=" + itemSubu.ciudadID);
    if (response.code == 200) {
        var itemcity = response.data;
        RellenarCiudades(itemcity.paisID, $("#modalUpdate #City_ID"));

        SetDropDownValue($("#modalUpdate #Count_ID"), defaultValue = itemcity.paisID);
        SetDropDownValue($("#modalUpdate #City_ID"), defaultValue = itemcity.id);
        $("#modalUpdate #Colonia").val(itemSubu.colonia);


        $("#modalUpdate").modal("show");
        console.log(itemcity);
    }
}

    function actualizar() {
        validateArrayForm = [
            { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#modalUpdate #Colonia") },
            { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#modalUpdate #City_ID") },
            //{ validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
        ];

        // retorna bool 
        const ValidateFormStatus = ValidateForm(validateArrayForm);

        if (ValidateFormStatus) {
            $("#updateSuburbsForm").submit();
        }
    }