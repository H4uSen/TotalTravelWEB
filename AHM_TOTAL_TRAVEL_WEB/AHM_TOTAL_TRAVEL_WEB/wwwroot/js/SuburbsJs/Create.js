$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createSuburbs").click(() => {
    $("#modalCreate").modal({ autofocus: false, forceSelection: false }).modal('show');
    $("#Pais_ID").change(function () {
        var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Cities/List");
        if (response.code == 200) {
            var Count_ID = $('#Pais_ID').val();
            var cities = response.data;
            var cityFilter = jQuery.grep(cities, function (City, i) {
                return City.paisID == Count_ID;
            });
            ClearDropDownItem($('#Ciud_ID'));
            if (cityFilter.length > 0) {
                SetDropDownPlaceholder($('#Ciud_ID'), "Seleccione una ciudad.");
                for (var i = 0; i < cityFilter.length; i++) {
                    var item = cityFilter[i];
                    AddDropDownItem($('#Ciud_ID'), item = { value: item.id, text: item.ciudad });
                }
                $('#Ciud_ID').parent().find('.text').html('Seleccione una ciudad');
            } else {
                SetDropDownPlaceholder($('#Ciud_ID'), "No hay ciudades disponibles.");
            }
        }
    });
});

$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#send").click(() => {
    validar();
})

function validar() {

    validateArrayForm = [
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#modalCreate #Colonia") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#modalCreate #Ciud_ID") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#modalCreate #Pais_ID") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createSuburbsForm").submit();
    }
}