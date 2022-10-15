
$('.ui.dropdown').dropdown();

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




function createRestaurant() {


    if ($('#Col_ID').val() == 0 || $('#Col_ID').val() == null) {
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
    if ($('#City_ID').val() == 0 || $('#City_ID').val() == null ) {
        $("#labelvalidatorCity").html("Seleccione una ciudad.");
    } else {
        $("#labelvalidatorCity").html(" ");
    }

    if ($('#Rest_Nombre').val() == 0) {
        $("#labelvalidatorRestaurant").html("Ingrese un restaurante.");
    } else {
        $("#labelvalidatorRestaurant").html(" ");
    }
    if ($('#Part_ID').val() == 0) {
        $("#labelvalidatorPartner").html("Seleccione una socio.");
    } else {
        $("#labelvalidatorPartner").html(" ");
    }

    if ($('#Col_ID').val() != 0 && $('#Col_ID').val() != null && $('#Calle').val() != 0 && $('#Avenida').val() != 0 && $('#Count_ID').val() != 0
        && $('#City_ID').val() != 0 && $('#City_ID').val() != null && $('#Rest_Nombre').val() != 0 && $('#Part_ID').val() != 0) {

        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Col_ID').val());
        dire.dire_Calle = $('#Calle').val();
        dire.dire_Avenida = $('#Avenida').val();

        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            DireID = responseAddress.data.codeStatus;
            direStatus = true;
        } else {
            console.log(responseAddress)
            console.log($('#Col_ID').val());
        }

        if (direStatus) {
            /*var images = [];*/
            var data = new FormData();
            data.append("dire_ID", parseInt(DireID));
            data.append("rest_Nombre", $("#Rest_Nombre").val());
            data.append("part_ID", parseInt($("#Part_ID").val()));
            data.append("rest_UsuarioCreacion", parseInt(Client_User_ID));

            //for (let i = 0; i < $('#File').prop('files').length; i++) {
            //    const file = $('#File').prop('files')[i];
            //    images.push(file); //IFORMFILE
            //}

            data.append("file", $("#File").prop("files")[0]);
            var response = uploadFile("https://totaltravel.somee.com/API/Restaurants/Insert", data, "POST");
            var responseJson = JSON.parse(response);
            if (responseJson.data.codeStatus > 0) {
                window.location.href = '/Restaurant?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }

    } 

    
}











