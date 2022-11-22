﻿// ----------------------------------- INIZIALIZE ------------------------------------
//varaibles
const UsersList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Users/List");
const DefaultPackagesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackages/List");
const DefaultPackagesDetailsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackagesDetails/List");
const CountriesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Countries/List");
const HotelsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Hotels/List");
const ReservationHotels = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ReservationHotels/List");
const CitiesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Cities/List");
const HotelsActvList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/HotelsActivities/List");
const ActvExtraList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ActivitiesExtra/List");

var CantidadActvHotel = 0;
var CantidadActvExtra = 0;



$("#msgErrorForm").hide();
$('#standard_calendar').calendar({
    type: 'date'
});
$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

$("#frmDefaultPackages").hide();
$("#frmAddExtraHotelsActivities").hide();
$("#frmAddExtraActivities").hide();

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
        $('#ddlPaises').append('<option value="' + Countries[i].id + '">' + '<i class="' + Countries[i].iso.toLowerCase() + ' flag"></i>' + Countries[i].pais + '</option>');
    }


});



//Hides details for Default packages
$("#frmDefaultPackagesDetails").hide();


$(document).on('change', '#ddlCiudades', function () {
    city = $('#ddlCiudades').val();
    
    $("#lblZone").text($("#ddlCiudades option:selected").text());
    //Reset the default packages dropdown after changing the cities
    $('#Paqu_ID').empty();
    //Fill the default packages Dropdown and can be filtered by cities
    $("#Paqu_ID").val("");
    const DefaultPackages = DefaultPackagesList.data;
    const Hotels = HotelsList.data;
    const filteredHotels = Hotels.filter(function (htel) { return htel.ciudadID == city });
    var hotelIDs = filteredHotels.map(x => x.id);

    const filteredDefaultPackages = DefaultPackages.filter((item) => hotelIDs.includes(item.iD_Hotel));

    if (filteredDefaultPackages.length != 0) {
        $('#Paqu_ID').append('<option value="">' + "Seleccione un paquete" + '</option>');
        for (var i = 0; i < filteredDefaultPackages.length; i++) {
            $('#Paqu_ID').append('<option value="' + filteredDefaultPackages[i].id + '">' + filteredDefaultPackages[i].nombre + '</option>');
        };
    } else {
        $('#Paqu_ID').append('<option default selected value="">' + "No hay opciones para mostrar" + '</option>');
    }
    
    $("#listExtraActivities").empty();
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
                "<img class= 'ui avatar image' src='https://cdn-icons-png.flaticon.com/512/1248/1248139.png'>" +
                "<div class='content'>" +
                "<p class='header'>" + DefaultPackageAct[i].descripcionActividad + "</p></div></div> ");
    }

    $('#dateRangePicker').daterangepicker({
        "minDate": new Date(),
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

    $("#listHotelsExtraActivities").empty();
    
});
//------------------------------------ACTIVIDADES EXTRAS
//Fill the activities extra form
function ActvExtraForm() {
    const DefaultPackages = DefaultPackagesList.data;
    const Hotels = HotelsList.data;

    const DefaultPackagesDetails = DefaultPackagesDetailsList.data;
    const PackageID = $("#Paqu_ID").val();

    const DefaultPackage = DefaultPackages.filter(function (Package) {
        return Package.id == PackageID
    });

    

    const DefaultPackageAct = DefaultPackagesDetails.filter(function (PackageDetails) {
        return PackageDetails.paqueteID == PackageID
    });

    const package = DefaultPackage[0];

    
    //Activities Extras in the zone
    const ActvExtra = ActvExtraList.data.filter((x) => { return x.ciudadID == $("#ddlCiudades").val(); });
    CantidadActvExtra += 1;

    $("#listExtraActivities").append(`
<div class="four fields " id="extraActivitiesID`+ CantidadActvExtra + `">
    <div class="field">
        <label>Actividades en <span id="lblZone"></span></label>
        <select class="ui dropdown" id="ddlextraActivities`+ CantidadActvExtra + `">
            
        </select>
                                                
    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" onchange="calculatePriceOfActvExtra(`+ CantidadActvExtra + `)" id="extraActivitiesAmount` + CantidadActvExtra + `" placeholder="Cantidad de personas">
    </div>
    <div class="field ">
        <label>Total</label>
        <input type="number" dir="rtl"  id="extraActivitiesPrice`+ CantidadActvExtra + `" placeholder="0.00" readonly>
    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteExtraActivities(`+ CantidadActvExtra + `)" id="btndeleteExtraActivities">- Eliminar actividad</div>
    </div>
</div>

`);
    if (ActvExtra.length > 0) {
        //Fill the extra activities in the zone
        $('#ddlextraActivities' + CantidadActvExtra).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < ActvExtra.length; j++) {
            $('#ddlextraActivities' + CantidadActvExtra).append('<option value="' + ActvExtra[j].iD_Actividad + '">' + ActvExtra[j].actividad + ' L ' + ActvExtra[j].precio + ' c/u' + '</option>');
        };

    }
    else {
        $('#ddlextraActivities' + CantidadActvExtra).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');
    }
    
};
//Calculates the price of the activities of the zone
function calculatePriceOfActvExtra(inputID) {
    const ExtraActv = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ActivitiesExtra/Find?id=" + $("#ddlextraActivities" + inputID).val(), SendToken = true);
    const CantPersonasHtl = $("#extraActivitiesAmount" + inputID).val();
    const data = ExtraActv.data;
    $("#extraActivitiesPrice" + inputID).val(data.precio * parseInt( CantPersonasHtl));
};


