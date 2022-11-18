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
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#modalCreate #Precio") },
        { validateMessage: "Ingrese cantidad.", Jqueryinput: $("#modalCreate #Cantidad") },
    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createDefaultPackagesDetailsForm").submit();
    }
  

}

function editar(ID) {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackagesDetails/Find?id=" + ID);
    if (response.code == 200) {
        var item = response.data;
        $("#PaDe_ID").val(ID);
        SetDropDownValue($("#modalUpdate #Paqu_ID_up"), defaultValue = item.paqueteID);
        SetDropDownValue($("#modalUpdate #Actv_ID_up"), defaultValue = item.actividadID);
        $("#Precio_up").val(response.data.precio);
        $("#Cantidad_up").val(response.data.cantidad);
        $("#modalUpdate").modal("show");

    }
}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Seleccione un Paquete predeterminado.", Jqueryinput: $("#modalUpdate #Paqu_ID_up") },
        { validateMessage: "Seleccione una actividad.", Jqueryinput: $("#modalUpdate #Actv_ID_up") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#modalUpdate #Precio_up") },
        { validateMessage: "Ingrese cantidad.", Jqueryinput: $("#modalUpdate #Cantidad_up") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    var id = $("#PaDe_ID").val();
    if (ValidateFormStatus) {
        var data = detallespaquete;
        data.paqu_ID = parseInt($("#modalUpdate #Paqu_ID_up").val());
        data.actv_ID= parseInt($("#modalUpdate #Actv_ID_up").val());
        data.paDe_Precio =parseFloat($("#modalUpdate #Precio_up").val());
        data.paDe_Cantidad=parseInt($("#modalUpdate #Cantidad_up").val());
        data.paDe_UsuarioModifica= Client_User_ID;

        var status = ajaxRequest(`https://apitotaltravel.azurewebsites.net/API/DefaultPackagesDetails/Update?id=` + id, data, "PUT");
        if (status.code == 200) {
            location.reload();
            if (status.data.codeStatus > 0) {
                window.location.href = '/DefaultPackagesDetails?success=true';
            }
        }
        // retorna bool 
        

        //if (ValidateFormStatus) {
        //    $("#updateDefaultPackagesDetailsForm").submit();
        //}
        //if (status.code == 200) {
        //    location.reload();
        //    if (status.data.codeStatus > 0) {
        //        window.location.href = '/DefaultPackagesDetails?success=true';
        //    }
        //}
    }
}