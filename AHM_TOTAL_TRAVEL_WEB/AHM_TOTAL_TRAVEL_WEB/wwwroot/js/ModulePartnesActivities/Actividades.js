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
        var card = `<div class="ui special card" id="actv_${item.id}">
            <div class="content">
                <div class="right floated meta">
                    <a id="a" href="javascript:EliminarActividad(${item.id})"><i class="large times icon"></i></a>
                </div>
                ${item.actividad}
            </div>
            <div class="image">
                <div class="ui dimmer">
                    <div class="content">
                        <div class="center">
                            <a class="ui inverted button" href="/ModulePartnersActivities/Update/${item.id}">Editar</a>
                        </div>
                    </div>
                </div>
                <img src="${item.imageURL}" id="imagen" >
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
        `<div class="ui card align-items-center" id="mas">
            <a id="a">
                <i class="massive plus icon"></i>
            </a>
        </div>
        <br />`);
}
$("#mas").click(() => {
    window.location.href = '/ModulePartnersActivities/Create';
});