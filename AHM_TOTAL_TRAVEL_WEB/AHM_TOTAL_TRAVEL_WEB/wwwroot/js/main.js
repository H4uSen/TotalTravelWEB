
// ----------------------------------- INIZIALIZE ------------------------------------

$("input[type=text]").prop("autocomplete", "off");

// ----------------------------------- EVENTS ------------------------------------


// ----------------------------------- FUNCTIONS ------------------------------------

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

function GetToken() {
    var Token = null;
    $.ajax({
        url: "https://localhost:44366/read-claims?key=Token",
        data: {},
        method: "GET",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        async: false,
        success: function (response) {
            Token = response.data;
        }
    });

    return Token;
}

function ajaxRequest(url, data, method = "POST", SendToken = true) {
    var dataResponse = null;
    const Token = null;
    if (SendToken == true) {
        Token = GetToken();
    }

    $.ajax({
        url: url,
        data: data,
        method: method,
        dataType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${Token}`
        },
        async: false,
        success: function (response) {
            dataResponse = response;
        },
        error: function (error) {
            console.log(error);
        }
    });

    return dataResponse;
}
