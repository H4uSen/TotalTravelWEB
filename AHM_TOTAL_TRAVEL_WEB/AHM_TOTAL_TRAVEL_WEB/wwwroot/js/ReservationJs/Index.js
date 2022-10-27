const RoomReservationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationDetails/List");
const ReservacionesActividadesHotelesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationActivitiesHotels/List");
const ReservationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Reservation/List");
const PaymentsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RecordPayment/List");

TableSearchInput($("#txtSearch"), $("#grdReservacion"), elemPerPage = 10);
TableDetailsConstructor($("#grdReservacion"));

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
            const fechaPago = new Date(detail.fechaPago);

            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">#${detail.ID}</h1>
                    <p>Nombre: ${detail.Nombre_Completo}</p>
                    <p>Monto: L ${parseFloat(detail.MontoPago).toFixed(2)}</p>
                    <p>Forma de pago: ${detail.TipoPago}</p>
                    <p>Realizado el: ${fechaPago.toDateString()}</p>
                </a>`;
        }
        Detail += "</div>";

        return Detail;
    }
}

function paymentsListDetails(id_reservacionHotel) {

    var RoomReservation = RoomReservationList.data;

    if (RoomReservationList.code == 200 && RoomReservation.length > 0) {

        var Detail =
            `<div class="ui fluid vertical menu">`;

        RoomReservation = jQuery.grep(RoomReservation, function (item, i) {
            return item.reservacionHotelID == id_reservacionHotel;
        });

        for (var i = 0; i < RoomReservation.length; i++) {

            const detail = RoomReservation[i];
            const fecha_Creacion = new Date(detail.fecha_Creacion);

            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">${detail.nombre_Habitacion}</h1>
                    <p>Descripción: ${detail.descripcion_Habitacion}</p>
                    <p>Categoría: ${detail.categoria_Habitacion}</p>
                    <p>Precio: L ${parseFloat(detail.precio_Habitacion).toFixed(2)}</p>
                    <p>Creado en: ${fecha_Creacion.toDateString()}</p>
                </a>`;
        }
        Detail += "</div>";

        return Detail;
    }
}
