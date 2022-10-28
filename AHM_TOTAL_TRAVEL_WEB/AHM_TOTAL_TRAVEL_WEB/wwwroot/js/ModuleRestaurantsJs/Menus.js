var menusList = ajaxRequest("https://totaltravel.somee.com/API/Menus/List");

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
        var card = `<div class="ui special card">
            <div class="content">
                <div class="right floated meta">
                    <a href="javascript:EliminarMenu(${item.id})"><i class="large times icon"></i></a>
                </div>
                ${item.menu}
            </div>
            <div class="image">
                <div class="ui dimmer">
                    <div class="content">
                        <div class="center">
                            <div class="ui inverted button">Editar</div>
                        </div>
                    </div>
                </div>
                <img src="${item.image_Url}">
            </div>
            <div class="content">
                <span>${item.descripcion}</span>
            </div>
            <div class="extra content">
                <p>
                    <b>L </b>
                    ${item.precio}
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
        `<div class="ui card" id="esconder">
            <div class="blurring dimmable image">
                <img src="https://avalos.sv/wp-content/uploads/default-featured-image.png" />
                <div class="field">
                    <input type="file" />
                </div>
            </div>
            <div class="content">
                <div class="ui form">
                    <div class="field">
                        <div class="ui input">
                            <input type="text" placeholder="Nombre del menú">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui input">
                            <textarea rows="2" placeholder="Descripción del menú"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui right labeled input">
                            <label for="amount" class="ui label">L</label>
                            <input type="number" step="0.01" min="0">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui right labeled input">
                            <button class="ui button btn-edit text-white" id="send">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui card align-items-center" id="mas">
            <a>
                <i class="massive plus icon"></i>
            </a>
        </div>
        <div class="ui card align-items-center" id="equis">
            <a>
                <i class="massive close icon"></i>
            </a>
        </div>
        <br />`);

    $('#esconder').hide();
    $('#equis').hide();

    $('#agregar, #mas').click(() => {
        $('#esconder').show();
        $('#mas').hide();
        $('#equis').show();
    });

    $("#equis").click(() => {
        $('#esconder').hide();
        $('#mas').show();
        $('#equis').hide();
    });
}

