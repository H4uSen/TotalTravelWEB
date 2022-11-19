$("#errorDiv").hide();

var ciudadesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Cities/List");
var coloniasList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Suburbs/List");

var partnersList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Partners/List");
var tipostranspoList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/TypesTransport/List");
$(".ui.dropdown").dropdown();

SetDropDownValue($("#Count_ID"), Pais_ID);
RellenarCiudades(Pais_ID);
SetDropDownValue($("#City_ID"), Ciudad);
RellenarColonias(Ciudad);
SetDropDownValue($("#Subu_ID"), Subu_ID);
SetDropDownValue($("#Part_ID"), Part_ID);
$("#Tprt_Nombre").val(Tprt_Nombre);

$('document').ready(function () {
    TT()
});
$('#Part_ID').change(function () {
     TT()
});

function TT() {
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
        SetDropDownValue($("#TiTr_ID"), TiTr_ID);

    }
}


$('#Count_ID').change(function () {
    RellenarCiudades($('#Count_ID').val());
})

function updateTransport(id) {

    validateArrayForm = [
        { validateMessage: "Seleccione una colonia.", Jqueryinput: $("#Subu_ID") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#Calle") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#Avenida") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_ID") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_ID") },
        { validateMessage: "Seleccione un socio.", Jqueryinput: $("#Part_ID") },
        { validateMessage: "Seleccione un tipo de transporte.", Jqueryinput: $("#TiTr_ID") }
    ];
    const validacion = ValidateForm(validateArrayForm);
    if (validacion) {

            var direStatus = false;
            var dire = AdressViewModel;

            dire.colo_ID = parseInt($('#Subu_ID').val());
            dire.dire_Calle = ($("#Calle").val());
            dire.dire_Avenida = ($("#Avenida").val());
            var responseAddress = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Address/Insert", dire, "POST");
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
            var nombre = $("#Tprt_Nombre").val()
            data.dire_ID = parseInt(DireID);
            data.tiTr_ID = parseInt($("#TiTr_ID").val());
            data.part_ID = parseInt($("#Part_ID").val());
            data.tprt_Nombre = nombre;
            if (Client_Role == "Administrador") {
                data.part_ID = parseInt($("#Part_ID").val());
            }
            else {
                data.part_ID = parseInt(Part_ID);
            }
            var response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Transports/Update?id="+id, data, "PUT");

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

function RellenarCiudades(Country_Id) {
    if (ciudadesList.code == 200) {
        var cities = ciudadesList.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Country_Id;
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
}

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