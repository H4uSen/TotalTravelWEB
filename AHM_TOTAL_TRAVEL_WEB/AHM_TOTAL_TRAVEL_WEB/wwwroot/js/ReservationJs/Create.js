// ----------------------------------- INIZIALIZE ------------------------------------
//varaibles
const UsersList = ajaxRequest(urlAPI+"/API/Users/List");
const DefaultPackagesList = ajaxRequest(urlAPI +"/API/DefaultPackages/List");
const DefaultPackagesDetailsList = ajaxRequest(urlAPI +"/API/DefaultPackagesDetails/List");
const CountriesList = ajaxRequest(urlAPI +"/API/Countries/List");
const HotelsList = ajaxRequest(urlAPI +"/API/Hotels/List");
const ReservationHotels = ajaxRequest(urlAPI +"/API/ReservationHotels/List");
const CitiesList = ajaxRequest(urlAPI +"/API/Cities/List");
const HotelsActvList = ajaxRequest(urlAPI +"/API/HotelsActivities/List");
const ActvExtraList = ajaxRequest(urlAPI +"/API/ActivitiesExtra/List");

var CantidadActvHotel = 0;
var CantidadActvExtra = 0;
var daysReserved = 0;
var hasSelectedDate = false;
var updPaquID = 0;


$("#msgErrorForm").hide();
$('#standard_calendar').calendar({
    type: 'date'
});
$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

$("#frmDefaultPackages").hide();
$("#frmAddExtraHotelsActivities").hide();
$("#frmAddExtraActivities").hide();

