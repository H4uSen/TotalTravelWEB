var ActivitiesExtraList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ActivitiesExtra/List");

function sweetAlerts() {

    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}
$("#frmae").hide();
//


$("#checkae").change(function () {
    if ($("#checkae").prop("checked") == true) {
        $("#frmae").show();
    } else {
        $("#frmae").hide();
    }
});
//-------------------------- FUNCTIONS CONTADOR ------------------------------------------

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
//form activities
fillExtraActivities(2);
function fillExtraActivities(id_ciudad) {
    if (ActivitiesExtraList.code == 200) {

        const activities = jQuery.grep(ActivitiesExtraList.data, function (item, i) {
            return item.ciudadID == id_ciudad;
        });

        $("#frmExtra").empty();
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

                $("#frmExtra").append(card);
            }
            /*$(".activities_fotorama").fotorama();*/
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
                if ($(container).find(".activities_fecha input").eq(0).val()==0) {
                    alert("rellenar");
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
}
//
$("#DetailsBottom").click(() => {
    $("#modalUpdate").modal('show');
});
$("#msgErrorForm").hide();
$('#standard_calendar').calendar({
    type: 'date'
});
$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

paqueteDuracion = $("#frmCreateReservation #duracion").val() - 1;
$('#dateRangePicker').daterangepicker({
    "maxSpan": {
        "days": paqueteDuracion
    },
    "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Aplicar",
        "cancelLabel": "Cancelar",
        "fromLabel": "Desde",
        "toLabel": "Hasta",
        "customRangeLabel": "Personalizado",
        "weekLabel": "S",
        "daysOfWeek": [
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab",
            "Dom"
        ],
        "monthNames": [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ],
        "firstDay": 1
    },
    "startDate": "11/01/2022",
    "endDate": "11/01/2022"
}, function (start, end, label) {
    //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});

// create reservation 
function createReservationBuy() {
    var reservation = new FormData();

    const reservationValidateArray = [
        { validateMessage: "Campo requerido ", Jqueryinput: $("#dateRangePicker") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#personas") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#pagos") },

    ];

    const reservationValidate = ValidateForm(reservationValidateArray);


    // create reservation model
    if (reservationValidate) {

        reservation.append("Resv_esPersonalizado", false);
        reservation.append("Paqu_ID", $("#frmCreateReservation #paquete").val());
        reservation.append("Resv_UsuarioCreacion", $("#frmCreateReservation #usuario").val());
        reservation.append("Resv_CantidadPagos", $("#frmCreateReservation #pagos").val());
        reservation.append("Resv_NumeroPersonas", $("#frmCreateReservation #personas").val());
        reservation.append("Resv_Precio", $("#frmCreateReservation #precio").text());
        reservation.append("Usua_ID", $("#frmCreateReservation #usuario").val());
        reservation.append("ReHo_FechaEntrada", $("#frmCreateReservation #dateRangePicker").val().split('-')[0].replaceAll('/', '-').trim().split("-").reverse().join("-"));//.concat("T00:00:00"));
        reservation.append("ReHo_FechaSalida", $("#frmCreateReservation #dateRangePicker").val().split('-')[1].replaceAll('/', '-').trim().split("-").reverse().join("-"));//.concat("T00:00:00"));

        ReservationInsert();

        function ReservationInsert() {
            const SendToken = true;
            const method = "POST";
            const data = reservation;
            const url = "/BuyDefaults/Create"
            const response = uploadFile(url, reservation, method);
            console.log(response);
            if (response > 0) {
                const capsula1 = () => {              
                        window.location.href = '/BuyDefaults/Transport';
                };
                sweetAlerts();

             
            }

           
        }
    }
}

