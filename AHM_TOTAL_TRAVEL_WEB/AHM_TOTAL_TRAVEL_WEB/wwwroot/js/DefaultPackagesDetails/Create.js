$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createDefaultPackagesDetails").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeDefaultPackagesDetails").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendDefaultPackagesDetails").click(() => {
    validar();
})

function validar() {

    validateArrayForm = [
        { validateMessage: "Seleccione un Paquete predeterminado.", Jqueryinput: $("#modalCreate #paqu_ID") },
        { validateMessage: "Seleccione una actividad.", Jqueryinput: $("#modalCreate #Actv_ID") },
    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createDefaultPackagesDetailsForm").submit();
    }

}

function editar(ID) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/DefaultPackagesDetails/Find?id=" + ID);
    if (response.code == 200) {
        var item = response.data;
        SetDropDownValue($("#modalUpdate #Paqu_ID"), defaultValue = item.paqueteID);
        SetDropDownValue($("#modalUpdate #Actv_ID"), defaultValue = item.actividadID);

        $("#modalUpdate #PaDe_ID").val(item.id);

        $("#modalUpdate").modal("show");

    }
}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Seleccione un Paquete predeterminado.", Jqueryinput: $("#modalUpdate #Paqu_ID") },
        { validateMessage: "Seleccione una actividad.", Jqueryinput: $("#modalUpdate #Actv_ID") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#updateDefaultPackagesDetailsForm").submit();
    }
}