
// ----------------------------------- INIZIALIZE ------------------------------------
//varaibles
const PartnerList = ajaxRequest("https://totaltravel.somee.com/API/Partners/List");
const PartnerTypeList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/PartnerType/List");


$('#standard_calendar').calendar({
    type: 'date'
});
$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

$("#frmCreatePartner").hide();
$("#frmSelectPartner").hide();

// ----------------------------------- EVENTS ------------------------------------
$("#tbnCreateUser").click(CreateUser);

$("#frmSelectPartner #cbbTipoPartner").change(() => {
    const TipoPartner_Id = $("#frmSelectPartner #cbbTipoPartner").val();
    FillPartners(TipoPartner_Id);
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

function FillCities(id_pais) {
    const request = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");

    if (request.code == 200) {

        const cities = request.data;
        $(".cbbCiudades").empty();
        $(".cbbCiudades").append(
            `<option value="">Select a City Residence (required)</option>`
        );
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            const option = `<option value="${city.id}">${city.ciudad}, ${city.pais}</option>`;

            $(".cbbCiudades").append(option);
        }
    }
}


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
                empty: "Seleccione un partner",
                default: "No se encontraron partner disponibles",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#frmSelectPartner #cbbPartners").dropdown();

        /*
        //clear dropdown
        ClearDropDownItem(
            $("#frmSelectPartner #cbbPartners")
        );
        // add placeholder
        $("#frmSelectPartner #cbbPartners").append(
            `<option value="">Select a Partner (required)</option>`
        );

        if (Partners.length > 0) {
            SetDropDownPlaceholder(
                $("#frmSelectPartner #cbbPartners"),
                "Select a Partner (required)"
            );

            for (let i = 0; i < Partners.length; i++) {
                const Partner = Partners[i];

                AddDropDownItem(
                    $("#frmSelectPartner #cbbPartners"),
                    { value: Partner.id, text: `${Partner.tipoPartner} - ${Partner.nombre}` }
                );
            }

        }
        else {
            SetDropDownPlaceholder(
                $("#frmSelectPartner #cbbPartners")
            );
        }*/

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
        { validateMessage: "Required field: 'User Gender' ", Jqueryinput: $('#frmCreateUser input:radio[name=rbGenero]'), check: true },
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
        /*
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
        */
    }
}


function CreatePartner() {
    var partner = PartnerViewModel;
    var data = {
        success: false,
        role_ID: 0,
        part_ID: 0
    };

    //validate partner constructor data
    if ($("#frmCreatePartner #txtPartnerName").val() == 0) {
        iziToastAlert(
            "Required field: 'Partner Name' ", "", "error"
        );
    }
    else if ($("#frmCreatePartner #txtPartnerEmail").val() == 0) {
        iziToastAlert(
            "Required field: 'Partner Email' ", "", "error"
        );
    }
    else if ($("#frmCreatePartner #txtPartnerPhone").val() == 0) {
        iziToastAlert(
            "Required field: 'Partner Phone' ", "", "error"
        );
    }
    else if ($("#frmCreatePartner .cbbTipoPartner select").val() == 0) {
         iziToastAlert(
            "Required field: 'Partner Type' ", "", "error"
         );
    } else {
         partner.part_Nombre = $("#frmCreatePartner #txtPartnerName").val();
         partner.part_Email = $("#frmCreatePartner #txtPartnerEmail").val();
         partner.part_Telefono = $("#frmCreatePartner #txtPartnerPhone").val();
         partner.tiPart_Id = parseInt($("#frmCreatePartner .cbbTipoPartner select").val());


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
            iziToastAlert(
                "Error when performing action: 'Create Partner' ", PartnerInsertStatus.data.messageStatus, "error"
            );
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

    if ($('#frmCreateUser #cbbCiudades').val() == 0) {
        iziToastAlert(
            "Required field: 'User City Residence' ", "", "error"
        );
    }
    else if ($('#frmCreateUser #txtDireccionExacta').val() == 0) {
        iziToastAlert(
            "Required field: 'User Address Detail' ", "", "error"
        );
    } else {
        //construct direction json
        userAdress.Ciud_ID = parseInt($("#frmCreateUser #cbbCiudades").val());
        userAdress.Dire_Descripcion = $("#frmCreateUser #txtDireccionExacta").val();

        const USerAddressStatus = ajaxRequest(
            "https://totaltravel.somee.com/API/Address/Insert",
            userAdress, "POST"
        );

        if (USerAddressStatus.code == 200) {
            data.dire_ID = USerAddressStatus.data.codeStatus;
            data.success = true;
        }
        else {
            iziToastAlert(
                "Error when performing action: 'Create User Address' ", USerAddressStatus.data.messageStatus, "error"
            );
        }
    }

    return data;
}