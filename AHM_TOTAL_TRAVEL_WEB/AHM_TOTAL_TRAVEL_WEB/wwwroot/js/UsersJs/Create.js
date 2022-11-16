
// ----------------------------------- INIZIALIZE ------------------------------------
//varaibles
const PartnerList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Partners/List");
const PartnerTypeList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/PartnerType/List");
const CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
const SuburbsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");



$("#msgErrorForm").hide();
$('#standard_calendar').calendar({
    type: 'date'
});
$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

$("#frmCreatePartner").hide();
$("#frmSelectPartner").hide();

// ----------------------------------- EVENTS ------------------------------------
$("#tbnCreateUser").click(CreateUser);

$("#frmCreateUser #cbbTipoPartner").change((_this) => {
    const TipoPartner_Id = $(_this.target).val();
    FillPartners(TipoPartner_Id);
});

//-------------- ADDRESS DROPDOWNS EVENTS
$("#frmCreateUser #cbbPaises").change((_this) => {
    const Country_Id = $(_this.target).val();
    FillCities(Country_Id);
});

$("#frmCreateUser #cbbCiudades").change((_this) => {
    const City_Id = $(_this.target).val();
    FillSuburbs(City_Id);
});

$("#checkPartner").change(function () {
    if ($("#checkPartner").prop("checked") == true) {
        $("#checkAdmin").prop("checked", false);
        $("#checkExistingPartner").prop("disabled", false);
        $("#frmCreatePartner").show();
    } else {
        $("#checkExistingPartner").prop("disabled", true);
        $("#checkExistingPartner").prop("checked", false);
        $("#frmCreatePartner").hide();
        $("#frmSelectPartner").hide();
    }
});

$("#checkAdmin").change(function () {
    if ($("#checkAdmin").prop("checked") == true) {
        $("#checkPartner").prop("checked", false);
        $("#checkExistingPartner").prop("disabled", true);
        $("#checkExistingPartner").prop("checked", false);
        $("#frmCreatePartner").hide();
        $("#frmSelectPartner").hide();
    }
});

$("#checkExistingPartner").change(function () {
    if ($("#checkExistingPartner").prop("checked") == true) {
        $("#frmSelectPartner").show();
        $("#frmCreatePartner").hide();
    } else {
        $("#frmCreatePartner").show();
        $("#frmSelectPartner").hide();
    }
});

// ----------------------------------- FUNCTIONS ------------------------------------


