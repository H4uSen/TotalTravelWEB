var actividadesList = ajaxRequest("https://totaltravel.somee.com/API/ActivitiesExtra/List");

fillActividad(0);

$("#Tipo_Actividad").change(function (_this) {
    var idTipoActividad = $(_this.target).val();
    fillActividad(idTipoActividad);
    $("#tipoactividadtext").html(
        $(_this.target).find("option:selected").text().toUpperCase()
    );
});

function fillActividad(idTipoActividad) {
    if (idTipoActividad == 0) {
        var actividades = jQuery.grep(actividadesList.data, function (actividad, i) {
            return actividad.iD_Partner == PartnerID;
        });
    }
    else {
        var actividades = jQuery.grep(actividadesList.data, function (actividad, i) {
            return actividad.tipoActividadID == idTipoActividad && actividad.iD_Partner == PartnerID;
        });
    }
    console.log(actividades);
    $("#actividadesContainer").empty();
    for (var i = 0; i < actividades.length; i++) {
        const item = actividades[i];
        var card = `<div class="ui special card">
            <div class="content">
                <div class="right floated meta">
                    <a href="javascript:EliminarActividad(${item.id})"><i class="large times icon"></i></a>
                </div>
                ${item.actividad}
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
        $("#actividadesContainer").append(card);
    }
    agregar();
    $('.special.card .image').dimmer({
        on: 'hover'
    });
}

function agregar() {
    $("#actividadesContainer").append(
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
                            <input type="text" placeholder="Nombre de la actividad">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui input">
                            <textarea rows="2" placeholder="Descripción de la actividad"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui right labeled input">
                            <label for="amount" class="ui label">L</label>
                            <input type="number" step="0.01" min="0">
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