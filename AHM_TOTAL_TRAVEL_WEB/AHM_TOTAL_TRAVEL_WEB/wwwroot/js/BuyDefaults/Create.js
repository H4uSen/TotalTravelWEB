var detallesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackagesDetails/List");

getActivities(idpaquete);

$("#DetailsBottom").click(() => {
    $("#modalUpdate").modal('show');
});

function editar(id) {
    var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackages/Find?id=" + id);
    if (response.code == 200) {
        $("#id").val(id);
        $("#Nombre").html(response.data.nombre);
        $("#Descripcion").html(response.data.descripcion_Paquete);
        $("#Duracion").html(response.data.duracion_Paquete);
        $("#Hotel").html(response.data.hotel);
        $("#Restaurante").html(response.data.restaurante);
        $("#Precio").html(response.data.precio);
        $("#sendMenu").prop("href", "BuyDefaults/Compra?id="+id);
        $("#modalUpdate").modal("show");
    }
    else {
        console.log(response);
    }
}


function getActivities(id) {
    var actividades = jQuery.grep(detallesList.data, function (detalle, i) {
        return detalle.paqueteID == id;
    });

    $("#actividades").empty();
    console.log(detallesList);
    for (var i = 0; i < actividades.length; i++) {
        const item = actividades[i];
        var card = `<li>${item.descripcionActividad}</li>`;
        $("#actividades").append(card);
    }
}


// create reservation 
function createReservation() {
    var reservation = new FormData();

    const reservationValidateArray = [
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #ddlDNI") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #Resv_NumeroPersonas") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #Resv_CantidadPagos") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #ddlTipoPaquete") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #ddlPaises") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #ddlCiudades") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #Paqu_ID") },
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #dateRangePicker") },

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