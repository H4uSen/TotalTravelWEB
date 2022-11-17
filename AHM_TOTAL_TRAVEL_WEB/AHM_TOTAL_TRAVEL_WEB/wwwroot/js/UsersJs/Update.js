var imagesArray = [];
var imagesArrayPure = [];
const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");
var user;
var rolAdmin = false;
$(document).ready(async function () {
    await GetImage();
});

    $(document).ready(function () {
       var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Users/Find?id=" + idUser);
           if (response.code == 200) {
               var sexo;
                 user = response.data;
               $('#txtDNI').val(user.dni);
               $('#txtNombre').val(user.nombre);
               $('#txtApellido').val(user.apellido);
               $('#txtTelefono').val(user.telefono);
               $('#txtFechaNacimiento').val(user.fecha_Nacimiento.substring(0,10));
                
               if (user.sexo.toLowerCase() == "masculino") {
                   sexo = 'M';
                   $("input[name='rbGenero'][value=" + sexo + "]").prop('checked', true);
               } else if (user.sexo.toLowerCase() == "femenino") {
                   sexo = 'F';
               }
               $('#txtCalle').val(user.calle);
               $('#txtAvenida').val(user.avenida);
               $('#txtEmail').val(user.email);
               GetCountriesUpdate()
               SetDropDownValue($("#cbbPaises"), user.paisID);
               GetCitiesUpdate(user.paisID);
               SetDropDownValue($("#cbbCiudades"), user.ciudadID);
               GetSuburbUpdate(user.ciudadID);
               SetDropDownValue($("#cbbColonias"), user.coloniaID);
               if (user.rol.toLowerCase() == "administrador") {
                   $("#checkAdmin").prop("checked", true);
                   rolAdmin = true;
               } else {
                   $("#checkAdmin").prop("checked", false);
                   rolAdmin = false;
               }
               if (user.partnerID != null) {
                   $("#checkPartner").prop("checked", true);
                   $("#checkAdmin").prop("checked", false);
                   GetTypePartners();
                   GetPartners(user.tipoPartner_Id);
                   SetDropDownValue($("#cbbPartners"), user.partnerID);
                   SetDropDownValue($("#cbbTipoPartner"), user.tipoPartner_Id);
                   $("#frmSelectPartner").show();
               } else {
                   GetTypePartners();
                   $("#checkPartner").prop("checked", false);
               }  
            }
    });


//CHECKS

$("#checkPartner").change(function () {
    if ($("#checkPartner").prop("checked") == true) {
        $("#checkAdmin").prop("checked", false);
        rolAdmin = false;
        $("#frmSelectPartner").show();
    } else {
        $("#frmSelectPartner").hide();
    }
});

$("#checkAdmin").change(function () {
    if ($("#checkAdmin").prop("checked") == true) {
        $("#checkPartner").prop("checked", false);
        $("#checkExistingPartner").prop("disabled", true);
        $("#checkExistingPartner").prop("checked", false);
        rolAdmin = true;
        $("#frmCreatePartner").hide();
        $("#frmSelectPartner").hide();
    }
});


//DROPDOWNS


function GetTypePartners() {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/PartnerType/List");
    if (response.code == 200) {
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            AddDropDownItem($('#cbbTipoPartner'), item = { value: item.id, text: item.descripcion });
        }
        $('#cbbTipoPartner').parent().find('.text').html('Seleccione un tipo.');
    }
}
function GetPartnersList() {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Partners/List");
    if (response.code == 200) {
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            AddDropDownItem($('#cbbPartners'), item = { value: item.id, text: item.nombre });
        }
        $('#cbbPartners').parent().find('.text').html('Seleccione un socio.');
    }
}

function GetPartners(idType) {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Partners/List");
    if (response.code == 200) {
        var partners = response.data;
        var partnerFilter = jQuery.grep(partners, function (Partner, i) {
            return Partner.tipoPartner_Id == idType;
        });
        ClearDropDownItem($('#cbbPartners'));
        if (partnerFilter.length > 0) {
            for (var i = 0; i < partnerFilter.length; i++) {
                var item = partnerFilter[i];
                AddDropDownItem($('#cbbPartners'), item = { value: item.id, text: item.nombre });
            }
            $('#City_ID').parent().find('.text').html('Seleccione un socio.');
        } else {
            SetDropDownPlaceholder($('#cbbPartners'), "No hay socios disponibles.");
        }
    }
}

function GetPartnerRole(idPartner) {
    var rol_ID;
    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Partners/List");
    if (response.code == 200) {
        var partners = response.data;
        var partnerFilter = jQuery.grep(partners, function (Partner, i) {
            return Partner.id == idPartner;
        });
        if (rolAdmin == true) {
            rol_ID = 1;
            return rol_ID
        } else {
            if (partnerFilter.length > 0) {
                for (var i = 0; i < partnerFilter.length; i++) {
                    var item = partnerFilter[i];
                    rol_ID = item.rol_Id;
                }
                return rol_ID;
            }
        }
       
    }
}



function GetCountriesUpdate() {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Countries/List");
    if (response.code == 200) {
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            AddDropDownItem($('#cbbPaises'), item = { value: item.id, text: item.pais });
        }
        $('#cbbPaises').parent().find('.text').html('Seleccione un país.');
    }
}

