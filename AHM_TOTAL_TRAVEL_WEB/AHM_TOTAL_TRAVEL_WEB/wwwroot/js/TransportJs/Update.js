﻿$("#errorDiv").hide();

$(`#City_ID option[value = "${Ciudad}"]`).prop("selected", true);
$(`#Count_ID option[value = "${Pais_ID}"]`).prop("selected", true);
$(`#Part_ID option[value = "${Part_ID}"]`).prop("selected", true);
$(`#TiTr_ID option[value = "${TiTr_ID}"]`).prop("selected", true);

$('#Count_ID').change(function () {
    RellenarCiudades($('#Count_ID').val());
})

function updateTransport(id) {

    validateArrayForm = [
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#Colonia") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_ID") },
        { validateMessage: "Seleccione un socio.", Jqueryinput: $("#Part_ID") },
        { validateMessage: "Seleccione un tipo de transporte.", Jqueryinput: $("#TiTr_ID") }
    ];
    const validacion = ValidateForm(validateArrayForm);
    if (validacion) {

        var coloStatus = false;
        var colo = SuburbsViewModel;

        colo.colo_Descripcion = ($("#Colonia").val());
        colo.ciud_ID = parseInt($("#City_ID").val());
        var responseSuburb = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/Insert", colo, "POST");
        var ColoID;
        if (responseSuburb.code == 200) {

            ColoID = responseSuburb.data.codeStatus;
            coloStatus = true;
        } else {
            console.log(responseSuburb)
        }

        if (coloStatus) {
            var direStatus = false;
            var dire = AdressViewModel;

            dire.colo_ID = parseInt(ColoID);
            dire.dire_Calle = ($("#Calle").val());
            dire.dire_Avenida = ($("#Avenida").val());
            var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
            var DireID;
            if (responseAddress.code == 200) {

                DireID = responseAddress.data.codeStatus;
                direStatus = true;
            } else {
                console.log(responseAddress)
            }
        }

        if (direStatus) {

            var data = TransportViewModel;
            data.dire_ID = parseInt(DireID);
            data.tiTr_ID = parseInt($("#TiTr_ID").val());
            data.part_ID = parseInt($("#Part_ID").val());

            var response = ajaxRequest("https://totaltravel.somee.com/API/Transports/Update?id="+id, data, "PUT");

            if (response.code == 200) {
                if (response.data.codeStatus > 0) {
                    window.location.href = '/Transport';
                } else {
                    $("#errorDiv").show();
                    $("#errorDiv p").html(response.data.messageStatus);
                }
            }
        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }
    }
}

function RellenarCiudades(Pais_ID) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
    if (response.code == 200) {
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == Pais_ID;
        });
        ClearDropDownItem($('#City_ID'));
        if (cityFilter.length > 0) {
            SetDropDownPlaceholder($('#City_ID'), "Seleccione una ciudad.");
            for (var i = 0; i < cityFilter.length; i++) {
                var item = cityFilter[i];
                AddDropDownItem($('#City_ID'), item = { value: item.id, text: item.ciudad });
            }
        } else {
            SetDropDownPlaceholder($('#City_ID'), "No hay ciudades disponibles.");
        }
    }
}