const RoomReservationList = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/List");
const ReservacionesActividadesHotelesList = ajaxRequest("https://totaltravel.somee.com/API/ReservationActivitiesHotels/List");
const ReservationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Reservation/List");

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
            content: roomsListDetails(id_Reservacion)
        }
    );
});
function Reservation(id_Reservacion) {

    var Reservation = ReservationList.data;

    if (ReservationList.code == 200 && Reservation.length > 0) {

        var Detail =
            `<div class="ui fluid vertical menu">`;

        Reservation = jQuery.grep(Reservation, function (item, i) {
            return item.id == id_Reservacion;
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
/*
function roomsListDetails(id_reservacionHotel) {

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
*/