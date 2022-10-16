// ------------------------------------------------------- //
//   Inject SVG Sprite -
//   see more here
//   https://css-tricks.com/ajaxing-svg-sprite/
// ------------------------------------------------------ //
//function injectSvgSprite(path) {

//    var ajax = new XMLHttpRequest();
//    ajax.open("GET", path, true);
//    ajax.send();
//    ajax.onload = function (e) {
//        var div = document.createElement("div");
//        div.className = 'd-none';
//        div.innerHTML = ajax.responseText;
//        document.body.insertBefore(div, document.body.childNodes[0]);
//    }
//}
//// this is set to BootstrapTemple website as you cannot
//// inject local SVG sprite (using only 'icons/orion-svg-sprite.svg' path)
//// while using file:// protocol
//// pls don't forget to change to your domain :)
//injectSvgSprite('https://bootstraptemple.com/files/icons/orion-svg-sprite.svg');
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

function registerUser() {


    validateArrayForm = [
        { validateMessage: "Ingrese el DNI.", Jqueryinput: $("#txtDni")},
        { validateMessage: "Ingrese su nombre", Jqueryinput: $("#txtNombre")},
        { validateMessage: "Ingrese su apellido", Jqueryinput: $("#txtApellido")},
        { validateMessage: "Ingrese su fecha de nacimiento", Jqueryinput: $("#txtFechaNac")},
        { validateMessage: "Ingrese su teléfono", Jqueryinput: $("#txtTelefono") },
        { validateMessage: "Ingrese su correo electrónico", Jqueryinput: $("#txtEmail") },
        { validateMessage: "Ingrese una calle", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenidad", Jqueryinput: $("#Avenida") },
        { validateMessage: "Seleccione un país", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad", Jqueryinput: $("#City_ID") },
        { validateMessage: "Seleccione una ciudad", Jqueryinput: $("#Col_ID") },


    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    var passwordValidator = false;
    

    if ($("input[name='gender']:checked").val() == undefined) {
        $("#labelvalidatorSexo").html("Seleccione un sexo.");
        $("input[name='gender']").addClass("error");
    } else {

        $("#labelvalidatorSexo").html(" ");
        $("input[name='gender']").removeClass("error");
    }
    if ($('#txtPassword').val() == 0 || $('#txtPassword2').val() == 0) {
        $("#labelvalidatorPass").html("Ingrese su contraseña.");
        $(this).addClass("error");
        $("input#txtPassword2").addClass("error");
    } else if ($('#txtPassword').val() != $('#txtPassword2').val()) {
        $("#labelvalidatorPass").html("Las contraseñas no coinciden.");
        $("input#txtPassword").addClass("error");
        $("input#txtPassword2").addClass("error");
    } else if ($('#txtPassword2').val().length < 6) {
        $("#labelvalidatorPass").html("La contraseña es muy corta.");
        $("input#txtPassword").addClass("error");
        $("input#txtPassword2").addClass("error");
    }
    else {
        $("#labelvalidatorPass").html(" ");
        $("input#txtPassword").removeClass("error");
        passwordValidator = true;
    }

    


    if (ValidateFormStatus == true && passwordValidator == true && $("input[name='gender']:checked").val() != undefined) {

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
        }

        if (direStatus) {
            /*var images = [];*/
            var data = new FormData();
            data.append("usua_DNI", $('#txtDni').val());
            data.append("usua_Nombre", $('#txtNombre').val());
            data.append("usua_Apellido", $('#txtApellido').val());
            data.append("usua_FechaNaci", $('#txtFechaNac').val());
            data.append("usua_Telefono", $('#txtTelefono').val());
            data.append("usua_Sexo", $("input[name='gender']:checked").val());
            data.append("usua_Email", $('#txtEmail').val());
            data.append("usua_Password", $('#txtPassword2').val());
            data.append("dire_ID", parseInt(DireID));
            data.append("usua_esAdmin", 0);
            data.append("role_ID", 2);
            data.append("part_ID", 0);
            data.append("usua_UsuarioCreacion", 1);
            data.append("file", null);
            //for (let i = 0; i < $('#File').prop('files').length; i++) {
            //    const file = $('#File').prop('files')[i];
            //    images.push(file); //IFORMFILE
            //}


            var response = uploadFile("https://totaltravel.somee.com/API/Users/Insert", data, "POST");

            if (response.data.codeStatus > 0) {
                window.location.href = '/Access/LogIn';


            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }

    }

}
