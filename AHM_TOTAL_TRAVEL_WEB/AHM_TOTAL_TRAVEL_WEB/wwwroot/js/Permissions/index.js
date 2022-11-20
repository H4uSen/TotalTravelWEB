
//----------------------------- VARIABLES --------------------------------------------

const ViewsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Permissions/List");
const RolesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Roles/List");
const ModulesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Modules/List");

//----------------------------- INIZIALIZE --------------------------------------------
getTreeView();
const menus_helpers = {
    reset_rol_menus: function (target_role = null) {

        $.each($("#roles_menu .item"), function (i, item) {
            const targetToHide = $(item).attr("data-target");
            $(targetToHide).hide();
            $(item).removeClass("active");
        });

        if (target_role == null) {
            const targetToShow = $("#roles_menu .item").eq(0).attr("data-target");
            $(targetToShow).show();
            $("#roles_menu .item").eq(0).addClass("active");
        } else {
            const target_show = $(target_role).attr("data-target");
            $(target_show).show();
            $(target_role).addClass("active");
        }
    },

    reset_module_menus: function (target_item = null) {

        if (target_item == null) {
            //por cada menu de modulos
            $.each($(".role_item"), function (i, role_item) {

                // por cada item
                $.each($(role_item).find(".modulos_menu .item"), function (i, item) {
                    const targetToHide = $(item).attr("data-target");
                    $(role_item).find(".modulos_container").eq(0).find(targetToHide).hide();
                    $(item).removeClass("active");
                });

                const targetToShow = $(role_item).find(".modulos_menu").eq(0).find(".item").eq(0).attr("data-target");
                $(role_item).find(".modulos_container").eq(0).find(targetToShow).show();
                $(role_item).find(".modulos_menu").eq(0).find(".item").eq(0).addClass("active");

            });
        } else {
            const role_item = $(target_item).parents(".role_item").eq(0);

            $.each($(role_item).find(".modulos_menu").eq(0).find(".item"), function (i, item) {
                const targetToHide = $(item).attr("data-target");
                $(role_item).find(".modulos_container").eq(0).find(targetToHide).hide();
                $(item).removeClass("active");
            });

            const targetToShow = $(role_item).find(".modulos_menu").eq(0).find(target_item).eq(0).attr("data-target");
            $(role_item).find(".modulos_container").eq(0).find(targetToShow).show();
            $(role_item).find(".modulos_menu").eq(0).find(target_item).eq(0).addClass("active");
        }
    }
}

menus_helpers.reset_rol_menus();
menus_helpers.reset_module_menus();

$("#roles_menu .item").click(function (_this) {
    menus_helpers.reset_rol_menus(_this.target);
});

$(".modulos_menu .item").click(function (_this) {
    menus_helpers.reset_module_menus(_this.target);
});

//----------------------------- FUNCTIONS --------------------------------------------

function getTreeView(){
    if (RolesList.code == 200) {
        const roles = RolesList.data;

        $("#roles_menu").empty();
        $("#roles_container").empty();
        // por cada rol
        for (var i = 0; i < roles.length; i++) {

            const rol = roles[i];

            const rol_menu_item = $(`<a class="item" data-target="#frmRol_${rol.id}">${rol.descripcion}</a>`);
            const rol_item =
                `<div class="role_item" id="frmRol_${rol.id}" data-role="${rol.id}">
                    <h2 class="ui header">Permisos de el rol: ${rol.descripcion}</h2>
                    <div class="ui top attached tabular menu modulos_menu"></div>
                    <div class="ui bottom attached segment modulos_container"></div>

                </div>`;

            $("#roles_menu").append(rol_menu_item);
            $("#roles_container").append(rol_item);

            // por cada modulo
            if (ModulesList.code == 200) {

                const modulos = ModulesList.data;
                for (var j = 0; j < modulos.length; j++) {

                    const modulo = modulos[j];

                    // si hay pantallas en este modulo
                    if (ViewsList.code == 200) {

                        const pantallas = jQuery.grep(ViewsList.data, function (item, i) {
                            return item.id_modulo == modulo.id_modulo;
                        });

                        if (pantallas.length > 0) {

                            const module_menu_item = `<a class="item" data-target="#frmModulo_${modulo.id_modulo}">${modulo.modulo}</a>`;
                            const module_item =
                                `<div class="module_item" id="frmModulo_${modulo.id_modulo}" data-module="${modulo.id_modulo}">
                                     <div class="fields pantallas_container"></div>
                                </div>`;

                            $(`#frmRol_${rol.id} .modulos_menu`).append(module_menu_item);
                            $(`#frmRol_${rol.id} .modulos_container`).append(module_item);

                             // por cada pantalla
                            for (var r = 0; r < pantallas.length; r++) {

                                const pantalla = pantallas[r];
                                const pantalla_item =
                                    `<div class="field pantalla_item" id="chkPantalla_${pantalla.id}" style="padding: 5px 0;">
                                        <div class="ui toggle checkbox">
                                            <input type="checkbox" data-role="${rol.id}" data-screen="${pantalla.id}">
                                            <label>${pantalla.descripcion}</label>
                                        </div>
                                    </div>`;

                                $(`#frmRol_${rol.id} .modulos_container #frmModulo_${modulo.id_modulo}`).append(pantalla_item);
                            }

                        }
                    }
                }
            }
        }
    }
}

/*
function getTreeView(){

    if (RolesList.code == 200) {

        const roles = RolesList.data;

        $("#treeViewContainer").empty();
        // por cada rol
        for (var i = 0; i < roles.length; i++) {
            const rol = roles[i];

            $("#treeViewContainer").append(
                `<div class="title" id="rol_title_${rol.id}">
                    <i class="dropdown icon"></i>
                    ${rol.descripcion}
                </div>
                <div class="content" id="rol_content_${rol.id}">
                    <div class="ui list">
                    </div>
                </div>`
            );

            // por cada modulo
            $.each(ModulesList, function (i, modulo) {
                const rol_container = $(`#rol_content_${rol.id} .list`);

                $(rol_container).append(
                    `<div class="item" id="modulo_${modulo.id}">
                        <br />
                        <div class="ui master checkbox">
                            <input type="checkbox" name="chkModulo_${modulo.id}" value="${modulo.id}">
                            <label>${modulo.descripcion}</label>
                        </div>
                        <div class="list">
                            
                        </div>
                     </div>`
                );

                const module_container = $(rol_container).find(`#modulo_${modulo.id} .list`);
                if (ViewsList.code == 200) {
                    const pantallas = jQuery.grep(ViewsList.data, function (item,i) {
                        return item.id_modulo == modulo.id;
                    });

                    // por cada pantalla
                    $.each(pantallas, function (i, pantalla) {
                        $(module_container).append(
                            `<div class="item">
                                <div class="ui child checkbox">
                                    <input type="checkbox" name="chkpantalla_${pantalla.id}">
                                    <label>${pantalla.descripcion}</label>
                                </div>
                            </div>`
                        );
                    });
                }
            });
        }
    }
}
*/