
//----------------------------- VARIABLES --------------------------------------------

const ViewsList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Permissions/List");
const RolesList = ajaxRequest("https://apitotaltravel.azurewebsites.net/API/Roles/List");
const ModulesList = getModules();

//----------------------------- INIZIALIZE --------------------------------------------
getTreeView();

$('.list .master.checkbox')
    .checkbox({
        // check all children
        onChecked: function () {
            var
                $childCheckbox = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
                ;
            $childCheckbox.checkbox('check');
        },
        // uncheck all children
        onUnchecked: function () {
            var
                $childCheckbox = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
                ;
            $childCheckbox.checkbox('uncheck');
        }
    });

$('.list .child.checkbox')
    .checkbox({
        // Fire on load to set parent value
        fireOnInit: true,
        // Change parent state on each child checkbox change
        onChange: function () {
            var
                $listGroup = $(this).closest('.list'),
                $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
                $checkbox = $listGroup.find('.checkbox'),
                allChecked = true,
                allUnchecked = true
                ;
            // check to see if all other siblings are checked or unchecked
            $checkbox.each(function () {
                if ($(this).checkbox('is checked')) {
                    allUnchecked = false;
                }
                else {
                    allChecked = false;
                }
            });
            // set parent checkbox state, but dont trigger its onChange callback
            if (allChecked) {
                $parentCheckbox.checkbox('set checked');
            }
            else if (allUnchecked) {
                $parentCheckbox.checkbox('set unchecked');
            }
            else {
                $parentCheckbox.checkbox('set indeterminate');
            }
        }
    })

$('.accordion')
    .accordion({
        selector: {
            trigger: '.title .icon'
        }
    });


//----------------------------- FUNCTIONS --------------------------------------------

function getModules() {

    var modulos = [];
    if (ViewsList.code == 200) {
        var data = ViewsList.data;

        var actual_id = null;
        for (var i = 0; i < data.length; i++) {

            const element = data[i];
            if (actual_id != element.id_modulo) {
                actual_id = element.id_modulo;
                modulos.push({ id: element.id_modulo, descripcion: element.modulo });
            }

        }
    }
    
    return modulos;
}

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