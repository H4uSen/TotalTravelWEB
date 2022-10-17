$("#image_profile").prop("src", "https://" + url_image);

RellenarCiudades(Pais_ID);
RellenarColonias(Ciud_ID);

$(`#Pais option[value = "${Pais_ID}"]`).prop("selected", true);
$(`#Ciudad option[value = "${Ciud_ID}"]`).prop("selected", true);
$(`#Colonia option[value = "${Colonia_ID}"]`).prop("selected", true);

$('.ui.dropdown').dropdown();

$('#Pais').change(function () {
    RellenarCiudades($('#Pais').val());
})
//$('#Pais').change(RellenarCiudades($('#Pais').val()))


function UpdateUser() {
    var coloStatus = false;
    var colo = SuburbsViewModel;

    colo.colo_Descripcion = ($("#Colonia").val());
    colo.ciud_ID = parseInt($("#City_ID").val());
    var responseSuburb = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/Insert", colo, "POST");
    var ColoID;
    if (responseSuburb.code == 200) {

        ColoID = responseSuburb.data.codeStatus;
        coloStatus = true;
    } else {
        console.log(responseSuburb)
    }

    if (coloStatus) {
        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt(ColoID);
        dire.dire_Calle = ($("#Calle").val());
        dire.dire_Avenida = ($("#Avenida").val());
        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            DireID = responseAddress.data.codeStatus;
            direStatus = true;
        } else {
            console.log(responseAddress)
        }
    }
    if (direStatus) {
        const Client_Partner_ID = parseInt(GetCookie("Partner_Id"));
        console.log(isNaN(Client_Partner_ID) ? 0 : Client_Partner_ID);
        const Client_Role_ID = parseInt(GetCookie("Role_Id"));
        var data = new FormData();
        data.append("Usua_DNI", $("#Usua_DNI").val());
        data.append("Usua_Nombre", $("#Usua_Nombre").val());
        data.append("Usua_Apellido", $("#Usua_Apellido").val());
        data.append("Usua_Telefono", $("#Usua_Telefono").val());
        data.append("Role_ID", Client_Role_ID);
        data.append("Dire_ID", DireID);
        data.append("Part_ID", isNaN(Client_Partner_ID) ? 0 : Client_Partner_ID);
        data.append("Usua_UsuarioModifica", Client_User_ID);

        if ($("#File").prop("files")[0] != undefined) {
            data.append("Usua_Url", $("#File").prop("files")[0]);
        }
        else {
            data.append("Usua_Url", null);
        }

        const userStatus = JSON.parse(uploadFile("https://totaltravelapi.azurewebsites.net/API/Users/Update?id=" + Client_User_ID, data, "PUT"));

        if (userStatus.code == 200) {
            location.reload();
        }
        else {
            console.log(userStatus);
        }
    }
}

function RellenarCiudades(Pais_ID) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
    if (response.code == 200) {
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == Pais_ID;
        });
        ClearDropDownItem($('#Ciudad'));
        if (cityFilter.length > 0) {
            SetDropDownPlaceholder($('#Ciudad'), "Seleccione una ciudad.");
            for (var i = 0; i < cityFilter.length; i++) {
                var item = cityFilter[i];
                AddDropDownItem($('#Ciudad'), item = { value: item.id, text: item.ciudad });
            }
        } else {
            SetDropDownPlaceholder($('#Ciudad'), "No hay ciudades disponibles.");
        }
    }
}

function RellenarColonias(Ciud_ID) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");
    if (response.code == 200) {
        var colonias = response.data;
        console.log(colonias, Ciud_ID);
        var coloniasFilter = jQuery.grep(colonias, function (Colonia, i) {
            return Colonia.ciudadID == Ciud_ID;
        });
        ClearDropDownItem($('#Colonia'));
        if (coloniasFilter.length > 0) {
            SetDropDownPlaceholder($('#Colonia'), "Seleccione una colonia.");
            for (var i = 0; i < coloniasFilter.length; i++) {
                var item = coloniasFilter[i];
                AddDropDownItem($('#Colonia'), item = { value: item.id, text: "Colonia. " + item.colonia });
            }
        } else {
            SetDropDownPlaceholder($('#Colonia'), "No hay colonias disponibles.");
        }
    }
}