var Command = $(location).attr('href').split("/")[4];

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

    const filteredDefaultPackages = DefaultPackages.filter((item) => item.ciudad_ID == city);

    if (DefaultPackages.length != 0) {
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
    hasSelectedDate = false;
    daysReserved = 0;
    const DefaultPackages = DefaultPackagesList.data;
    const Hotels = HotelsList.data;

    const DefaultPackagesDetails = DefaultPackagesDetailsList.data;
    const PackageID = $("#Paqu_ID").val();

    const DefaultPackage = DefaultPackages.filter(function (Package) {
        return Package.id == PackageID
    });

    //const Hotel = Hotels.filter((x) => { return x.id == DefaultPackage[0].iD_Hotel })

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
    $("#imgDefaultPackage").attr("src", package.image_URL.split(",")[0]);
    //Restaurante
    $("#txtDefaultPackageRest").text(package.restaurante);
    //Precio
    $("#lblDefaultPackagePrice").text(package.precio);
    $("#txtDefaultPackagePrice").val(package.precio);

    $("#txtDefaultPackagesActividades").empty();
    for (var i = 0; i < DefaultPackageAct.length; i++) {
        $("#txtDefaultPackagesActividades")
            .append("<div class='item'>" +
                "<img class= 'ui avatar image' src='https://cdn-icons-png.flaticon.com/512/1248/1248139.png'>" +
                "<div class='content'>" +
                "<p class='header'>" + DefaultPackageAct[i].descripcionActividad + "</p></div></div> ");
    }
    if (DefaultPackageAct.length == 0) {
        $("#txtDefaultPackagesActividades")
            .append("<div class='item'>" +
                "<div class='content'>" +
                "<p class='header'>No incluye actividades</p></div></div> ");
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

    $('#dateRangePicker').on('apply.daterangepicker', function (ev, picker) {
        daysReserved = picker.endDate.diff(picker.startDate, "days");
        hasSelectedDate = true;
        console.log("Hola");
    });
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
<div class="four fields " id="extraActivitiesID${CantidadActvExtra}">
    <div class="field">
        <label>Actividades en <span id="lblZone"></span></label>
        <select class="ui dropdown" name="ddlextraActivities_${CantidadActvExtra}" onchange="calculatePriceOfActvExtra(${CantidadActvExtra})" id="ddlextraActivities_${CantidadActvExtra}" >

        </select>
                                                
    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" value="1" onchange="calculatePriceOfActvExtra(${CantidadActvExtra})" name="extraActivitiesAmount_${CantidadActvExtra}" id="extraActivitiesAmount_${CantidadActvExtra}" placeholder="Cantidad de personas">
    </div>
    <div class="field ">

        <label>Total</label>
        <div class="ui right labeled input">
            <label for="extraActivitiesPrice_${CantidadActvExtra}" class="ui label">L</label>
            <input type="number" dir="rtl" name="extraActivitiesPrice_${CantidadActvExtra}" id="extraActivitiesPrice_${CantidadActvExtra}" placeholder="0.00" readonly>
            <div class="ui basic label">.00</div>
        </div>
    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteExtraActivities(${CantidadActvExtra})" id="btndeleteExtraActivities">- Eliminar actividad</div>
    </div>
</div>

`);
    if (ActvExtra.length > 0) {
        //Fill the extra activities in the zone
        $('#ddlextraActivities_' + CantidadActvExtra).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < ActvExtra.length; j++) {
            $('#ddlextraActivities_' + CantidadActvExtra).append('<option value="' + ActvExtra[j].id + '">' + ActvExtra[j].actividad + ' L ' + ActvExtra[j].precio + ' c/u' + '</option>');
        };

    }
    else {
        $('#ddlextraActivities_' + CantidadActvExtra).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');
    }
    $('.ui.dropdown').dropdown();
};
//Calculates the price of the activities of the zone
function calculatePriceOfActvExtra(inputID) {
    const CantPersonasHtl = $("#extraActivitiesAmount_" + inputID).val();
    if (CantPersonasHtl < 1) {
        $("#extraActivitiesAmount_" + inputID).val("1");
        iziToast.warning({
            title: 'Atención',
            message: 'El mínimo de personas es 1',
        });
        return;
    }
    const ExtraActv = ajaxRequest(urlAPI +"/API/ActivitiesExtra/Find?id=" + $("#ddlextraActivities_" + inputID).val(), SendToken = true);
    const data = ExtraActv.data;
    $("#extraActivitiesPrice_" + inputID).val(data.precio * parseInt( CantPersonasHtl));
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
    var htelActvExtra = [];
    const PackageID = $("#Paqu_ID").val();
    if (PackageID != "") {

        const DefaultPackage = DefaultPackages.filter(function (Package) {
            return Package.id == PackageID
        });

        const Hotel = Hotels.filter((x) => { return x.id == DefaultPackage[0].iD_Hotel })

        const DefaultPackageAct = DefaultPackagesDetails.filter(function (PackageDetails) {
            return PackageDetails.paqueteID == PackageID
        });

        const package = DefaultPackage[0];
        //Activities Extras in the hotel
        htelActvExtra = HotelsActvList.data.filter((x) => { return x.iD_Hotel == package.iD_Hotel });
    }


        $("#listHotelsExtraActivities").append(`
<div class="four fields " id="hotelsExtraActivitiesID${CantidadActvHotel}">
    <div class="field">
        <label>Actividades en el hotel</label>
        <select class="ui dropdown" name="ddlhotelsExtraActivities_${CantidadActvHotel}" onchange="calculatePriceOfActvHotels(${CantidadActvHotel})" id="ddlhotelsExtraActivities_${CantidadActvHotel}" runat="server">

        </select>

    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" value="1" onchange="calculatePriceOfActvHotels(${CantidadActvHotel})" name="hotelsExtraActivitiesAmount_${CantidadActvHotel}" id="hotelsExtraActivitiesAmount_${CantidadActvHotel}" placeholder="Cantidad de personas" runat="server">
    </div>
    <div class="field hotelsExtraActivitiesPrice">
        <label>Total</label>
        <input type="number" dir="rtl" name="hotelsExtraActivitiesPrice_${CantidadActvHotel}" id="hotelsExtraActivitiesPrice_${CantidadActvHotel}" placeholder="0.00" readonly runat="server">
        
        <label>Total</label>
        <div class="ui right labeled input">
            <label for="hotelsExtraActivitiesPrice_${CantidadActvHotel}" class="ui label">L</label>
            <input type="number" dir="rtl" name="hotelsExtraActivitiesPrice_${CantidadActvHotel}" id="hotelsExtraActivitiesPrice_${CantidadActvHotel}" placeholder="0.00" readonly>
            <div class="ui basic label">.00</div>
        </div>
    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteHotelExtraActivities(${CantidadActvHotel})" id="btndeleteExtraActivities">- Eliminar actividad</div>
    </div>
</div>

`);
    if (htelActvExtra.length > 0) {
        //Fill the extrac activities in the hotel
        $('#ddlhotelsExtraActivities_' + CantidadActvHotel).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < htelActvExtra.length; j++) {
            $('#ddlhotelsExtraActivities_' + CantidadActvHotel).append('<option value="' + htelActvExtra[j].id + '">' + htelActvExtra[j].actividad + ' L ' + htelActvExtra[j].precio + ' c/u' + '</option>');
        };

    } else {
        $('#ddlhotelsExtraActivities_' + CantidadActvHotel).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');

    }
    $('.ui.dropdown').dropdown();
  
}

//Calculates the price of the activities of the hotel
function calculatePriceOfActvHotels(inputID) {
    const CantPersonas = $("#hotelsExtraActivitiesAmount_" + inputID).val();
    if (CantPersonas < 1) {
        $("#hotelsExtraActivitiesAmount_" + inputID).val("1");
        iziToast.warning({
            title: 'Atención',
            message: 'El mínimo de personas es 1',
        });
        return;
    }

    var ID = $("#ddlhotelsExtraActivities_" + inputID).val();
    const HtlExtraActv = ajaxRequest(urlAPI +"/API/HotelsActivities/Find?id=" + ID, SendToken=true);
    
    $("#hotelsExtraActivitiesPrice_" + inputID).val(HtlExtraActv.data.precio * CantPersonas);
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
        $("#frmReservData").show();


        if (command == "Create") {
            $("#CrearPersonalizado").val(false);
            $("#CrearPersonalizado").prop("checked", false);
            $("#CrearPersonalizado").attr("checked", false);
        } else if (command == "Update") {
            $("#EditarPersonalizado").val(false);
            $("#EditarPersonalizado").prop("checked", false);
            $("#EditarPersonalizado").attr("checked", false);
        }
        $("#btnCustomPack").css("display", "none");
       
    }
    else if ($("#ddlTipoPaquete").val() == 1) {
        $("#frmDefaultPackages").hide();
        $("#frmReservData").hide();
        
        var command = $(location).attr('href').split("/")[4];
        if (command == "Create") {
            $("#CrearPersonalizado").val(true);
            $("#CrearPersonalizado").prop("checked", true);
            $("#CrearPersonalizado").attr("checked", true);
        } else if (command == "Update") {
            $("#EditarPersonalizado").val(true);
            $("#EditarPersonalizado").prop("checked", true);
            $("#EditarPersonalizado").attr("checked", true);
        }
        
        if ($("#Usua_ID").val() == "") {
            $("#ddlTipoPaquete").dropdown('restore defaults');
            iziToast.warning({
                title: 'Atención',
                message: 'Es obligatorio elegir un cliente para poder continuar',
            });
            
        }
        else {
            $("#btnCustomPack").css("display", "flex");
        }
        

        
    }
    else if ($("#ddlTipoPaquete").val() == "") {
        $("#frmDefaultPackages").hide();
        $("#frmReservData").hide();
    }
});

function personalizeRedirection() {
    $("#frmCreateReserv").submit();
}


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

    if ($("#ddlTipoPaquete").val() == 1) {
        iziToast.warning({
            title: 'No es posible crear la reservación',
            message: 'Presione "Continuar" para añadir los detalles a la reservación',
        });
    }
    


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
    if ($("#Paqu_ID").val() != "") {
        if (hasSelectedDate == false) {
            iziToast.warning({
                title: 'No es posible crear la reservación',
                message: 'Seleccione la fecha de entrada y la fecha de salida',
            });
            return;
        } else {
            var expectedDays = parseInt($("#txtDefaultPackageDuracion").text());
            console.log(expectedDays, " - ", daysReserved)
            if (expectedDays < daysReserved) {
                iziToast.warning({
                    title: 'No es posible crear la reservación',
                    message: `Su reservación debe de ser de ${expectedDays} días, seleccione esa cantidad en el calendario`,
                });
                return;
            }
        }
    }
    

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
                            "ReAH_ID": 0,
                            "hoAc_ID": $("#frmAddExtraHotelsActivities #ddlhotelsExtraActivities_" + index).val(),
                            "reAH_Precio": $("#frmAddExtraHotelsActivities #hotelsExtraActivitiesPrice_" + index).val(),
                            "reAH_Cantidad": $("#frmAddExtraHotelsActivities #ddlhotelsExtraActivities_" + index).val(),
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
                            "acEx_ID": $("#frmAddExtraActivities #ddlextraActivities_" + index).val(),
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
        $("#frmCreateReserv").submit();
    }



}

function successInReservation() {
    iziToast.success({
        title: 'Éxito',
        message: 'La reservacion se ha creado correctamente.',
    });
}
function successInUser() {
    iziToast.success({
        title: 'Éxito',
        message: 'Usuario creado exitosamente',
    });
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
    var UserResponseID = FindGetValue("responseID")
    var isSuccess = FindGetValue("isSuccess")
    if (UserResponseID != null) {
        $("#Usua_ID").dropdown('set selected', UserResponseID);
    }
    if (isSuccess) {
        successInUser();
    }
});


