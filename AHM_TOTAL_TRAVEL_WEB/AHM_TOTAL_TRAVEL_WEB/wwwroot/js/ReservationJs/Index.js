const ReservationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Reservation/List");
const PaymentsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RecordPayment/List");
const PaymentTypesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/PaymentTypes/List");


TableSearchInput($("#txtSearch"), $("#grdReservacion"), elemPerPage = 10);
TableDetailsConstructor($("#grdReservacion"));

const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}


$("#grdReservacion").paginationTdA({
    elemPerPage: 10
});

//Show the amount of payments that the user has done 



$("#grdReservacion tbody tr .details_button").click((_this) => {

    const tr = $(_this.target).parents("tr");
    const index = $("#grdReservacion tbody tr").index(tr);
    const id_Reservacion = $(tr).attr("data-value");
    const id_ReservacionHotel = $(tr).attr("data-hotel");


    MostrarDetalle(
        detail_row = {
            table: $("#grdReservacion"),
            row_Index: index,
            content: paymentsListDetails(id_Reservacion)
        }
    );
});

function paymentsListDetails(id_reservacion) {

    //var RoomReservation = RoomReservationList.data;
    var Payments = PaymentsList.data;
    if (PaymentsList.code == 200) {

        var Detail =
            `<div class="ui fluid vertical menu">`;
        if (Payments.length == 0)
        {
            Detail = `<h2>No hay registros para mostrar</h2></div>`;
        }

        Payments = jQuery.grep(Payments, function (item, i) {
            return item.id_Reservacion == id_reservacion;
        });

        for (var i = 0; i < Payments.length; i++) {

            const detail = Payments[i];
            
            const fechaCreacion = GetDateFormat({
                string_date: detail.fechaPago, hour_format: 12, date_format: "default"
            });


            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">${detail.tipoPago}</h1>
                    <p># de factura: <span id="payment_id">${detail.id}</span></p>
                    <p>Nombre: ${detail.nombre_Completo}</p>
                    <p>Monto: L ${parseFloat(detail.montoPago).toFixed(2)}</p>
                    <p>Realizado el: ${fechaCreacion.datetime}</p>
                </a><br />
                <div style="margin-left: 10px;margin-bottom: 10px;">
                <button class="ui small btn-purple text-white icon button" id="updatePayments" onclick="editar('${detail.id}')"> Editar</button>
                <button class="ui small btn-purple text-white icon button" id="deletePayments" onclick="DeletePayment('${detail.id}')"> Eliminar</button>
                </div>`;
        }
        Detail += "</div>";
        Detail += '<div class="eight wide column"><button class="ui small btn-purple text-white labeled icon button" id="createPayments" onclick="createPayment(' + id_reservacion +')"><i class="plus icon"></i> Insertar un registro de pago</button></div>'
        return Detail;
    }
}



function DeleteReservation(id) {
    const capsula1 = () => {
        var response = ajaxRequest("/Reservation/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Reservation?success=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrará permanentemente.", "warning", capsula1);

};



//PAYMENTS


function createPayment(resv_ID) {
    $("#modalCreate").modal('show');
    $("#modalCreate #Resv_ID").val(resv_ID);

}

function DeletePayment(id) {
    const capsula1 = () => {
        var response = ajaxRequest("/RegistrationPayments/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Reservation?success=true';
        }
        window.location.reload();
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrará permanentemente.", "warning", capsula1);

};


//Fill the payments types Dropdown
const paymentTypes = PaymentTypesList.data;
for (var i = 0; i < paymentTypes.length; i++) {
    $('#TiPa_ID').append('<option value="' + paymentTypes[i].id + '">' + paymentTypes[i].descripcion + '</option>');
};

$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});
$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});




function validar() {    

    validateArrayForm = [
        { validateMessage: "No se pudo recuperar el # de la reservación", Jqueryinput: $("#modalCreate #Resv_ID") },
        { validateMessage: "Ingrese una forma de pago.", Jqueryinput: $("#modalCreate #TiPa_ID") },
        { validateMessage: "Ingrese un monto.", Jqueryinput: $("#modalCreate #RePa_Monto") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        $("#createPaymentForm").submit();        
    }

}

//Fill the payments types Dropdown
for (var i = 0; i < paymentTypes.length; i++) {
    $('#modalUpdate #TiPa_ID').append('<option value="' + paymentTypes[i].id + '">' + paymentTypes[i].descripcion + '</option>');
};


function editar(PaymentID) {
    var response = ajaxRequest("/RegistrationPayments/Update?id=" + PaymentID,null, "GET");
    if (response != null) {
        var item = response;


        var fecha = item.fechaPago.split("T")[0];

        $("#modalUpdate #Resv_ID").val(item.id_Reservacion);
        $("#modalUpdate #TiPa_ID").val(item.id_TipoPago);
        $("#modalUpdate #RePa_Monto").val(item.montoPago);
        $("#modalUpdate #RePa_ID").val(item.id);
        $("#modalUpdate #RePa_FechaPago").val(fecha);
        $("#modalUpdate").modal("show");

    }

}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese una reservación.", Jqueryinput: $("#modalUpdate #Resv_ID") },
        { validateMessage: "Ingrese una forma de pago.", Jqueryinput: $("#modalUpdate #TiPa_ID") },
        { validateMessage: "Ingrese un monto.", Jqueryinput: $("#modalUpdate #RePa_Monto") },
        { validateMessage: "Ingrese una fecha.", Jqueryinput: $("#modalUpdate #RePa_FechaPago") },

    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#updatePaymentsForm").submit();
    }
}