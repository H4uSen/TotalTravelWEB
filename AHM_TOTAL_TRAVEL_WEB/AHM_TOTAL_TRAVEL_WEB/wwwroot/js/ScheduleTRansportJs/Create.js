var response = ajaxRequest(urlAPI +"/API/DestinationsTransportations/List");
var response2 = ajaxRequest(urlAPI + "/API/Partners/List");
const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");
if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}
$("#btnCrearhorario").click(() => {
    if (Client_Role != "Administrador") {
        getDestiny2()
    }
    
    $("#modalCreate").modal('show');
});

$("#closeSchedule").click(() => {
    $("#modalCreate").modal('hide');
});

$("#SendSchedule").click(() => {
    ValidarCampos();
});


getDestiny3()

if (Client_Role != "Administrador") {
    SetDropDownValue($("#Partner_ID"), defaultValue = parseInt(Client_Partner_ID));
}
function ValidarCampos() {
    const ValidateArraySchedule = [
        { validateMessage: "Seleccione un Destino", Jqueryinput: $("#DsTr_ID") },
        { validateMessage: "Ingrese una Fecha", Jqueryinput: $("#FechaViaje") },
        { validateMessage: "Ingrese una Hora de Salida", Jqueryinput: $("#HoTr_HoraSalida") },
        { validateMessage: "Ingrese una Hora de Llegada", Jqueryinput: $("#HoTr_HoraLlegada") },
        { validateMessage: "Seleccione un Socio", Jqueryinput: $("#Partner_ID") }
    ]

    const ScheduleValidate = ValidateForm(ValidateArraySchedule);
    var hora1 = $("#HoTr_HoraSalida").val();
    var hora2 = $("#HoTr_HoraLlegada").val();
    var vali;
    if (hora1 != hora2) {
        $("#labelIguales").hide();
        vali = true;
    }
    else {
        $("#labelIguales").removeAttr("hidden");
        $("#labelIguales").html("Las horas no pueden ser igueles");
        $("#labelIguales").show;
        
        vali = false
    }
    if (ScheduleValidate && vali) {
        $("#createScheduleForm").submit();
    }
}

$('#Partner_ID').click(function () {
Dest2()
});

function Dest2() {
    $("#DD_DsTr_ID").removeAttr("hidden");
    $("#DD_DsTr_ID").show();
    if (response.code == 200) {
        var Partner_ID;
        if (Client_Role == "Administrador") {
            Partner_ID = $('#Partner_ID').val();
        }
        else {
            Partner_ID = parseInt(Client_Partner_ID);
        }
        var tiTra = response.data;
        tiTra = jQuery.grep(tiTra, function (tipTra, i) {
            return tipTra.partner_ID == Partner_ID;
        });
        var arraydestiny = [];
        for (var i = 0; i < tiTra.length; i++) {
            const item = tiTra[i];
            var objeto = {
                id: item.id,
                destino: item.ciudadSalida + " - " + item.ciudadDestino
            }
            arraydestiny.push(objeto);
        }


        const dropdownData = {
            dropdown: $("#DsTr_ID"),
            items: {
                list: arraydestiny,
                valueData: "id",
                textData: "destino"
            },
            placeholder: {
                empty: "No se encontraron destinos disponibles para este socio",
                default: "Seleccione un Destino",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#DsTr_ID").dropdown();


    }

}

function getDestiny2() {  
    
    if (response2.code == 200) {

        var DsTr_ID2 = response.data;
        var DsTr_ID = DsTr_ID2.filter(resva => resva.partner_ID == parseInt(Client_Partner_ID));

        ClearDropDownItem($('#DsTr_ID'));
        $("#DsTr_ID").append(
            `<option value="">Seleccione un destino. (required)</option>`
        );
        for (var i = 0; i < DsTr_ID.length; i++) {
            var item = DsTr_ID[i];
            AddDropDownItem($('#DsTr_ID'), item = { value: item.id, text: item.ciudadSalida + " - " + item.ciudadDestino });
        }
    }
};
function getDestiny3() {

    if (response.code == 200) {
       
        var Part_ID2 = response2.data;
        var Part_ID = Part_ID2.filter(resva => resva.tipoPartner == "Agencia de Transporte");
        ClearDropDownItem($('#Partner_ID'));
        $("#Partner_ID").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID'), item = { value: item.id, text: item.nombre });
        }
    }

   
};