//Show inputs for extra activities in the zone
$("#btnShowExtraActivities").click(function () {
    if ($("#btnShowExtraActivities").hasClass("active")) {
        $("#btnShowExtraActivities").removeClass("active")
        $("#frmAddExtraActivities").hide();
        $("#listExtraActivities").empty();
        CantidadActvExtra = 0;

    }
    else {
        $("#frmAddExtraActivities").show();
        $("#btnShowExtraActivities").addClass("active")
        
        ActvExtraForm();
    }
});
//Add a new input for an activity extra of the zone
$("#btnExtraActv").click(function () {
    ActvExtraForm();
});
//Delete an input for an activity extra of the zone
function deleteExtraActivities(inputID) {
    $("#extraActivitiesID" + inputID).remove();
};



//------------------------------------ACTIVIDADES EXTRAS EN HOTEL
//Fill the hotel activities extra form
function hotelActvExtraForm() {
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
    //Activities Extras in the hotel
    const htelActvExtra = HotelsActvList.data.filter((x) => { return x.iD_Hotel == package.iD_Hotel });

        $("#listHotelsExtraActivities").append(`
<div class="four fields " id="hotelsExtraActivitiesID`+ CantidadActvHotel + `">
    <div class="field">
        <label>Actividades en el hotel</label>
        <select class="ui dropdown" id="ddlhotelsExtraActivities`+ CantidadActvHotel + `">
            
        </select>
                                                
    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" onchange="calculatePriceOfActvHotels(`+ CantidadActvHotel +`)" id="hotelsExtraActivitiesAmount`+ CantidadActvHotel +`" placeholder="Cantidad de personas">
    </div>
    <div class="field hotelsExtraActivitiesPrice">
        <label>Total</label>
        <input type="number" dir="rtl"  id="hotelsExtraActivitiesPrice`+ CantidadActvHotel +`" placeholder="0.00" readonly>
    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteHotelExtraActivities(`+ CantidadActvHotel +`)" id="btndeleteExtraActivities">- Eliminar actividad</div>
    </div>
</div>

`);
    if (htelActvExtra.length > 0) {
        //Fill the extrac activities in the hotel
        $('#ddlhotelsExtraActivities' + CantidadActvHotel).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < htelActvExtra.length; j++) {
            $('#ddlhotelsExtraActivities' + CantidadActvHotel).append('<option value="' + htelActvExtra[j].iD_Actividad + '">' + htelActvExtra[j].actividad + ' L ' + htelActvExtra[j].precio + ' c/u' + '</option>');
        };

    } else {
        $('#ddlhotelsExtraActivities' + CantidadActvHotel).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');

    }
  
}

//Calculates the price of the activities of the hotel
function calculatePriceOfActvHotels(inputID) {
    var ID = $("#ddlhotelsExtraActivities" + inputID).val();
    const HtlExtraActv = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/HotelsActivities/Find?id=" + ID, SendToken=true);
    const CantPersonas = $("#hotelsExtraActivitiesAmount" + inputID).val();
    $("#hotelsExtraActivitiesPrice" + inputID).val(HtlExtraActv.data.precio * CantPersonas);
};



