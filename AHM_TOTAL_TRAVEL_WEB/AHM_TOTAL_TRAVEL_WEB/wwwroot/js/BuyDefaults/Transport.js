// transports
var DetailsTransportationList = ajaxRequest(urlAPI+"/API/DetailsTransportation/List");
var CitiesList = ajaxRequest(urlAPI+"/API/Cities/List");

$("#frmTransporte_menu .item").click(function (_this) {
    $("#frmTransporte_menu .item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#frmTransporte_menu .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#transport_container ${object}`).hide();
    });

    const wideToShow = $(_this.target).attr("data-target");
    $(wideToShow).show();
});

fillTransport(3, 2);

function createContador(querySelector, startInCero = false) {

    $.each(querySelector, function (index, object) {
        var _this = $(object);
        var plusButton = _this.find(".plus_button");
        var minusButton = _this.find(".minus_button");
        var countInput = _this.find(".count_input");

        $(plusButton).click(function () {
            contador($(countInput), true, startInCero)
        });

        $(minusButton).click(function () {
            contador($(countInput), false, startInCero)
        });
    });
}

function fillTransport(id_ciudad_salida, id_ciudad_llegada) {

    var transports = jQuery.grep(DetailsTransportationList.data, function (item, i) {
        return item.ciudad_Salida_ID == id_ciudad_salida && item.ciudad_Llegada_ID == id_ciudad_llegada;
    });

    $("#transport_container #frmTransportes .ui.items").empty();
    $("#transport_container #frmVuelos .ui.items").empty();
    $("#transport_container #frmPortuarios .ui.items").empty();

    //terrestres
    if (!transports.filter(item => item.tipo_Transporte_ID == 2).length > 0) {
        $("#transport_container #frmTransportes .ui.items").append(
            `<div class="item">
                <div class="content">
                    <div class="ui negative message">
                        <div class="header">
                            No hay Transportes urbanos disponibles para esta área.
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
    //aereos
    if (!transports.filter(item => item.tipo_Transporte_ID == 4).length > 0) {
        $("#transport_container #frmVuelos .ui.items").append(
            `<div class="item">
                <div class="content">
                    <div class="ui negative message">
                        <div class="header">
                             No hay vuelos disponibles para esta área.
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
    //acuaticos
    if (!transports.filter(item => item.tipo_Transporte_ID == 1).length > 0) {
        $("#transport_container #frmPortuarios .ui.items").append(
            `<div class="item">
                <div class="content">
                    <div class="ui negative message">
                        <div class="header">
                            No hay servicios de transportes marítimos disponibles para esta área.
                        </div>
                    </div>
                </div>
            </div>`
        );
    }

    if (transports.length > 0) {

        for (var i = 0; i < transports.length; i++) {

            const element = transports[i];
            const images = element.image_URL.split(",");

            const ciudadSalida = CitiesList.data.filter(item => item.id == id_ciudad_salida)[0];
            const ciudadDestino = CitiesList.data.filter(item => item.id == id_ciudad_llegada)[0];
            const hora_salida =
                element.hora_Salida.split(":")[0] > 12
                    ? element.hora_Salida + " PM"
                    : element.hora_Salida + " AM"

            const card =
                `<div class="item transport_item">
                    <div class="image">
                        <img src="${urlAPI}/Images/${images[0]}">
                    </div>
                    <div class="content" style="width: inherit;">
                        <a class="header">${element.parter}</a>
                        <div class="description">
                            <h4 class="ui blue header">
                                <i class="calendar check icon"></i>
                                Hora de salida: ${hora_salida}
                            </h4>
                        </div>
                        <div class="extra">
                            <div class="ui label">
                                <i class="map marker icon"></i> ${ciudadSalida.pais}, ${ciudadSalida.ciudad}
                            </div>
                            <div class="ui label">
                                <i class="map marker alternate icon"></i> ${ciudadDestino.pais}, ${ciudadDestino.ciudad}
                            </div>
                            <h3 class="ui green header">L ${parseFloat(element.precio).toFixed(2)} por asiento</h3>
                        </div>
                    </div>
                    <div class="content left floated transport_form_content">
                        <br>
                        <div class="fields">
                            <div class="field">
                                <label>No. de personas</label>
                                <div class="ui right labeled input transport_contador">
                                    <div class="ui icon button label minus_button">
                                        <i class="minus icon"></i>
                                    </div>
                                    <input class="count_input" type="number" value="1"
                                            style="text-align: center;" readonly>
                                    <div class="ui icon button label plus_button">
                                        <i class="plus icon"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="field required">
                                <label>Fecha reservacion</label>
                                <div class="ui calendar transport_fecha">
                                    <div class="ui input left icon">
                                        <i class="calendar icon"></i>
                                        <input type="text" placeholder="Fecha de reservacion" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br>
                        <button class="ui right floated primary button transport_trigger_button"
                                data-selected="false" data-value="${element.id}">
                            RESERVAR
                            <i class="right chevron icon"></i>
                        </button>
                    </div>
                </div>`;

            switch (element.tipo_Transporte_ID) {
                case 1:
                    $("#transport_container #frmPortuarios .ui.items").append(card);
                    break;
                case 2:
                    $("#transport_container #frmTransportes .ui.items").append(card);
                    break;
                case 4:
                    $("#transport_container #frmVuelos .ui.items").append(card);
                    break;
            }

        }

        $("button.transport_trigger_button").click(function (_this) {

            const selected = $(_this.target).attr("data-selected");
            //set default
            $("button.transport_trigger_button").addClass("primary").removeClass("positive");
            $("button.transport_trigger_button").attr("data-selected", "false");
            $("button.transport_trigger_button").html('RESERVAR <i class="right chevron icon"></i>');

            if (selected == "true") {

                $(_this.target).attr("data-selected", "false");
                $(_this.target).addClass("primary").removeClass("positive");
                $(_this.target).html('RESERVAR <i class="right chevron icon"></i>');
            } else {

                $(_this.target).attr("data-selected", "true");
                $(_this.target).removeClass("primary").addClass("positive");
                $(_this.target).html('RESERVADO <i class="right chevron icon"></i>');
            }
        });
        $('.transport_fecha').calendar({
            type: 'date',
            popupOptions: {
                position: 'bottom right',
                lastResort: 'bottom right',
                hideOnScroll: false
            }
        });
        createContador($(".transport_contador"));
    }
}