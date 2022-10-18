
// ----------------------------------- INIZIALIZE ------------------------------------
//varaibles
const PartnerList = ajaxRequest("https://totaltravel.somee.com/API/Partners/List");
const PartnerTypeList = ajaxRequest("https://totaltravel.somee.com/API/PartnerType/List");
const CitiesList = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
const SuburbsList = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");



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
    var user = UserViewModel;
    var Role_success = false;
    var Address_success = false;

    const userValidateArray = [
        { validateMessage: "Required field: 'User DNI Number'", Jqueryinput: $("#frmCreateUser #txtDNI") },
        { validateMessage: "Required field: 'User first Name' ", Jqueryinput: $("#frmCreateUser #txtNombre") },
        { validateMessage: "Required field: 'User Last Name' ", Jqueryinput: $("#frmCreateUser #txtApellido") },
        { validateMessage: "Required field: 'User Phone Number' ", Jqueryinput: $("#frmCreateUser #txtTelefono") },
        { validateMessage: "Required field: 'User Birth Date' ", Jqueryinput: $("#frmCreateUser #txtFechaNacimiento") },
        { validateMessage: "Required field: 'User Password' ", Jqueryinput: $("#frmCreateUser #txtPassword") },
        { validateMessage: "Required field: 'User Email' ", Jqueryinput: $("#frmCreateUser #txtEmail") },
        { validateMessage: "Required field: 'User Gender' ", Jqueryinput: $('#frmCreateUser option[name="rbGenero"]'),check:true },
        { validateMessage: "Required field: 'User address Country' ", Jqueryinput: $('#frmCreateUser #cbbPaises')},
        { validateMessage: "Required field: 'User address City' ", Jqueryinput: $('#frmCreateUser #cbbCiudades') },
        { validateMessage: "Required field: 'User address Suburb' ", Jqueryinput: $('#frmCreateUser #cbbColonias') },
        { validateMessage: "Required field: 'User address Street name' ", Jqueryinput: $('#frmCreateUser #txtCalle') },
        { validateMessage: "Required field: 'User address Avenue name' ", Jqueryinput: $('#frmCreateUser #txtAvenida') },
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
             user.role_ID = 1;
             Role_success = true;
         }
         else if ($("#checkPartner").prop("checked")) {

              if ($("#checkExistingPartner").prop("checked")) {

                  // get partner id
                  user.part_ID = parseInt($("#frmSelectPartner #cbbPartners").val());

                  const PartnerRole = jQuery.grep(PartnerList.data, function (item, i) {
                      return item.id == user.part_ID;
                  });
                  user.role_ID = PartnerRole[0].rol_Id;
                  Role_success = true;

              } else {

                  //create new partner
                  var CreatePartnerStatus = CreatePartner();
                  if (CreatePartnerStatus.success == true) {
                      user.part_ID = CreatePartnerStatus.part_ID;
                      user.role_ID = CreatePartnerStatus.role_ID;
                      Role_success = true;
                  }
              }

         } else {
              iziToastAlert(
                 "Required field: 'Super User Role' ", "Select a Moderator Role", "error"
              );
         }

         // create address
         if (Role_success) {

            var CreateUserDirectionStatus = CreateUserDirection();
            if (CreateUserDirectionStatus.success == true) {
                user.dire_ID = CreateUserDirectionStatus.dire_ID;
                Address_success = true;
            }

         }

         // create user
         if (Address_success) {

            user.usua_DNI = $("#frmCreateUser #txtDNI").val();
            user.usua_Nombre = $("#frmCreateUser #txtNombre").val();
            user.usua_Apellido = $("#frmCreateUser #txtApellido").val();
            user.usua_Telefono = $("#frmCreateUser #txtTelefono").val();
            user.usua_FechaNaci = getCalendarDate($("#frmCreateUser #txtFechaNacimiento").val());
            user.usua_Sexo = $('input:radio[name=rbGenero]:checked').val();
            user.usua_Email = $('#frmCreateUser #txtEmail').val();
            user.usua_Password = $('#frmCreateUser #txtPassword').val();

            const UserInsertStatus = ajaxRequest(
                "https://totaltravelapi.azurewebsites.net/API/Users/Insert",
                user, "POST"
            );

            if (UserInsertStatus.code == 200) {
                user.usua_ID = UserInsertStatus.data.codeStatus;
                iziToastAlert(
                    "!User Created Successfully! ", "", "success"
                );
                location.assign("https://localhost:44366/Users");
            }
            else {
                iziToastAlert(
                    "Error when performing action: 'Create User' ", UserInsertStatus.message, "error"
                );
            }
        }
        
    }
}


function CreatePartner() {
    var partner = PartnerViewModel;
    var data = {
        success: false,
        role_ID: 0,
        part_ID: 0
    };

    const userValidateArray = [
        { validateMessage: "Required field: 'Partner Name' ", Jqueryinput: $("#frmCreatePartner #txtPartnerName") },
        { validateMessage: "Required field: 'Partner Email' ", Jqueryinput: $("#frmCreatePartner #txtPartnerEmail") },
        { validateMessage: "Required field: 'Partner Phone' ", Jqueryinput: $("#frmCreatePartner #txtPartnerPhone") },
        { validateMessage: "Required field: 'Partner Type' ", Jqueryinput: $("#frmCreatePartner #cbbTipoPartner") },
    ];

    const userValidate = ValidateForm(userValidateArray);

    //validate partner constructor data
    if (userValidate){
         partner.part_Nombre = $("#frmCreatePartner #txtPartnerName").val();
         partner.part_Email = $("#frmCreatePartner #txtPartnerEmail").val();
         partner.part_Telefono = $("#frmCreatePartner #txtPartnerPhone").val();
         partner.tiPart_Id = parseInt($("#frmCreatePartner #cbbTipoPartner").val());


         const PartnerInsertStatus = ajaxRequest(
            "https://totaltravelapi.azurewebsites.net/API/Partners/Insert",
            partner, "POST"
         );

         if (PartnerInsertStatus.code == 200) {

            const NewPartnerData = ajaxRequest(
                "https://totaltravel.somee.com/API/Partners/Find?id=" + PartnerInsertStatus.data.codeStatus
            );

            // fill data
            data.role_ID = NewPartnerData.rol_Id;
            data.part_ID = PartnerInsertStatus.data.codeStatus;
            data.success = true;
         }
         else {
             $("#msgErrorForm").show();
             $("#msgErrorForm p").html("An error ocurred while creating 'User Adress' ");
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
    userAdress.dire_Avenida = parseInt($("#frmCreateUser #txtAvenida").val());
    userAdress.dire_Calle = parseInt($("#frmCreateUser #txtCalle").val());

    const USerAddressStatus = ajaxRequest(
        "https://totaltravel.somee.com/API/Address/Insert",
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