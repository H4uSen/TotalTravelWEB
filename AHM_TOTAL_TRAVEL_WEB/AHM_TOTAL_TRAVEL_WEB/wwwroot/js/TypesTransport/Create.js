$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createTypesTransport").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeTypesTransport").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendTypesTransport").click(() => {
    validar();
})

function validar() {
    if ($("#Transporte").val() == 0) {
        $("#labelvalidatort").html("Ingrese una Descripcion");
    }
    else {
        $("#labelvalidatort").html(" ");
    }   
    if ($("#Transporte").val() != 0) {
        $("#createTypesTransportForm").submit();
    }

}

function editar(id) {
    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/TypesTransport/Find?id=" + id);
    if (response.code == 200) {
        $("#id").val(id);
        $("#Transporte_up").val(response.data.trasporte);
        $("#modalUpdate").modal("show");
    }
}
function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese la descripcion.", Jqueryinput: $("#modalUpdate #Transporte_up") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    var id = $("#id").val();
    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("TiTr_Descripcion", $("#modalUpdate #Transporte_up").val());
        data.append("TiTr_UsuarioModifica", Client_User_ID);

       
        var status = uploadFile(`https://totaltravelapi.azurewebsites.net/API/TypesTransport/Update?id=${id}`, data, "PUT");
        if (status.code == 200) {
            location.reload();
            if (status.data.codeStatus > 0) {
                window.location.href = '/TypesTransport?success=true';
            }
        }

    }

}
