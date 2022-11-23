
//----------------------------- VARIABLES --------------------------------------------

const ViewsList = ajaxRequest(urlAPI+"/API/Permissions/List");
const RolesList = ajaxRequest(urlAPI+"/API/Roles/List");
const ModulesList = ajaxRequest(urlAPI+"/API/Modules/List");
const RestrictionsList = ajaxRequest(urlAPI+"/API/RolePermissions/List");

//----------------------------- INIZIALIZE --------------------------------------------
$("#frmRoles").hide();
getTreeView();
fillTreeView();
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

$("#screens_menus .item").click(function (_this) {
    $.each($("#screens_menus .item"), function (i, item) {
        const target = $(item).attr("data-target");
        $(item).removeClass("active");
        $(target).hide();
    });

    const target_show = $(_this.target).attr("data-target");
    $(_this.target).addClass("active");
    $(target_show).show();
});

$("#btnSaveTreeView").click(saveTreeView);

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

                    <h2 class="ui header">Permisos en el rol: ${rol.descripcion}</h2>

                    <div class="ui top attached tabular menu modulos_menu horizontal_scroll_menu"></div>
                    <div class="ui bottom attached segment modulos_container"></div>

                    <button class="ui button" onclick="saveTreeView()">GUARDAR TODOS LOS CAMBIOS</button>

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
                                            <input type="checkbox" data-role="${rol.id}" data-screen="${pantalla.id}" data-modify="0">
                                            <label class="check_label">${pantalla.descripcion} <b style='color:red'><b></label>
                                        </div>
                                    </div>`;

                                $(`#frmRol_${rol.id} .modulos_container #frmModulo_${modulo.id_modulo}`).append(pantalla_item);
                            }

                        }
                    }
                }
            }
        }

        $(".pantalla_item input[type='checkbox']").change(function (_this) {

            const isModify = parseInt($(_this.target).attr("data-modify"));
            const container = $(_this.target).parent();

            if (isModify == 1) {
                $(container).find("label.check_label").find("b").eq(0).empty();
                $(_this.target).attr("data-modify", 0);
            }
            else if (isModify == 0) {
                const html = $(container).find("label.check_label").html();
                $(container).find("label.check_label").find("b").eq(0).html("(modificado)");

                $(_this.target).attr("data-modify", 1);
            }

        });
    }
}

function fillTreeView() {

    if (RestrictionsList.code == 200) {

        const restricciones = RestrictionsList.data;
        for (var i = 0; i < restricciones.length; i++) {

            const item = restricciones[i];

            const element = $(`.pantalla_item input[type='checkbox'][data-role='${item.iD_Rol}'][data-screen='${item.iD_Permiso}']`);
            $(element).prop("checked", true);
            $(element).attr("data-restriction", item.id);
        }
    }
}

function saveTreeView() {


    $.each($(".pantalla_item input[type='checkbox'][data-modify='1']"), function (i, item) {

        const data_role = $(item).attr("data-role");
        const data_screen = $(item).attr("data-screen");

        if ($(item).prop("checked") == true) {

            const model = restrictionsViewModel;
            restrictionsViewModel.perm_ID = parseInt(data_screen);
            restrictionsViewModel.role_ID = parseInt(data_role);

            try {
                ajaxRequest(urlAPI+"/API/RolePermissions/Insert", model, "POST");
            } catch (e) {
                console.log(e);
            }

        } else {

            const id = $(item).attr("data-restriction");

            try {
                ajaxRequest(urlAPI+`/API/RolePermissions/Delete?id=${id}&Mod=${Client_User_ID}`, {}, "DELETE");
            } catch (e) {
                console.log(e);
            }
        }

        /*
        const rol = roles.filter(x => x.id == data_role)[0];
        const pantalla = pantallas.filter(x => x.id == data_screen)[0];
        console.log(`rol: ${rol.descripcion} - pantalla: ${pantalla.descripcion}`);
        */

    });

    const cambios = $(".pantalla_item input[type='checkbox'][data-modify='1']").length;
    Swal.fire("!Cambios efectuados!", `${cambios} cambios efectuados`, "success").then((result) => {
        location.reload();
    })
}