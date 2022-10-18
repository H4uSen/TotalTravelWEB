
// ----------------------------------- INIZIALIZE ------------------------------------

TableSearchInput($("#txtSearch"), $("#grdUsuarios"), elemPerPage = 10)

$("#grdUsuarios").paginationTdA({
    elemPerPage: 10
});

// ----------------------------------- EVENTS ------------------------------------

// ----------------------------------- FUNCTIONS ------------------------------------

function DeleteUser(User_Id) {
    const callback = () => {

        const response = ajaxRequest(`Users/Delete?User_Id=${User_Id}`, null, "POST");
        if (response > 0) {
            window.location.href = '/Users?success=true';
        }
    };

    sweetAlertconfirm(
        "Estas Seguro de Eliminar el Registro Seleccionado?",
        "Este registro se borrara permanentemente", "warning",
        callback
    );

};