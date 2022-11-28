$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createTypesActivities").click(() => {
    $("#modalCreate").modal('show');
});


$("#send").click(() => {
    validar();
})

function validar() {

    validateArrayForm = [
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#modalCreate #TiAc_Descripcion") },
        
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createTypesActivitiesForm").submit();
    }

}

function editar(TipoActividadID) {
    var response = ajaxRequest(urlAPI +"/API/TypeActivities/Find?id=" + TipoActividadID);
    if (response.code == 200) {
        var item = response.data;


        $("#modalUpdate #TiAc_ID").val(item.id);
        $("#modalUpdate #TiAc_Descripcion").val(item.descripcion);

        $("#modalUpdate").modal("show");

    }
    
}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingresar una descripcion", Jqueryinput: $("#modalUpdate #TiAc_Descripcion") },
       
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#updateTypesActivitiesForm").submit();
    }
}