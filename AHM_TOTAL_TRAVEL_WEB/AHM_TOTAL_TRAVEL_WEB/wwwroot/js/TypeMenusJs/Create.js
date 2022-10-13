var send = false;
$("#createTypeMenus").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeTypeMenus").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendTypeMenus").click(() => {

    if ($('#Time_Descripcion').val() == 0) {
        $("#labelvalidatorError").html("Rellene este campo.");
    }
    else {
        $("#labelvalidatorError").html(" ");
        send = true;
    }

    if (send) {

        $('#createTypeMenusForm').submit()

    } 

});


// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdTypeMenus tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdTypeMenus").paginationTdA({
        elemPerPage: 5
    });
});

$("#grdTypeMenus").paginationTdA({
    elemPerPage: 5
});