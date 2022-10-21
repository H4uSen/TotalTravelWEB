$('.ui.dropdown').dropdown();


function updateDefaultPackages() {

    
    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Descripcion") },
        { validateMessage: "Ingrese un precio.", Jqueryinput: $("#Precio") },
        { validateMessage: "Ingrese una Duración.", Jqueryinput: $("#Duracion") },
        { validateMessage: "Seleccione un hotel.", Jqueryinput: $("#hote_ID") },

    ];

    validateArrayForm2 = [
        { validateMessage: "Seleccione un restaurante.", Jqueryinput: $("#rest_ID") },

    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);
    const ValidateFormStatus2 = ValidateForm(validateArrayForm2);

    //const callback = function () {
    //    var validate = false;
    //    if ($("#checkResta").prop("checked") == true) {
    //        if ($("#rest_ID").val() != 0) {
    //            validate = true;

    //        }
    //    }
    //    return validate;
    //}
    //const restaurantvalidate = ManualValidateForm(
    //    callback,
    //    $("#restau").parent(),
    //    "Seleccione un restaurante"
    //)

    if ($("#checkResta").prop("checked") == true) {
        if (ValidateFormStatus && ValidateFormStatus2) {
            $("#frmUpdateDefaultPackagues").submit();
        }
    }
    else {
        if (ValidateFormStatus) {
            $("#frmUpdateDefaultPackagues").submit();
        }
    }


}
