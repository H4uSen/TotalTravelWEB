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
