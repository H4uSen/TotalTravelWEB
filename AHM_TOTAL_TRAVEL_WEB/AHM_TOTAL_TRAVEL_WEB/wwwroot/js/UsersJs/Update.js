const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");


    $(document).ready(function () {
       var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Users/Find?id=" + idUser);
           if (response.code == 200) {
               var sexo;
                var user = response.data;
               console.log(user);
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
               } else {
                   $("#checkAdmin").prop("checked", false);
               }
               if (user.partnerID != null) {
                   $("#checkPartner").prop("checked", true);
                   $("#checkAdmin").prop("checked", false);
                   GetTypePartners();
                   GetPartners(user.tipoPartner_Id);
                   SetDropDownValue($("#cbbPartners"), user.tipoPartner_Id);
                   SetDropDownValue($("#cbbTipoPartner"), user.tipoPartner_Id);
                   $("#frmSelectPartner").show();
               } else {
                   $("#checkPartner").prop("checked", false);
               }  
            }
    });


//CHECKS

$("#checkPartner").change(function () {
    if ($("#checkPartner").prop("checked") == true) {
        $("#checkAdmin").prop("checked", false);
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

function UpdateUser() {

    var user = new FormData();
    var Role_success = false;
    var Address_success = false;

    const userValidateArray = [
        { validateMessage: "Ingrese el DNI", Jqueryinput: $("#frmCreateUser #txtDNI") },
        { validateMessage: "Ingrese el nombre", Jqueryinput: $("#frmCreateUser #txtNombre") },
        { validateMessage: "Ingrese el apellido", Jqueryinput: $("#frmCreateUser #txtApellido") },
        { validateMessage: "Ingrese el teléfono", Jqueryinput: $("#frmCreateUser #txtTelefono") },
        { validateMessage: "Ingrese la fecha de nacimiento", Jqueryinput: $("#frmCreateUser #txtFechaNacimiento") },
        { validateMessage: "Ingrese el correo electrónico", Jqueryinput: $("#frmCreateUser #txtEmail") },
        { validateMessage: "Seleccione el sexo", Jqueryinput: $("#frmCreateUser input[name='rbGenero']"), check: true },
        { validateMessage: "Seleccione un país", Jqueryinput: $('#frmCreateUser #cbbPaises') },
        { validateMessage: "Seleccione una ciudad", Jqueryinput: $('#frmCreateUser #cbbCiudades') },
        { validateMessage: "Seleccione una colonia", Jqueryinput: $('#frmCreateUser #cbbColonias') },
        { validateMessage: "Ingrese una calle", Jqueryinput: $('#frmCreateUser #txtCalle') },
        { validateMessage: "Ingrese una avenida", Jqueryinput: $('#frmCreateUser #txtAvenida') },
    ];

    const userValidate = ValidateForm(userValidateArray);
    if (userValidate) {

    } else {
        console.log($("input[name='rbGenero']:checked").val());
        console.log("a");
    }
}