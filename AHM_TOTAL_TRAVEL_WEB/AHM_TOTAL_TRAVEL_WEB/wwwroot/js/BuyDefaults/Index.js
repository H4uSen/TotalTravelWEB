var paquetesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/DefaultPackages/List");
$('.ui.dropdown').dropdown();
fillPaquetes(0);

$("#Destinos").change(function (_this) {
    var idDestinos = $(_this.target).val();
    fillPaquetes(idDestinos);
});

function fillPaquetes(iddestino) {

    if (iddestino == 0) {
        var paquetes = jQuery.grep(paquetesList.data, function (paquete, i) {
            return paquete;
        });
    }
    else {
        var paquetes = jQuery.grep(paquetesList.data, function (paquete, i) {
            return paquete.ciudad_ID == iddestino;
        });
    }

    $("#paquetesContainer").empty();

    for (var i = 0; i < paquetes.length; i++) {
        const item = paquetes[i];
        var imagen = item.image_URL.split(',');
        var imagensplit = imagen[0];
        var card = `
                <div class="filterable-item south-america ">
                    <article class="offer-item">
                        <figure class="featured-image">
                            <img src="${imagensplit}" alt="" style="height:200px;">
                        </figure>
                        <h2 class="entry-title"><a href="#">${item.nombre}</a></h2>
                        <p>${item.descripcion_Paquete}</p>
                        <p>Destino: ${item.ciudad}</p>
                        <div class="price">
                            <strong>L. ${item.precio}</strong>
                            <small>/<a class="bot" href="BuyDefaults/Details/${item.id}">Ver detalles</a></small>
                        </div>
                    </article>
                </div>
           `;
        $("#paquetesContainer").append(card);
    }
}