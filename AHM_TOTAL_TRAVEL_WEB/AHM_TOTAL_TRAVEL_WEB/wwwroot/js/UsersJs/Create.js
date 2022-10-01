
// ----------------------------------- INIZIALIZE ------------------------------------

FillCities();
FillPartnerType();
FillPartners(0);

$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

$("#frmCreatePartner").hide();
$("#frmSelectPartner").hide();

// ----------------------------------- EVENTS ------------------------------------

$("#frmSelectPartner .cbbTipoPartner").change(() => {
    const TipoPartner_Id = $("#frmSelectPartner .cbbTipoPartner").dropdown('get value');
    FillPartners(TipoPartner_Id);
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
function FillPartners(PartnerType_Id) {
    const request = ajaxRequest(
        "https://totaltravelapi.azurewebsites.net/API/Partners/List",
        null, "GET"
    );

    if (request.code == 200) {

        const Partners = request.data;

        //filter data by ParterType_Id
        const FiltersPartners = jQuery.grep(Partners, function (Partner, i) {
            return Partner.tipoPartner_Id == PartnerType_Id;
        });

        //clear dropdown
        ClearDropDownItem(
            $("#frmSelectPartner #cbbPartners")
        );
        $("#frmSelectPartner #cbbPartners").append(
            `<option value="">Select a Partner (required)</option>`
        );
        if (FiltersPartners.length > 0 && PartnerType_Id != 0) {
            SetDropDownPlaceholder(
                $("#frmSelectPartner #cbbPartners"),
                "Select a Partner (required)"
            );

            for (let i = 0; i < FiltersPartners.length; i++) {
                const Partner = FiltersPartners[i];

                AddDropDownItem(
                    $("#frmSelectPartner #cbbPartners"),
                    { value: Partner.id, text: `${Partner.tipoPartner} - ${Partner.nombre}` }
                );
            }

        } else
        if (PartnerType_Id == 0) {
            SetDropDownPlaceholder(
                $("#frmSelectPartner #cbbPartners"),
                "Select a Partner (required)"
            );

            for (let i = 0; i < Partners.length; i++) {
                const Partner = Partners[i];

                AddDropDownItem(
                    $("#frmSelectPartner #cbbPartners"),
                    { value: Partner.id, text: `${Partner.tipoPartner} - ${Partner.nombre}` }
                );
            }
        }
        else {
            console.log("3");
            SetDropDownPlaceholder(
                $("#frmSelectPartner #cbbPartners"),
                "No Partner Are On"
            );
        }


    }
}

