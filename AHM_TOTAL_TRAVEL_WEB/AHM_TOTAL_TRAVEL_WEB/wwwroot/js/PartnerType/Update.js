$(document).ready(function () {
    $("#TiPar_ID").hide();
});

$("#closeEditTipoPartner").click(() => {
    $("#modalUpdate").modal('hide');
});


function GetTipoPartner(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/PartnerType/Find?id=" + id);
    if (response.code == 200) {
        $('#TiPar_ID').val(id);
        $('#TiPar_DescripcionUpdate').val(response.data.descripcion);
        const parent = $("#Rol_IDUpdate").parent();
        parent.find(`.menu .item[data-value="${response.data.iD_Role_ID}"]`).addClass(["selected", "active"]);

        if ($('#TiPar_DescripcionUpdate').val() != 0) {
            $("#modalUpdate").modal('show');
        }

    }
}

function sendUpdate() {
    console.log("a");
    const ValidateArray = [
        { validateMessage: "Ingrese una descripcion de tipo de socio", Jqueryinput: $("#TiPar_DescripcionUpdate") },
        { validateMessage: "Seleccione un Rol para el socio", Jqueryinput: $("#Rol_IDUpdate") }
    ];
    const userValidate = ValidateForm(ValidateArray);
    if (userValidate) {
        $("#updateTipoPartnerForm").submit();
    }

}
