$('.ui.dropdown').dropdown();

$(document).ready(function () {
    $("#TrasporteUpdateID").hide();
});

function GetReservacion(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/ReservationTransportation/Find?id=" + id);
    if (response.code == 200) {
        $('#TrasporteUpdateID').val(id);
        $('#ReTr_CantidadAsientos').val(response.data.asientos);
        $('#ReTr_FechaCancelado').val(response.data.fecha_cancelado);
        $('#ReTr_Cancelado').val(response.data.cancelado);
        SetDropDownValue($("#Detr_ID"), response.data.iD_detalle_Transporte);
        SetDropDownValue($("#Resv_IDUPdtae"), response.data.reservacion);

    }
}

function updateResrvationTransporte() {

    const ValidateArrayReservacionTransporteFunction = [
        { validateMessage: "Seleccione una reservacion", Jqueryinput: $("#Resv_ID") },
        { validateMessage: "Seleccione un transporte", Jqueryinput: $("#Detr_ID") },
        { validateMessage: "Ingrese una Fecha cancelado", Jqueryinput: $("#ReTr_FechaCancelado") },
        { validateMessage: "Ingrese una cantidad asientos", Jqueryinput: $("#ReTr_CantidadAsientos") },
        { validateMessage: "Ingrese si fue cancelado", Jqueryinput: $("#ReTr_Cancelado") },

    ];

    const updateResrvationTransporteValidate = ValidateForm(ValidateArrayReservacionTransporteFunction);

    if (updateResrvationTransporteValidate) {

        

            $("#ReTr_Cancelado").val(false);

            if ($("#ReTr_Cancelado").prop('checked')) {

                $("#ReTr_Cancelado").val(true);
            }


        

        var idd = $('#TrasporteUpdateID').val();
        var data = new FormData();
        data.append("resv_ID", parseInt($("#resv_ID").val()));
        data.append("detr_ID", parseInt($("#detr_ID").val()));
        data.append("reTr_FechaCancelado", $("#reTr_FechaCancelado").val());
        data.append("reTr_CantidadAsientos", $("#reTr_CantidadAsientos").val());
        data.append("ReTr_Cancelado", $("#ReTr_Cancelado").val());

        data.append("ReTr_UsuarioModifica", parseInt(Client_User_ID));

        var response = ajaxRequest("https://totaltravel.somee.com/API/ReservationTransportation/Update?id=" + idd, data, "POST");

        if (response.code == 200) {
            if (response.data.codeStatus > 0) {
                window.location.href = '/ReservationTransportation?success=true';


            } else {

            }

        }
        else {
            console.log(response);
        }


    }

}