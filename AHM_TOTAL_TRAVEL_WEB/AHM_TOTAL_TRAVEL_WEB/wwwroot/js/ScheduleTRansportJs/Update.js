var responseU = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DestinationsTransportations/List");

var IDPar = Client_Partner_ID;

$(document).ready(function () {
    $("#ID_Horario").hide();
    if (Client_Role != "Administrador") {
        Destino2()
    }
});


$("#SendScheduleEdit").click(() => {
    ValidarupdateSchedule();
})

$("#closeScheduleEdit").click(() => {
    $("#modalUpdate").modal('hide');
});

if (Client_Role == "Administrador") {
    $("#Part_ID2").removeAttr("hidden");
    $("#Part_ID2").show();
}

getDropD()

function getDropD() {  
    var response2 = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Partners/List");

    if (response2.code == 200) {

        var Part_ID2 = response2.data;
        var Part_ID = Part_ID2.filter(resva => resva.tipoPartner == "Agencia de Transporte");

        ClearDropDownItem($('#Partner_ID22'));
        $("#Partner_ID22").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < Part_ID.length; i++) {
            var item = Part_ID[i];
            AddDropDownItem($('#Partner_ID22'), item = { value: item.id, text: item.nombre });
        }
    }
};

function Destino(){
    if (responseU.code == 200) {

        var DsTr_ID = responseU.data;
        var Partner_ID;
        if (Client_Role == "Administrador") {
            Partner_ID = $('#Partner_ID22').val();
        }
        else {
            Partner_ID = parseInt(IDPar);
        }
        var DsTr_ID3 = DsTr_ID.filter(resva => resva.partner_ID == parseInt(Partner_ID));
       
        ClearDropDownItem($('#DsTr_IDUpdate'));
        $("#DsTr_IDUpdate").append(
            `<option value="">Seleccione un destino. (required)</option>`
        );
        for (var i = 0; i < DsTr_ID3.length; i++) {
            var item = DsTr_ID3[i];
            AddDropDownItem($('#DsTr_IDUpdate'), item = { value: item.id, text: item.ciudadSalida + " - " + item.ciudadDestino });
        }
    }

}
function Destino2() {
    if (responseU.code == 200) {

        var DsTr_ID2 = responseU.data;
        
        ClearDropDownItem($('#DsTr_IDUpdate'));
        $("#DsTr_IDUpdate").append(
            `<option value="">Seleccione un destino. (required)</option>`
        );
        for (var i = 0; i < DsTr_ID2.length; i++) {
            var item = DsTr_ID2[i];
            AddDropDownItem($('#DsTr_IDUpdate'), item = { value: item.id, text: item.ciudadSalida + " - " + item.ciudadDestino });
        }
    }

}

function GetScheduleID(id) {    
    var responseS = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/ScheduleTransportation/Find?id=" + id);
    if (responseS.code == 200) {
        $('#ID_Horario').val(id);
        var date = responseS.data.fecha.split('T')[0];
        $('#FechaViajeUpdate').val(date);
        $('#HoTr_HoraSalidaUpdate').val(responseS.data.hora_Salida);
        $('#HoTr_HoraLlegadaUpdate').val(responseS.data.hora_Llegada);
        

        if ($("#ID_Horario").val != 0) {           
            SetDropDownValue($("#Partner_ID22"), responseS.data.partner_ID);
            Destino()
            SetDropDownValue($("#DsTr_IDUpdate"), responseS.data.iD_Destino);
            $("#modalUpdate").modal('show');
           
        }
    }
}


$('#Partner_ID22').click(function () {
    Destino()
});


function ValidarupdateSchedule() {

    const ValidateArraySchedule = [
        { validateMessage: "Seleccione un Destino", Jqueryinput: $("#DsTr_IDUpdate") },
        { validateMessage: "Seleccione una Fecha", Jqueryinput: $("#FechaViajeUpdate") },
        { validateMessage: "Rellene el Campo Hora Salida", Jqueryinput: $("#HoTr_HoraSalidaUpdate") },
        { validateMessage: "Rellene el Campo Hora Llegada", Jqueryinput: $("#HoTr_HoraLlegadaUpdate") },
        { validateMessage: "Seleccione un Socio", Jqueryinput: $("#Partner_ID22") }
    ];

    const ScheduleValidateUpdate = ValidateForm(ValidateArraySchedule);

    if (ScheduleValidateUpdate) {
        $("#UpdateScheduleForm").submit();
    }
}