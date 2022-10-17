$('.ui.dropdown').dropdown();

$("#createTipoPartner").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeTipoPartner").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendTipoPartner").click(() => {

    const ValidateArray = [
        { validateMessage: "Ingrese una descripcion de tipo de socio", Jqueryinput: $("#TiPar_Descripcion") },
        { validateMessage: "Seleccione un Rol para el socio", Jqueryinput: $("#Rol_ID") }
    ];
    const userValidate = ValidateForm(ValidateArray);
    if (userValidate) {
        $("#createTipoPartnerForm").submit();
    }

});
