//------------------------- MODELS VARIABLES ---------------------------

//extra
const PartnersList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Partners/List");
const CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
// hotels
const HotelsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Hotels/List");
const HotelsActivitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/HotelsActivities/List");
const RoomsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Rooms/List");

// activities
const ActivitiesExtraList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ActivitiesExtra/List");

// transports
const DetailsTransportationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DetailsTransportation/List");

//restaurants
const RestaurantsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Restaurants/List");
const MenusList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Menus/List");

//------------------------- VARIABLES ---------------------------

var data = {
    persons: 0,
    hotel: {
        data: 0,
        rooms: [
            { id: 0, count: 0 }
        ]
    },
    restaurant: 0,
    transport: 0,
    activities: [0],
};

const helpers = {
    hideAll: function () {
        var pantallas = [
            $("#hotel_container"),
            $("#activities_container"),
            $("#transport_container"),
            $("#restaurant_container"),
            $("#pago_container")
        ];

        $.each(pantallas, function (index, item) {
            $(item).hide();
        });
    },

    setStepDefault: function () {
        $.each($("#StepsContainer .step"), function (index, item) {
            $(item).removeClass("active");
            $(item).removeClass("completed");
            $(item).addClass("disabled");
        });
    }
}

const steps = {
    step_0: function () {
        $("#frmStepfooter button").prop("disabled", true);

        helpers.setStepDefault();
        $("#StepsProgressBar").css("width", "20%");
        $("#StepsContainer .step").eq(0).addClass("active").removeClass("disabled");
        helpers.hideAll();
        $("#hotel_container").show();
        $("#frmRooms").hide();
        $("#frmHotels").show();
    },

    step_1: function () {
        $('#main_content :input').attr('disabled', false);
        $('#main_content :button').attr('disabled', false);

        $("#frmStepfooter button").prop("disabled", true);

        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "20%");
        $("#StepsContainer .step").eq(0).addClass("active").removeClass("disabled");

        // show view
        helpers.hideAll();
        $("#hotel_container").show();
        $("#frmRooms").hide();
        $("#frmHotels").show();

        //buttons item events
        $("#frmHotels .hotel_item .hotel_button_trigger").click(function (_this_button) {

            //set default
            $("#frmHotels .hotel_item .hotel_button_trigger").removeClass("positive").addClass("primary");
            $("#frmHotels .hotel_item .hotel_button_trigger").html('RESERVAR <i class="right chevron icon"></i>');

            //set actual
            const id_hotel = $(_this_button.target).attr("data-value");
            $(_this_button.target).addClass("positive").removeClass("primary");
            $(_this_button.target).html('RESERVADO <i class="right chevron icon"></i>');

            
            if ($(_this_button.target).attr("data-selected") == "false") {
                $("#frmHotels .hotel_item .hotel_button_trigger").attr("data-selected", "false");
                $(_this_button.target).attr("data-selected", "true");
                fillRooms(id_hotel);
                fillHotelActivities(id_hotel);
            }

            $("#frmRooms").show();
            $("#frmHotels").hide();
            
            $("#frmStepfooter button").prop("disabled", false);
        });

        // footer buttons events 
        $("#btnNextStep").attr("data-step", "step_2");
        $("#btnBeforeStep").attr("data-step", "step_0");
    },

    step_2: function () {

        $("#frmStepfooter button").prop("disabled", false);

        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "40%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#activities_container").show();
        $("#frmExtraActivities").hide();
        $("#frmHotelActivities").show();

        //activities button events
        $("button.activityHotel_trigger_button").click(function (_this) {

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

        });

        $("button.activity_trigger_button").click(function (_this) {

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
        });

        // footer buttons events 
        $("#btnNextStep").attr("data-step", "step_3");
        $("#btnBeforeStep").attr("data-step", "step_1");

    },

    step_3: function () {
        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "60%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(2).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#transport_container").show();
        $("#frmPortuarios").hide();
        $("#frmVuelos").hide();

        $("#frmTransporte_menu .item").removeClass("active");
        $("#frmTransporte_menu .item").eq(0).addClass("active");
        $("#frmTransportes").show();

        // footer buttons events 
        $("#btnNextStep").attr("data-step", "step_4");
        $("#btnBeforeStep").attr("data-step", "step_2");
    },

    step_4: function () {
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "80%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(2).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(3).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#restaurant_container").show();

        // footer buttons events 
        $("#btnNextStep").attr("disabled", false);
        $("#btnNextStep").attr("data-step", "step_5");
        $("#btnBeforeStep").attr("data-step", "step_3");
    },

    step_5: function () {
        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "100%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(2).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(3).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(4).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#pago_container").show();

        // footer buttons events 
        $("#btnNextStep").attr("disabled", true);
        $("#btnBeforeStep").attr("data-step", "step_4");
    }
}


