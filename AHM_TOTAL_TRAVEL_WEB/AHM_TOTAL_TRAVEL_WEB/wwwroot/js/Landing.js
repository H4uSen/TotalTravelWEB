fillpackage();

function fillpackage() {
    const request = ajaxRequest(
        "https://totaltravelapi.azurewebsites.net/API/DefaultPackages/List",
        null, "GET", false
    );
    $("#package-slider").empty();
    for (var i = 0; i < request.data.length; i++) {
        const package = request.data[i];
        var imagen = package.image_URL.split(',');
        var imagensplit =imagen[0];
        const card =
            `<div class="carde">
                <div class="card__container">
                    <div class="card__image">
                        <img alt="" src="${imagensplit}" />
                        <div class="card__dates">
                            <div class=" date">
                                <div class="date__icon">
                                    <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.96429 8.39289H2.89286C2.71607 8.39289 2.57143 8.24222 2.57143 8.05807V6.942C2.57143 6.75785 2.71607 6.60718 2.89286 6.60718H3.96429C4.14107 6.60718 4.28571 6.75785 4.28571 6.942V8.05807C4.28571 8.24222 4.14107 8.39289 3.96429 8.39289ZM6.85714 8.05807V6.942C6.85714 6.75785 6.7125 6.60718 6.53571 6.60718H5.46429C5.2875 6.60718 5.14286 6.75785 5.14286 6.942V8.05807C5.14286 8.24222 5.2875 8.39289 5.46429 8.39289H6.53571C6.7125 8.39289 6.85714 8.24222 6.85714 8.05807ZM9.42857 8.05807V6.942C9.42857 6.75785 9.28393 6.60718 9.10714 6.60718H8.03571C7.85893 6.60718 7.71429 6.75785 7.71429 6.942V8.05807C7.71429 8.24222 7.85893 8.39289 8.03571 8.39289H9.10714C9.28393 8.39289 9.42857 8.24222 9.42857 8.05807ZM6.85714 10.7366V9.62057C6.85714 9.43642 6.7125 9.28575 6.53571 9.28575H5.46429C5.2875 9.28575 5.14286 9.43642 5.14286 9.62057V10.7366C5.14286 10.9208 5.2875 11.0715 5.46429 11.0715H6.53571C6.7125 11.0715 6.85714 10.9208 6.85714 10.7366ZM4.28571 10.7366V9.62057C4.28571 9.43642 4.14107 9.28575 3.96429 9.28575H2.89286C2.71607 9.28575 2.57143 9.43642 2.57143 9.62057V10.7366C2.57143 10.9208 2.71607 11.0715 2.89286 11.0715H3.96429C4.14107 11.0715 4.28571 10.9208 4.28571 10.7366ZM9.42857 10.7366V9.62057C9.42857 9.43642 9.28393 9.28575 9.10714 9.28575H8.03571C7.85893 9.28575 7.71429 9.43642 7.71429 9.62057V10.7366C7.71429 10.9208 7.85893 11.0715 8.03571 11.0715H9.10714C9.28393 11.0715 9.42857 10.9208 9.42857 10.7366ZM12 3.48218V13.3036C12 14.043 11.4241 14.6429 10.7143 14.6429H1.28571C0.575893 14.6429 0 14.043 0 13.3036V3.48218C0 2.74278 0.575893 2.14289 1.28571 2.14289H2.57143V0.691999C2.57143 0.507847 2.71607 0.357178 2.89286 0.357178H3.96429C4.14107 0.357178 4.28571 0.507847 4.28571 0.691999V2.14289H7.71429V0.691999C7.71429 0.507847 7.85893 0.357178 8.03571 0.357178H9.10714C9.28393 0.357178 9.42857 0.507847 9.42857 0.691999V2.14289H10.7143C11.4241 2.14289 12 2.74278 12 3.48218ZM10.7143 13.1362V4.82146H1.28571V13.1362C1.28571 13.2283 1.35804 13.3036 1.44643 13.3036H10.5536C10.642 13.3036 10.7143 13.2283 10.7143 13.1362Z" fill="#5f1d6d" />
                                    </svg>
                                </div>
                                <div class="date__details">
                                    <span class="date__heading">Duracion</span>
                                    <span class="date__description">${package.duracion_Paquete}</span>
                                </div>
                            </div>
                            <div class=" date">
                                <div class="date__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" fill="#5f1d6d"/>
                  </svg>
                                    </div>                               
                                <div class="date__details">
                                    <div class="date__heading">Personas</div>
                                    <div class="date__description">${package.cantidad_de_personas}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card__heading">${package.nombre}</div>

                    <div class="card__content" style="font-size: 15px; color:#C6C6C6;">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"  class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z "fill="#C6C6C6"/>
</svg>    ${package.ciudad},${package.hotel}
                        

              </div>
<div class="card__content" style="bottom: -20px;">
${package.descripcion_Paquete}
</div>
                    <div class="contenedor">
                        <a href="#" class="card__action button -primary">RESERVAR</a>
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