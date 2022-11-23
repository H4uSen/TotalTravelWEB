
$("#errorDiv").hide();

var ciudadesList = ajaxRequest(urlAPI +"/API/Cities/List");
var coloniasList = ajaxRequest(urlAPI +"/API/Suburbs/List");

var partnersList = ajaxRequest(urlAPI +"/API/Partners/List");
var tipostranspoList = ajaxRequest(urlAPI +"/API/TypesTransport/List");

$('.ui.dropdown').dropdown();

function createTransport() {

    validateArrayForm = [
        { validateMessage: "Seleccione una colonia.", Jqueryinput: $("#Subu_ID") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_ID") },
        { validateMessage: "Seleccione un socio.", Jqueryinput: $("#Part_ID") },
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Tprt_Nombre") },
        { validateMessage: "Seleccione un tipo de transporte.", Jqueryinput: $("#TiTr_ID") }
    ];
    const validacion = ValidateForm(validateArrayForm);
    if (validacion) {

        var direStatus = false;
        var dire = AdressViewModel;

        dire.colo_ID = parseInt($('#Subu_ID').val());
        dire.dire_Calle = ($("#Calle").val());
        dire.dire_Avenida = ($("#Avenida").val());
        var responseAddress = ajaxRequest(urlAPI +"/API/Address/Insert", dire, "POST");
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
        data.tprt_Nombre = $("#Tprt_Nombre").val();

        var response = ajaxRequest(urlAPI +"/API/Transports/Insert", data, "POST");

        if (response.code == 200) {
            if (response.data.codeStatus > 0) {
                window.location.href = '/Transport?success=true';
            } else {
                $("#errorDiv").show();
                $("#errorDiv p").html(response.data.messageStatus);
            }
        }

    } else {
        $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
    }

}

$('#Part_ID').change(function () {
    $("#DD_TiTr_ID").removeAttr("hidden");
    $("#DD_TiTr_ID").show();
    if (partnersList.code == 200) {
        var Partner_ID;
        if (Client_Role == "Administrador") {
           Partner_ID = $('#Part_ID').val();
        }
        else {
            Partner_ID = parseInt(Client_Partner_ID);
        }
        var tiTra = tipostranspoList.data;
        tiTra = jQuery.grep(tiTra, function (tipTra, i) {
            return tipTra.partner_ID == Partner_ID;
        });
        const dropdownData = {
            dropdown: $("#TiTr_ID"),
            items: {
                list: tiTra,
                valueData: "id",
                textData: "trasporte"
            },
            placeholder: {
                empty: "No se encontraron tipos de transporte disponibles para este socio",
                default: "Seleccione un tipo de transporte",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#TiTr_ID").dropdown();


    }
});


$('#Count_ID').change(function () {

    if (ciudadesList.code == 200) {
        var Count_ID = $('#Count_ID').val();
        var cities = ciudadesList.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Count_ID;
        });
        const dropdownData = {
            dropdown: $("#City_ID"),
            items: {
                list: cities,
                valueData: "id",
                textData: "ciudad"
            },
            placeholder: {
                empty: "No se encontraron ciudades disponibles",
                default: "Seleccione una ciudad",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#City_ID").dropdown();

        $("#City_ID").change((_this) => {
            const City_Id = $(_this.target).val();
            RellenarColonias(City_Id);
        });
    }
});

function RellenarColonias(City_Id) {

    if (coloniasList.code == 200) {

        var colonias = coloniasList.data;
        colonias = jQuery.grep(colonias, function (colonia, i) {
            return colonia.ciudadID == City_Id;
        });
        const dropdownData = {
            dropdown: $("#Subu_ID"),
            items: {
                list: colonias,
                valueData: "id",
                textData: "colonia"
            },
            placeholder: {
                empty: "No se encontraron colonias disponibles",
                default: "Seleccione una colonia",
            },
            semantic: true
        }
        FillDropDown(dropdownData);
        $("#Subu_ID").dropdown();
    }
}