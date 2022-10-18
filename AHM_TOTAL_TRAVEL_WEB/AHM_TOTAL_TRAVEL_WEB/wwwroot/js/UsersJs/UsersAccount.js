$("#image_profile").prop("src", "https://" + url_image);

$('.ui.dropdown').dropdown();

SetDropDownValue($("#Pais"), Pais_ID);
RellenarCiudades(Pais_ID);
SetDropDownValue($("#Ciudad"), Ciud_ID);

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
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#Colonia") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var coloStatus = false;
        var colo = SuburbsViewModel;

        colo.colo_Descripcion = ($("#Colonia").val());
        colo.ciud_ID = parseInt($("#Ciudad").val());
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
}

function RellenarCiudades(Pais_ID) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
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
    }
}
