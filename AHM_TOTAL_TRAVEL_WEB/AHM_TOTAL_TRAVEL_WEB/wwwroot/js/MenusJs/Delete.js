// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdMenus tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdMenus").paginationTdA({
        elemPerPage: 10
    });
});

$("#grdMenus").paginationTdA({
    elemPerPage: 10
});


function DeleteMenus(id) {
    const capsula1 = () => {
        var response = ajaxRequest("Menus/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Menus?success=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};