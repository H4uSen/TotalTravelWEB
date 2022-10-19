// ----------------------------------- TABLE INIZIALIZE ------------------------------------
const CitiesList = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
TableSearchInput($("#txtSearch"), $("#grdPaises"), elemPerPage = 10);
TableDetailsConstructor($("#grdPaises"));

$("#grdPaises").paginationTdA({
    elemPerPage: 5
});

// ----------------------------------- EVENTS ------------------------------------

$("#grdPaises tbody tr .details_button").click((_this) => {

    const tr = $(_this.target).parents("tr"); 
    const index = $("#grdPaises tbody tr").index(tr);
    const id_pais = $(tr).attr("data-value");

    MostrarDetalle(
        detail_row = {
            table: $("#grdPaises"),
            row_Index: index,
            content: citiesListDetails(id_pais)
        }
    );
});

// ----------------------------------- FUNCTIONS ------------------------------------

function citiesListDetails(id_pais) {

    var cities = CitiesList.data;

    if (CitiesList.code == 200 && cities.length > 0) {

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

function Delete(id) {
    const capsula1 = () => {
        ajaxRequest("/Countries/Delete?id=" + id, null, "POST")
        location.reload();
    };

    sweetAlertconfirm("Estas Seguro de Eliminar el Registro Seleccionado?", "Este registro se borrara permanentemente", "warning", capsula1);
};