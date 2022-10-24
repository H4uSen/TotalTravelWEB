$("#DetailsBottom").click(() => {
    $("#modalUpdate").modal('show');
});

function editar(id) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/DefaultPackages/Find?id=" + id);
    if (response.code == 200) {
        $("#id").val(id);
        $("#Nombre").html(response.data.nombre);
        $("#Descripcion").html(response.data.descripcion_Paquete);
        $("#Duracion").html(response.data.duracion_Paquete);
        $("#Hotel").html(response.data.hotel);
        $("#Restaurante").html(response.data.restaurante);
        $("#Precio").html(response.data.precio);
        $("#sendMenu").prop("href", "BuyDefaults/Compra?id="+id);
        $("#modalUpdate").modal("show");
    }
    else {
        console.log(response);
    }
}

actividades();

function actividades(id) {
    const request = ajaxRequest(
        "https://totaltravel.somee.com/API/DefaultPackagesDetails/Find?id=" + id);
    $("#actividades").empty();
    for (var i = 0; i < request.data.length; i++) {
        const package = request.data[i];
        const card =
            `
               <li>${package.descripcionActividad}</li>
            `;

        $("#actividades").append(card);

    }
    console.log(request);
}