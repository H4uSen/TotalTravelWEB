$(document).ready(function () {
    var fechaDeEntrada
    var reservationID = parseInt(FindGetValue("responseID"));
    var response = ajaxRequest(urlAPI + "/API/Reservation/Details?Id=" + reservationID);
    if (!response.success) {
        iziToast.error({
            title: 'Error',
            message: "Ocurrió un error al cargar los datos de la reservación, intente resolverlo recargando la página",
        });
    } else {
        var reservationData = response.data;

        setTimeout(function () {
            $("#cbbCiudadDestino").dropdown("set selected", reservationData.reservacionDetalle.ciudad_ID);
            $('#txtCantidadPersonas').val(reservationData.reservacionDetalle.numeroPersonas);
            //check-in/check-out dates
            fechaEntrada = reservationData.reservacionDetalle.fecha_Entrada;
            fechaSalida = reservationData.reservacionDetalle.fecha_Salida;
            $("#txtFechaEntrada").calendar({ initialDate: new Date(fechaEntrada.split("T")[0]) });
            $("#txtFechaSalida").calendar({ initialDate: new Date(fechaSalida.split("T")[0]) });

            //Hotel
            //$(`#frmHotels button[data-value='${reservationData.reservacionDetalle.hotel_ID}']`)
            //    .attr("data-selected", "true");
            $(`#frmHotels button[data-value='${reservationData.reservacionDetalle.hotel_ID}']`)
                .addClass("positive").removeClass("primary");;
            $(`#frmHotels button[data-value='${reservationData.reservacionDetalle.hotel_ID}']`)
                .html('RESERVADO <i class="right chevron icon"></i>');            
            //Rooms

            $(`#frmHotels button[data-value='${reservationData.reservacionDetalle.hotel_ID}']`).click(function () {
                reservationData.habitaciones.forEach(habitacion => {
                    $(`#frmRooms [data-value='${habitacion.habi_ID}'] .count_input`).val(habitacion.habi_Cantidad);
                });
            });

            reservationData.actividadesHoteles.forEach(actividad => {
                $(`#frmHotelActivities button[data-value='${actividad.hoAc_ID}']`)
                    .addClass("positive")
                    .removeClass("primary");
                $(`#frmHotelActivities button[data-value='${actividad.hoAc_ID}']`)
                    .html('RESERVADO <i class="right chevron icon"></i>');
                $(`#frmHotelActivities button[data-value='${actividad.hoAc_ID}']`)
                    .attr("data-selected", "true");
                //Amount of people
                $(`#frmHotelActivities [data-value='${actividad.hoAc_ID}'] .count_input`).val(actividad.reAH_Cantidad);
                //Date of reservation
                $(`#frmHotelActivities [data-value='${actividad.hoAc_ID}'] .activitiesHotels_fecha`)
                    .calendar({ initialDate: new Date(`${actividad.reAH_FechaReservacion.split("T")[0]} ${actividad.reAH_HoraReservacion.split("").splice(2, 0, ":")}`) });
            });

            //Extra Activities

            reservationData.actividadesExtras.forEach(actividad => {
                $(`#frmExtraActivities button[data-value='${actividad.acEx_ID}']`)
                    .addClass("positive")
                    .removeClass("primary");
                $(`#frmExtraActivities button[data-value='${actividad.acEx_ID}']`)
                    .html('RESERVADO <i class="right chevron icon"></i>');
                $(`#frmExtraActivities button[data-value='${actividad.acEx_ID}']`)
                    .attr("data-selected", "true");
                //Amount of people
                $(`#frmExtraActivities [data-value='${actividad.acEx_ID}'] .count_input`).val(actividad.reAE_Cantidad);
                //Date of reservation
                $(`#frmExtraActivities [data-value='${actividad.acEx_ID}'] .activities_fecha`)
                    .calendar({ initialDate: new Date(`${actividad.reAE_FechaReservacion.split("T")[0]} ${actividad.reAE_HoraReservacion.split("").splice(2, 0, ":")}`) });

            });

            //Transport
            reservationData.transportes.forEach(transporte => {
                $(`#transport_container button[data-value='${transporte.detr_ID}']`)
                    .attr("data-selected", "true");
                $(`#transport_container button[data-value='${transporte.detr_ID}']`)
                    .removeClass("primary")
                    .addClass("positive");
                $(`#transport_container button[data-value='${transporte.detr_ID}']`)
                    .html('RESERVADO <i class="right chevron icon"></i>');
                //Amount of people
                $(`#transport_container [data-value='${transporte.detr_ID}'] .count_input`).val(transporte.reTr_CantidadAsientos);
                //Date of reservation
                $(`#transport_container [data-value='${transporte.detr_ID}'] .transport_fecha`)
                    .calendar({ initialDate: new Date(transporte.reTr_FechaCancelado.split("T")[0] ) });

            });

            //Restaurant
            reservationData.restaurantes.forEach(restaurante => {
                $(`#restaurant_container > div.ui.divided.items > div > div.content.left.floated.restaurant_form_content > button[data-value='${restaurante.rest_ID}']`)
                    .attr("data-selected", "true");
                $(`#restaurant_container > div.ui.divided.items > div > div.content.left.floated.restaurant_form_content > button[data-value='${restaurante.rest_ID}']`)
                    .removeClass("primary")
                    .addClass("positive");
                $(`#restaurant_container > div.ui.divided.items > div > div.content.left.floated.restaurant_form_content > button[data-value='${restaurante.rest_ID}']`)
                    .html('RESERVADO <i class="right chevron icon"></i>');
                //Date of reservation
                $(`#restaurant_container [data-value='${restaurante.rest_ID}'] .restaurant_fecha`)
                    .calendar({ initialDate: new Date(`${restaurante.reRe_FechaReservacion.split("T")[0]} ${restaurante.reRe_HoraReservacion.split("").splice(2, 0, ":") }`) });
            });
            $("#txtCantidadPagos").val(reservationData.reservacionDetalle.cantidadPagos);
            $("#frmPayment").css("display", "none");
        }, 1000);

    }
});
