var menusList = ajaxRequest(urlAPI+"/API/Menus/List");
$('.ui.dropdown').dropdown();
fillMenu(0);

$("#Tipo_Menu").change(function (_this) {
    var idTipoMenu = $(_this.target).val();
    fillMenu(idTipoMenu);
    $("#tipomenutext").html(
        $(_this.target).find("option:selected").text().toUpperCase()
    );
});

function fillMenu(idtipomenu) {
    if (idtipomenu==0) {
        var menus = jQuery.grep(menusList.data, function (menu, i) {
            return menu.iD_Restaurante == RestauranteID;
        });
    }
    else {
        var menus = jQuery.grep(menusList.data, function (menu, i) {
            return menu.iD_TipoMenu == idtipomenu && menu.iD_Restaurante == RestauranteID;
        });            
    }
    console.log(menus);
    $("#menusContainer").empty();
    for (var i = 0; i < menus.length; i++) {
        const item = menus[i];
        var card = `<div class="ui special card" id="menu_${item.id}">
            <div class="content">
                <div class="right floated meta">
                    <a id="a" href="javascript:EliminarMenu(${item.id})"><i class="large times icon"></i></a>
                </div>
                ${item.menu}
            </div>
            <div class="image">
                <div class="ui dimmer">
                    <div class="content">
                        <div class="center">
                            <a class="ui inverted button" href="javascript:ObtenerDatos(${item.id})">Editar</a>
                        </div>
                    </div>
                </div>
                <img src="${item.image_Url}" id="imagen">
            </div>
            <div class="content">
                <span>${item.descripcion}</span>
            </div>
            <div class="extra content">
                <p>
                    <b>L </b>
                    ${item.precio}.00
                </p>
            </div>
        </div>`;
        $("#menusContainer").append(card);
    }    
    agregar();
    $('.special.card .image').dimmer({
        on: 'hover'
    });
}

function agregar() {
    $("#menusContainer").append(
        `<div class="ui card align-items-center" id="agregar">
            <a id="a">
                <i class="massive plus icon"></i>
            </a>
        </div>
        <br />`
    );
    $("#agregar, #a").click(() => {
        $("#modalCreate").modal('show');
    });
}

