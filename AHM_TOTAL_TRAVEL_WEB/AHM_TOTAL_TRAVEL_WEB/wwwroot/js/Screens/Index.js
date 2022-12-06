
const PermissionsList = ajaxRequest(urlAPI + "/API/Permissions/List");
const ModulesList = ajaxRequest(urlAPI + "/API/Modules/List");
const GroupsList = ajaxRequest(urlAPI + "/API/Navbar/List");
$(document).ready(function () {

    $("#Perm_ID").hide();
    $("#Modu_Id").hide();
    $("#txtGrupo_Id").hide();

    $("#grdScreens").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        columns: [
            {},
            {},
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

    $("#grdModulos").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },

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
$("#frmGruposMenu").hide();


//-------------------------------------- EVENTS -----------------------------------------------------
$("#btnCreateScreen").click(function () {
    $("#mdlCreateScreen").modal("show");
});

$("#btnCreateModule").click(function () {
    $("#mdlCreateModules").modal("show");
});

$("#btnCreateGroup").click(function () {
    $("#mdlCreateGroups").modal("show");
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

//--------------------- SCREENS -------------------------------
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
        screen.perm_esDashboard = $("#mdlCreateScreen #chkDashboard").prop("checked");

        const response = ajaxRequest(urlAPI +"/API/Permissions/Insert", screen, "POST");
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

function editScreen(id) {

    if (PermissionsList.code == 200) {

        const element = PermissionsList.data.filter(x => x.id == id)[0];

        $('#Perm_ID').val(id);
        $("#cbbGrupo").val(element.id_grupo)
        $('#txtDescripcionUpdate').val(element.descripcion);
        $('#txtControllerUpdate').val(element.controlador);
        $('#txtActionUpdate').val(element.action);

        SetDropDownValue($("#cbbModuloUpdate"), element.id_modulo);
        if (element.id_grupo == null) {
            $("#cbbGrupo").dropdown('restore defaults');
        } else {
            SetDropDownValue($("#cbbGrupo"), element.id_grupo);
        }

        $("#checkVisible").prop("checked", element.esVisible);
        $("#checkDashboard").prop("checked", element.esDashboard);

        if ($('#Perm_ID').val() != 0) {
            $("#mdlUpdateScreen").modal('show');
        }
    }
}

function updateScreen() {

    validateArrayForm = [
        { validateMessage: "Ingrese la descripción.", Jqueryinput: $("#txtDescripcionUpdate") },
        { validateMessage: "Ingrese el controlador.", Jqueryinput: $("#txtControllerUpdate") },
        { validateMessage: "Ingrese la acción.", Jqueryinput: $("#txtActionUpdate") },
        { validateMessage: "Seleccione un modulo.", Jqueryinput: $("#cbbModuloUpdate") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        var screen = ScreensViewModel;
        screen.perm_ID = parseInt($("#mdlUpdateScreen #Perm_ID").val());
        screen.modu_ID = parseInt($("#mdlUpdateScreen #cbbModuloUpdate").val());
        screen.grEN_Id = $("#mdlUpdateScreen #cbbGrupo").val() == 0 ? 0 : parseInt($("#mdlUpdateScreen #cbbGrupo").val());
        screen.perm_Action = $("#mdlUpdateScreen #txtActionUpdate").val();
        screen.perm_Controlador = $("#mdlUpdateScreen #txtControllerUpdate").val();
        screen.perm_Descripcion = $("#mdlUpdateScreen #txtDescripcionUpdate").val();
        screen.perm_esVisible = $("#mdlUpdateScreen #checkVisible").prop("checked");
        screen.perm_esDashboard = $("#mdlUpdateScreen #checkDashboard").prop("checked");

        console.log(screen);

        const response = ajaxRequest(urlAPI + "/API/Permissions/Update?id=" + screen.perm_ID, screen, "PUT");
        if (response.code == 200) {
            Swal.fire("!Registro actualizado con exito!", "", "success").then(() => {
                location.reload();
            });
        } else {
            Swal.fire("Error al realizar la accion", response.message, "error");
        }
    }
}

function deleteScreen(id) {

    const callback = () => {
        var response = ajaxRequest("/Screens/Delete?id=" + id, null, "POST");
        if (response > 0) {
            Swal.fire("!Registro eliminado con exito!", "", "success").then(() => {
                location.reload();
            });
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", callback);
}

//--------------------- MODULES -------------------------------
function createModule() {
    const ValidateArray = [
        { validateMessage: "Ingrese un nombre", Jqueryinput: $("#mdlCreateModules #txtModulo") }
    ];

    const formValidate = ValidateForm(ValidateArray);

    if (formValidate) {
        var module = ModulesViewModel;
        module.modu_Descripcion = $("#mdlCreateModules #txtModulo").val();

        const response = ajaxRequest(urlAPI +"/API/Modules/Insert", module, "POST");
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

function editModule(id) {

    const element = ModulesList.data.filter(x => x.id_modulo == id)[0];

    if (ModulesList.code == 200) {
        $('#Modu_Id').val(id);
        $('#txtModuloUpdate').val(element.modulo);

        if ($('#Modu_Id').val() != 0) {
            $("#mdlUpdateModules").modal('show');
        }
    }
}

function updateModule() {

    validateArrayForm = [
        { validateMessage: "Ingrese un nombre", Jqueryinput: $("#mdlUpdateModules #txtModuloUpdate") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    if (ValidateFormStatus) {
        var module = ModulesViewModel;
        module.modu_Id = parseInt($("#mdlUpdateModules #Modu_Id").val());
        module.modu_Descripcion = $("#mdlUpdateModules #txtModuloUpdate").val();


        const response = ajaxRequest(urlAPI + "/API/Modules/Update?id=" + module.modu_Id, module, "PUT");
        if (response.code == 200) {
            Swal.fire("!Registro actualizado con exito!", "", "success").then(() => {
                location.reload();
            });
        } else {
            Swal.fire("Error al realizar la accion", response.message, "error");
        }
    }
}

function deleteModule(id) {

    const callback = () => {
        var response = ajaxRequest("/Screens/DeleteModule?id=" + id, null, "POST");
        if (response > 0) {
            Swal.fire("!Registro eliminado con exito!", "", "success").then(() => {
                location.reload();
            });
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", callback);
}

//--------------------- GROUPS -------------------------------

function createGroup() {
    const ValidateArray = [
        { validateMessage: "Ingrese un nombre de grupo", Jqueryinput: $("#mdlCreateGroups #txtNombreGrupo") }
    ];

    const formValidate = ValidateForm(ValidateArray);

    if (formValidate) {
        var model = {
            "grEN_Id": 0,
            "grEN_NombreGrupo": $("#mdlCreateGroups #txtNombreGrupo").val(),
            "grEN_Estado": true
        };

        const response = ajaxRequest(urlAPI +"/API/Navbar/Insert", model, "POST");
        if (response.codeStatus > 0) {
            Swal.fire("!Registro creado con exito!", "", "success").then(() => {
                location.reload();
            });
        } else {
            console.log(response);
            Swal.fire("!Error al realizar la accion!", response.message, "error");
        }
    }
}

function editGroup(id) {

    const element = GroupsList.data.filter(x => x.id == id)[0];

    if (GroupsList.code == 200) {
        $('#mdlUpdateGroups #txtGrupo_Id').val(id);
        $('#mdlUpdateGroups #txtNombreGrupo').val(element.nombre_grupo);

        if ($('#mdlUpdateGroups #txtGrupo_Id').val() != 0) {
            $("#mdlUpdateGroups").modal('show');
        }
    }
}

function updateGroup() {

    const model = {
        "grEN_Id": parseInt($('#mdlUpdateGroups #txtGrupo_Id').val()),
        "grEN_NombreGrupo": $('#mdlUpdateGroups #txtNombreGrupo').val(),
        "grEN_Estado": true
    };

    const updateResponse = ajaxRequest(urlAPI + "/API/Navbar/Update?id=" + model.grEN_Id, model, "PUT");

    if (updateResponse.code == 200 && updateResponse.codeStatus > 0) {
        Swal.fire("!Registro actualizado con exito!", "", "success").then(() => {
            location.reload();
        });
    } else {
        console.log(updateResponse);
        Swal.fire("Error al realizar la accion", updateResponse.message, "error");
    }
}

function deleteGroup(id) {
    const callback = () => {
        const deleteResponse = ajaxRequest(urlAPI + `/API/Navbar/Delete?id=${id}&Mod=${Client_User_ID}`, null, "PUT");
        if (deleteResponse.code == 200 && deleteResponse.codeStatus > 0) {
            Swal.fire("!Registro eliminado con exito!", "", "success").then(() => {
                location.reload();
            });
        }
        else {
            Swal.fire("Error al realizar la accion", response.message, "error");
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", callback);
}