$("#DetailsBottom").click(() => {
    $("#modalUpdate").modal('show');
});
$("#msgErrorForm").hide();
$('#standard_calendar').calendar({
    type: 'date'
});
$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

paqueteDuracion = 10;
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
function createReservation() {
    var reservation = new FormData();

    const reservationValidateArray = [
        { validateMessage: "Campo requerido ", Jqueryinput: $("#dateRangePicker") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#personas") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#pagos") },

    ];

    const reservationValidate = ValidateForm(reservationValidateArray);


    // create reservation model
    if (reservationValidate) {

        reservation.append("Paqu_ID", $("#frmCreateReservation #Paqu_ID").val());
        if ($("#ddlTipoPaquete").val() == 2) {
            reservation.append("Resv_esPersonalizado", false);
        }
        else if ($("#ddlTipoPaquete").val() == 1) {
            reservation.append("Resv_esPersonalizado", true);

        }

        reservation.append("Resv_CantidadPagos", $("#frmCreateReservation #Resv_CantidadPagos").val());
        reservation.append("Resv_NumeroPersonas", $("#frmCreateReservation #Resv_NumeroPersonas").val());
        reservation.append("Resv_Precio", $("#frmCreateReservation #lblDefaultPackagePrice").text());
        reservation.append("Usua_ID", $("#frmCreateReservation #ddlDNI").val());
        reservation.append("ReHo_FechaEntrada", $("#frmCreateReservation #dateRangePicker").val().split('-')[0].replaceAll('/', '-').trim().split("-").reverse().join("-"));//.concat("T00:00:00"));
        reservation.append("ReHo_FechaSalida", $("#frmCreateReservation #dateRangePicker").val().split('-')[1].replaceAll('/', '-').trim().split("-").reverse().join("-"));//.concat("T00:00:00"));

        ReservationInsert();

        function ReservationInsert() {
            const SendToken = true;
            const method = "POST";
            const data = reservation;
            const url = "/Reservation/Create"

            var dataResponse = null;
            var Token = null;
            var HTTPError = {
                message: "",
                code: 0,
                success: false,
                data: null
            }

            if (SendToken == true) {
                Token = GetCookie("Token");
            }

            $.ajax({
                url: url,
                data: data,
                mimeType: "multipart/form-data",
                async: false,
                processData: false,
                contentType: false,
                type: method,
                beforeSend: function () {
                    $("#loaderAnimation").show();
                },
                complete: function () {
                    $("#loaderAnimation").hide();
                },
                success: function (httpResponse) {
                    window.location.href = "/Reservation/Index";
                }
            });
        }
    }
}