//------------------------- INIZIALIZE ---------------------------
$('#main_content :input').attr('disabled', true);
$('#main_content :button').attr('disabled', true);
steps.step_0();
createContador($(".contador"));

// fechas 
$('#txtFechaEntrada').calendar({
    type: 'date',
    endCalendar: $('#txtFechaSalida')
});

$('#txtFechaSalida').calendar({
    type: 'date',
    startCalendar: $('#txtFechaEntrada')
});

$('.activities_fecha').calendar({
    type: 'date',
    popupOptions: {
        position: 'bottom right',
        lastResort: 'bottom right',
        hideOnScroll: false
    }
});

$('.restaurant_fecha').calendar({
    type: 'date',
    popupOptions: {
        position: 'bottom right',
        lastResort: 'bottom right',
        hideOnScroll: false
    }
});


$('.ui.dropdown').dropdown();

//-------------------------- EVENTS ------------------------------------------

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

$("#frmActivities_menu .item").click(function (_this) {
    $("#frmActivities_menu .item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#frmActivities_menu .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#activities_container ${object}`).hide();
    });

    const wideToShow = $(_this.target).attr("data-target");
    $(wideToShow).show();
});

$("#btnNextStep").click(function (_this) {
    var step = $(_this.target).attr("data-step");
    steps[step]();
});

$("#btnBeforeStep").click(function (_this) {
    var step = $(_this.target).attr("data-step");
    steps[step]();
});

$(".menu_trigger_button").click(function () {
    $('#mdlMenus').modal('show');
});

$("#cbbCiudadDestino").change(function (_this) {
    if ($("#cbbCiudadDestino").val() != 0) {
        fillMain(
            $("#cbbCiudadResidencia").val(),
            $("#cbbCiudadDestino").val()
        );
    }
});

$("#cbbCiudadResidencia").change(function (_this) {
    if ($("#cbbCiudadDestino").val() != 0) {
        fillMain(
            $("#cbbCiudadResidencia").val(),
            $("#cbbCiudadDestino").val()
        );
    }
});

//-------------------------- FUNCTIONS CONTADOR ------------------------------------------

