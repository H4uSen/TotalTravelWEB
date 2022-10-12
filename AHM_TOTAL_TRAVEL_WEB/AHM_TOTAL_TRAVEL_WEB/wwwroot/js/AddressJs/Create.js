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
                SetDropDownPlaceholder($('#City_ID'), "Seleccione una ciudad.");
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
});

$("#closeAddress").click(() => {
    $(".ui.modal").modal('hide');
});

$("#sendAddress").click(() => {

    if ($('#Colonia').val() == 0) {
        $("#labelvalidatorCol").html("Ingrese una colonia.");
    }
    else {
        $("#labelvalidatorCol").html(" ");
    }
    if ($('#Calle').val() == 0) {
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

    if ($('#Colonia').val() != 0 && $('#Calle').val() != 0 && $('#Avenida').val() != 0 && $('#Count_ID').val() != 0
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
