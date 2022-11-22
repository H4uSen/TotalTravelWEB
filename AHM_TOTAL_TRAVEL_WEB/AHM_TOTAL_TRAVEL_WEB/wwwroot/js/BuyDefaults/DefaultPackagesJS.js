var packagesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackages/List");
var ActivitiesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ActivitiesExtra/List");
var DetailsTransportationList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DetailsTransportation/List");
var CitiesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Cities/List");

$('.ui.dropdown').dropdown();

const fill_data = {

    fillMain: function (id_ciudad_salida, id_ciudad_llegada = null) {
        this.fillPackages(id_ciudad_llegada);
        this.fillActivities(id_ciudad_llegada);

        $("#frmVuelos").hide();
        $("#frmPortuarios").hide();

        this.fillTransport(id_ciudad_salida, id_ciudad_llegada);
    },

    fillPackages: function (id_ciudad_destino = null) {

        if (packagesList.code == 200) {

            var package = packagesList.data;
            if (id_ciudad_destino != null) {
                package = packagesList.data.filter(x => x.ciudad_ID == id_ciudad_destino);
            }

            $("#frmMenu_container #frmPackages .ui.grid").empty();
            for (var i = 0; i < package.length; i++) {

                const item = package[i];
                const images = item.image_URL.split(',');

                const card =
                    `<div class="column room_item" data-value="16">
                        <div class="ui card" style="width:100%; height:100%;">
                            <div class="image">
                                <img src="${images[0]}" alt="" style="height:200px;">
                            </div>
                            <div class="content">
                                <a class="header">
                                    <h3>
                                        <b>${item.nombre}</b>
                                    </h3>
                                </a>
                                <h5 class="description">${item.descripcion_Paquete}</h5>

                                <div class="extra">
                                    <br>
                                    <h6 style="font-weight:bold;">- Capacidad máxima de ${item.cantidad_de_personas} personas</h6><h6>- Destino: ${item.ciudad}</h6>
                                    <br>
                                </div><br>
                                <div class="ui labeled large button" tabindex="0">
                                    <div class="ui green button">
                                        <i class="tag icon"></i> Precio
                                    </div>
                                    <h3 class="ui basic left pointing label">
                                        L ${item.precio}
                                    </h3>
                                </div>
                                <button class="ui right floated primary button package_button_trigger" data-value="${item.id}" data-selected="false">
                                    RESERVAR <i class="right chevron icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>`;

                $("#frmMenu_container #frmPackages .ui.grid").append(card);
            }

            $(".package_button_trigger").click(function (_this_button) {

                var selected = $(_this_button.target).attr("data-selected");

                //set default
                $(".package_button_trigger").removeClass("positive").addClass("primary");
                $(".package_button_trigger").html('RESERVAR <i class="right chevron icon"></i>');

                //set actual
                $(".package_button_trigger").attr("data-selected", "false");

                if (selected == "false") {
                    $(_this_button.target).attr("data-selected", "true");

                    $(_this_button.target).addClass("positive").removeClass("primary");
                    $(_this_button.target).html('RESERVADO <i class="right chevron icon"></i>');
                }
                else {
                    $(_this_button.target).attr("data-selected", "false");

                    $(_this_button.target).removeClass("positive").addClass("primary");
                    $(_this_button.target).html('RESERVAR <i class="right chevron icon"></i>');
                }
            });
        }
    },

    fillActivities: function (id_ciudad_destino = null) {
        if (ActivitiesList.code == 200) {

            var activities = ActivitiesList.data;
            if (id_ciudad_destino != null) {
                activities.filter(x => x.ciudadID == id_ciudad_destino);
            }

            $("#frmActivities .ui.items").empty();
            if (activities.length > 0) {

                for (var i = 0; i < activities.length; i++) {

                    const item = activities[i];
                    const images = item.imageURL.split(",");

                    //carousel construct
                    var carousel = `<div class="fotorama activities_fotorama" data-allowfullscreen="true" data-nav="thumbs">`;
                    for (var j = 0; j < images.length; j++) {
                        carousel += `<img src="${images[j]}">`;
                    }
                    carousel += "</div>";

                    const card =
                        `<div class="item activity_item">
                            <div class="image">
                                ${carousel}
                            </div>
                            <div class="content" style="padding-right: 10em;">
                                <h3 style="font-size: 0.90rem;">
                                    <b class="blue_text">${item.actividad}</b>
                                    <div class="ui large gray horizontal label">${item.tipoActividad}</div>
                                </h3>
                                <b>${item.partner}</b>
                                <div class="description" style="font-size: 0.88rem;">
                                    ${item.descripcion}
                                </div>
                                <div class="extra">
                                    <h3 class="ui green header" style="font-size: 0.877rem;">L ${parseFloat(item.precio).toFixed(2)} por persona</h3>
                                </div>
                            </div>
                            <div class="content left floated activitiesExtra_form_content">
                                <div class="fields">

                                    <div class="field">
                                        <label>No. de personas</label>
                                        <div class="field">
                                            <div class="ui right labeled input ExtraActivity_contador">
                                                <div class="ui icon button label minus_button">
                                                    <i class="minus icon"></i>
                                                </div>
                                                <input class="count_input" type="number" value="1" style="text-align: center;" readonly>
                                                <div class="ui icon button label plus_button">
                                                    <i class="plus icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="field required">
                                        <label>Fecha reservacion</label>
                                        <div class="ui calendar activities_fecha">
                                            <div class="ui input left icon">
                                                <i class="calendar icon"></i>
                                                <input type="text" placeholder="Fecha de reservacion" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br>
                                <button class="ui right floated primary button activity_trigger_button" data-selected="false" data-value="${item.id}">
                                    RESERVAR
                                    <i class="right chevron icon"></i>
                                </button>
                            </div>
                        </div>`;

                    $("#frmActivities .ui.items").append(card);
                }

                $(".activities_fotorama").fotorama();
                createContador($(".ExtraActivity_contador"));
                $('.activities_fecha').calendar({
                    //type: 'date',
                    popupOptions: {
                        position: 'bottom right',
                        lastResort: 'bottom right',
                        hideOnScroll: false
                    }
                });

                $(".activity_trigger_button").click(function (_this) {
                    var container = $(_this.target).parents(".activitiesExtra_form_content").eq(0);
                    if ($(container).find(".activities_fecha input").eq(0).val() == 0) {
                        iziToastAlert("!campo: fecha de reservacion requerida!","","error");
                    }
                    else {
                        const id_actividad = $(_this.target).attr("data-value");

                        if ($(_this.target).attr("data-selected") == "true") {

                            $(_this.target).addClass("primary").removeClass("positive");
                            $(_this.target).html('RESERVAR <i class="right chevron icon"></i>');
                            $(_this.target).attr("data-selected", "false");

                        }
                        else {

                            $(_this.target).addClass("positive").removeClass("primary");
                            $(_this.target).html('RESERVADO <i class="right chevron icon"></i>');;
                            $(_this.target).attr("data-selected", "true");

                        }
                    }
                });

            } else {
                $("#frmExtra").append(
                    `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <div class="header">
                                No hay actividades turisticas disponibles en esta ciudad
                            </div>
                        </div>
                    </div>
                </div>`
                );
            }

        }
    },

    fillTransport: function (id_ciudad_salida, id_ciudad_llegada = null) {

        var transports = DetailsTransportationList.data;

        if (id_ciudad_llegada != null) {
            var transports = jQuery.grep(DetailsTransportationList.data, function (item, i) {
                return item.ciudad_Salida_ID == id_ciudad_salida && item.ciudad_Llegada_ID == id_ciudad_llegada;
            });
        }

        $("#frmTransports_Container #frmTransportes .ui.items").empty();
        $("#frmTransports_Container #frmVuelos .ui.items").empty();
        $("#frmTransports_Container #frmPortuarios .ui.items").empty();

        //terrestres
        if (!transports.filter(item => item.tipo_Transporte_ID == 2).length > 0) {
            $("#frmTransports_Container #frmTransportes .ui.items").append(
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
            $("#frmTransports_Container #frmVuelos .ui.items").append(
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
            $("#frmTransports_Container #frmPortuarios .ui.items").append(
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
                var destino = "No especificado";

                if (id_ciudad_llegada != null) {
                    ciudadDestino = CitiesList.data.filter(item => item.id == id_ciudad_llegada)[0];
                    destino = `${ciudadDestino.pais}, ${ciudadDestino.ciudad}`;
                }

                const hora_salida =
                    element.hora_Salida.split(":")[0] > 12
                        ? element.hora_Salida + " PM"
                        : element.hora_Salida + " AM"

                const card =
                    `<div class="item transport_item">
                    <div class="image">
                        <img src="https://apitotaltravel.azurewebsites.net/Images/${images[0]}">
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
                                <i class="map marker alternate icon"></i> ${destino}
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
                        $("#frmTransports_Container #frmPortuarios .ui.items").append(card);
                        break;
                    case 2:
                        $("#frmTransports_Container #frmTransportes .ui.items").append(card);
                        break;
                    case 4:
                        $("#frmTransports_Container #frmVuelos .ui.items").append(card);
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
}

//------------------------------------------- INIZIALIZE ------------------------------------------

$("#frmTransports").hide();
$("#frmActivities").hide();
$("#frmDetails").hide();
fill_data.fillMain($("#Origen").val());

//------------------------------------------- EVENTS ------------------------------------------

$("#navbar_packages .item").click(function (_this) {
    $("#navbar_packages .item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#navbar_packages .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#frmMenu_container ${object}`).hide();
    });

    const wideToShow = $(_this.target).attr("data-target");
    $(wideToShow).show();
});

$("#frmTransporte_menu .item").click(function (_this) {
    $("#frmTransporte_menu .item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#frmTransporte_menu .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#frmTransports_Container ${object}`).hide();
    });

    const wideToShow = $(_this.target).attr("data-target");
    $(wideToShow).show();
});

$("#Destinos").change(function (_this) {
    if ($("#Destinos").val() != 0) {
        fill_data.fillMain($("#Origen").val(), $("#Destinos").val());
    }
});

//------------------------------------------- FUNCTIONS ------------------------------------------

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

function contador(input, mode, cero = false) {
    var numero = parseInt($(input).val());

    if (!cero) {
        if (numero >= 1) {
            if (mode == true) {
                numero++;
            } else if (mode == false && numero > 1) {
                numero--;
            }
        }
        else {
            numero = 1;
        }
    }
    else if (cero) {
        if (numero >= 0) {
            if (mode == true) {
                numero++;
            } else if (mode == false && numero > 0) {
                numero--;
            }
        }
        else {
            numero = 0;
        }
    }
    $(input).val(numero);
}