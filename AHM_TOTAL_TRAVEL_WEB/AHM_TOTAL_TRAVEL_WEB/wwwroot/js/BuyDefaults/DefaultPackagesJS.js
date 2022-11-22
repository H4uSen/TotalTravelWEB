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
                    `<div class="column package_item" data-value="16">
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

                    $("#navbar_packages #pay_item").addClass("menu_item").removeClass("disabled");
                }
                else {
                    $("#navbar_packages #pay_item").removeClass("menu_item").addClass("disabled");
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

const getDetails = {

    getDetails_main: function () {
        const Packages = this.getPackages();
        const Activities = this.getActivities();
        const transports = this.getTransport();


        if (Packages.data.length > 0) {

            // fill packages details
            $("#frmPackagesDetail .ui.grid").empty();
            for (var i = 0; i < Packages.cards.length; i++) {
                $("#frmPackagesDetail .ui.grid").append(Packages.cards[i]);
            }

            //fill activities details
            $("#frmActivitiesDetail").hide();
            if (Activities.data.length > 0) {
                $("#frmActivitiesDetail .ui.grid").empty();
                for (var i = 0; i < Activities.cards.length; i++) {
                    $("#frmActivitiesDetail .ui.grid").append(Activities.cards[i]);
                }
                $("#frmActivitiesDetail").show();
            }

            //fill transport details
            $("#frmTransportDetail").hide();
            if (transports.data.length > 0) {
                $("#frmTransportDetail .ui.grid").empty();
                for (var i = 0; i < transports.cards.length; i++) {
                    $("#frmTransportDetail .ui.grid").append(transports.cards[i]);
                }
                $("#frmTransportDetail").show();
            }

            // crea desgloce final
            const total_price = Activities.subtotal + transports.subtotal + Packages.subtotal;
            $("#frmBreakdownDetail #grdBreakdown").find(".column").eq(1).empty();
            $("#frmBreakdownDetail #grdBreakdown").find(".column").eq(1).append(
                `<div class="card">
                    <div class="card-header">
                        <h3 class="h4 mb-0">Desglose</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">

                            <div class="col-sm-7">
                                <p class="text-sm">ACTIVIDADES</p>
                            </div>
                            <div class="col-sm-5">
                                <p class="text-sm" align="right">L ${Activities.subtotal.toFixed(2)}</p>
                            </div>

                            <div class="col-sm-7">
                                <p class="text-sm">TRANSPORTE</p>
                            </div>
                            <div class="col-sm-5">
                                <p class="text-sm" align="right">L ${transports.subtotal.toFixed(2)}</p>
                            </div>

                            <div class="col-sm-7">
                                <p class="text-sm">PAQUETE DE VIAJE</p>
                            </div>
                            <div class="col-sm-5">
                                <p class="text-sm" align="right">L ${Packages.subtotal.toFixed(2)}</p>
                            </div>

                            <div class="col-sm-7">
                                <p class="text-sm">I.S.V</p>
                            </div>
                            <div class="col-sm-5">
                                <p class="text-sm" align="right">L 0.00</p>
                            </div>

                            <div class="col-sm-7">
                                <p class="text-md"><b>TOTAL</b></p>
                            </div>
                            <div class="col-sm-5">
                                <p class="text-md" align="right"><b>L ${total_price.toFixed(2)}</b></p>
                            </div>
                        </div>
                    </div>
                </div>`
            );

        } else {
            $("#frmPackagesDetail .ui.grid").append(
                `<div class="sixteen wide column">
                    <div class="ui negative message">
                        <div class="header">Selecciona un paquete</div>
                    </div>
                </div>`
            )
        }
    },

    getPackages: function () {
        var response = {
            data: [],
            cards: [],
            subtotal: 0
        };

        const selectedPackage = $(".package_item .package_button_trigger[data-selected='true']").eq(0);
        const package_id = $(selectedPackage).attr("data-value");
        const packages = packagesList.data;
        const package = packages.filter(x => x.id == package_id)[0];
        const place = CitiesList.data.filter(x => x.id == package.ciudad_ID)[0];
        response.subtotal = parseFloat(package.precio);
        const duracion =
            `${package.duracion_Paquete} dias y ${parseInt(package.duracion_Paquete) == 1 ? 1 : parseInt(package.duracion_Paquete) - 1} noches`;

        const images = package.image_URL.split(",");
        const card =
            `<div class="ten wide column">
                <div class="ui items">
                    <div class="item">
                        <div class="image">
                            <img src="${images[0]}">
                        </div>
                        <div class="content" style="width: inherit;">
                            <h2>${package.nombre}</h2>
                            <div class="description">${package.descripcion_Paquete}</div>
                            <div class="extra">
                                <h4>
                                    - Para ${package.cantidad_de_personas} personas<br>
                                    - ${duracion}<br>
                                </h4>
                                <div class="ui label">
                                    <i class="map marker icon"></i>
                                    ${place.pais.toUpperCase()}, ${place.ciudad.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="six wide column">
                <div class="card">
                    <div class="card-header">
                        <h3 class="h4 mb-0">Desglose</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-7">
                                <p class="text-sm">I.S.V</p>
                            </div>
                            <div class="col-sm-5">
                                <p class="text-sm" align="right">L 0.00</p>
                            </div>
                            <div class="col-sm-7">
                                <p class="text-md"><b>SUBTOTAL</b></p>
                            </div>
                            <div class="col-sm-5">
                                <p class="text-md" align="right"><b>L ${parseFloat(package.precio).toFixed(2)}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        response.cards.push(card);
        response.data.push(package);

        return response;
    },

    getActivities: function () {

        var response = {
            data: [],
            cards: [],
            subtotal: 0
        };

        const activities = ActivitiesList.data;
        const activitiesButtons = $(".activity_item .activity_trigger_button[data-selected='true']");

        $.each(activitiesButtons, function (i, item) {

            const container = $(item).parents(".activitiesExtra_form_content");
            const id_activity = $(item).attr("data-value")
            const activity = activities.filter(x => x.id == id_activity)[0];

            const model = {
                "acEx_ID": activity.id,
                "reAE_ID": 0,
                "reAE_Precio": activity.precio,
                "reAE_Cantidad": parseInt($(container).find(".ExtraActivity_contador input").val()),
                "reAE_FechaReservacion": new Date($(container).find(".activities_fecha input").val()).toISOString(),
                "reAE_HoraReservacion": "string"
            };
            const subtotal = parseInt(model.reAE_Cantidad) * parseFloat(activity.precio);

            const images = activity.imageURL.split(",");
            const fecha = GetDateFormat({ string_date: model.reAE_FechaReservacion, hour_format: 12, date_format: "large" });
            const card =
                `<div class="ten wide column">
                    <div class="ui items">
                        <div class="item">
                            <div class="image">
                                <img src="${images[0]}">
                            </div>
                            <div class="content" style="width: inherit;">
                                <a class="header">${activity.actividad}</a>
                                <div class="description">
                                    <b class="ui blue header">- Reservado para el dia ${fecha.datetime}</b><br>
                                    <b class="ui header">- Reservado para ${model.reAE_Cantidad} personas</b>
                                </div>
                                <div class="extra">
                                    <h3 class="ui green header">L ${parseFloat(activity.precio).toFixed(2)} por persona</h3>
                                    <h2 class="ui header" style="text-align: end;">
                                        SUB TOTAL: <b style="color:green">L ${subtotal.toFixed(2)}</b>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="six wide column">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="h4 mb-0">Desglose</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-7">
                                    <p class="text-sm">I.S.V</p>
                                </div>
                                <div class="col-sm-5">
                                    <p class="text-sm" align="right">L 0.00</p>
                                </div>
                                <div class="col-sm-7">
                                    <p class="text-md"><b>SUBTOTAL</b></p>
                                </div>
                                <div class="col-sm-5">
                                    <p class="text-md" align="right"><b>L ${subtotal.toFixed(2)}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            response.subtotal += subtotal;
            response.data.push(model);
            response.cards.push(card);
        });

        return response;
    },

    getTransport: function () {
        var response = {
            data: [],
            cards: [],
            subtotal: 0
        };

        const transports = DetailsTransportationList.data;
        const transportsButtons = $(".transport_item .transport_trigger_button[data-selected='true']");

        $.each(transportsButtons, function (i, item) {

            const container = $(item).parents(".transport_form_content");
            const id_transport = $(item).attr("data-value")
            const transport = transports.filter(x => x.id == id_transport)[0];

            const ciudadSalida = CitiesList.data.filter(item => item.id == transport.ciudad_Salida_ID)[0];
            const ciudadDestino = CitiesList.data.filter(item => item.id == transport.ciudad_Llegada_ID)[0];

            const hora_salida =
                transport.hora_Salida.split(":")[0] > 12
                    ? transport.hora_Salida + " PM"
                    : transport.hora_Salida + " AM"

            const model = {
                "detr_ID": 0,
                "reTr_CantidadAsientos": parseInt($(container).find(".transport_contador input").val()),
                "reTr_Cancelado": false,
                "reTr_FechaCancelado": new Date($(container).find(".transport_fecha input").val()).toISOString()
            };

            const subtotal = parseFloat(transport.precio) * parseInt(model.reTr_CantidadAsientos);

            const images = transport.image_URL.split(",");
            const fecha = GetDateFormat({ string_date: model.reTr_FechaCancelado, hour_format: 12, date_format: "large" });
            const card =
                `<div class="ten wide column">
                    <div class="ui items">
                        <div class="item">
                            <div class="image">
                                <img src="https://apitotaltravel.azurewebsites.net/Images/${images[0]}">
                            </div>
                            <div class="content" style="width: inherit;">
                                <h2>${transport.parter}</h2>
                                <div class="description">
                                    <b class="ui blue header">- Reservado para el dia ${fecha.datetime}</b><br>
                                    <b class="ui header">- ${model.reTr_CantidadAsientos} asientos reservados</b>
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
                                    <h3 class="ui green header">L ${parseFloat(transport.precio).toFixed(2)} por asiento</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="six wide column">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="h4 mb-0">Desglose</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-7">
                                    <p class="text-sm">I.S.V</p>
                                </div>
                                <div class="col-sm-5">
                                    <p class="text-sm" align="right">L 0.00</p>
                                </div>
                                <div class="col-sm-7">
                                    <p class="text-md"><b>SUBTOTAL</b></p>
                                </div>
                                <div class="col-sm-5">
                                    <p class="text-md" align="right"><b>L ${subtotal.toFixed(2)}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            response.subtotal += subtotal;
            response.data.push(model);
            response.cards.push(card);
        });

        return response;
    },
}

//------------------------------------------- INIZIALIZE ------------------------------------------

$("#frmTransports").hide();
$("#frmActivities").hide();
$("#frmDetails").hide();
fill_data.fillMain($("#Origen").val());

//------------------------------------------- EVENTS ------------------------------------------

$("#navbar_packages #pay_item").click(function (_this) {
    if ($(_this.target).hasClass("menu_item")) {

        $("#navbar_packages .menu_item").removeClass("active");
        $(_this.target).addClass("active");
        $("#frmPackages").hide();
        $("#frmTransports").hide();
        $("#frmActivities").hide();
        $("#frmDetails").show();
        getDetails.getDetails_main();
    }
});

$("#navbar_packages .menu_item").click(function (_this) {
    $("#navbar_packages .menu_item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#navbar_packages .menu_item"), (i, item) => {
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