
// ----------------------------------- INIZIALIZE ------------------------------------
FillCities();
FillPartnerType();

$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

$("#frmCreatePartner").hide();
$("#frmSelectPartner").hide();

// ----------------------------------- EVENTS ------------------------------------

$("#frmSelectPartner #cbbTipoPartner").change(function () {
    const PartnerType_ID = $("#frmSelectPartner #cbbTipoPartner").val();
    FillPartners(PartnerType_ID);
    $('.ui.dropdown').dropdown();
});

$("#checkPartner").change(function () {
    if ($("#checkPartner").prop("checked") == true) {
        $("#checkAdmin").prop("checked", false);
        $("#checkExistingPartner").prop("disabled", false);
        $("#frmCreatePartner").show();
    } else {
        $("#checkExistingPartner").prop("disabled", true);
        $("#checkExistingPartner").prop("checked", false);
        $("#frmCreatePartner").hide();
        $("#frmSelectPartner").hide();
    }
});

$("#checkAdmin").change(function () {
    if ($("#checkAdmin").prop("checked") == true) {
        $("#checkPartner").prop("checked", false);
        $("#checkExistingPartner").prop("disabled", true);
        $("#checkExistingPartner").prop("checked", false);
        $("#frmCreatePartner").hide();
        $("#frmSelectPartner").hide();
    }
});

$("#checkExistingPartner").change(function () {
    if ($("#checkExistingPartner").prop("checked") == true) {
        $("#frmSelectPartner").show();
        $("#frmCreatePartner").hide();
    } else {
        $("#frmCreatePartner").show();
        $("#frmSelectPartner").hide();
    }
});

// ----------------------------------- FUNCTIONS ------------------------------------

function FillCities() {
    const request = ajaxRequest(
        "https://totaltravel.somee.com/API/Cities/List",
        null, "GET"
    );

    if (request.code == 200) {

        const cities = request.data;
        $(".cbbCiudades").empty();
        $(".cbbCiudades").append(
            `<option value="">Select a City Residence (required)</option>`
        );
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            const option = `<option value="${city.id}">${city.ciudad}, ${city.pais}</option>`;

            $(".cbbCiudades").append(option);
        }
    }
}

function FillPartnerType() {
    const request = ajaxRequest(
        "https://totaltravelapi.azurewebsites.net/API/PartnerType/List",
        null, "GET"
    );

    if (request.code == 200) {

        const PartnerTypes = request.data;
        $(".cbbTipoPartner").empty();
        $(".cbbTipoPartner").append(
            `<option value="">Select a Partner Type (required)</option>`
        );
        for (let i = 0; i < PartnerTypes.length; i++) {
            const PartnerType = PartnerTypes[i];
            const option = `<option value="${PartnerType.id}">${PartnerType.descripcion}</option>`;

            $(".cbbTipoPartner").append(option);
        }
    }
}

function FillPartners(ParterType_Id) {
    const request = ajaxRequest(
        "https://totaltravelapi.azurewebsites.net/API/Partners/List",
        null, "GET"
    );

    if (request.code == 200) {

        const Partners = request.data;

        const FiltersPartners = jQuery.grep(Partners, function (Partner, i) {
            return Partner.tipoPartner_Id == ParterType_Id;
        });

        $("#frmSelectPartner #cbbPartners").empty();
        if (FiltersPartners.length > 0) {

            $("#frmSelectPartner #cbbPartners").append(
                `<option value="">Select a Partner (required)</option>`
            );

            for (let i = 0; i < FiltersPartners.length; i++) {
                const Partner = FiltersPartners[i];
                console.log(Partner);
                const option = `<option value="${Partner.id}">${Partner.nombre}</option>`;
                console.log(option);

                $("#frmSelectPartner #cbbPartners").append(option);
            }
        } else {
            $("#frmSelectPartner #cbbPartners").append(
                `<option value="">No Partner Are On</option>`
            );
        }

    }
}