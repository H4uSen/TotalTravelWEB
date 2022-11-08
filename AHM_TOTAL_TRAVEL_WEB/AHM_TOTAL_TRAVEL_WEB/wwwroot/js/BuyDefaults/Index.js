﻿var paquetesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DefaultPackages/List");

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
        var card = `<div class="card">
            <div class="card-body">
                <div class="filterable-item south-america ">
                    <article class="offer-item">
                        <figure class="featured-image">
                            <img src="https://dam.ngenespanol.com/wp-content/uploads/2022/05/4-pasos-para-hacer-realidad-ese-viaje-que-no-has-podido-emprender.jpg" alt="">
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
            </div>
        </div>`;
        $("#paquetesContainer").append(card);
    }
}