fillpackage();

function fillpackage() {
    const request = ajaxRequest(
        "https://totaltravel.somee.com/API/DefaultPackages/List",
        null, "GET", false
    );
    $("#package-slider").empty();
    for (var i = 0; i < request.data.length; i++) {
        const package = request.data[i];
        const card =
            `
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-image"></div>
                        <div class="card-text">
                            <h2 style="color:black;font-size:20px">${package.nombre}</h2>
                            <p>${package.descripcion_Paquete}</p>
                            <h2 style="color:green;font-size:20px">${package.precio} LPS</h2>
                        </div>
                        <div class="card-stats">
                            <div class="stat">
                                <div class="value">Hotel</div>
                                <div class="type">${package.hotel}</div>
                            </div>
                            <div class="stat border">
                               <div class="value">Duracion</div>
                                <div class="type">${package.duracion_Paquete}</div>
                            </div>
                            <div class="stat">
                                <div class="value">Restaurante</div>
                                <div class="type">${package.restaurante}</div>
                            </div>
                        </div>
                    </div>
                </div>`;

        $("#package-slider").append(card);

    }
    console.log(request);
}

// ------------------------------------------------------- //
//   Inject SVG Sprite -
//   see more here
//   https://css-tricks.com/ajaxing-svg-sprite/
// ------------------------------------------------------ //
$(document).ready(function ($) {
    $('.card-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
});
function injectSvgSprite(path) {

    var ajax = new XMLHttpRequest();
    ajax.open("GET", path, true);
    ajax.send();
    ajax.onload = function (e) {
        var div = document.createElement("div");
        div.className = 'd-none';
        div.innerHTML = ajax.responseText;
        document.body.insertBefore(div, document.body.childNodes[0]);
    }
}
// this is set to BootstrapTemple website as you cannot
// inject local SVG sprite (using only 'icons/orion-svg-sprite.svg' path)
// while using file:// protocol
// pls don't forget to change to your domain :)
injectSvgSprite('https://bootstraptemple.com/files/icons/orion-svg-sprite.svg');