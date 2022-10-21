
// ----------------------------------- INIZIALIZE ------------------------------------

    $("input[type=text]").prop("autocomplete", "off");
    var Client_User_ID = parseInt(GetCookie("User_Id"));
    var Client_User_Name = GetCookie("User_Name");
    $("#loaderAnimation").hide();

// ----------------------------------- EVENTS ------------------------------------

    const user_FileName = `User-${Client_User_ID}`;
    const url_image = `totaltravelapi.azurewebsites.net/Images/UsersProfilePics/${user_FileName}/${user_FileName}_photo-1.jpg`
    $("#user_image").prop("src", "https://" + url_image);


// ----------------------------------- FUNCTIONS ------------------------------------


    // ----------------------------------- FILE FORMAT ------------------------------------
    async function createBlob(url) {
        var response = await fetch(url);
        response.headers = { type: 'image/jpeg' };
        var data = await response.blob();
        return data;
    }

    function convertImage(file) {
        return new Promise((resolve) => {
            const read = new FileReader();

            read.onload = () => resolve({
                src: read.result,
                fileName: file.name
            });

            read.readAsDataURL(file);
        });
    }

    // ----------------------------------- FORM VALIDATE ------------------------------------
    // si calback retorna true, crea span en containerDiv
    function ManualValidateForm(callback = () => { return true; }, containerDiv, validateMessage = "Rellene este campo") {
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

            //añade item de status sobre el input actual
            return false;
        }

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


    // ----------------------------------- ALERTS ------------------------------------
    //se utiliza para alertas de campos vacios
    function iziToastAlert(title = "An error ocurred", message = "", type = "error") {
        const colors = {
            success: 'green',
            error: 'red',
            warning: 'yellow',
            info: 'blue'
        };

        iziToast.show({
            color: colors[type],
            icon: `ico-${type}`,
            title: title,
            message: message,
        });
    }

    // se utiliza para alertas de completado o error
    function sweetAlert(title = "An error ocurred", message = "", type = "error") {
        Swal.fire(
            title,
            message,
            type
        )
    }

    /*
        se utiliza para dar alertas de confirmacion de usuario, ejemplo al eliminar un registro,
        el parametro successfunction: es la funcion que se ejecutara al dar confirm en la alerta,
        ejemplo de formar parametro:
            const successfunction = () => { 
                 ** contenido de la funcion **
            };
    */
    function sweetAlertconfirm(title = "An error ocurred", message = "", type = "error", successfunction = () => { alert("prueba"); }) {

        Swal.fire({
            title: title,
            text: message,
            icon: type,
            showCancelButton: true,
            confirmButtonColor: '#A97BC4',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                successfunction();
            }
        })
    }

    //----------------------------- TABLE JS----------------------------------------

    function TableSearchInput(SearchInput, Table, elemPerPage = 10) {
        $(SearchInput).keyup(function () {
            _this = this;
            $.each($(Table).find("tbody tr"), function () {
                if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
                    $(this).hide();
                }
                else {
                    $(this).show();
                }
            });

            $(Table).paginationTdA({
                elemPerPage: elemPerPage
            });
        });
    }

    function TableDetailsConstructor(Table) {

        $(Table).find("thead tr").eq(0).prepend('<th width="50px"></th>');

        for (let i = 0; i < $(Table).find("tbody tr").length; i++) {
            const tr = $(Table).find("tbody tr")[i];

            $(tr).prop("id", `row_${i}`);
            $(tr).addClass("rows");
            $(tr).prepend(
                `<td style="padding: 14px;">
                    <button class="ui icon mini button green circular details_button">
                        <i class="plus icon"></i>
                    </button>
                </td>`
            );
        }
    }

    function MostrarDetalle(
        detail_row = {
            table: $(""),
            row_Index: 0,
            content : '<h1 class="ui red header">NO DATA AVALIABLE</h1>'
        }
    ) {
        //busca row principal
        const tr_details = $(detail_row.table).find(`tbody #row_${detail_row.row_Index}`);
        const button = $(tr_details).find("button.details_button");

        //saca dato de total de max colspan
        const colspan = $(detail_row.table).find("thead th").length;

        //almacena row de details en base al index pasado
        const content = $(detail_row.table).find(`tbody #row_${detail_row.row_Index}_details`);

        //valida si existe
        if (content.length > 0) {

            //cambia estado de el boton
            $(button).addClass("green").removeClass("red");
            $(button).find("i").removeClass("minus").addClass("plus");

             //elimina tr de details
            $(content).remove();

        } else { // si no lo crea

            //cambia estado de el boton
            $(button).addClass("red").removeClass("green");
            $(button).find("i").removeClass("plus").addClass("minus");

            //crea tr de details
            $(tr_details).after(
                `<tr id="row_${detail_row.row_Index}_details" class="row_details">
                    <td colspan="${colspan}">
                        ${detail_row.content}
                    </td>
                </tr>`
            );
        }
    }

    //----------------------------- PETICIONES AJAX ----------------------------------------

    function GetCookie(value) {
        var key = null;
        $.ajax({
            url: "https://localhost:44366/read-claims?key=" + value,
            data: {},
            method: "GET",
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            },
            async: false,
            success: function (response) {
                key = response.data;
            }
        });

        return key;
        console.log("https://localhost:44366/read-claims?key=" + value);
    }

    function ajaxRequest(url, data = {}, method = "GET", SendToken = true) {

        var dataResponse = null;
        var Token = null;
        var HTTPError = {
            message: '',
            code: 0,
            success: false,
            data: null
        }

        if (SendToken == true) {
            Token = GetCookie("Token");
        }

        $.ajax({
            url: url,
            data: JSON.stringify(data),
            method: method,
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
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

    function uploadFile(url, data = new FormData(), method = "GET", SendToken = true) {

        var dataResponse = null;
        var Token = null;
        var HTTPError = {
            message: "",
            code: 0,
            success: false,
            data: null
        }

        if (SendToken == true) {
            Token = GetCookie("Token");
        }

        $.ajax({
            url: url,
            data: data,
            mimeType: "multipart/form-data",
            headers: {
                'Authorization': `Bearer ${Token}`
            },
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

    function FindGetValue(Get_KeyName="") {
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

     //----------------------------- SEMANTIC FUNCTIONS HELPERS ----------------------------------------
    function AddDropDownItem(DropDown, item = { value: 0, text: "" }) {

        $(DropDown).parent().find(".menu").append(
            `<div class="item" data-value="${item.value}" data-text="${item.text}">${item.text}</div>`
        );
        $(DropDown).append(
            `<option value="${item.value}">${item.text}</option>`
        );
    }

    function ClearDropDownItem(DropDown) {
        $(DropDown).parent().find(".menu").empty();
        $(DropDown).empty();
    }

    function SetDropDownValue(DropDown, defaultValue = "") {

        $(DropDown).find(`option[value = "${defaultValue}"]`).prop("selected", true);

        const parent = $(DropDown).parent();

        //remueve item selected actual
        parent.find(`.menu div.item`).removeClass("active selected");

        //encuentra default
        const item = parent.find(`.menu div.item[data-value="${defaultValue}"]`);
        $(item[0]).addClass(["active", "selected"]);

        //setea texto
        $(parent).find(".text").removeClass("default");
        $(parent).find(".text").html(
            $(item[0]).attr("data-text")
        );

    }

    function SetDropDownPlaceholder(DropDown) {
        $(DropDown).dropdown('restore defaults');

    }

    function getCalendarDate(stringDate) {
        var date = new Date(stringDate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return year + '-' + month + '-' + day;
}

    function FillDropDown(
        dropdownData = {
            dropdown: $(),
            items: {
                list: [],
                valueData: "",
                textData: ""
            },
            placeholder: {
                empty: "No se encontraron opciones",
                default: "Seleccione una opcion",
            },
            semantic: true
        }
    ){

        // get dropdpwn atributes
        const dropDown = $(dropdownData.dropdown);
        const dropdownClass = dropDown.attr('class');
        const id = dropDown.attr('id');
        const name = dropDown.attr('name');

        //create and set dropdown atributes
        var newDropdown = document.createElement("select");
        $(newDropdown).attr('class', dropdownClass);
        $(newDropdown).attr('id', id);
        $(newDropdown).attr('name', name);


        if (dropdownData.items.list.length > 0) {

            var placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.innerText = dropdownData.placeholder.default;
            //set placeholder
            newDropdown.append(placeholder);

            for (let i = 0; i < dropdownData.items.list.length; i++) {
                const item = dropdownData.items.list[i];
                const value = item[dropdownData.items.valueData];
                const text = item[dropdownData.items.textData];

                //create option
                var option = document.createElement("option");
                option.value = value;
                option.innerText = text;

                newDropdown.append(option);
            }

        }
        else {
            var placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.innerText = dropdownData.placeholder.empty;
            //set placeholder
            newDropdown.append(placeholder);
        }

        if (dropdownData.semantic) {
            $(newDropdown).addClass(["ui", "dropdown", "search"]);
        }
        if (dropdownData.items.list.length > 10) {
            $(newDropdown).addClass("search");
        }

        const actualDropDown = $($(dropDown).parents(".field")[0]).find("div.ui.dropdown");
        $(actualDropDown).replaceWith(newDropdown);
}

//----------------------------- DATE FORMAT ----------------------------------------
    function GetDateFormat(dateConfig = { string_date: "", hour_format: 12, date_format: "short"}) {
        const months = [
            "enero", "febrero", "marzo", "abril",
            "mayo", "junio", "julio", "agosto",
            "septiembre","octubre","noviembre","diciembre"
        ]
        var datetime = {
            year: "",
            month: "",
            day: "",
            hour: "",
            minute: "",
            format: 12
        }

        const datetimeArray = dateConfig.string_date.split("T");
        const dateArray = datetimeArray[0].split("-");
        const timeArray = datetimeArray[1].split(":");

        // get date
        datetime.year = dateArray[0];
        datetime.month = dateArray[1];
        datetime.day = dateArray[2];

        // get time
        datetime.hour = timeArray[0];
        datetime.minute = timeArray[1];

        // create time format
        dateConfig.time = `${datetime.hour}:${datetime.minute}`;
        if (dateConfig.hour_format == 12) {

            datetime.hour = parseInt(datetime.hour);
            dateConfig.time =
                datetime.hour > 12
                    ? `${datetime.hour - 12}:${datetime.minute} PM`
                    : `${datetime.hour}:${datetime.minute} AM`;
        }

        // create date format
        dateConfig.date = datetimeArray[0];
        if (dateConfig.date_format.toLowerCase() == "large") {
            datetime.month_name = months[datetime.month];
            dateConfig.date = `${datetime.day} de ${months[datetime.month]}, ${datetime.year}`;
        }
        else if (dateConfig.date_format.toLowerCase() == "short") {

            const month_name = months[datetime.month].substring(0, 3);
            datetime.month_name = month_name;
            dateConfig.date = `${datetime.day} de ${month_name}, ${datetime.year}`;
        }

        //construct response datetime
        dateConfig.datetime = `${dateConfig.date} a las ${dateConfig.time}`
        dateConfig.datetime_data = datetime;

        return dateConfig;
    }
