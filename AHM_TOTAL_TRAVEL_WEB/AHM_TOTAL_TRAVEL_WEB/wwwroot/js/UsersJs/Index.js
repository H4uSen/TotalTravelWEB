
// ----------------------------------- INIZIALIZE ------------------------------------

TableSearchInput($("#txtSearch"), $("#grdUsuarios"), elemPerPage = 10);

TableDetailsConstructor($("#grdUsuarios"));

$("#grdUsuarios").paginationTdA({
    elemPerPage: 10
});

$("#grdUsuarios tbody tr .details_button").click((_this) => {

    const tr = $(_this.target).parents("tr");
    const index = $("#grdUsuarios tbody tr").index(tr);

    MostrarDetalle(
        detail_row = {
            table: $("#grdUsuarios"),
            row_Index: index,
            content: '<h1 class="ui red header">Hola mundo</h1>'
        }
    )
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