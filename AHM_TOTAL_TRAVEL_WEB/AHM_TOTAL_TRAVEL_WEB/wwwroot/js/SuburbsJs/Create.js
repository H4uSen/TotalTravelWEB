$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createSuburbs").click(() => {
    $("#modalCreate").modal('show');
});

$("#close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#send").click(() => {
    validar();
})

function validar() {

    validateArrayForm = [
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#Colonia") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_ID") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createSuburbsForm").submit();
    }

}