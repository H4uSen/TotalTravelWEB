
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
    const id_ciudad = $(tr).attr("data-value");

    MostrarDetalle(
        detail_row = {
            table: $("#grdCity"),
            row_Index: index,
            content: SuburbsListDetails(id_ciudad)
        }
    );

    $("#btnSuburbs_ShowMore").click(() => {

        var indexToShow = $(`#grd_colonias_id_ciudad_${id_ciudad}`).attr("data-show");
        if ($(`#grd_colonias_id_ciudad_${id_ciudad} .item`).length >= indexToShow) {

            $(`#grd_colonias_id_ciudad_${id_ciudad}`).attr("data-show", parseInt(indexToShow) + 5);

            show(
                $(`#grd_colonias_id_ciudad_${id_ciudad} .item`),
                parseInt(indexToShow) + 5
            );
        }
    });

    $("#btnSuburbs_ShowLess").click(() => {

        var indexToShow = $(`#grd_colonias_id_ciudad_${id_ciudad}`).attr("data-show");

        if (5 < indexToShow) {
            $(`#grd_colonias_id_ciudad_${id_ciudad}`).attr("data-show", parseInt(indexToShow) - 5);

            show(
                $(`#grd_colonias_id_ciudad_${id_ciudad} .item`),
                parseInt(indexToShow) - 5
            );
        }
    });
});



function SuburbsListDetails(id_ciudad) {
    var colonias = ColoniasList.data;

    if (ColoniasList.code == 200 && colonias.length > 0) {

        colonias = jQuery.grep(colonias, function (colonia, i) {
            return colonia.ciudadID == id_ciudad;
        });

        if (colonias.length > 0) {

            var Detail =
                `<h4>Lista de colonias<h4>
                <div class="ui fluid vertical menu" data-show="5" id="grd_colonias_id_ciudad_${id_ciudad}">`;

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

            Detail += "</div>";
            Detail +=
                `<div class="ui fluid vertical menu">
                    <a class="item" id="btnSuburbs_ShowMore">Ver Mas...</a>
                    <a class="item" id="btnSuburbs_ShowLess">Ver Menos...</a>
                </div>`;
        } else {
            var Detail = "<h5 class='ui large red header text-center'>NO HAY COLONIAS DISPONIBLES</h5>";
        }

        return Detail;
    } else {
        return "<h5 class='ui large red header text-center'>NO HAY COLONIAS DISPONIBLES</h5>";
    }

}

function show(ListQuerySelector, indexToShow = 5) {
    for (var i = 0; i < ListQuerySelector.length; i++) {
        $(ListQuerySelector[i]).hide();
    }

    for (var i = 0; i < indexToShow; i++) {
        $(ListQuerySelector[i]).show();
    }
}