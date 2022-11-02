//------------------------- VARIABLES ---------------------------

var data = {
    persons: 0,
    hotel: {
        id: 0,
        rooms: [
            { id: 0, count: 0 }
        ]
    },
    restaurant: 0,
    transport: 0,
    activities: [0],
};

var pantallas = [
    $("#frmHotels"),
    $("#frmRooms"),
    $("#frmActivities"),
    $("#frmTransporte")
];

//------------------------- INIZIALIZE ---------------------------
ShowWide(0);

$('.ui.dropdown').dropdown();
$('.ui.checkbox').checkbox();
$('.ui.sidebar').sidebar({
    context: $('.bottom.segment')
}).sidebar('attach events', '.menu #sidebutton');

$('.rating').rating({
    initialRating: 2,
    maxRating: 5
});

$('.rating.disabled').rating({
    initialRating: 2,
    maxRating: 5
}).rating('disable');

$('#txtFechaEntrada').calendar({
    type: 'date',
    endCalendar: $('#txtFechaSalida')
});

$('#txtFechaSalida').calendar({
    type: 'date',
    startCalendar: $('#txtFechaEntrada')
});

$("#frmTransporte_menu .item").click(function (_this) {
    $("#frmTransporte_menu .item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#frmTransporte_menu .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#frmTransporte ${object}`).hide();
    });

    const wideToShow = $(_this.target).attr("data-target");
    $(wideToShow).show();
});

//-------------------------- HELPERS ------------------------------------------
function ShowWide(wide = null) {
    $.each(pantallas, function (index, object) {
        $(object).hide();
    });
    if (wide != null) {
        pantallas[wide].show();
    }
}

function contador(input, mode, cero = false) {
    var numero = parseInt($(input).val());

    if (!cero) {
        if (numero >= 1) {
            if (mode == true) {
                numero++;
            } else if (mode == false && numero > 1) {
                numero--;
            }
        }
        else {
            numero = 1;
        }
    }
    else if (cero) {
        if (numero >= 0) {
            if (mode == true) {
                numero++;
            } else if (mode == false && numero > 0) {
                numero--;
            }
        }
        else {
            numero = 0;
        }
    }
    $(input).val(numero);
}


//------------------------- FUNCTIONS ---------------------------

function FormUserReveal() {
    $('#frmCreateUser').transition('fade up');
}

function ShowRooms() {
    ShowWide(1);
    $("#frmStepfooter button").prop("disabled", false);

    //footer buttons functions
    $("#btnNextStep").click(ShowActivities);
    $("#btnBeforeStep").click(function () {
        $("#frmStepfooter button").prop("disabled", true);
        ShowWide(0);
    });
}

function ShowActivities() {
    $("#StepsProgressBar").css("width", "40%");
    $("#StepsContainer .step").eq(0).addClass("completed").removeClass("active");
    $("#StepsContainer .step").eq(1).addClass("active").removeClass("disabled");

    ShowWide(2);

    //footer buttons functions
    $("#btnNextStep").click(function () {
        ShowTransport();
    });
    $("#btnBeforeStep").click(function () {
        $("#frmActivities").hide();
        $("#StepsProgressBar").css("width", "20%");
        ShowWide(0);
        $("#frmStepfooter button").prop("disabled", true);
    });
}

function ShowTransport() {
    $.each($("#frmTransporte_menu .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#frmTransporte ${object}`).hide();
    });
    $("#frmTransportes").show();

    $("#StepsProgressBar").css("width", "60%");
    $("#StepsContainer .step").eq(1).addClass("completed").removeClass("active");
    $("#StepsContainer .step").eq(2).addClass("active").removeClass("disabled");
    ShowWide(3);

    //footer buttons functions
    $("#btnNextStep").click(function () {
        //next step
    });
    $("#btnBeforeStep").click(function () {
        $("#frmTransporte").hide();
        ShowActivities();
        $("#frmStepfooter button").prop("disabled", false);
    });
}