function GetCitiesUpdate(paisID) {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
    if (response.code == 200) {
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == paisID;
        });
        ClearDropDownItem($('#cbbCiudades'));
        if (cityFilter.length > 0) {
            AddDropDownItem($('#cbbCiudades'), item = { value: "", text: "Seleccione una ciudad." });
            for (var i = 0; i < cityFilter.length; i++) {
                var item = cityFilter[i];
                AddDropDownItem($('#cbbCiudades'), item = { value: item.id, text: item.ciudad });
            }
            $('#City_ID').parent().find('.text').html('Seleccione una ciudad');
        } else {
            SetDropDownPlaceholder($('#cbbCiudades'), "No hay ciudades disponibles.");
        }
    }
}

function GetSuburbUpdate(ciudID) {

    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
    if (response.code == 200) {

        var suburbs = response.data;
        var suburbsFilter = jQuery.grep(suburbs, function (Suburb, i) {
            return Suburb.ciudadID == ciudID;
        });
        ClearDropDownItem($('#cbbColonias'));
        if (suburbsFilter.length > 0) {
            AddDropDownItem($('#cbbColonias'), item = { value: "", text: "Seleccione una colonia." });
            for (var i = 0; i < suburbsFilter.length; i++) {
                var item = suburbsFilter[i];
                AddDropDownItem($('#cbbColonias'), item = { value: item.id, text: item.colonia });
            }
            $('#cbbColonias').parent().find('.text').html('Seleccione una colonia');
        } else {
            SetDropDownPlaceholder($('#cbbColonias'), "No hay colonias disponibles.");
        }
    }
}

$('#cbbPaises').change(function () {
    GetCitiesUpdate($('#cbbPaises').val());
    SetDropDownPlaceholder($('#cbbColonias'));
});
$('#cbbCiudades').change(function () {
    GetSuburbUpdate($('#cbbCiudades').val());
});
    


$("#tbnUpdateUser").click(function () {
    UpdateUser()
});











async function GetImage() {
    var responseImage = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RootFiles/GetAllImages?folderName=UsersProfilePics/User-" + idUser);
    if (responseImage.code == 200) {
        var fileData;
        var list = responseImage.data
        for (var i = 0; i < list.length; i++) {
            var imageUrl = list[i].imageUrl;

            var split = imageUrl.split("/");
            var fileName = split[split.length - 1];
            var file = await createBlob(imageUrl)
                .then(function (data) {
                    return data;
                });

            imagesArrayPure.push(file);
            fileData = await convertImage(file)
                .then(function (data) {
                    return data;
                });

            fileData.fileName = fileName;
            imagesArray.push(fileData);
        }
        $("#UserPhoto").attr("src", fileData.src);
    }
}

$("#File").change(async function () {
    $("#UserCarouselHeader").hide();

    const fileData = await convertImage($("#File").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArray.push(fileData);
    imagesArrayPure[0] = $("#File").prop("files")[0];
    $("#UserPhoto").attr("src", fileData.src);

});









function UpdateUser() {

    var userUpdate = new FormData();
    var Address_success = false;

    const userValidateArray = [
        { validateMessage: "Ingrese el DNI", Jqueryinput: $("#frmCreateUser #txtDNI") },
        { validateMessage: "Ingrese el nombre", Jqueryinput: $("#frmCreateUser #txtNombre") },
        { validateMessage: "Ingrese el apellido", Jqueryinput: $("#frmCreateUser #txtApellido") },
        { validateMessage: "Ingrese el teléfono", Jqueryinput: $("#frmCreateUser #txtTelefono") },
        { validateMessage: "Seleccione un país", Jqueryinput: $('#frmCreateUser #cbbPaises') },
        { validateMessage: "Seleccione una ciudad", Jqueryinput: $('#frmCreateUser #cbbCiudades') },
        { validateMessage: "Seleccione una colonia", Jqueryinput: $('#frmCreateUser #cbbColonias') },
        { validateMessage: "Ingrese una calle", Jqueryinput: $('#frmCreateUser #txtCalle') },
        { validateMessage: "Ingrese una avenida", Jqueryinput: $('#frmCreateUser #txtAvenida') },
    ];

    const userValidate = ValidateForm(userValidateArray);
    if (userValidate) {
        var CreateUserDirectionStatus = CreateUserDirection();
        if (CreateUserDirectionStatus.success == true) {
            userUpdate.append("dire_ID", CreateUserDirectionStatus.dire_ID);
            Address_success = true;
        }

        if (Address_success) {

            userUpdate.append("usua_DNI", $("#frmCreateUser #txtDNI").val());
            userUpdate.append("usua_Nombre", $("#frmCreateUser #txtNombre").val());
            userUpdate.append("usua_Apellido", $("#frmCreateUser #txtApellido").val());
            userUpdate.append("usua_Telefono", $("#frmCreateUser #txtTelefono").val());
            userUpdate.append("Usua_UsuarioModifica", user.id);
            userUpdate.append("role_ID", GetPartnerRole($('#cbbPartners').val()));
            if (GetPartnerRole($('#cbbPartners').val()) == 1){
                userUpdate.append("part_ID", 0);
            } else {
                 userUpdate.append("part_ID", $('#cbbPartners').val());
            }
           
           
            for (let i = 0; i < imagesArrayPure.length; i++) {

                userUpdate.append("usua_Url", imagesArrayPure[i]);
            }


           const UserUpdateStatus = uploadFile(
               "https://totaltravelapi.azurewebsites.net/API/Users/Update?id=" + idUser, userUpdate, "PUT"
            );

            if (UserUpdateStatus.code == 200) {
                user.usua_ID = UserUpdateStatus.data.codeStatus;
                iziToastAlert(
                    "La acción ha sido realizada con éxito.", "", "success"
                );
                location.assign("Index");
            }
            else {
                $("#msgErrorForm").show();
                $("#msgErrorForm p").html(UserUpdateStatus.message);
            }
        }


    } else {
    }
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