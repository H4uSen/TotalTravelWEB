// ----------------------------------- INIZIALIZE ------------------------------------
//varaibles
const UsersList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Users/List");
const DefaultPackagesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DefaultPackages/List");
const DefaultPackagesDetailsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DefaultPackagesDetails/List");
const CountriesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Countries/List");
const HotelsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Hotels/List");
const ReservationHotels = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationHotels/List");
const CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");





$("#msgErrorForm").hide();
$('#standard_calendar').calendar({
    type: 'date'
});
$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

$("#frmDefaultPackages").hide();

function goBack() {
    window.location.href = "/Reservation/Index";
}


// ----------------------------------- EVENTS ------------------------------------
$(document).ready(function () {
    //Fill the Users DNI Dropdown
    const Users = UsersList.data;
    for (var i = 0; i < Users.length; i++) {
        $('#Usua_ID').append('<option value="' + Users[i].id + '">' + Users[i].dni + '</option>');
    };

    //Fill the countries Dropdown
    const Countries = CountriesList.data;
    for (var i = 0; i < Countries.length; i++) {
        $('.ddlPaises').append('<option value="' + Countries[i].id + '">' + '<i class="' + Countries[i].iso.toLowerCase() + ' flag"></i>' + Countries[i].pais + '</option>');
    }


});

//Hides details for Default packages
$("#frmDefaultPackagesDetails").hide();


$(document).on('change', '#ddlCiudades', function () {
    //Reset the default packages dropdown after changing the cities
    $('#Paqu_ID').empty();
    //Fill the default packages Dropdown and can be filtered by cities
    $("#Paqu_ID").val("");
    const DefaultPackages = DefaultPackagesList.data;
    city = $('#ddlCiudades').val();
    const Hotels = HotelsList.data;
    const filteredHotels = Hotels.filter(function (htel) { return htel.ciudadID == city });
    var hotelIDs = filteredHotels.map(x => x.id);

    const filteredDefaultPackages = DefaultPackages.filter((item) => hotelIDs.includes(item.iD_Hotel));

    $('#Paqu_ID').append('<option value="">' + "Seleccione un paquete" + '</option>');
    for (var i = 0; i < filteredDefaultPackages.length; i++) {
        $('#Paqu_ID').append('<option value="' + filteredDefaultPackages[i].id + '">' + filteredDefaultPackages[i].nombre + '</option>');
    };
});





//Change the data of the user depending on the selected DNI
$("#Usua_ID").change(function () {
    const Users = UsersList.data;
    const UserID = $("#Usua_ID").val();

    const User = Users.filter(function (userID) {
        return userID.id == UserID
    });
    User[0].fecha_Nacimiento = User[0].fecha_Nacimiento.split("T")[0];
    User[0].fecha_Nacimiento = User[0].fecha_Nacimiento.split("-").reverse().join("-");

    $("#txtNombre").val(User[0].nombre);
    $("#txtApellido").val(User[0].apellido);
    $("#txtTelefono").val(User[0].telefono);
    $("#txtEmail").val(User[0].email);
    $("#txtFechaNacimiento").val(User[0].fecha_Nacimiento);

});


//Change cities depending on the country selected
$("#ddlPaises").change((_this) => {
    const Country_Id = $(_this.target).val();
    FillCities(Country_Id);
});


