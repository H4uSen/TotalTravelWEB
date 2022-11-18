const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}



var send = false;
$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createCategoryrooms").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeCategoryrooms").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendCategoryrooms").click(() => {
    validar();
})

function validar() {
    if ($("#CategoriaHabitacion").val() == 0) {
        $("#labelvalidatort").html("Ingrese una Descripcion");
    }
    else {
        $("#labelvalidatort").html(" ");
    }
    if ($("#Categoria").val() != 0) {
        $("#createCategoryroomsForm").submit();
    }

}
