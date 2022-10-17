$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createActivities").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeActivity").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendActivity").click(() => {
    validar();
})

function validar() {

    const ValidateArrayActivities = [
        { validateMessage: "Ingrese una Actividad", Jqueryinput: $("#Actividad") },
        { validateMessage: "Seleccione el tipo de la Actividad", Jqueryinput: $("#TiPoAc_ID") }
    ];

    const ActivityValidate = ValidateForm(ValidateArrayActivities);

    if (ActivityValidate) {
        $("#createActivitiesForm").submit();
    }

}

$("#btnGuardarActvExtra").click(() => {
    CreateActivityExtra();
})

function CreateActivityExtra() {

    const ValidateArrayActivitiesFunction = [
        { validateMessage: "Seleccione un Socio", Jqueryinput: $("#Part_ID") },
        { validateMessage: "Seleccione una Actividad", Jqueryinput: $("#Actv_ID") },
        { validateMessage: "Ingrese un Precio", Jqueryinput: $("#acEx_Precio") },
        { validateMessage: "Ingrese una Descripcion", Jqueryinput: $("#acEx_Descripcion") },
    ];

    const ActivitiesExtraCreateValidate = ValidateForm(ValidateArrayActivitiesFunction);

    if (ActivitiesExtraCreateValidate) {

        var data = new FormData();
        data.append("part_ID", parseInt($("#Part_ID").val()));
        data.append("actv_ID", parseInt($("#Actv_ID").val()));
        data.append("acEx_Precio", $("#acEx_Precio").val());
        data.append("acEx_Descripcion", $("#acEx_Descripcion").val());
        data.append("acEx_UsuarioCreacion", parseInt(Client_User_ID));

        data.append("file", $("#FileAct").prop("files")[0]);
        var response = uploadFile("https://totaltravel.somee.com/API/ActivitiesExtra/Insert", data, "POST");

        if (response.code == 200) {
            if (response.data.codeStatus > 0) {
                window.location.href = '/ActivitiesExtra?success=true';


            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }
            
        }
        else {
            console.log(response);
        }

        
    }

}

////                 ."-,.__
////                 `.     `.  ,
////              .--'  .._,'"-' `.
////             .    .'         `'
////             `.   /          ,'
////               `  '--.   ,-"'
////                `"`   |  \
////                   -. \, |
////                    `--Y.'      ___.
////                         \     L._, \
////               _.,        `.   <  <\                _
////             ,' '           `, `.   | \            ( `
////          ../, `.            `  |    .\`.           \ \_
////         ,' ,..  .           _.,'    ||\l            )  '".
////        , ,'   \           ,'.-.`-._,'  |           .  _._`.
////      ,' /      \ \        `' ' `--/   | \          / /   ..\
////    .'  /        \ .         |\__ - _ ,'` `        / /     `.`.
////    |  '          ..         `-...-"  |  `-'      / /        . `.
////    | /           |L__           |    |          / /          `. `.
////   , /            .   .          |    |         / /             ` `
////  / /          ,. ,`._ `-_       |    |  _   ,-' /               ` \
//// / .           \"`_/. `-_ \_,.  ,'    +-' `-'  _,        ..,-.    \`.
////.  '         .-f    ,'   `    '.       \__.---'     _   .'   '     \ \
////' /          `.'    l     .' /          \..      ,_|/   `.  ,'`     L`
////|'      _.-""` `.    \ _,'  `            \ `.___`.'"`-.  , |   |    | \
////||    ,'      `. `.   '       _,...._        `  |    `/ '  |   '     .|
////||  ,'          `. ;.,.---' ,'       `.   `.. `-'  .-' /_ .'    ;_   ||
////|| '              V      / /           `   | `   ,'   ,' '.    !  `. ||
////||/            _,-------7 '              . |  `-'    l         /    `||
////. |          ,' .-   ,' ||               | .-.        `.      .'     ||
//// `'        ,'    `".'    |               |    `.        '. -.'       `'
////          /      ,'      |               |,'    \-.._,.'/'
////          .     /        .               .       \    .''
////        .`.    |         `.             /         :_,'.'
////          \ `...\   _     ,'-.        .'         /_.-'
////           `-.__ `,  `'   .  _.>----''.  _  __  /
////                .'        /"'          |  "'   '_
////               /_|.-'\ ,".             '.'`__'-( \
////                 / ,"'"\,'               `/  `-.|" R.P