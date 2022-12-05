const ReservationList = ajaxRequest(urlAPI +"/API/Reservation/List");
const PaymentsList = ajaxRequest(urlAPI +"/API/RecordPayment/List");
const PaymentTypesList = ajaxRequest(urlAPI +"/API/PaymentTypes/List");

const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}

//<--- Configuraciones de las Datatables---->
//Contenido que va dentro de la tabla
function format(detailData, rowId) {
    // `d` is the original data object for the row
    detailData = detailData.filter(x => x.id_Reservacion == rowId);

    if (detailData.length <= 0) {
        return (`
    <div>
        <h2>No hay registros para mostrar</h2>
    </div>
    <div class="eight wide column">
        <button class="ui small btn-purple text-white labeled icon button" id="createPayments" onclick="createPayment('${rowId}')"><i class="plus icon"></i> Insertar un registro de pago</button>
    </div>`);
    }
    else {
        var structure = `<div class="ui fluid vertical menu">`;
        for (var i = 0; i < detailData.length; i++) {

            const detail = detailData[i];

            const fechaCreacion = detail.fechaPago.split("T")[0].split("-").reverse().join("-");
            structure += `
            <div class="ui form attached fluid segment">
            <div class="content">
            <div class="field">
            <h3 class="ui block header">
                Forma de pago: ${detail.tipoPago}
            </h3>
            <div class="four fields">
            <div class="field">
                <p># de factura: <span id="payment_id">${detail.id}</span></p>
                
            </div>
            <div class="field">
                <p>Cliente: ${detail.nombre_Completo}</p>
                
            </div>
            <div class="field">
                <p>Monto pagado: L ${parseFloat(detail.montoPago).toFixed(2)}</p>
            </div>
            <div class="field">
                <p>Realizado el: ${fechaCreacion}</p>
            </div>
            <div class="field">
                <div style="margin-left: 10px;margin-bottom: 10px;">
                <button class="ui small btn-purple text-white icon button" id="updatePayments" onclick="editar('${detail.id}')"> Editar</button>
                <button class="ui small btn-delete text-white icon button" id="deletePayments" onclick="DeletePayment('${detail.id}')"> Eliminar</button>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>

            `;
        }
        structure += `
            <div class="eight wide column">
                <button class="ui small btn-purple text-white labeled icon button" id="createPayments" onclick="createPayment('${rowId}')"><i class="plus icon"></i> Insertar un registro de pago</button>
            </div>`;
        return structure;
    }
    
}

$(document).ready(function () {
    // Add event listener for opening and closing details
    $("#grdReservacion").on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var id = $(tr).attr('data-value');        
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            $(tr).removeClass("dt-hasChild");
        } else {
            // Open this row
            row.child(format(PaymentsList.data, id)).show();
            $(tr).addClass("dt-hasChild");
        }
    });
    //Sirve para rellenar la subtabla de la tabla maestra
    $("#grdReservacion").on('requestChild.dt', function (e, row) {
        row.child(format(PaymentsList.data, id)).show();
    });
    var table = $("#grdReservacion").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        
        //Aqui se ingresa el numero de columnas que tiene la tabla
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ],
        order: [[1, 'asc']],
        dom: 'Bfrtip',

        //Son los botones de acciones para exportar
        buttons: [
            {
                extend: 'pdfHtml5',
                text: '<i class= "file pdf icon"></i> Exportar como PDF',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'csvHtml5',
                text: '<i class="file csv icon"></i> Exportar como CSV',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2"
            },
        ]
    });
});




//Show the amount of payments that the user has done

function paymentsListDetails(id_reservacion) {

    //var RoomReservation = RoomReservationList.data;
    var Payments = PaymentsList.data;
    if (PaymentsList.code == 200) {

        var Detail =
            `<div class="ui fluid vertical menu">`;
        if (Payments.length == 0)
        {
            Detail = `<h2>No hay registros para mostrar</h2></div>`;
        }

        Payments = jQuery.grep(Payments, function (item, i) {
            return item.id_Reservacion == id_reservacion;
        });

        for (var i = 0; i < Payments.length; i++) {

            const detail = Payments[i];
            
            const fechaCreacion = detail.fechaPago.split("T")[0].split("-").reverse().join("-");


            Detail +=
                `<a class="item">
                    <h1 class="ui medium header">${detail.tipoPago}</h1>
                    <p># de factura: <span id="payment_id">${detail.id}</span></p>
                    <p>Nombre: ${detail.nombre_Completo}</p>
                    <p>Monto: L ${parseFloat(detail.montoPago).toFixed(2)}</p>
                    <p>Realizado el: ${fechaCreacion}</p>
                </a><br />
                <div style="margin-left: 10px;margin-bottom: 10px;">
                <button class="ui small btn-purple text-white icon button" id="updatePayments" onclick="editar('${detail.id}')"> Editar</button>
                <button class="ui small btn-purple text-white icon button" id="deletePayments" onclick="DeletePayment('${detail.id}')"> Eliminar</button>
                </div>`;
        }
        Detail += "</div>";
        Detail += '<div class="eight wide column"><button class="ui small btn-purple text-white labeled icon button" id="createPayments" onclick="createPayment(' + id_reservacion +')"><i class="plus icon"></i> Insertar un registro de pago</button></div>'
        return Detail;
    }
}



