fillpackage();

function fillpackage() {
    const request = ajaxRequest(
        "https://totaltravelapi.azurewebsites.net/API/DefaultPackages/List",
        null, "GET", false
    );
    $("#package-slider").empty();
    for (var i = 0; i < request.data.length; i++) {
        const package = request.data[i];
        const card =
            `<div class="carde">
                <div class="card__container">
                    <div class="card__image">
                        <img alt="" src="https://images.unsplash.com/photo-1499708544652-0e4c43899071?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRyb25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                        <div class="card__dates">
                            <div class=" date">
                                <div class="date__icon">
                                    <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.96429 8.39289H2.89286C2.71607 8.39289 2.57143 8.24222 2.57143 8.05807V6.942C2.57143 6.75785 2.71607 6.60718 2.89286 6.60718H3.96429C4.14107 6.60718 4.28571 6.75785 4.28571 6.942V8.05807C4.28571 8.24222 4.14107 8.39289 3.96429 8.39289ZM6.85714 8.05807V6.942C6.85714 6.75785 6.7125 6.60718 6.53571 6.60718H5.46429C5.2875 6.60718 5.14286 6.75785 5.14286 6.942V8.05807C5.14286 8.24222 5.2875 8.39289 5.46429 8.39289H6.53571C6.7125 8.39289 6.85714 8.24222 6.85714 8.05807ZM9.42857 8.05807V6.942C9.42857 6.75785 9.28393 6.60718 9.10714 6.60718H8.03571C7.85893 6.60718 7.71429 6.75785 7.71429 6.942V8.05807C7.71429 8.24222 7.85893 8.39289 8.03571 8.39289H9.10714C9.28393 8.39289 9.42857 8.24222 9.42857 8.05807ZM6.85714 10.7366V9.62057C6.85714 9.43642 6.7125 9.28575 6.53571 9.28575H5.46429C5.2875 9.28575 5.14286 9.43642 5.14286 9.62057V10.7366C5.14286 10.9208 5.2875 11.0715 5.46429 11.0715H6.53571C6.7125 11.0715 6.85714 10.9208 6.85714 10.7366ZM4.28571 10.7366V9.62057C4.28571 9.43642 4.14107 9.28575 3.96429 9.28575H2.89286C2.71607 9.28575 2.57143 9.43642 2.57143 9.62057V10.7366C2.57143 10.9208 2.71607 11.0715 2.89286 11.0715H3.96429C4.14107 11.0715 4.28571 10.9208 4.28571 10.7366ZM9.42857 10.7366V9.62057C9.42857 9.43642 9.28393 9.28575 9.10714 9.28575H8.03571C7.85893 9.28575 7.71429 9.43642 7.71429 9.62057V10.7366C7.71429 10.9208 7.85893 11.0715 8.03571 11.0715H9.10714C9.28393 11.0715 9.42857 10.9208 9.42857 10.7366ZM12 3.48218V13.3036C12 14.043 11.4241 14.6429 10.7143 14.6429H1.28571C0.575893 14.6429 0 14.043 0 13.3036V3.48218C0 2.74278 0.575893 2.14289 1.28571 2.14289H2.57143V0.691999C2.57143 0.507847 2.71607 0.357178 2.89286 0.357178H3.96429C4.14107 0.357178 4.28571 0.507847 4.28571 0.691999V2.14289H7.71429V0.691999C7.71429 0.507847 7.85893 0.357178 8.03571 0.357178H9.10714C9.28393 0.357178 9.42857 0.507847 9.42857 0.691999V2.14289H10.7143C11.4241 2.14289 12 2.74278 12 3.48218ZM10.7143 13.1362V4.82146H1.28571V13.1362C1.28571 13.2283 1.35804 13.3036 1.44643 13.3036H10.5536C10.642 13.3036 10.7143 13.2283 10.7143 13.1362Z" fill="#003B5C" />
                                    </svg>
                                </div>
                                <div class="date__details">
                                    <span class="date__heading">1st January 2021</span>
                                    <span class="date__description">Current AIRAC Date</span>
                                </div>
                            </div>
                            <div class=" date">
                                <div class="date__icon">
                                    <div width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 8.45875V9.09796C9 9.27374 8.85536 9.41756 8.67857 9.41756H6.64286V11.4417C6.64286 11.6175 6.49821 11.7613 6.32143 11.7613H5.67857C5.50179 11.7613 5.35714 11.6175 5.35714 11.4417V9.41756H3.32143C3.14464 9.41756 3 9.27374 3 9.09796V8.45875C3 8.28297 3.14464 8.13915 3.32143 8.13915H5.35714V6.115C5.35714 5.93922 5.50179 5.7954 5.67857 5.7954H6.32143C6.49821 5.7954 6.64286 5.93922 6.64286 6.115V8.13915H8.67857C8.85536 8.13915 9 8.28297 9 8.45875ZM12 3.66472V13.0397C12 13.7455 11.4241 14.3181 10.7143 14.3181H1.28571C0.575893 14.3181 0 13.7455 0 13.0397V3.66472C0 2.95893 0.575893 2.38631 1.28571 2.38631H2.57143V1.00136C2.57143 0.825584 2.71607 0.681763 2.89286 0.681763H3.96429C4.14107 0.681763 4.28571 0.825584 4.28571 1.00136V2.38631H7.71429V1.00136C7.71429 0.825584 7.85893 0.681763 8.03571 0.681763H9.10714C9.28393 0.681763 9.42857 0.825584 9.42857 1.00136V2.38631H10.7143C11.4241 2.38631 12 2.95893 12 3.66472ZM10.7143 12.8799V4.94313H1.28571V12.8799C1.28571 12.9678 1.35804 13.0397 1.44643 13.0397H10.5536C10.642 13.0397 10.7143 12.9678 10.7143 12.8799Z" fill="#003B5C" />
                                    </div>
                                </div>
                                <div class="date__details">
                                    <div class="date__heading">20th August 2021</div>
                                    <div class="date__description">Upcoming AIRAC Date</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card__heading">${package.nombre}</div>
                    <div class="card__content">
                        ${package.descripcion_Paquete}
                    </div>
                    <div class="contenedor">
                        <a href="#" class="card__action button -primary">DOWNLOAD</a>
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