function createContador(querySelector,startInCero = false) {

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

//-------------------------- MAIN FUNCTIONS PAGE ------------------------------------------

function fillMain(id_ciudad_salida, id_ciudad_destino){
    fillHotels(id_ciudad_destino);
    fillExtraActivities(id_ciudad_destino);
    fillTransport(id_ciudad_salida, id_ciudad_destino)
    steps.step_1();
}

function fillHotels(id_ciudad){

    if (HotelsList.code == 200) {
        const ciudad = jQuery.grep(CitiesList.data, function (item, i) {
            return item.id == id_ciudad;
        })[0];

        const hotels = jQuery.grep(HotelsList.data, function (item, i) {
            return item.ciudadID == id_ciudad;
        });

        $("#hotel_container #frmHotels #frmItems").empty();
        if (hotels.length > 0) {
            for (var i = 0; i < hotels.length; i++) {

                const hotel = hotels[i];
                const hotelImage = hotel.image_URL.split(",");

                // caroulse contruct
                var carousel = `<div class="fotorama hotels_fotorama" data-allowfullscreen="true" data-nav="thumbs" data-width="100%">`;
                for (var j = 0; j < hotelImage.length; j++) {
                    carousel += `<img src="${hotelImage[j]}">`;
                }
                carousel += "</div>";

                const card =
                    ` <div class="item hotel_item">
                    <div class="image">
                        ${carousel}
                    </div>
                    <div class="content">
                        <h3><b>${hotel.hotel}</b></h3>
                        <h5 class="blue_text">
                            <i class="map marker alternate blue icon"></i>
                            <b>${ciudad.ciudad}, ${ciudad.pais}</b>
                        </h5>
                        <div class="extra">
                            <b>Rating:</b><br>
                            <div class="ui huge star rating disabled" data-rating="5"></div>
                        </div>
                    </div>
                    <div class="content left floated" style="text-align: end;">
                        <br>
                        <button class="ui right floated primary button hotel_button_trigger" data-value="${hotel.id}" data-selected="false">
                            RESERVAR <i class="right chevron icon"></i>
                        </button>
                    </div>
                </div>`;

                $("#hotel_container #frmHotels #frmItems").append(card);
            }

            // INIZIALIZE OBJECT
            $('.rating').rating({
                initialRating: 2,
                maxRating: 5
            });

            $('.rating.disabled').rating({
                initialRating: 2,
                maxRating: 5
            }).rating('disable');

            $(".hotels_fotorama").fotorama();

        } else {
            $("#hotel_container #frmHotels #frmItems").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <i class="close icon"></i>
                            <div class="header">
                                No hay hoteles disponibles en esta zona
                            </div>
                            <p>
                                Selecciona una ciudad para empezar tu busqueda
                            </p>
                        </div>
                    </div>
                </div>`);
        }
    }
}

function fillRooms(id_hotel) {

    if (RoomsList.code == 200) {
        const rooms = jQuery.grep(RoomsList.data, function (item, i) {
            return item.hotelID == id_hotel;
        });

        $("#hotel_container #frmRooms").empty();
        if (rooms.length > 0) {
            
            for (var i = 0; i < rooms.length; i++) {

                const item = rooms[i];
                const images = item.imageUrl.split(",");
                
                // carousel construct
                var carousel = `<div class="fotorama rooms_fotorama" data-allowfullscreen="true" data-nav="thumbs" data-width="100%" data-height="300">`;
                for (var j = 0; j < images.length; j++) {
                    carousel += `<img src="${images[j]}">`;
                }
                carousel += "</div>";

                //details list
                var details = `<h6 style="font-weight:bold;">- Capacidad para ${item.capacidad} personas</h6>`;
                if (item.balcon) {
                    details += "<h6>- Vista de balcon</h6>";
                }
                if (item.wifi) {
                    details += "<h6>- Conexion WI-FI</h6>";
                }

                // room card construct
                const card =
                    `<div class="column room_item">
                        <div class="ui card" style="width:100%; height:100%;">
                            <div class="image">
                               ${carousel}
                            </div>
                            <div class="content">
                                <a class="header">
                                    <h3>
                                        <b>${item.habitacion}</b>
                                        <div class="ui large gray horizontal label">${item.categoria}</div>
                                    </h3>
                                </a>
                                <h5 class="description">${item.descripcion} </h5>

                                <div class="extra">
                                    <h5 class="blue_text">Detalles adicionales</h5>
                                    ${details}
                                    <br>
                                    <b>Rating:</b><br>
                                    <div class="ui huge star rating disabled" data-rating="5"></div>
                                </div><br>
                                <div class="ui labeled large button" tabindex="0">
                                    <div class="ui green button">
                                        <i class="tag icon"></i> Precio
                                    </div>
                                    <h3 class="ui basic left pointing label">
                                        Lps. ${parseFloat(item.precio).toFixed(2)}
                                    </h3>
                                </div>

                            </div>
                            <div class="extra content" style="text-align: end;">
                                <div class="field">
                                     <div class="ui right labeled input room_contador" style="width: 100%;">
                                        <div class="ui icon button label minus_button">
                                            <i class="minus icon"></i>
                                        </div>
                                        <input class="count_input" type="number" value="0"
                                               style="text-align: center;" readonly>
                                        <div class="ui icon button label plus_button">
                                            <i class="plus icon"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>`;

                $("#hotel_container #frmRooms").append(card);
            }

            //inizialize objects
            createContador($(".room_contador"),true);
            $(".rooms_fotorama").fotorama();
            $('.rating').rating({
                initialRating: 2,
                maxRating: 5
            });
        }
        else {
            $("#hotel_container #frmRooms").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <i class="close icon"></i>
                            <div class="header">
                                No hay habitaciones disponibles en este hotel
                            </div>
                        </div>
                        <a class="ui left floated button" href="javascript: steps.step_0() ">
                            <i class="left chevron icon"></i> VOLVER
                        </a>
                    </div>
                </div>`);
        }

    }
}

