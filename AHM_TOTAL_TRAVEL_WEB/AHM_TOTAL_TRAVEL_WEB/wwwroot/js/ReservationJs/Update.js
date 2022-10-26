$("#form_content").parent().hide();
$(".ui.dropdown").dropdown();
$('.ui.checkbox').checkbox();
$("#Paquetes").parent().hide();
var detailsList = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/List");
fillDetails(Reservacion_HotelID);

//------------ EVENTS --------------------------

$("#btnCrear").click((_this) => {
    $("#form_content").attr("data-action-target", "create");
    $("#btnGuardar").prop("href", `javascript: crear()`);
    $(_this.target).hide();
    $("#colonia").val("");
    $("#form_content").parent().show();
});

$("#btnCancelar").click((_this) => {
    getDefault();
});

$("#PaqueteCheck").change((_this) => {
    if ($("#PaqueteCheck").prop("checked")) {
        $("#Paquetes").parent().show();
    } else {
        $("#Paquetes").parent().hide();
    }
});



//------------ FUNCTIONS --------------------------

function fillDetails(Reservacion_HotelID) {
    var details = jQuery.grep(detailsList.data, function (detail, i) {
        return detail.reservacionHotelID == Reservacion_HotelID;
    });
    console.log(detailsList);
    console.log(details);
    if (detailsList.code == 200) {

        if (details.length > 0) {

            $("#grdReservacionDetalles").empty();
            for (var i = 0; i < details.length; i++) {

                const detail = details[i];
                const fecha_Creacion = GetDateFormat({
                    string_date: detail.fecha_Creacion, hour_format: 12, date_format: "default"
                });

                $("#grdReservacionDetalles").append(
                    `<tr id="detalle_${detail.id}">
                        <td class="ui fluid vertical menu" style="margin:unset">
                            <a class="item">
                                <h1 class="ui medium header" id="colonia_header">Habitación: ${detail.nombre_Habitacion}</h1>
                                <p>Creado el: ${fecha_Creacion.datetime}</p>
                            </a>
                        </td>
                        <td style="text-align:end; vertical-align:middle">
                            <a class="item">
                                <a class="ui large icon btn-edit button" href="javascript: editar(${detail.id})">
                                    <i class="pencil alternate icon icon-crud"></i>
                                </a>
                                <a class="ui large icon btn-delete button" href="javascript: eliminar(${detail.id})">
                                    <i class="trash alternate icon icon-crud"></i>
                                </a>
                            </a>
                        </td>
                    </tr>
                    `
                );
            }
        }
        else {
            $("#grdReservacionDetalles").append(
                `<tr>
                    <td class="ui fluid vertical menu" style="margin:unset">
                        <h5 class='ui large red header text-center'>NO SE ENCONTRARON DETALLES DE LA RESERVACIÓN</h5>
                    </td>
                </tr>`
            );
        }
    }

}

function crear() {
    validateArrayForm = [
        { validateMessage: "Este campo no puede estar vacío.", Jqueryinput: $("#Habi_ID") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
     
    if (ValidateFormStatus) {
        var detail = ReservationDetailsViewModel;
        detail.habi_ID = parseInt($("#Habi_ID").val());
        detail.reHo_ID = parseInt(Reservacion_HotelID);

        var ReservationDetailsInsertStatus = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/Insert", detail, "POST");

        if (ReservationDetailsInsertStatus.code == 200) {
            iziToastAlert(
                "¡Registro creado con éxito!", "", "success"
            );
            detailsList = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/List");
            fillDetails(Reservacion_HotelID);
            getDefault();
        }
    }
}

function editar(id_detalle) {

    $("#form_content").attr("data-action-target", "update");
    var detail = jQuery.grep(detailsList.data, function (detail, i) {
        return detail.id == id_detalle;
    });
  
    SetDropDownValue($("#Habi_ID"), detail[0].habitacionID);
    $("#form_content").parent().show();
    $(".dotted_button").hide();
    $("#btnGuardar").prop("href", `javascript: actualizar(${id_detalle})`);

} 

function actualizar(id_detalle) {
    validateArrayForm = [
        { validateMessage: "Este campo no puede estar vacío.", Jqueryinput: $("#Habi_ID") }
    ];
    
    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
   
    if (ValidateFormStatus) {

        var detail = ReservationDetailsViewModel; 
        ReservationDetailsViewModel.habi_ID = parseInt($("#Habi_ID").val());
        ReservationDetailsViewModel.reHo_ID = parseInt(Reservacion_HotelID);

        var reservationDetailsInsertStatus = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/Update?id=" + id_detalle, detail, "PUT");

        if (reservationDetailsInsertStatus.code == 200) {
            iziToastAlert(
                "¡Registro actualizado con éxito!", "", "success"
            ); 
            detailsList = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/List");
            fillDetails(Reservacion_HotelID);
            getDefault();
        }

        $("#btnGuardar").prop("href", `javascript: crear()`);
        getDefault();
    }
}

function ActualizarReservacion() {
    validateArrayForm = [
        { validateMessage: "Seleccione un cliente", Jqueryinput: $("#Usua_ID") },
        { validateMessage: "Ingrese un precio", Jqueryinput: $("#Resv_Precio") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        
            $("#updateReservationForm").submit();
    }
}

function getDefault() {

    $("#form_content").attr("data-action-target", "");
    $("#form_content").parent().hide();
    $(".dotted_button").show();
    SetDropDownPlaceholder($("#Habi_ID"));
}

function eliminar(id) {
    const capsula1 = () => {
        var response = ajaxRequest(`https://totaltravel.somee.com/API/ReservationDetails/Delete?id=${id}&mod=${Client_User_ID}`, null, "Delete");
        if (response.data.codeStatus > 0) {
            iziToastAlert(
                "¡Registro eliminado con éxito!", "", "success"
            );
            detailsList = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/List");
            fillDetails(Reservacion_HotelID);
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrará permanentemente.", "warning", capsula1);

};
