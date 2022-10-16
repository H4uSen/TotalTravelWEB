$('.ui.dropdown').dropdown();

$("#createAddress").click(() => {
    $(".ui.modal").modal('show');

    $('#Count_ID').change(function () {


        var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
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


        var response = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");
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

    if ($('#Col_ID').val() == 0 || $('#Col_ID').val() == null) {
        $("#labelvalidatorCol").html("Ingrese una colonia.");
    }
    else {
        $("#labelvalidatorCol").html(" ");
    }
    if ($('#Calle').val() == 0) {
        $('#Calle').parent().append(`<span class="labelvalidator" id="labelvalidatorCol"></span>`);
        $("#labelvalidatorCalle").html("Ingrese una calle.");
    }
    else {
        $("#labelvalidatorCalle").html(" ");
    }
    if ($('#Avenida').val() == 0) {
        $("#labelvalidatorAve").html("Ingrese una avenida.");
    }
    else {
        $("#labelvalidatorAve").html(" ");
    }
    if ($('#Count_ID').val() == 0) {
        $("#labelvalidatorPais").html("Seleccione un país.");
    } else {
        $("#labelvalidatorPais").html(" ");
    }
    if ($('#City_ID').val() == 0 || $('#City_ID').val() == null) {
        $("#labelvalidatorCity").html("Seleccione una ciudad.");
    } else {
        $("#labelvalidatorCity").html(" ");
    }

    if ($('#Col_ID').val() != 0 && $('#Col_ID').val() != null && $('#Calle').val() != 0 && $('#Avenida').val() != 0 && $('#Count_ID').val() != 0
        && $('#City_ID').val() != 0 && $('#City_ID').val() != null) {

        var direStatus = false;
        var fullAddress = `Colonia. ${$('#Colonia').val()}, Calle. ${$('#Calle').val()}, Avenida. ${$('#Avenida').val()}`;
        var dire = AdressViewModel;

        dire.Dire_Descripcion = fullAddress;
        dire.Ciud_ID = parseInt($("#City_ID").val());
        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            window.location.href = '/Address';
        } else {
            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
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
        elemPerPage: 5
    });
});

$("#grdAddress").paginationTdA({
    elemPerPage: 5
});