function FillPartners(PartnerType_Id) {

    if (PartnerList.code == 200) {

        var Partners = PartnerList.data;
        if (PartnerType_Id != 0) {
            //filter data by ParterType_Id
            Partners = jQuery.grep(Partners, function (Partner, i) {
                return Partner.tipoPartner_Id == PartnerType_Id;
            });
        }

        var ListItems = [];
        for (let i = 0; i < Partners.length; i++) {
            const Partner = Partners[i];
            ListItems.push({ value: Partner.id, text: `${Partner.tipoPartner} - ${Partner.nombre}` });
        }

        const dropdownData = {
            dropdown: $("#frmSelectPartner #cbbPartners"),
            items: {
                list: ListItems,
                valueData: "value",
                textData: "text"
            },
            placeholder: {
                empty: "No se encontraron partner disponibles",
                default: "Seleccione un partner",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#frmSelectPartner #cbbPartners").dropdown();

    }
}

function FillCities(Country_Id) {

    if (CitiesList.code == 200) {

        var cities = CitiesList.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Country_Id;
        });

        var ListItems = [];
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            ListItems.push({ value: city.id, text: city.ciudad });
        }

        const dropdownData = {
            dropdown: $("#frmCreateUser #cbbCiudades"),
            items: {
                list: ListItems,
                valueData: "value",
                textData: "text"
            },
            placeholder: {
                empty: "No se encontraron ciudades disponibles",
                default: "Seleccione una ciudad",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#frmCreateUser #cbbCiudades").dropdown();

        $("#frmCreateUser #cbbCiudades").change((_this) => {
            const City_Id = $(_this.target).val();
            FillSuburbs(City_Id);
        });
    }
}

function FillSuburbs(City_Id) {

    if (SuburbsList.code == 200) {

        var suburbs = SuburbsList.data;
        suburbs = jQuery.grep(suburbs, function (suburb, i) {
            return suburb.ciudadID == City_Id;
        });

        var ListItems = [];
        for (let i = 0; i < suburbs.length; i++) {
            const suburb = suburbs[i];
            ListItems.push({ value: suburb.id, text: suburb.colonia });
        }

        const dropdownData = {
            dropdown: $("#frmCreateUser #cbbColonias"),
            items: {
                list: ListItems,
                valueData: "value",
                textData: "text"
            },
            placeholder: {
                empty: "No se encontraron colonias disponibles",
                default: "Seleccione una colonia",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#frmCreateUser #cbbColonias").dropdown();

    }
}


// create user 
function CreateUser() {
    var user = new FormData();
    var Role_success = false;
    var Address_success = false;

    const userValidateArray = [
        { validateMessage: "Ingrese el DNI", Jqueryinput: $("#frmCreateUser #txtDNI") },
        { validateMessage: "Ingrese el nombre", Jqueryinput: $("#frmCreateUser #txtNombre") },
        { validateMessage: "Ingrese el apellido", Jqueryinput: $("#frmCreateUser #txtApellido") },
        { validateMessage: "Ingrese el teléfono", Jqueryinput: $("#frmCreateUser #txtTelefono") },
        { validateMessage: "Ingrese la fecha de nacimiento", Jqueryinput: $("#frmCreateUser #txtFechaNacimiento") },
        { validateMessage: "Ingrese la contraseña", Jqueryinput: $("#frmCreateUser #txtPassword") },
        { validateMessage: "Ingrese el correo electrónico", Jqueryinput: $("#frmCreateUser #txtEmail") },
        { validateMessage: "Seleccione el sexo", Jqueryinput: $('#frmCreateUser input[name="rbGenero"]'), check:true },
        { validateMessage: "Seleccione un país", Jqueryinput: $('#frmCreateUser #cbbPaises')},
        { validateMessage: "Seleccione una ciudad", Jqueryinput: $('#frmCreateUser #cbbCiudades') },
        { validateMessage: "Seleccione una colonia", Jqueryinput: $('#frmCreateUser #cbbColonias') },
        { validateMessage: "Ingrese una calle", Jqueryinput: $('#frmCreateUser #txtCalle') },
        { validateMessage: "Ingrese una avenida", Jqueryinput: $('#frmCreateUser #txtAvenida') },
    ];

    const userValidate = ValidateForm(userValidateArray);

    const passwordCallback = () => {
        var validate = false;

        if ($('#frmCreateUser #txtPassword').val() === $('#frmCreateUser #txtPasswordConfirm').val()) {
            validate = true;
        }

        return validate;
    };

    const passwordValidate = ManualValidateForm(
        passwordCallback,
        $('#frmCreateUser #txtPasswordConfirm').parents(".field")[0],
        "Contraseñas no coinciden"
    );

    if (userValidate) {
        if (passwordValidate) {
            alert("success");
        }
        
    }else{
        
         //verify rol
        if ($("#checkAdmin").prop("checked")) {
            user.append("role_ID",1);
            Role_success = true;
        }
        else if ($("#checkPartner").prop("checked")) {

             if ($("#checkExistingPartner").prop("checked")) {

                  // get partner id
                 user.append("part_ID", parseInt($("#frmSelectPartner #cbbPartners").val()));

                 const PartnerRole = jQuery.grep(PartnerList.data, function (item, i) {
                     return item.id == parseInt($("#frmSelectPartner #cbbPartners").val());
                 });

                 user.append("role_ID", PartnerRole[0].rol_Id);
                 Role_success = true;

             } else {

                 //create new partner
                 var CreatePartnerStatus = CreatePartner();
                 if (CreatePartnerStatus.success == true) {
                     user.append("part_ID", CreatePartnerStatus.part_ID);
                     user.append("role_ID", CreatePartnerStatus.role_ID);
                     Role_success = true;
                 }
             }

        } else {
             $("#msgErrorForm").show();
             $("#msgErrorForm p").html("Required field: 'Super User Role' ");
        }

         // create address
        if (Role_success) {

            var CreateUserDirectionStatus = CreateUserDirection();
            if (CreateUserDirectionStatus.success == true) {
                 user.append("dire_ID", CreateUserDirectionStatus.dire_ID);
                 Address_success = true;
            }

        }

         // create user
        if (Address_success) {

            user.append("usua_DNI", $("#frmCreateUser #txtDNI").val());
            user.append("usua_Nombre", $("#frmCreateUser #txtNombre").val());
            user.append("usua_Apellido", $("#frmCreateUser #txtApellido").val());
            user.append("usua_Telefono", $("#frmCreateUser #txtTelefono").val());
            user.append("usua_FechaNaci", getCalendarDate($("#frmCreateUser #txtFechaNacimiento").val()));
            user.append("usua_Sexo", $('input:radio[name=rbGenero]:checked').val());
            user.append("usua_Email", $("#frmCreateUser #txtEmail").val());
            user.append("usua_Password", $("#frmCreateUser #txtPassword").val());
            user.append("usua_Url", null);
            user.append("usua_UsuarioCreacion", Client_User_ID);

            const UserInsertStatus = uploadFile(
                "https://totaltravelapi.azurewebsites.net/API/Users/Insert",
                user, "POST"
            );

            if (UserInsertStatus.code == 200) {
                 user.usua_ID = UserInsertStatus.data.codeStatus;
                 iziToastAlert(
                    "!User Created Successfully! ", "", "success"
                 );
                 location.assign("Index");
            }
            else {
                 $("#msgErrorForm").show();
                 $("#msgErrorForm p").html(UserInsertStatus.message);
            }
        }
        
    }
}


function CreatePartner() {

    var data = {
        success: false,
        role_ID: 0,
        part_ID: 0
    };

    const userValidateArray = [
        { validateMessage: "Ingrese el nombre", Jqueryinput: $("#frmCreatePartner #txtPartnerName") },
        { validateMessage: "Ingrese el correo electrónico ", Jqueryinput: $("#frmCreatePartner #txtPartnerEmail") },
        { validateMessage: "Ingrese el teléfono", Jqueryinput: $("#frmCreatePartner #txtPartnerPhone") },
        { validateMessage: "Seleccione el tipo", Jqueryinput: $("#frmCreatePartner #cbbTipoPartner") },
    ];

    const Validate = ValidateForm(userValidateArray);

    //validate partner constructor data
    if (Validate) {

        var partnerData = new FormData();
        partnerData.append("part_Nombre", $("#frmCreatePartner #txtPartnerName").val());
        partnerData.append("part_Email", $("#frmCreatePartner #txtPartnerEmail").val());
        partnerData.append("part_Telefono", $("#frmCreatePartner #txtPartnerPhone").val());
        partnerData.append("tiPart_Id", parseInt($("#frmCreatePartner #cbbTipoPartner").val()));
        partnerData.append("part_UsuarioCreacion", Client_User_ID);
        partnerData.append("File", null);


        const PartnerInsertStatus = uploadFile(
            "https://totaltravelapi.azurewebsites.net/API/Partners/Insert",
            partnerData, "POST"
        );

        if (PartnerInsertStatus.code == 200) {

            const NewPartnerData = ajaxRequest(
                "https://totaltravelapi.azurewebsites.net/API/Partners/Find?id=" + PartnerInsertStatus.data.codeStatus
            );

            // fill data
            data.role_ID = NewPartnerData.data.rol_Id;
            data.part_ID = PartnerInsertStatus.data.codeStatus;
            data.success = true;
        }
        else {
            $("#msgErrorForm").show();
            $("#msgErrorForm p").html("An error ocurred while creating 'User partner': " + PartnerInsertStatus.message);
        }
    }

    return data;
}

function CreateUserDirection() {
    var userAdress = AdressViewModel;
    var data = {
        success: false,
        dire_ID: 0
    };

    //construct direction json
    userAdress.colo_ID = parseInt($("#frmCreateUser #cbbColonias").val());
    userAdress.dire_Avenida = $("#frmCreateUser #txtAvenida").val();
    userAdress.dire_Calle = $("#frmCreateUser #txtCalle").val();

    const USerAddressStatus = ajaxRequest(
        "https://totaltravelapi.azurewebsites.net/API/Address/Insert",
        userAdress, "POST"
    );

    if (USerAddressStatus.code == 200) {
        data.dire_ID = USerAddressStatus.data.codeStatus;
        data.success = true;
    }
    else {
        $("#msgErrorForm").show();
        $("#msgErrorForm p").html("An error ocurred while creating 'User Adress' ");
    }

    return data;
}