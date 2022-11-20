package();

function package() {

    const request = ajaxRequest(
        "https://apitotaltravel.azurewebsites.net/API/DefaultPackages/List",
        null, "GET", false
    );
    $("#loaderAnimation").hide();
    //jQuery.grep(request.data, function (item,i) {
    //return item.})
    $("#paquetes").empty();
    for (var i = 0; i <= 3; i++) {
        const package = request.data[i];
        var imagen = package.image_URL.split(',');
        var imagensplit = imagen[0];
        const card =
            `
                       <div class="col-md-3 col-sm-6 col-xs-12">
                        <article class="offer wow bounceIn">
                            <figure class="featured-image" style="height:170px;"><img src="${imagensplit}" alt=""></figure>
                            <h2 class="entry-title" style="font-size: 20px;"><a href="">${package.nombre}</a></h2>
                            <p>${package.descripcion_Paquete}</p>
                            <p>${package.duracion_Paquete}</p>
                            <a href="#" class="button">Ver detalles</a>
                        </article>
                    </div>
            `;

        $("#paquetes").append(card);

    }
    console.log(request);
}

