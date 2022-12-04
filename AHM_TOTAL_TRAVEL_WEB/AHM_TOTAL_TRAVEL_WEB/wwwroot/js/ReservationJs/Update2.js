//Extracts value from the URL to check if it's an update or create statement
$(document).ready(function () {
    
    var reservationID = $(location).attr('href').split("/")[5];
    var response = ajaxRequest(urlAPI + "/API/Reservation/Details?Id=" + reservationID);
    if (!response.success) {
        iziToast.error({
            title: 'Error',
            message: "Ocurrió un error al cargar los datos de la reservación, intente resolverlo recargando la página",
        });
    } else {
        var reservationData = response.data;
        $("#Usua_ID").dropdown('set selected', reservationData.reservacionDetalle.id_Cliente);
        if (!reservationData.reservacionDetalle.esPersonalizado) {
            $("#ddlTipoPaquete").dropdown('set selected', 2);
            $("#Resv_NumeroPersonas").val(reservationData.reservacionDetalle.numeroPersonas);
            $("#Resv_CantidadPagos").dropdown('set selected', reservationData.reservacionDetalle.cantidadPagos);
            var ciudad = ajaxRequest(urlAPI + "/API/Cities/Find?Id=" + reservationData.reservacionDetalle.ciudad_ID).data;
            $("#ddlPaises").dropdown('set selected', ciudad.paisID);
            $("#ddlCiudades").dropdown('set selected', reservationData.reservacionDetalle.ciudad_ID);


            firstLoadCard(reservationData.reservacionDetalle.id_Paquete);
            setTimeout(function () {
                $("#ddlCiudades").change();
                $("#Paqu_ID").val(reservationData.reservacionDetalle.id_Paquete);
            }, 1000);

            $("#dateRangePicker").daterangepicker({
                startDate: reservationData.reservacionDetalle.fecha_Entrada.split("T")[0].split("-").reverse().join("-"),
                endDate: reservationData.reservacionDetalle.fecha_Salida.split("T")[0].split("-").reverse().join("-"),
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });

            if (reservationData.actividadesExtras.length > 0) {
                $("#btnShowExtraActivities").click();
            };

            if (reservationData.actividadesHoteles.length > 0) {
                $("#btnShowExtraHotelActivities").click();
            };

            setTimeout(function () {
                reservationData.actividadesExtras.forEach(item => {
                    updtActvExtraForm(item.reAE_ID, item.reAE_Cantidad, item.reAE_Precio);
                    $("#ddlextraActivitiesUpdt_" + item.reAE_ID).dropdown('set selected', item.acEx_ID);
                    $("#extraActivitiesID1").remove();

                });

                reservationData.actividadesHoteles.forEach(item => {
                    updtActvHtelForm(item.reAH_ID, item.reAH_Cantidad, item.reAH_Precio, item.details.iD_Hotel);
                    $("#ddlhtelActivitiesUpdt_" + item.reAH_ID).dropdown('set selected', item.hoAc_ID);
                    $("#hotelsExtraActivitiesID1").remove();
                });
            }, 1000);
            

        }
        else {
            $("#ddlTipoPaquete").dropdown('set selected', 1);
        }

    }
    
});

function firstLoadCard(PackageID) {
    $("#frmDefaultPackagesDetails").show();
    const DefaultPackages = DefaultPackagesList.data;
    const Hotels = HotelsList.data;

    const DefaultPackagesDetails = DefaultPackagesDetailsList.data;

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
    $("#imgDefaultPackage").attr("src", package.image_URL.split(",")[0]);
    //Restaurante
    $("#txtDefaultPackageRest").text(package.restaurante);
    //Precio
    $("#lblDefaultPackagePrice").text(package.precio);
    $("#txtDefaultPackagePrice").val(package.precio);


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
}


