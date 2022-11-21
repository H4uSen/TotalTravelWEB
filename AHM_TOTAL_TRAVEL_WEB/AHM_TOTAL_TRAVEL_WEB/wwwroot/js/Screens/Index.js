$(document).ready(function () {

    var table = $("#grdScreens").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        //Aqui se ingresa el numero de columnas que tiene la tabla
        columns: [
            {},
            {},
            {}
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
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2]
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


$(document).ready(function () {

    var table = $("#grdModulos").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        //Aqui se ingresa el numero de columnas que tiene la tabla
        columns: [
            {},
            {}
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
                    columns: [0, 1]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1]
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


//-------------------------------------- INIZIALIZE -----------------------------------------------------
$(".ui.checkbox").checkbox();
$(".ui.dropdown").dropdown();
$("#frmModulos").hide();


//-------------------------------------- EVENTS -----------------------------------------------------
$("#btnCreateScreen").click(function () {
    $("#mdlCreateScreen").modal("show");
});


$("#btnCreateModule").click(function () {
    $("#mdlCreateModules").modal("show");
});

$("#menu_Indexs .item").click(function (_this) {
    $.each($("#menu_Indexs .item"), function (i, item) {
        const target = $(item).attr("data-target");
        $(item).removeClass("active");
        $(target).hide();
    });

    const target_show = $(_this.target).attr("data-target");
    $(_this.target).addClass("active");
    $(target_show).show();
});

//-------------------------------------- FUNCTIONS -----------------------------------------------------

function createScreen() {
    const ValidateArray = [
        { validateMessage: "Ingrese un nombre de pantalla", Jqueryinput: $("#mdlCreateScreen #txtDescripcion") },
        { validateMessage: "Ingrese un nombre de controllador", Jqueryinput: $("#mdlCreateScreen #txtController") },
        { validateMessage: "Ingrese una Hora de Salida", Jqueryinput: $("#mdlCreateScreen #txtAction") },
        { validateMessage: "Ingrese una Hora de Llegada", Jqueryinput: $("#mdlCreateScreen #cbbModulo") },
    ];

    const formValidate = ValidateForm(ValidateArray);

    if (formValidate) {
        var screen = ScreensViewModel;
        screen.modu_ID = parseInt($("#mdlCreateScreen #cbbModulo").val());
        screen.perm_Action = $("#mdlCreateScreen #txtAction").val();
        screen.perm_Controlador = $("#mdlCreateScreen #txtController").val();
        screen.perm_Descripcion = $("#mdlCreateScreen #txtDescripcion").val();
        screen.perm_esVisible = $("#mdlCreateScreen #chkVisible").prop("checked");

        const response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Permissions/Insert", screen, "POST");
        if (response.code == 200) {
            Swal.fire("!Registro Creado con exito!", "", "success").then(function () {
                location.reload();
            });
        } else {
            console.log(response);
            Swal.fire("!Error al realizar la accion!", response.message, "error");
        }
    }
}



function createModule() {
    const ValidateArray = [
        { validateMessage: "Ingrese un nombre", Jqueryinput: $("#mdlCreateModules #txtModulo") }
    ];

    const formValidate = ValidateForm(ValidateArray);

    if (formValidate) {
        var module = ModulesViewModel;
        module.modu_Descripcion = $("#mdlCreateModules #txtModulo").val();

        const response = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Modules/Insert", module, "POST");
        if (response.code == 200) {
            window.location.href = '/Screens?success=true';
        } else {
            console.log(response);
            Swal.fire("!Error al realizar la accion!", response.message, "error");
        }
    }
}