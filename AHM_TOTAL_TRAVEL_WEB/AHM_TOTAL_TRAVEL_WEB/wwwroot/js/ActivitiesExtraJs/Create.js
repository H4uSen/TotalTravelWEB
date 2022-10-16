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
    if ($("#Actividad").val() == 0) {
        $("#labelvalidatorActividad").html("Ingrese una Descripcion");
    }
    else {
        $("#labelvalidatorActividad").html(" ");
    }
    if ($("#tipoActividad").val() == 0) {
        $("#labelvalidatorTipoActividad").html("Seleccione el tipo de la Actividad");
    }
    else {
        $("#labelvalidatorTipoActividad").html(" ");
    }
    if ($("#Actividad").val() != 0 && $("#tipoActividad").val() != 0) {
        $("#createActivitiesForm").submit();
    }

}

function CreateActivityExtra() {
    if ($('#Part_ID').val() == 0) {
        $("#labelvalidatorPartner").html("Seleccione un Socio.");
    }
    else {
        $("#labelvalidatorPartner").html(" ");
    }
    if ($('#Actv_ID').val() == 0) {
        $("#labelvalidatorActividad").html("Seleccione una Actividad.");
    }
    else {
        $("#labelvalidatorActividad").html(" ");
    }
    if ($('#acEx_Precio').val() == 0) {
        $("#labelvalidatorPrecio").html("Ingrese un Precio.");
    }
    else {
        $("#labelvalidatorPrecio").html(" ");
    }
    if ($('#acEx_Descripcion').val() == 0) {
        $("#labelvalidatorDescrip").html("Ingrese Una Descripcion");
    } else {
        $("#labelvalidatorDescrip").html(" ");
    }

    if ($('#Part_ID').val() != 0 && $('#Actv_ID').val() != 0 && $('#acEx_Precio').val() != 0 && $('#acEx_Descripcion').val() != 0) {

        var direStatus = false;
        var fullAddress = `Colonia. ${$('#Colonia').val()}, Calle. ${$('#Calle').val()}, Avenida. ${$('#Avenida').val()}`;
        var dire = AdressViewModel;

        dire.Dire_Descripcion = fullAddress;
        dire.Ciud_ID = parseInt($("#City_ID").val());
        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            DireID = responseAddress.data.codeStatus;
            direStatus = true;
        } else {
            console.log(responseAddress)
        }

        if (direStatus) {
            /*var images = [];*/
            var data = new FormData();
            data.append("dire_ID", parseInt(DireID));
            data.append("rest_Nombre", $("#Rest_Nombre").val());
            data.append("part_ID", parseInt($("#Part_ID").val()));
            data.append("rest_UsuarioCreacion", parseInt(Client_User_ID));

            //for (let i = 0; i < $('#File').prop('files').length; i++) {
            //    const file = $('#File').prop('files')[i];
            //    images.push(file); //IFORMFILE
            //}

            data.append("file", $("#File").prop("files")[0]);
            var response = uploadFile("https://totaltravel.somee.com/API/Restaurants/Insert", data, "POST");

            if (response.data.codeStatus > 0) {
                window.location.href = '/Restaurant?success=true';


            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }

        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
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