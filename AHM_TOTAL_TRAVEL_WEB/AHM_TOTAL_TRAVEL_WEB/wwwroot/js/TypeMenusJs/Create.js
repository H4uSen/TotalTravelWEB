var send = false;
$("#createTypeMenus").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeTypeMenus").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendTypeMenus").click(() => {

    validateArrayForm = [
        { validateMessage: "Ingrese un tipo menú.", Jqueryinput: $("#Time_Descripcion") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
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
        elemPerPage: 10
    });
});

$("#grdTypeMenus").paginationTdA({
    elemPerPage: 10
});