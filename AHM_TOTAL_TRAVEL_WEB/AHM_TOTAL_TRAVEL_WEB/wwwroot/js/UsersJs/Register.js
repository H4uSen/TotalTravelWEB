$('.ui.dropdown').dropdown();


/* MODELS */
var UserViewModel = {
    "usua_ID": 0,
    "usua_DNI": "string",
    "usua_Url": "string",
    "usua_Nombre": "string",
    "usua_Apellido": "string",
    "usua_FechaNaci": "2022-09-29T01:11:34.578Z",
    "usua_Email": "string",
    "usua_Sexo": "string",
    "usua_Telefono": "string",
    "usua_Password": "string",
    "usua_esAdmin": 0,
    "usua_Salt": "string",
    "role_ID": 0,
    "dire_ID": 0,
    "part_ID": 0,
    "usua_UsuarioCreacion": 2,
    "usua_FechaCreacion": "2022-09-29T01:11:34.578Z",
    "usua_UsuarioModifica": 2,
    "usua_FechaModifica": "2022-09-29T01:11:34.578Z",
    "usua_Estado": true
}
var AdressViewModel = {
    "id": 0,
    "colo_ID": 0,
    "dire_Calle": "string",
    "dire_Avenida": "string",
    "dire_UsuarioCreacion": 2,
    "dire_UsuarioModifica": 2
}

/* EVENTOS*/
function ajaxRequest(url, data = {}, method = "GET") {

    var dataResponse = null;
    var HTTPError = {
        message: '',
        code: 0,
        success: false,
        data: null
    }

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        method: method,
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        async: false,
        beforeSend: function () {
            $("#loaderAnimation").show();
        },
        complete: function () {
            $("#loaderAnimation").hide();
        },
        success: function (response) {
            dataResponse = response;
        },
        error: function (jqXHR, exception) {
            HTTPError.code = jqXHR.status;
            HTTPError.data = jqXHR;
            HTTPError.message += "Request http Error: " + url + ", Exception: ";

            // http errors 
            if (jqXHR.status === 0) {
                HTTPError.message += 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                HTTPError.message += 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                HTTPError.message += 'Internal Server Error [500].';
            } else if (jqXHR.status == 401) {
                HTTPError.message += 'Unauthorized Server Action [401].';
            }

            // exception errors
            else if (exception === 'parsererror') {
                HTTPError.message += 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                HTTPError.message += 'Time out error.';
            } else if (exception === 'abort') {
                HTTPError.message += 'Ajax request aborted.';
            } else {
                HTTPError.message += jqXHR.responseText;
            }
            dataResponse = HTTPError;
            console.log(HTTPError);
        }
    });

    return dataResponse;
}

function uploadFile(url, data = new FormData(), method = "GET") {

    var dataResponse = null;

    var HTTPError = {
        message: "",
        code: 0,
        success: false,
        data: null
    }

    $.ajax({
        url: url,
        data: data,
        mimeType: "multipart/form-data",
        async: false,
        processData: false,
        contentType: false,
        type: method,
        beforeSend: function () {
            $("#loaderAnimation").show();
        },
        complete: function () {
            $("#loaderAnimation").hide();
        },
        success: function (httpResponse) {
            dataResponse = JSON.parse(httpResponse);
        },
        error: function (jqXHR, exception) {
            /*jqXHR = JSON.parse(jqXHR);*/

            HTTPError.code = jqXHR.status;
            HTTPError.data = jqXHR;
            HTTPError.message += "Request http Error: " + url + ", Exception: ";

            // http errors 
            if (jqXHR.status === 0) {
                HTTPError.message += 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                HTTPError.message += 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                HTTPError.message += 'Internal Server Error [500].';
            } else if (jqXHR.status == 401) {
                HTTPError.message += 'Unauthorized Server Action [401].';
            }

            // exception errors
            else if (exception === 'parsererror') {
                HTTPError.message += 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                HTTPError.message += 'Time out error.';
            } else if (exception === 'abort') {
                HTTPError.message += 'Ajax request aborted.';
            } else {
                HTTPError.message += jqXHR.responseText;
            }
            dataResponse = HTTPError;
            console.log(HTTPError);
        }
    });

    return dataResponse;
}