function fillExtraActivities(id_ciudad) {
    if (ActivitiesExtraList.code == 200) {

        const activities = jQuery.grep(ActivitiesExtraList.data, function (item, i) {
            return item.ciudadID == id_ciudad;
        });

        $("#activities_container #frmExtraActivities .ui.items").empty();
        if (activities.length > 0) {

            for (var i = 0; i < activities.length; i++) {

                const item = activities[i];
                const images = item.imageURL.split(",");

                //carousel construct
                var carousel =
                    `<div class="fotorama activities_fotorama" data-allowfullscreen="true" data-nav="thumbs">`;
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
                        <h3>
                            <b class="blue_text">${item.actividad}</b>
                            <div class="ui large gray horizontal label">${item.tipoActividad}</div>
                        </h3>
                        <h4><b>${item.partner}</b></h4>
                        <div class="description">
                            ${item.descripcion}
                        </div>
                        <div class="extra">
                            <h3 class="ui green header">L ${parseFloat(item.precio).toFixed(2)} por persona</h3>
                        </div>
                    </div>
                    <div class="content left floated">
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

                $("#activities_container #frmExtraActivities .ui.items").append(card);
            }

            // INIZIALIZE EVENTS
            $(".activities_fotorama").fotorama();
            createContador($(".ExtraActivity_contador"));
            $('.activities_fecha').calendar({
                type: 'date',
                popupOptions: {
                    position: 'bottom right',
                    lastResort: 'bottom right',
                    hideOnScroll: false
                }
            });

        } else {
            $("#activities_container #frmExtraActivities .ui.items").append(
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
}

function fillHotelActivities(id_hotel) {
    if (HotelsActivitiesList.code == 200) {

        const activities = jQuery.grep(HotelsActivitiesList.data, function (item, i) {
            return item.iD_Hotel == id_hotel;
        });

        $("#activities_container #frmHotelActivities .ui.items").empty();
        if (activities.length > 0) {

            for (var i = 0; i < activities.length; i++) {

                const item = activities[i];
                const images = item.image_URL.split(",");

                //carousel construct
                var carousel =
                    `<div class="fotorama activitiesHotels_fotorama" data-allowfullscreen="true" data-nav="thumbs">`;
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
                        <h3>
                            <b class="blue_text">${item.actividad}</b>
                            <div class="ui large gray horizontal label">Familiar</div>
                        </h3>
                        <h4><b>${item.hotelNombre}</b></h4>
                        <div class="description">
                            ${item.descripcion}
                        </div>
                        <div class="extra">
                            <h3 class="ui green header">L ${parseFloat(item.precio).toFixed(2)} por persona</h3>
                        </div>
                    </div>
                    <div class="content left floated">
                        <div class="fields">

                            <div class="field">
                                <label>No. de personas</label>
                                <div class="field">
                                    <div class="ui right labeled input hotelActivity_contador">
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
                                <div class="ui calendar activitiesHotels_fecha">
                                    <div class="ui input left icon">
                                        <i class="calendar icon"></i>
                                        <input type="text" placeholder="Fecha de reservacion" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br>
                        <button class="ui right floated primary button activityHotel_trigger_button" data-selected="false" data-value="${item.id}">
                            RESERVAR
                            <i class="right chevron icon"></i>
                        </button>
                    </div>
                </div>`;

                $("#activities_container #frmHotelActivities .ui.items").append(card);
            }

            // INIZIALIZE EVENTS
            $(".activitiesHotels_fotorama").fotorama();
            createContador($(".hotelActivity_contador"));
            $('.activitiesHotels_fecha').calendar({
                type: 'date',
                popupOptions: {
                    position: 'bottom right',
                    lastResort: 'bottom right',
                    hideOnScroll: false
                }
            });

        } else {
            $("#activities_container #frmHotelActivities .ui.items").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <div class="header">
                                No hay actividades turisticas disponibles en este hotel
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }

    }
}

function fillTransport(id_ciudad_salida, id_ciudad_llegada) {

    var transports = jQuery.grep(DetailsTransportationList.data, function (item, i) {
        return item.ciudad_Salida_ID == id_ciudad_salida && item.ciudad_Llegada_ID == id_ciudad_llegada;
    });
    console.log(transports);

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
                            No hay Transportes urbanos disponibles para esta area
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
                             No hay vuelos disponibles para esta area
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
                            No hay servicios de transportes maritimos disponibles para esta area
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
                        <img src="https://totaltravelapi.azurewebsites.net/Images/${images[0]}">
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
                    <div class="content left floated">
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
                        <div class="ui right floated primary button transport_trigger_button"
                                data-selected="false">
                            Reservar
                            <i class="right chevron icon"></i>
                        </div>
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