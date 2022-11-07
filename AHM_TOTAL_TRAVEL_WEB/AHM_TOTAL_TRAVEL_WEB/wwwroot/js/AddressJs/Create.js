$('.ui.dropdown').dropdown();

$("#createAddress").click(() => {
    $("#modalCreate").modal({ autofocus: false, forceSelection: false}).modal('show');
   

    $('#Count_ID').change(function () {

        SetDropDownPlaceholder($('#Col_ID'));
        var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
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


        var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
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


});

$("#closeAddress").click(() => {
    $(".ui.modal").modal('hide');
});

$("#sendAddress").click(() => {


    validateArrayForm = [
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#Col_ID") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_ID") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Col_ID').val());
        dire.dire_Calle = $('#Calle').val();
        dire.dire_Avenida = $('#Avenida').val();

        var responseAddress = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            window.location.href = '/Address';
        } 

    }

});

// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdAddress tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdAddress").paginationTdA({
        elemPerPage: 10
    });
});

$("#grdAddress").paginationTdA({
    elemPerPage: 10
});
