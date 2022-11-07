$("#image_profile").prop("src", "https://" + url_image);


$('.ui.dropdown').dropdown();

RellenarCiudades(Pais_ID);
RellenarColonias(Ciud_ID);
SetDropDownValue($("#Pais"), Pais_ID);
SetDropDownValue($("#Ciudad"), Ciud_ID);
SetDropDownValue($("#Colonia"), Colo_ID);

$('#Pais').change(function () {
    RellenarCiudades($('#Pais').val());
})

function UpdateUser() {
    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Usua_Nombre") },
        { validateMessage: "Ingrese un apellido.", Jqueryinput: $("#Usua_Apellido") },
        { validateMessage: "Ingrese un DNI.", Jqueryinput: $("#Usua_DNI") },
        { validateMessage: "Ingrese un número telefónico.", Jqueryinput: $("#Usua_Telefono") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Pais") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#Ciudad") },
        { validateMessage: "Seleccione una colonia.", Jqueryinput: $("#Colonia") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var direStatus = false;
            var dire = AdressViewModel;

            dire.colo_ID = parseInt($("#Colonia").val());
            dire.dire_Calle = ($("#Calle").val());
            dire.dire_Avenida = ($("#Avenida").val());
        var responseAddress = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Address/Insert", dire, "POST");
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

            const userStatus = uploadFile("https://totaltravelapi.azurewebsites.net/API/Users/Update?id=" + Client_User_ID, data, "PUT");

            if (userStatus.code == 200) {
                window.location.href = '/Account?success=true';
            }
            else {
                console.log(userStatus);
            }
        
    }
}

function RellenarCiudades(Pais_ID) {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
    if (response.code == 200) {
        var cities = response.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Pais_ID;
        });
        const dropdownData = {
            dropdown: $("#Ciudad"),
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
        $("#Ciudad").dropdown();

        $("#Ciudad").change((_this) => {
            const City_Id = $(_this.target).val();
            RellenarColonias(City_Id);
        });
    }
}

function RellenarColonias(Ciud_Id) {

    var coloniasList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
    if (coloniasList.code == 200) {
        var colonias = coloniasList.data;
        colonias = jQuery.grep(colonias, function (colonia, i) {
            return colonia.ciudadID == Ciud_Id;
        });

        const dropdownData = {
            dropdown: $("#Colonia"),
            items: {
                list: colonias,
                valueData: "id",
                textData: "colonia"
            },
            placeholder: {
                empty: "No se encontraron colonias disponibles",
                default: "Seleccione una colonia",
            },
            semantic: true
        }
        FillDropDown(dropdownData);
        $("#Colonia").dropdown();
    }
}