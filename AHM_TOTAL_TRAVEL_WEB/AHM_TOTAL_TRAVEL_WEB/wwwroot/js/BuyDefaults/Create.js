$("#DetailsBottom").click(() => {
    $("#modalUpdate").modal('show');
});

function editar(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/DefaultPackages/Find?id=" + id);
    if (response.code == 200) {
        $("#id").val(id);
        $("#Nombre").val(response.data.nombre);    
        $("#modalUpdate").modal("show");
    }
}