let paqueteDuracion = 7;
//Details of the Default packages card 
$("#Paqu_ID").change(function () {


    const DefaultPackages = DefaultPackagesList.data;
    const Hotels = HotelsList.data;

    const DefaultPackagesDetails = DefaultPackagesDetailsList.data;
    const PackageID = $("#Paqu_ID").val();

    const DefaultPackage = DefaultPackages.filter(function (Package) {
        return Package.id == PackageID
    });

    const Hotel = Hotels.filter((x) => { return x.id == DefaultPackage[0].iD_Hotel })

    const DefaultPackageAct = DefaultPackagesDetails.filter(function (PackageDetails) {
        return PackageDetails.paqueteID == PackageID
    });

    const package = DefaultPackage[0];

    //Descripcion
    $("#txtDefaultPackageName").text(package.nombre);
    $("#txtDefaultPackageDesc").text(package.descripcion_Paquete);
    $("#txtDefaultPackageDuracion").text(package.duracion_Paquete);
    paqueteDuracion = package.duracion_Paquete;
    //Hotel
    $("#txtDefaultPackageHotel").text(package.hotel);
    $("#imgDefaultPackage").attr("src", Hotel[0].image_URL);
    //Restaurante
    $("#txtDefaultPackageRest").text(package.restaurante);
    //Precio
    $("#lblDefaultPackagePrice").text(package.precio);


    for (var i = 0; i < DefaultPackageAct.length; i++) {
        $("#txtDefaultPackagesActividades")
            .append("<div class='item'>" +
                "<img class= 'ui avatar image' src=''>" +
                "<div class='content'>" +
                "<p class='header'>" + DefaultPackageAct[i].descripcionActividad + "</p></div></div> ");
    }

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
});

//Date range picker limited based on the duration of the package
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








//-------------- ADDRESS DROPDOWNS EVENTS




//Show or hide between default and personalized packages
$("#ddlTipoPaquete").change(function () {
    if ($("#ddlTipoPaquete").val() == 2) {
        $("#frmDefaultPackages").show();
    }
    else if ($("#ddlTipoPaquete").val() == 1) {
        $("#frmDefaultPackages").hide();
    }
    else {
        $("#frmDefaultPackages").hide();
    }
});



$("#Paqu_ID").change(function () {
    if ($("#Paqu_ID").val() == "") {
        $("#frmDefaultPackagesDetails").hide();
    } else {
        $("#frmDefaultPackagesDetails").show();
    }

});


// ----------------------------------- FUNCTIONS ------------------------------------

function FillCities(Country_Id) {

    if (CitiesList.code == 200) {

        var cities = CitiesList.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Country_Id;
        });

        var ListItems = [];
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            ListItems.push({ value: city.id, text: city.ciudad });
        }

        const dropdownData = {
            dropdown: $("#ddlCiudades"),
            items: {
                list: ListItems,
                valueData: "value",
                textData: "text"
            },
            placeholder: {
                empty: "No se encontraron ciudades disponibles",
                default: "Seleccione una ciudad",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#ddlCiudades").dropdown();

    }
}



// Create reservation
function createReservation() {
    var reservation = new FormData();

    const reservationValidateArray = [
        { validateMessage: "Campo requerido ", Jqueryinput: $("#frmCreateReservation #Usua_ID") },
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
        reservation.append("Usua_ID", $("#frmCreateReservation #Usua_ID").val());
        reservation.append("ReHo_FechaEntrada", $("#frmCreateReservation #dateRangePicker").val().split('-')[0].replaceAll('/', '-').trim().split("-").reverse().join("-"));//.concat("T00:00:00"));
        reservation.append("ReHo_FechaSalida", $("#frmCreateReservation #dateRangePicker").val().split('-')[1].replaceAll('/', '-').trim().split("-").reverse().join("-"));//.concat("T00:00:00"));

        /*
            const ReservationInsertStatus = uploadFile(
                "https://totaltravelapi.azurewebsites.net/API/Reservation/Insert",
                reservation, "POST"
            );
        */

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
                mimeType: "application/json",
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

                    console.log(httpResponse);
                    window.location.href = "/Reservation/Index";
                }

            });


        }





        /*
        if (ReservationInsertStatus.code == 200) {
                iziToastAlert(
                    "!User Created Successfully! ", "", "success"
                );
                location.assign("Index");
            }
            else {
                $("#msgErrorForm").show();
            $("#msgErrorForm p").html(ReservationInsertStatus.message);
            }
            */
    }



}
