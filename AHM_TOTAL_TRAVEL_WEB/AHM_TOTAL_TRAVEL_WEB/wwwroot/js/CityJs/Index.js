
const ColoniasList = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");
TableDetailsConstructor($("#grdCity"));

TableSearchInput($("#txtSearch"), $("#grdCity"), 10);

$("#grdCity").paginationTdA({
    elemPerPage: 10
});

//-------------------------------EVENTOS-----------------------------
$("#grdCity tbody tr .details_button").click((_this) => {

    const tr = $(_this.target).parents("tr");
    const index = $("#grdCity tbody tr").index(tr);
    const idCiudad = $(tr).attr("data-value");

    MostrarDetalle(
        detail_row = {
            table: $("#grdCity"),
            row_Index: index,
            content: SuburbsListDetails(idCiudad)
        }
    );
});



function SuburbsListDetails(idCiudad) {
    var colonias = ColoniasList.data;

    if (ColoniasList.code == 200 && colonias.length > 0) {

        colonias = jQuery.grep(colonias, function (colonia, i) {
            return colonia.ciudadID == idCiudad;
        });

        if (colonias.length > 0) {

            var Detail =
                `<div class="ui fluid vertical menu">`;

            for (var i = 0; i < 5; i++) {

                const colonia = colonias[i];

                const fechaCreacion = GetDateFormat({
                    string_date: colonia.fecha_Creacion, hour_format: 12, date_format: "default"
                });

                Detail +=
                    `<a class="item">
                        <h1 class="ui medium header">Colonia: ${colonia.colonia}</h1>
                        <p>Creado el: ${fechaCreacion.datetime}</p>
                    </a>`;
            }

            Detail +=
                `<a class="item" href="Suburbs/Index?City_ID=${idCiudad}">Ver Mas...</a>`;
        } else {
            var Detail = "<h5 class='ui large red header text-center'>NO DATA AVALIABLE</h5>";
        }

        return Detail;
    } else {
        return "<h5 class='ui large red header text-center'>NO DATA AVALIABLE</h5>";
    }

}