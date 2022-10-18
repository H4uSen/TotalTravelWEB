const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}

// ----------------------------------- EVENTS ------------------------------------
//TableSearchInput(SearchInput, Table, elemPerPage = 10)
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdRestaurants tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdRestaurants").paginationTdA({
        elemPerPage: 10
    });
});

$("#grdRestaurants").paginationTdA({
    elemPerPage: 10
});

function DeleteRestaurant(id) {
    const capsula1 = () => {
        var response = ajaxRequest("Restaurant/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Restaurant?success=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};