//------------------------------------ACTIVIDADES EXTRAS
//Fill the activities extra form
function updtActvExtraForm(actvID, cantidad, precio) {
    //const DefaultPackages = DefaultPackagesList.data;
    //const Hotels = HotelsList.data;

    //const DefaultPackagesDetails = DefaultPackagesDetailsList.data;
    //const PackageID = $("#Paqu_ID").val();

    //const DefaultPackage = DefaultPackages.filter(function (Package) {
    //    return Package.id == PackageID
    //});

    

    //const DefaultPackageAct = DefaultPackagesDetails.filter(function (PackageDetails) {
    //    return PackageDetails.paqueteID == PackageID
    //});

    //const package = DefaultPackage[0];

    
    //Activities Extras in the zone
    const ActvExtra = ActvExtraList.data.filter((x) => { return x.ciudadID == $("#ddlCiudades").val(); });
    
    $("#listExtraActivities").append(`
<div class="four fields " id="extraActivitiesUpdtID${actvID}">
    <input id="extraActivitiesUpdtElemID_${actvID}" name="extraActivitiesUpdtElemID_${actvID}" type="number" value=${actvID} style="display:none" />
    <input id="extraActivitiesUpdtDel_${actvID}" name="extraActivitiesUpdtDel_${actvID}" type="checkbox" style="display:none" />
    <div class="field">
        <label>Actividades en <span class="lblZone"></span></label>
        <select class="ui dropdown" name="ddlextraActivitiesUpdt_${actvID}"  id="ddlextraActivitiesUpdt_${actvID}" >

        </select>
                                               
    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" onchange="calculatePriceOfActvExtraUpdt(${actvID})" value="${cantidad}" name="extraActivitiesAmountUpdt_${actvID}" id="extraActivitiesAmountUpdt_${actvID}" placeholder="Cantidad de personas">
    </div>
    <div class="field">
        <label>Total</label>
        <div class="ui right labeled input">
            <label for="extraActivitiesPriceUpdt_${actvID}" class="ui label">L</label>
            <input type="number" dir="rtl" name="extraActivitiesPriceUpdt_${actvID}" value="${precio}" id="extraActivitiesPriceUpdt_${actvID}" placeholder="0.00" readonly>
            <div class="ui basic label">.00</div>
        </div>

    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteExtraActivitiesUpdt(${actvID})" id="btndeleteExtraActivities">- Eliminar actividad</div>
    </div>
</div>

`);
    
    if (ActvExtra.length > 0) {
        //Fill the extra activities in the zone
        $('#ddlextraActivitiesUpdt_' + actvID).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < ActvExtra.length; j++) {
            $('#ddlextraActivitiesUpdt_' + actvID).append('<option value="' + ActvExtra[j].id + '">' + ActvExtra[j].actividad + ' L ' + ActvExtra[j].precio + ' c/u' + '</option>');
        };

    }
    else {
        $('#ddlextraActivitiesUpdt_' + actvID).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');
    }
    $('.ui.dropdown').dropdown();
    $(".lblZone").text($("#ddlCiudades option:selected").text());
};

//Calculates the price of the activities of the zone
function calculatePriceOfActvExtraUpdt(inputID) {
    const ExtraActv = ajaxRequest(urlAPI + "/API/ActivitiesExtra/Find?id=" + $("#ddlextraActivitiesUpdt_" + inputID).val(), SendToken = true);
    const CantPersonasResv = $(`#extraActivitiesAmountUpdt_${inputID}`).val();
    const data = ExtraActv.data;
    const total = data.precio * parseInt(CantPersonasResv);
    const selector = "#extraActivitiesPriceUpdt_" + inputID;
    $(selector).val(total);
    //$(`input[name="extraActivitiesPriceUpdt_${inputID}"]`).val(total);
    //$("#extraActivitiesPriceUpdt_" + inputID).val(total);
};
//Delete an input for an activity extra of the zone
function deleteExtraActivitiesUpdt(inputID) {
    $("#extraActivitiesUpdtDel_"+inputID).val(true);
    $("#extraActivitiesUpdtDel_" + inputID).prop("checked", true);
    $("#extraActivitiesUpdtDel_" + inputID).attr("checked", true);
    $("#extraActivitiesUpdtID" + inputID).css("display", "none");
};


