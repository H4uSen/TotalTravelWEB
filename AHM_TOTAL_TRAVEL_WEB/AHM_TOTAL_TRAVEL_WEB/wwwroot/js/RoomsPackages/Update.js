$(document).ready(function () {
    $("#PaHa_IDUpdate").hide();
});

$('.ui.dropdown').dropdown();

$("#createPaqueteHabitacion").click(() => {
    $("#modalCreate").modal('show');
});

$("#closePaqueteHabitacion").click(() => {
    $("#modalCreate").modal('hide');
});