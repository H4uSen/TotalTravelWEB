$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$('#modalUpdate #Count_ID').change(function () {
    RellenarCiudades($('#Count_ID').val());
})

$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});

$("#updateSuburbs").click(() => {
    $("#modalUpdate").modal('show');
    $('#Count_ID').change(function () {
        RellenarCiudades($('#Count_ID').val());
    })

});

function editar(coloniaIDm) {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/Find?id=" + coloniaIDm);
    if (response.code == 200) {
        var itemSubu = response.data;

        //SetDropDownValue($("#modalUpdate #Count_ID"), defaultValue = item.);

    }

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/Find?id=" + itemSubu.ciudadID);
    if (response.code == 200) {
        var itemcity = response.data;
        RellenarCiudades(itemcity.paisID, $("#modalUpdate #City_ID"));

        $("#modalUpdate #Colo_ID").val(coloniaIDm);
        SetDropDownValue($("#modalUpdate #Count_ID"), defaultValue = itemcity.paisID);
        SetDropDownValue($("#modalUpdate #City_ID"), defaultValue = itemcity.id);
        $("#modalUpdate #Colonia").val(itemSubu.colonia);


        $("#modalUpdate").modal("show");
        //console.log(itemcity);
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

function RellenarCiudades(Country_Id) {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");

    if (response.code == 200) {

        var cities = response.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Country_Id;
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

        //$("#City_ID").change((_this) => {
        //    const City_Id = $(_this.target).val();
        //    FillSuburbs(City_Id);
        //});
    }
}