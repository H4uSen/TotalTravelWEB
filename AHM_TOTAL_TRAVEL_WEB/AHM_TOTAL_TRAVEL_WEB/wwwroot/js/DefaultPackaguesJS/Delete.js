$("#errorDiv").hide();

$('.ui.dropdown').dropdown();



$("#close").click(() => {
   
    $("#ModalDelete").modal('hide');
});

$("#send").click(() => {
    $("#frmDeleteDefaultPackagues").submit();
})


function DeleteDefaultPackage(id) {
    const capsula1 = () => {
        ajaxRequest("/DefaultPackages/Delete?id=" + id, null, "POST")
        location.reload();
    };

    sweetAlertconfirm("Estas Seguro de Eliminar el Registro Seleccionado?", "Este registro se borrara permanentemente", "warning", capsula1);

};

