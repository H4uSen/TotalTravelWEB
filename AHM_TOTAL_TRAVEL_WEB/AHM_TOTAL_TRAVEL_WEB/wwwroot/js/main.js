
// ----------------------------------- INIZIALIZE ------------------------------------

$("input[type=text]").prop("autocomplete", "off");
var Client_User_ID = parseInt(GetCookie("User_Id"));
var Client_User_Name = GetCookie("User_Name");

const user_FileName = `User-${Client_User_ID}`;
const url_image = `totaltravelapi.azurewebsites.net/Images/UsersProfilePics/${user_FileName}/${user_FileName}_photo-1.jpg`
$("#user_image").prop("src", "https://" + url_image);

// ----------------------------------- EVENTS ------------------------------------


// ----------------------------------- FUNCTIONS ------------------------------------

function ValidateForm(inputArray = []) {
    var Validate = [];

    //recorre cada input en array
    $.each(inputArray, function (i, item) {

        const parent = $(item.Jqueryinput).parents(".field")[0];

        if ($(item.Jqueryinput).val() == 0 || $(item.Jqueryinput).val() == null) {

            //crea span item
            var labelvalidator = document.createElement("span");
            labelvalidator.className = "labelvalidator";
            labelvalidator.innerText = item.validateMessage;

            //si valor de input esta vacio añade spam de error
            if ($(parent).find("span.labelvalidator").length == 0) {
                $(item.Jqueryinput).parents(".field")[0].append(labelvalidator);
            }

            $(parent).addClass("error");

            //añade item de status sobre el input actual
            Validate.push(
                { item: item.Jqueryinput, status: false }
            );
        }
        else {

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
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            successfunction();
        }
    })
}

    //----------------------------- BUSCADOR TABLE JS----------------------------------------

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

            var response = null;
            var Token = null;
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
                success: function (httpResponse) {
                    response = httpResponse;
   
                },
                error: function (httpResponse) {
                    response = httpResponse;
                }
            });

            return response;
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

    function GetDropDownValue(DropDown) {
        $(DropDown).find("select").val();
    }

    function SetDropDownPlaceholder(DropDown, text) {
        $(DropDown).parent().find(".default.text").html(text);
        $(DropDown).parent().find(".text").html(text);
        /*
        if ($(DropDown).parent().find(".default.text").length > 0) {
            $(DropDown).parent().find(".default.text").html(text);
        } else {
            $(DropDown).parent().append(
                `<div class="default text">${text}</div>`
            );
        }*/
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
