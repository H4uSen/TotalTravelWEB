var packagesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackages/List");
var ActivitiesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ActivitiesExtra/List");

const fill_data = {

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
                    `<div class="column">
                        <div class="filterable-item south-america">
                            <article class="offer-item">
                                <figure class="featured-image">
                                    <img src="${images[0]}" alt="" style="height:200px;">
                                </figure>
                                <h2 class="entry-title"><a href="#">${item.nombre}</a></h2>
                                <p>${item.descripcion_Paquete}</p>
                                <p>Máximo de personas: ${item.cantidad_de_personas}</p>
                                <p>Destino: ${item.ciudad}</p>
                                <div class="price">
                                    <strong>L. ${item.precio}</strong>
                                    <small>/<a class="bot" href="BuyDefaults/Details/${item.id}">Ver detalles</a></small>
                                </div>
                            </article>
                        </div>
                    </div>`;

                $("#frmMenu_container #frmPackages .ui.grid").append(card);
            }
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

    fillTransport: function (id_ciudad_residencia, id_ciudad_destino) {

    }
}

//------------------------------------------- INIZIALIZE ------------------------------------------

$("#frmTransports").hide();
$("#frmActivities").hide();
$("#frmDetails").hide();
fill_data.fillPackages();
fill_data.fillActivities();

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