function DeleteReservation(id) {
    const capsula1 = () => {
        var response = ajaxRequest("/Reservation/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Reservation?success=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrará permanentemente.", "warning", capsula1);

};



//PAYMENTS


function createPayment(resv_ID) {
    $("#modalCreate").modal('show');
    $("#modalCreate #Resv_ID").val(resv_ID);

}

function DeletePayment(id) {
    const capsula1 = () => {
        var response = ajaxRequest("/RegistrationPayments/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Reservation?success=true';
        }
        window.location.reload();
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrará permanentemente.", "warning", capsula1);

};


//Fill the payments types Dropdown
const paymentTypes = PaymentTypesList.data;
for (var i = 0; i < paymentTypes.length; i++) {
    $('#TiPa_ID').append('<option value="' + paymentTypes[i].id + '">' + paymentTypes[i].descripcion + '</option>');
};

$("#modalCreate #close").click(() => {
    $("#modalCreate").modal('hide');
});
$("#modalUpdate #close").click(() => {
    $("#modalUpdate").modal('hide');
});

//Amount cant be negative
$("#modalCreate #RePa_Monto").change(function () {
    if ($("#modalCreate #RePa_Monto").val() < 1) {
        $("#modalCreate #RePa_Monto").val(1)
        iziToast.warning({
            title: 'Atención',
            message: 'El monto no puede ser un valor negativo',
        });
    }
});
$("#modalUpdate #RePa_Monto").change(function () {
    if ($("#modalUpdate #RePa_Monto").val() < 1) {
        $("#modalUpdate #RePa_Monto").val(1)
        iziToast.warning({
            title: 'Atención',
            message: 'El monto no puede ser un valor negativo',
        });
    }
});



function validar() {    

    validateArrayForm = [
        { validateMessage: "No se pudo recuperar el # de la reservación", Jqueryinput: $("#modalCreate #Resv_ID") },
        { validateMessage: "Ingrese una forma de pago.", Jqueryinput: $("#modalCreate #TiPa_ID") },
        { validateMessage: "Ingrese un monto.", Jqueryinput: $("#modalCreate #RePa_Monto") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        $("#createPaymentForm").submit();        
    }

}

//Fill the payments types Dropdown
for (var i = 0; i < paymentTypes.length; i++) {
    $('#modalUpdate #TiPa_ID').append('<option value="' + paymentTypes[i].id + '">' + paymentTypes[i].descripcion + '</option>');
};


function editar(PaymentID) {
    var response = ajaxRequest("/RegistrationPayments/Update?id=" + PaymentID,null, "GET");
    if (response != null) {
        var item = response;


        var fecha = item.fechaPago.split("T")[0];

        $("#modalUpdate #Resv_ID").val(item.id_Reservacion);
        $("#modalUpdate #TiPa_ID").val(item.id_TipoPago);
        $("#modalUpdate #RePa_Monto").val(item.montoPago);
        $("#modalUpdate #RePa_ID").val(item.id);
        $("#modalUpdate #RePa_FechaPago").val(fecha);
        $("#modalUpdate").modal("show");

    }


}

$(document).ready(function () {
    var command = FindGetValue("Command")
    var isSuccess = FindGetValue("isSuccess")
    if (command == "Personalize" && isSuccess == true) {
        iziToast.success({
            title: 'Éxito',
            message: 'Reservación ingresada exitosamente',
        });
    }
});

$(document).ready(function () {
    setTimeout(function () {
        var command = FindGetValue("Command")
        var isSuccess = FindGetValue("isSuccess")
        var responseID = FindGetValue("responseID")
        if (command == "Personalize" && isSuccess == "true") {
            iziToast.success({
                title: 'Éxito',
                message: 'Reservación ingresada exitosamente',
            });
            $('input[type="search"]').val(responseID.toString()).keyup();
        } else if (command == "Update" && isSuccess == "true") {
            iziToast.success({
                title: 'Éxito',
                message: 'Reservación editada exitosamente',
            });
            $('input[type="search"]').val(responseID.toString()).keyup();
        } else if (command == "Create" && isSuccess == "true") {
            iziToast.success({
                title: 'Éxito',
                message: 'Reservación creada exitosamente',
            });
            $('input[type="search"]').val(responseID.toString()).keyup();
        }
    },1000)
    
    
});


function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese una reservación.", Jqueryinput: $("#modalUpdate #Resv_ID") },
        { validateMessage: "Ingrese una forma de pago.", Jqueryinput: $("#modalUpdate #TiPa_ID") },
        { validateMessage: "Ingrese un monto.", Jqueryinput: $("#modalUpdate #RePa_Monto") },
        { validateMessage: "Ingrese una fecha.", Jqueryinput: $("#modalUpdate #RePa_FechaPago") },

    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $("#updatePaymentsForm").submit();
    }
}