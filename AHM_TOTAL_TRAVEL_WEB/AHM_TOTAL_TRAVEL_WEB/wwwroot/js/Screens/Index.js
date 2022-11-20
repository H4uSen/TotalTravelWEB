

//-------------------------------------- INIZIALIZE -----------------------------------------------------
$(".ui.checkbox").checkbox();
$(".ui.dropdown").dropdown();

//-------------------------------------- EVENTS -----------------------------------------------------
$("#btnCreateScreen").click(function () {
    $("#mdlCreateScreen").modal("show");
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