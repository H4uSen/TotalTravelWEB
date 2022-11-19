if (Client_Role == "Administrador") {
    $("#Part_ID").removeAttr("hidden");
    $("#Part_ID").show();

    $("#Part_ID2").removeAttr("hidden");
    $("#Part_ID2").show();
}

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

getDestiny();

function getDestiny() {
    var response2 = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Partners/List");

    if (response2.code == 200) {

        var Part_ID2 = response2.data;
        var Part_ID = Part_ID2.filter(resva => resva.tipoPartner == "Agencia de Transporte");
        ClearDropDownItem($('#Partner_ID'));
        $("#Partner_ID").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID'), item = { value: item.id, text: item.nombre });
        }
        ClearDropDownItem($('#Partner_ID2'));
        $("#Partner_ID2").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID2'), item = { value: item.id, text: item.nombre });
        }
    }
};

function validar() {
    validateArrayForm = [
        { validateMessage: "Ingrese la descripcion.", Jqueryinput: $("#modalCreate #Transporte") },
        { validateMessage: "Seleccione un Partner", Jqueryinput: $("#modalCreate #Partner_ID") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);
   
    if (ValidateFormStatus) {      
        $("#createTypesTransportForm").submit();
    }     
}

function editar(id) {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/TypesTransport/Find?id=" + id);
    if (response.code == 200) {
        $("#id").val(id);
        $("#Transporte_up").val(response.data.trasporte);
        SetDropDownValue($("#Partner_ID2"), defaultValue = response.data.partner_ID);
        $("#modalUpdate").modal("show");
        
    }
}
function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese la descripcion.", Jqueryinput: $("#modalUpdate #Transporte_up") },
        { validateMessage: "Seleccione un Partner", Jqueryinput: $("#modalUpdate #Partner_ID2") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    var id = $("#id").val();
    if (ValidateFormStatus) {
        var data = tipostransporte;
        data.tiTr_Descripcion = $("#modalUpdate #Transporte_up").val();
        data.tiTr_UsuarioModifica = Client_User_ID;
        if (Client_Role == "Administrador") {
            data.partner_ID = parseInt($("#modalUpdate #Partner_ID2").val());
        }
        else {
            data.partner_ID = Client_Partner_ID;

        }
       
        var status = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/TypesTransport/Update?id=" + id, data, "PUT");
        if (status.code == 200) {
            location.reload();
            if (status.data.codeStatus > 0) {
                window.location.href = '/TypesTransport?success=true';
            }
        }

    }

}
