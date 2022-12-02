$(document).ready(function () {
    $("#TiPar_IDUpdate").hide();
});

$("#closeEditTipoPartner").click(() => {
    $("#modalUpdate").modal('hide');
});


function GetTipoPartner(id) {

    var TipoPartnerModel = TipoPartnerViewModel;
    var request = ajaxRequest(urlAPI+"/API/PartnerType/Find?Id=" + id);
    TipoPartnerModel.descripcion = request.data.descripcion;
    TipoPartnerModel.rol_Id = request.data.rol_Id;
    TipoPartnerModel.id = request.data.id;

    $("#TiPar_IDUpdate").val(TipoPartnerModel.id);
 
    $("#TiPar_DescripcionUpdate").val(TipoPartnerModel.descripcion);
    
    SetDropDownValue($("#Rol_IDUpdate"), TipoPartnerModel.rol_Id);
    

    $("#modalUpdate").modal({ autofocus: false, forceSelection: false }).modal('show');
}

function sendUpdate() {
    const ValidateArray = [
        { validateMessage: "Ingrese una descripcion de tipo de socio", Jqueryinput: $("#TiPar_DescripcionUpdate") },
        { validateMessage: "Seleccione un Rol para el socio", Jqueryinput: $("#Rol_IDUpdate") }
    ];
    const userValidate = ValidateForm(ValidateArray);
    if (userValidate) {
        $("#updateTipoPartnerForm").submit();
    }

}
