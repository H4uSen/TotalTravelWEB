// ----------------------------------- TABLE INIZIALIZE ------------------------------------
const CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
const SuburbsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
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

    const contentData = citiesListDetails(id_pais);
    MostrarDetalle(
        detail_row = {
            table: $("#grdPaises"),
            row_Index: index,
            content: contentData.content
        }
    );

    /*
    // do details of level two in table
    if (contentData.state) {
        TableDetailsConstructor($(`#grdCiudades_id_pais_${id_pais}`));

        $(`#grdCiudades_id_pais_${id_pais} tr .details_button`).click((_this) => {

            const tr = $(_this.target).parents("tr");
            const index = $(`#grdCiudades_id_pais_${id_pais} tbody tr`).index(tr);
            const id_ciudad = $(tr).attr("data-value");

            const contentData = suburbsListDetails(id_ciudad);
            MostrarDetalle(
                detail_row = {
                    table: $(`#grdCiudades_id_pais_${id_pais}`),
                    row_Index: index,
                    content: contentData.content
                }
            );

            show(
                $(`#grd_colonias_id_ciudad_${id_ciudad} .item`)
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

                if ( 5 < indexToShow) {
                    $(`#grd_colonias_id_ciudad_${id_ciudad}`).attr("data-show", parseInt(indexToShow) - 5);

                    show(
                        $(`#grd_colonias_id_ciudad_${id_ciudad} .item`),
                        parseInt(indexToShow) - 5
                    );
                }
            });

        });
    }*/
});

// ----------------------------------- FUNCTIONS ------------------------------------

function citiesListDetails(id_pais) {
    var state = false;
    var cities = CitiesList.data;

    if (CitiesList.code == 200) {

        var Detail =
            `
            <h5 class="ui large header">Lista de ciudades</h5>
            <table class="ui compact selectable celled table" id="grdCiudades_id_pais_${id_pais}">
                <thead style="visibility:collapse">
                    <tr>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>`;

        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == id_pais;
        });

        if (cities.length > 0) {
            for (var i = 0; i < cities.length; i++) {

                const city = cities[i];
                const fechaCreacion = GetDateFormat({
                    string_date: city.fechaCrea, hour_format: 12, date_format: "default"
                });

                Detail +=
                    `<tr data-value="${city.id}">
                        <td class="ui fluid vertical menu" style="margin:unset">
                            <a class="item">
                                <h1 class="ui medium header">Ciudad: ${city.ciudad}</h1>
                                <p>Creado el: ${fechaCreacion.datetime}</p>
                            </a>
                        </td>
                    </tr>`;
            }

            Detail += "</tbody>";

            state = true;
        } else {
            Detail =`<h5 class='ui large red header text-center'>NO SE ENCOTRARON CIUDADES</h5>`;
        }

        return { content: Detail, state: state};
    }
}

//function suburbsListDetails(id_ciudad) {
//    var state = false;
//    var Suburbs = SuburbsList.data;

//    if (SuburbsList.code == 200) {
//        var Detail =
//            `<h4>Lista de colonias<h4>
//            <div class="ui fluid vertical menu" data-show="5" id="grd_colonias_id_ciudad_${id_ciudad}">`;

//        Suburbs = jQuery.grep(Suburbs, function (Suburb, i) {
//            return Suburb.ciudadID == id_ciudad;
//        });

//        if (Suburbs.length > 0) {
//            for (var i = 0; i < Suburbs.length; i++) {

//                const Suburb = Suburbs[i];
//                const fechaCreacion = GetDateFormat({
//                    string_date: Suburb.fecha_Creacion, hour_format: 12, date_format: "default"
//                });
//                Detail +=
//                    `<a class="item">
//                        <h1 class="ui medium header">Colonia: ${Suburb.colonia}</h1>
//                        <p>Creado el: ${fechaCreacion.datetime}</p>
//                    </a>`;
//            }
//            Detail += "</div>";
//            Detail +=
//                `<div class="ui fluid vertical menu">
//                    <a class="item" id="btnSuburbs_ShowMore">Ver Mas...</a>
//                    <a class="item" id="btnSuburbs_ShowLess">Ver Menos...</a>
//                </div>`;

//            state = true;
//        } else {
//            Detail = `<h5 class='ui large red header text-center'>NO SE ENCOTRARON COLONIAS</h5>`;
//        }

//        return { content: Detail, state: state };
//    }
//}

//function show(ListQuerySelector, indexToShow = 5) {
//    for (var i = 0; i < ListQuerySelector.length; i++) {
//        $(ListQuerySelector[i]).hide();
//    }

//    for (var i = 0; i < indexToShow; i++) {
//        $(ListQuerySelector[i]).show();
//    }
//}

function Delete(id) {
    const capsula1 = () => {
        ajaxRequest("/Countries/Delete?id=" + id, null, "POST")
        location.reload();
    };

    sweetAlertconfirm("Estas Seguro de Eliminar el Registro Seleccionado?", "Este registro se borrara permanentemente", "warning", capsula1);
};