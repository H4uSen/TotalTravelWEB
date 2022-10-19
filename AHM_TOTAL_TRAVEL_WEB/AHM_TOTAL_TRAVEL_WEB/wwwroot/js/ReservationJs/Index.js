const RoomReservationList = ajaxRequest("https://totaltravel.somee.com/API/ReservationDetails/List");
const ReservacionesActividadesHotelesList = ajaxRequest("https://totaltravel.somee.com/API/ReservationActivitiesHotels/List");

TableSearchInput($("#txtSearch"), $("#grdReservacion"), elemPerPage = 10);
TableDetailsConstructor($("#grdReservacion"));

$("#grdReservacion").paginationTdA({
    elemPerPage: 10
});


$("#grdReservacion tbody tr .details_button").click((_this) => {

    const tr = $(_this.target).parents("tr");
    const index = $("#grdReservacion tbody tr").index(tr);
    const id_pais = $(tr).attr("data-value");

    MostrarDetalle(
        detail_row = {
            table: $("#grdReservacion"),
            row_Index: index,
            content: citiesListDetails(id_pais)
        }
    );
});

function roomsListDetails(id_pais) {

    var RoomReservation = RoomReservationList.data;

    if (RoomReservationList.code == 200 && RoomReservation.length > 0) {

        var Detail =
            `<div class="ui fluid vertical menu">`;

        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == id_pais;
        });

        for (var i = 0; i < cities.length; i++) {

            const city = cities[i];
            const fechaCreacion = new Date(city.fechaCrea);

            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">${city.ciudad}</h1>
                    <p>City Name: ${city.ciudad}</p>
                    <p>City Code: COD-00${city.id}</p>
                    <p>Created at: ${fechaCreacion.toDateString()}</p>
                </a>`;
        }
        Detail += "</div>";

        return Detail;
    }
}