//Show inputs for extra activities in hotels
$("#btnShowExtraHotelActivities").click(function () {
    if ($("#btnShowExtraHotelActivities").hasClass("active")) {
        $("#btnShowExtraHotelActivities").removeClass("active")
        $("#frmAddExtraHotelsActivities").hide();
        $("#listHotelsExtraActivities").empty();
        CantidadActvHotel = 0;
        
    }
    else {
        $("#frmAddExtraHotelsActivities").show();
        $("#btnShowExtraHotelActivities").addClass("active")
        CantidadActvHotel = 1;

        hotelActvExtraForm();
    }

});
//Add a new input for an activity extra of the hotel
$("#btnHotelExtraActivities").click(function () {
    CantidadActvHotel += 1;
    hotelActvExtraForm();
});
//Delete an input for an activity extra of the hotel
function deleteHotelExtraActivities(inputID) {
    $("#hotelsExtraActivitiesID" + inputID).remove();
};


//Date range picker limited based on the duration of the package
$('#dateRangePicker').daterangepicker({
    "minDate": new Date(),
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
        $("#listExtraActivities").empty();
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

        //Actividades Extra hoteles
        try {
            if (CantidadActvHotel > 0 && CantidadActvHotel != undefined) {
                var ActividadesHoteles = [];

                for (let index = 0; index < CantidadActvHotel; index++) {
                    if ($("#hotelsExtraActivitiesID" + index).length > 0) {
                        var actv = {
                            "hoAc_ID": $("#frmAddExtraHotelsActivities #ddlhotelsExtraActivities" + index).val(),
                            "reAH_Precio": $("#frmAddExtraHotelsActivities #hotelsExtraActivitiesPrice" + index).val(),
                            "reAH_Cantidad": $("#frmAddExtraHotelsActivities #ddlhotelsExtraActivities" + index).val(),
                            "reAH_FechaReservacion": $("#frmCreateReservation #dateRangePicker").val().split('-')[0].replaceAll('/', '-').trim().split("-").reverse().join("-"),
                            "reAH_HoraReservacion": "1200"
                        }
                        ActividadesHoteles.push(actv);
                    }
                }
                reservation.append("ActividadesHoteles", ActividadesHoteles );

            }

            if (CantidadActvExtra > 0 && CantidadActvExtra != undefined) {
                var actividadesExtras = [];

                for (let index = 0; index < CantidadActvExtra; index++) {
                    if ($("#extraActivitiesID" + index).length > 0) {
                        var actv = {
                            "reAE_ID": 0,
                            "acEx_ID": $("#frmAddExtraActivities #ddlextraActivities" + index).val(),
                            "reAE_Precio": $("#frmAddExtraActivities #extraActivitiesPrice" + index).val(),
                            "reAE_Cantidad": $("#frmAddExtraActivities #extraActivitiesAmount" + index).val(),
                            "reAE_FechaReservacion": $("#frmCreateReservation #dateRangePicker").val().split('-')[0].replaceAll('/', '-').trim().split("-").reverse().join("-"),
                            "reAE_HoraReservacion": "1200"
                        }
                        actividadesExtras.push(actv);
                    }
                }
                reservation.append("ActividadesExtras", ActividadesHoteles);

            }
        } catch (e) {
            errorInActivities();
        }
        

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

function warningInActivities() {
    iziToast.warning({
        title: 'Atención',
        message: 'Termine de ingresar los datos en los campos de actividades',
    });
}

function errorInActivities() {
    iziToast.error({
        title: 'Atención',
        message: 'Ocurrió un error al procesar las actividades extras, recargue la página o intentelo más tarde',
    });
}


//Fill the user data if it's a response from redirection
$(document).ready(function () {
    var redirectedUserResponseID = $("#createdUserID").val();
    if (redirectedUserResponseID != undefined) {
        if (!redirectedUserResponseID > 0) {
            const UserData = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Users/Find?id=" + redirectedUserResponseID);
            const User = UserData.data;
            User.fecha_Nacimiento = User.fecha_Nacimiento.split("T")[0];
            User.fecha_Nacimiento = User.fecha_Nacimiento.split("-").reverse().join("-");

            $("#Usua_ID").val(User.id);
            $("#txtNombre").val(User.nombre);
            $("#txtApellido").val(User.apellido);
            $("#txtTelefono").val(User.telefono);
            $("#txtEmail").val(User.email);
            $("#txtFechaNacimiento").val(User.fecha_Nacimiento);
        }
    }
    
});