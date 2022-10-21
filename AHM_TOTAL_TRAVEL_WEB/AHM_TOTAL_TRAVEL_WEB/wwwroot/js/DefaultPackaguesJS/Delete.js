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
        window.location.href = 'DefaultPackages/?success=true';
    };

    sweetAlertconfirm("Estas Seguro de Eliminar el Registro Seleccionado?", "Este registro se borrará permanentemente", "warning", capsula1);

};

