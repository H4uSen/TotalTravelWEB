$("#errorDiv").hide();

$('#example4').calendar({
    startMode: 'year'
});

$('.ui.dropdown').dropdown();

$("#createPayments").click(() => {
    $("#modalCreate").modal('show');
});


$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});


function validar() {

    validateArrayForm = [
        { validateMessage: "Ingrese una reservación.", Jqueryinput: $("#modalCreate #Resv_ID") },
        { validateMessage: "Ingrese una forma de pago.", Jqueryinput: $("#modalCreate #TiPa_ID") },
        { validateMessage: "Ingrese un monto.", Jqueryinput: $("#modalCreate #RePa_Monto") },
        { validateMessage: "Ingrese una fecha.", Jqueryinput: $("#modalCreate #RePa_FechaPago") },


    ];
    
    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#createPaymentForm").submit();
    }

}

function editar(PaymentID) {
    var response = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RecordPayment/Find?Id=" + PaymentID);
    if (response.code == 200) {
        var item = response.data;


        $("#modalUpdate #Resv_ID").val(item.id);
        $("#modalUpdate #TiPa_ID").val(item.pais);
        $("#modalUpdate #RePa_Monto").val(item.codigo);
        $("#modalUpdate #RePa_FechaPago").val(item.nacionalidad);

        $("#modalUpdate").modal("show");

    }

}

function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese una reservación.", Jqueryinput: $("#modalCreate #Resv_ID") },
        { validateMessage: "Ingrese una forma de pago.", Jqueryinput: $("#modalCreate #TiPa_ID") },
        { validateMessage: "Ingrese un monto.", Jqueryinput: $("#modalCreate #RePa_Monto") },
        { validateMessage: "Ingrese una fecha.", Jqueryinput: $("#modalCreate #RePa_FechaPago") },

    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        
    }
}