const ReservationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Reservation/List");
const PaymentsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RecordPayment/List");

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
function Reservation(id_Reservacion) {

    var Payments = PaymentsList.data;

    if (PaymentsList.code == 200 && Payments.length > 0) {

        var Detail =
            `<div class="ui fluid vertical menu">`;

        Payments = jQuery.grep(Payments, function (item, i) {
            return item.ID == id_Reservacion;
        });

        for (var i = 0; i < Payments.length; i++) {

            const detail = Payments[i];
            
            const fechaCreacion = GetDateFormat({
                string_date: detail.fechaPago, hour_format: 12, date_format: "default"
            });


            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">#${detail.id}</h1>
                    <p>Nombre: ${detail.nombre_Completo}</p>
                    <p>Monto: L ${parseFloat(detail.montoPago).toFixed(2)}</p>
                    <p>Forma de pago: ${detail.tipoPago}</p>
                    <p>Realizado el: ${fechaCreacion.datetime}</p>
                </a>`;
        }
        Detail += "</div>";

        return Detail;
    }
}

function paymentsListDetails(id_reservacionHotel) {

    //var RoomReservation = RoomReservationList.data;
    var Payments = PaymentsList.data;
    if (PaymentsList.code == 200 && Payments.length > 0) {

        var Detail =
            `<div class="ui fluid vertical menu">`;

        Payments = jQuery.grep(Payments, function (item, i) {
            return item.id_Reservacion == id_reservacionHotel;
        });

        for (var i = 0; i < Payments.length; i++) {

            const detail = Payments[i];
            
            const fechaCreacion = GetDateFormat({
                string_date: detail.fechaPago, hour_format: 12, date_format: "default"
            });


            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">${detail.tipoPago}</h1>
                    <p>Nombre: ${detail.nombre_Completo}</p>
                    <p>Monto: L ${parseFloat(detail.montoPago).toFixed(2)}</p>
                    <p>Realizado el: ${fechaCreacion.datetime}</p>
                </a>`;
        }
        Detail += "</div>";

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
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};
