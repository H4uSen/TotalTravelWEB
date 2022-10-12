
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




function createRestaurant() {


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

    if ($('#Colonia').val() != 0 && $('#Calle').val() != 0 && $('#Avenida').val() != 0 && $('#Count_ID').val() != 0
        && $('#City_ID').val() != 0 && $('#City_ID').val() != null && $('#Rest_Nombre').val() != 0 && $('#Part_ID').val() != 0) {

        var direStatus = false;
        var fullAddress = `Colonia. ${$('#Colonia').val()}, Calle. ${$('#Calle').val()}, Avenida. ${$('#Avenida').val()}`;
        var dire = AdressViewModel;

        dire.Dire_Descripcion = fullAddress;
        dire.Ciud_ID = parseInt($("#City_ID").val());
        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            DireID = responseAddress.data.codeStatus;
            direStatus = true;
        } else {
            console.log(responseAddress)
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

            data.append("file", $("#File").val());
            var response = uploadFile("https://totaltravel.somee.com/API/Restaurants/Insert", data, "POST");

            if (response.data.codeStatus > 0) {
                window.location.href = '/Restaurant';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }

    } 

    
}











