var send = false;
$("#createRoles").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeRoles").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendRoles").click(() => {

    validateArrayForm = [
        { validateMessage: "Ingrese un rol.", Jqueryinput: $("#Role_Descripcion") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        $('#createRolesForm').submit()
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

    $("#grdRoles").paginationTdA({
        elemPerPage: 10
    });
});

$("#grdRoles").paginationTdA({
    elemPerPage: 10
});