function ValidateForm(inputArray = [], reset = false) {
    var Validate = [];

    if (reset) {
        const parent = $(item.Jqueryinput).parents(".field")[0];
        $.each(inputArray, function (i, item) {

            $(parent).find("span.labelvalidator").remove();
            $(parent).removeClass("error");
            $(item.Jqueryinput).val("");

        });

        return true;
    } else {
        //recorre cada input en array
        $.each(inputArray, function (i, item) {

            var parent = $(item.Jqueryinput).parents(".field")[0];
            var empty = false;
            //crea span item
            var labelvalidator = document.createElement("span");
            labelvalidator.className = "labelvalidator";
            labelvalidator.innerText = item.validateMessage;

            //valida tipo de inpur y si esta vacio 
            if (item.check == true) { //check box o radio button
                parent = $(item.Jqueryinput).parents(".checkButton_container")[0];

                if ($(item.Jqueryinput).find(":checked").length == 0) {
                    empty = true;
                }
            }
            else if (item.file == true) { //input file
                if ($(item.Jqueryinput).prop("files")[0] == undefined || $(item.Jqueryinput).prop("files")[0] == null) {
                    empty = true;
                }
            }
            else { //inputs(text,number...), selects
                if ($(item.Jqueryinput).val() == 0 || $(item.Jqueryinput).val() == null) {
                    empty = true;
                }
            }

            //ajecuta funcionalidad de label
            if (empty) {
                if ($(parent).find("span.labelvalidator").length == 0) {
                    $(parent).append(labelvalidator);
                }

                $(parent).addClass("error");

                //añade item de status sobre el input actual
                Validate.push(
                    { item: item.Jqueryinput, status: false }
                );

            } else {
                //si valor de input esta llena remueve spam de error
                $(parent).find("span.labelvalidator").remove();
                $(parent).removeClass("error");

                //añade item de status sobre el input actual
                Validate.push(
                    { item: item.Jqueryinput, status: true }
                );
            }

        });

        //filtra status items en false
        var statusFilter = jQuery.grep(Validate, function (item, i) {
            return item.status == false;
        });

        if (statusFilter.length == 0) {
            return true;
        }

        return false;
    }

}

function ClearDropDownItem(DropDown) {
    $(DropDown).parent().find(".menu").empty();
    $(DropDown).empty();
}
function AddDropDownItem(DropDown, item = { value: 0, text: "" }) {

    $(DropDown).parent().find(".menu").append(
        `<div class="item" data-value="${item.value}" data-text="${item.text}">${item.text}</div>`
    );
    $(DropDown).append(
        `<option value="${item.value}">${item.text}</option>`
    );
}










/* FORMULARIO*/
$('#Count_ID').change(function () {


    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
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


    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
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

function FindGetValue(Get_KeyName = "") {
    var Get_KeyValue = null;

    // get url search content after "?" 
    //example: www.url?get_var=5
    //return : get_var=5
    var url_query = location.search.substring(1);

    //split vars and get in array
    var gets_vars = url_query.split("&");

    for (var i = 0; i < gets_vars.length; i++) {
        //divide la key from the value in item
        var var_key = gets_vars[i].split("=");

        // if key is equal to query key return value key
        if (var_key[0] == Get_KeyName) {
            //get value key
            Get_KeyValue = var_key[1];
            break;
        }
    }

    //return value key
    return Get_KeyValue;
}

function registerUser() {


    validateArrayForm = [
        { validateMessage: "Ingrese el DNI.", Jqueryinput: $("#txtDni") },
        { validateMessage: "Ingrese su nombre", Jqueryinput: $("#txtNombre") },
        { validateMessage: "Ingrese su apellido", Jqueryinput: $("#txtApellido") },
        { validateMessage: "Ingrese su fecha de nacimiento", Jqueryinput: $("#txtFechaNac") },
        { validateMessage: "Ingrese su teléfono", Jqueryinput: $("#txtTelefono") },
        { validateMessage: "Ingrese su contraseña", Jqueryinput: $("#txtPassword") },
        { validateMessage: "Confirme su contraseña", Jqueryinput: $("#txtPassword2") },
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
        $("#labelvalidatorPass").html(" ");
        $("input#txtPassword").removeClass("error");
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



    function ManualValidateForm(callback = true,  containerDiv, validateMessage = "Rellene este campo") {
        //crea span item
        var labelvalidator = document.createElement("span");
        labelvalidator.className = "labelvalidator";
        labelvalidator.innerText = validateMessage;

        if (callback) {
            if ($(containerDiv).find("span.labelvalidator").length == 0) {
                $(containerDiv).append(labelvalidator);
            }
            $(containerDiv).addClass("error");

            return true;
        } else {
            $(containerDiv).find("span.labelvalidator").remove();
            $(containerDiv).removeClass("error");
            return false;
        }

    }


    if (ValidateFormStatus == true && passwordValidator == true && $("input[name='gender']:checked").val() != undefined) {

        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Col_ID').val());
        dire.dire_Calle = $('#Calle').val();
        dire.dire_Avenida = $('#Avenida').val();

        var responseAddress = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Address/Insert", dire, "POST");
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


            var response = uploadFile("https://apitotaltravel.azurewebsites.net/API/Users/Insert", data, "POST");

            if (response.data.codeStatus > 0) {
                
                var id_paque = FindGetValue("id_paquete");
                if (id_paque != null) {
                    window.location.href = `/BuyDefaults/defaultPackages?id_paquete=${id_paque}`;
                }
                else {
                    window.location.href = '/Access/LogIn';
                }


            } else {
                if (response.data.messageStatus == "El DNI ya existe.") {
                    ManualValidateForm(true,$("#txtDni").parents(".field").eq(0), "El DNI ya existe.");
                } else if (response.data.messageStatus == "El EMAIL ya existe.") {
                    ManualValidateForm(true,$("#txtEmail").parents(".field").eq(0), "El correo electrónico ya existe.");
                    // $("#labelvalidatorError").html("El correo electrónico ya existe.");
                }
                else {
                   // $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
                }
                
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }

    }

}
