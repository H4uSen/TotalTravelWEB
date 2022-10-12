var send = false;
$("#createTypeMenus").click(() => {
    $(".ui.modal").modal('show');
});

$("#closeTypeMenus").click(() => {
    $(".ui.modal").modal('hide');
});

$("#sendTypeMenus").click(() => {

    if ($('#Time_Descripcion').val() == 0) {
        $("#labelvalidatorError").html("Rellene este campo.");
    }
    else {
        $("#labelvalidatorError").html(" ");
        send = true;
    }
    console.log($('#Time_Descripcion').val());

    if (send) {

        $('#createTypeMenusForm').submit()

    } else {
        console.log("no se envia");
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