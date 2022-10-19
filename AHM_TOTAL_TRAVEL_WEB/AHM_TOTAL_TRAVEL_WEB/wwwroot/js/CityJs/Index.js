
const ColoniasList = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");
TableDetailsConstructor($("#grdCity"));



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

        var Detail =
            `<div class="ui fluid vertical menu">`;

        colonias = jQuery.grep(colonias, function (colonia, i) {
            return colonia.ciudadID == idCiudad;
        });

        for (var i = 0; i < 5; i++) {

            const colonia = colonias[i];
            const fechaCreacion = new Date(colonia.fecha_Creacion);

            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">${colonia.colonia}</h1>
                    <p>City Name: ${colonia.ciudad}</p>
                    <p>City Code: COD-00${colonia.id}</p>
                    <p>Created at: ${fechaCreacion.toDateString()}</p>
                </a>`;

        }
        Detail +=
            `<a class="item" href="Suburbs/Index">Ver Mas...</a>`;
        Detail += "</div>";

        return Detail;
    }

}