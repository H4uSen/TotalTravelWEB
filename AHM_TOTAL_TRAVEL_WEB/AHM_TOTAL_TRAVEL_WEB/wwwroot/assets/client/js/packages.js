fillpackages();

function fillpackages() {
    const request = ajaxRequest(
        "https://totaltravel.somee.com/API/DefaultPackages/List",
        null, "GET", false
    );
    $("#package-slider").empty();
    for (var i = 0; i < request.data.length; i++) {
        const package = request.data[i];
        const card =
            `<div class="col-md-3 col-sm-6 col-xs-12">
                    <article class="offer wow bounceIn">
                        <figure class="featured-image"><img src="~/assets/dummy/offer-thumbnail-1.jpg" alt=""></figure>
                        <h2 class="entry-title"><a href="">${package.nombre}</a></h2>
                        <p>${package.descripcion_Paquete}</p>
                        <a href="#" class="button">${package.precio} LPS</a>
                    </article>
                </div>
      `;

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