//------------------------------------ACTIVIDADES EXTRAS HOTEL
//Fill the hotel activities extra form
function updtActvHtelForm(actvID, cantidad, precio, htelID) {
    const DefaultPackages = DefaultPackagesList.data;
    //const Hotels = HotelsList.data;

    //const DefaultPackagesDetails = DefaultPackagesDetailsList.data;
    //const PackageID = $("#Paqu_ID").val();

    //const DefaultPackage = DefaultPackages.filter(function (Package) {
    //    return Package.id == PackageID
    //});

    //const Hotel = Hotels.filter((x) => { return x.id == DefaultPackage[0].iD_Hotel })

    //const DefaultPackageAct = DefaultPackagesDetails.filter(function (PackageDetails) {
    //    return PackageDetails.paqueteID == PackageID
    //});

    //const package = DefaultPackage[0];
    //Activities Extras in the hotel
    const htelActvExtra = HotelsActvList.data.filter((x) => { return x.iD_Hotel == htelID });

    $("#listHotelsExtraActivities").append(`
<div class="four fields " id="htelActivitiesUpdtID${actvID}">
    <input id="htelActivitiesUpdtID_${actvID}" name="htelActivitiesUpdtID_${actvID}" type="number" value=${actvID} style="display:none" />
    <input id="htelActivitiesUpdtDel_${actvID}" name="htelActivitiesUpdtDel_${actvID}" type="checkbox" style="display:none" />
    <div class="field">
        <label>Actividades</label>
        <select class="ui dropdown" name="ddlhtelActivitiesUpdt_${actvID}"  id="ddlhtelActivitiesUpdt_${actvID}" >

        </select>
                                               
    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" onchange="calculatePriceOfHtelActvUpdt(${actvID})" value="${cantidad}" name="htelActivitiesAmountUpdt_${actvID}" id="htelActivitiesAmountUpdt_${actvID}" placeholder="Cantidad de personas">
    </div>
    <div class="field">
        <label>Total</label>
        <div class="ui right labeled input">
            <label for="htelActivitiesPriceUpdt_${actvID}" class="ui label">L</label>
            <input type="number" dir="rtl" name="htelActivitiesPriceUpdt_${actvID}" value="${precio}" id="htelActivitiesPriceUpdt_${actvID}" placeholder="0.00" readonly>
            <div class="ui basic label">.00</div>
        </div>

    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteHtelActivitiesUpdt(${actvID})" id="btndeleteHtelActivities">- Eliminar actividad</div>
    </div>
</div>

`);
    if (htelActvExtra.length > 0) {
        //Fill the hotel extra activities
        $('#ddlhtelActivitiesUpdt_' + actvID).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < htelActvExtra.length; j++) {
            $('#ddlhtelActivitiesUpdt_' + actvID).append('<option value="' + htelActvExtra[j].id + '">' + htelActvExtra[j].actividad + ' L ' + htelActvExtra[j].precio + ' c/u' + '</option>');
        };

    }
    else {
        $('#ddlhtelActivitiesUpdt_' + actvID).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');
    }
    $('.ui.dropdown').dropdown();

};
//Calculates the price of the activities of the hotel
function calculatePriceOfHtelActvUpdt(inputID) {
    const HtelActv = ajaxRequest(urlAPI + "/API/HotelsActivities/Find?Id=" + $("#ddlhtelActivitiesUpdt_" + inputID).val(), SendToken = true);
    const CantPersonasResv = $(`#htelActivitiesAmountUpdt_${inputID}`).val();
    const data = HtelActv.data;
    const total = data.precio * parseInt(CantPersonasResv);
    const selector = "#htelActivitiesPriceUpdt_" + inputID;
    $(selector).val(total);
    //$(`input[name="extraActivitiesPriceUpdt_${inputID}"]`).val(total);
    //$("#extraActivitiesPriceUpdt_" + inputID).val(total);
};
//Delete an input for an activity extra of the hotel
function deleteHtelActivitiesUpdt(inputID) {
    $("#htelActivitiesUpdtDel_" + inputID).val(true);
    $("#htelActivitiesUpdtDel_" + inputID).prop("checked", true);
    $("#htelActivitiesUpdtDel_" + inputID).attr("checked", true);
    $("#htelActivitiesUpdtID" + inputID).css("display", "none");
};

$(document).ready(function () {
    var command = FindGetValue("Command")
    var isSuccess = FindGetValue("isSuccess")
    if (command == "Update" && isSuccess == false) {
        iziToast.error({
            title: 'Error',
            message: 'Ocurrió un error al actualizar la reservación',
        });
    }

});