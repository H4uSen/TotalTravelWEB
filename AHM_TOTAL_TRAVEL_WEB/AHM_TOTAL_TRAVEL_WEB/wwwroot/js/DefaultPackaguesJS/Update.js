const RoomsList = ajaxRequest(urlAPI + "/API/Rooms/List");
const DefaultPackagesDetailsList = ajaxRequest(urlAPI + "/API/DefaultPackagesDetails/List");
const RoomsPackagesList = ajaxRequest(urlAPI + "/API/RoomsPackages/List");
const HotelsActivities = ajaxRequest(urlAPI + "/API/HotelsActivities/List");

var paqueteID = $(location).attr('href').split("/")[5];
var defaultData = DefaultPackagesDetailsList.data;

var ListActivities = defaultData.filter(x => x.paqueteID == paqueteID);

var RoomPack = RoomsPackagesList.data.filter(x => x.paquete_Id == parseInt(paqueteID))[0];
var RoomID = parseInt(RoomPack.habitacion_Id);
var RoPa = parseInt(RoomPack.id);


ListActivities.forEach(element => {
    updtActvHtelForm(element.id, element.actividadID, element.cantidad, element.precio, $("#hote_ID").val());
});

var imagesArray = [];
var imagesArrayPure = [];
$('.ui.dropdown').dropdown();
$("document").ready(function () {
    habi();
    SetDropDownValue("#Habi_ID", RoomID);
    $("#RoPa_ID").val(RoPa);
})
$(document).ready(async function () {
    await GetImage();

});
async function GetImage() {
    var responseImage = ajaxRequest(urlAPI + "/API/RootFiles/GetAllImages?folderName=" + PackageFolder)
    if (responseImage.code == 200) {
        var list = responseImage.data
        for (var i = 0; i < list.length; i++) {
            var imageUrl = list[i].imageUrl;

            var split = imageUrl.split("/");
            var fileName = split[split.length - 1];
            var file = await createBlob(imageUrl)
                .then(function (data) {
                    return data;
                });

            imagesArrayPure.push(file);
            const fileData = await convertImage(file)
                .then(function (data) {
                    return data;
                });

            fileData.fileName = fileName;
            imagesArray.push(fileData);
        }
        LoadImage();
    }
}
//FIN

function habi() {
    if (RoomsList.code == 200) {
        var hote_ID = $('#hote_ID').val();
        var habitaciones = RoomsList.data;
        habitaciones = jQuery.grep(habitaciones, function (habi, i) {
            return habi.hotelID == hote_ID;
        });
        const dropdownData = {
            dropdown: $("#Habi_ID"),
            items: {
                list: habitaciones,
                valueData: "id",
                textData: "habitacion"
            },
            placeholder: {
                empty: "No se encontraron habitaciones disponibles",
                default: "Seleccione un hotel",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#Habi_ID").dropdown();

    }
}
$('#hote_ID').change(function () {
    habi();
});
$("#File").change(async function () {
    $("#DefaultPackageCarouselHeader").hide();

    const fileData = await convertImage($("#File").prop("files")[0])
        .then(function (data) {
            return data;
        });
    imagesArray.push(fileData);
    imagesArrayPure.push($("#File").prop("files")[0]);
    LoadImage();

});
function LoadImage() {

    var PartnersCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="DefaultPackageCarousel" data-auto="false"></div>`;
    $("#DefaultPackageCarousel").replaceWith(PartnersCarousel);
    $("#image-upload-list").html("");

    for (let i = 0; i < imagesArray.length; i++) {
        var HTML_img = document.createElement('img');
        const item = imagesArray[i];

        HTML_img.src = item.src;
        const fileItem =
            `<div class="item">
                        <div class="right floated content">
                            <button onclick="deleteImage(${i})" class="ui btn-purple icon button">
                                <i class="trash icon"></i>
                            </button>
                        </div>
                        <i class="image big icon"></i>
                        <div class="content text-grap">
                            ${item.fileName}
                        </div>
                    </div>`;

        $("#image-upload-list").append(fileItem);
        $("#DefaultPackageCarousel").append(HTML_img);
    }
    $("#DefaultPackageCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

function updateDefaultPackages() {

    
    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Descripcion") },
        { validateMessage: "Ingrese un precio.", Jqueryinput: $("#Precio") },
        { validateMessage: "Ingrese una Duración.", Jqueryinput: $("#Duracion") },
        { validateMessage: "Seleccione un hotel.", Jqueryinput: $("#hote_ID") },
        { validateMessage: "Ingrese una cantidad de personas.", Jqueryinput: $("#CantPers") },

    ];

    validateArrayForm2 = [
        { validateMessage: "Seleccione un restaurante.", Jqueryinput: $("#rest_ID") },

    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);
    const ValidateFormStatus2 = ValidateForm(validateArrayForm2);

    if ($("#checkResta").prop("checked") == true) {
        if (ValidateFormStatus && ValidateFormStatus2) {
            var data = new FormData();
            data.append("Paqu_Nombre", $("#Nombre").val());
            data.append("Paqu_Descripcion", $("#Descripcion").val());
            data.append("Paqu_Duracion", $("#Duracion").val());
            data.append("Hote_ID", $("#hote_ID").val());
            data.append("Paqu_Precio", $("#Precio").val());
            data.append("Rest_ID", $("#rest_ID").val());
            data.append("Paqu_UsuarioModifica", parseInt(Client_User_ID));
            data.append("Paqu_CantPersonas", $("#CantPers").val());

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile(urlAPI+"/API/DefaultPackages/Update?id=" + PaqueteID, data, "PUT");
            if (response.data.codeStatus > 0) {
                $("#paqu_ID").val(response.data.codeStatus);
                $("#frmUpdateDefaultPackagues").submit();
                //window.location.href = '/DefaultPackages?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }
        }
    }
    else {
        if (ValidateFormStatus) {
            var data = new FormData();
            data.append("Paqu_Nombre", $("#Nombre").val());
            data.append("Paqu_Descripcion", $("#Descripcion").val());
            data.append("Paqu_Duracion", $("#Duracion").val());
            data.append("Hote_ID", $("#hote_ID").val());
            data.append("Paqu_Precio", $("#Precio").val());
            data.append("Paqu_UsuarioModifica", parseInt(Client_User_ID));
            data.append("Paqu_CantPersonas", $("#CantPers").val());

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile(urlAPI+"/API/DefaultPackages/Update?id=" + PaqueteID, data, "PUT");
            if (response.data.codeStatus > 0) {
                $("#paqu_ID").val(response.data.codeStatus);
                $("#frmUpdateDefaultPackagues").submit();
                //window.location.href = '/DefaultPackages?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }
        }
    }


}

//------------------------------------ACTIVIDADES EXTRAS HOTEL


//Fill the hotel activities extra form
function updtActvHtelForm(id,actvID, cantidad, precio, htelID) {
    //const Hotels = HotelsList.data;

    //const DefaultPackagesDetails = DefaultPackagesDetailsList.data;
    //const PackageID = $("#Paqu_ID").val();

    //const DefaultPackage = DefaultPackages.filter(function (Package) {
    //    return Package.id == PackageID
    //});

    //const Hotel = Hotels.filter((x) => { return x.id == DefaultPackage[0].iD_Hotel })

    //const DefaultPackageAct = DefaultPackagesDetails.filter(function (PackageDetails) {
    //    return PackageDetails.paqueteID == PackageID
    //});

    //const package = DefaultPackage[0];
    //Activities Extras in the hotel

    const htelActvExtra = HotelsActivities.data.filter((x) => { return x.iD_Hotel == htelID });

    $("#listHotelsExtraActivities").append(`
<div class="four fields " id="htelActivitiesUpdtID${actvID}">
    <input id="htelActivitiesUpdtID_${actvID}" name="htelActivitiesUpdtID_${actvID}" type="number" value=${actvID} style="display:none" />
    <input id="htelActivitiesUpdtDel_${actvID}" name="htelActivitiesUpdtDel_${actvID}" type="checkbox" style="display:none" />
    <div class="field">
        <label>Actividades</label>
        <select class="ui dropdown" name="ddlhtelActivitiesUpdt_${actvID}" onchange="calculatePriceOfHtelActvUpdt(${actvID},${htelID})" id="ddlhtelActivitiesUpdt_${actvID}" >

        </select>
                                               
    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" onkeyup="calculatePriceOfHtelActvUpdt(${actvID},${htelID})" value="${cantidad}" name="htelActivitiesAmountUpdt_${actvID}" id="htelActivitiesAmountUpdt_${actvID}" placeholder="Cantidad de personas">
    </div>
    <div class="field">
        <label>Total</label>
        <div class="ui right labeled input">
            <label for="htelActivitiesPriceUpdt_${actvID}" class="ui label">L</label>
            <input type="number" dir="rtl" name="htelActivitiesPriceUpdt_${actvID}" value="${precio}" id="htelActivitiesPriceUpdt_${actvID}" placeholder="0.00" readonly>
            <div class="ui basic label">.00</div>
        </div>

    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteHtelActivitiesUpdt(${actvID})" id="btndeleteHtelActivities">- Eliminar actividad</div>
    </div>
    <div class="field" hidden>
        <input type="text" dir="rtl" name="htelActivitiesIDUpdt_${actvID}" value="${id}" id="htelActivitiesIDUpdt_${actvID}"  readonly>
    </div>
</div>

`);
    if (htelActvExtra.length > 0) {
        //Fill the hotel extra activities
        $('#ddlhtelActivitiesUpdt_' + actvID).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < htelActvExtra.length; j++) {
            $('#ddlhtelActivitiesUpdt_' + actvID).append('<option data-value="' + htelActvExtra[j].id + '" value="' + htelActvExtra[j].iD_Actividad + '">' + htelActvExtra[j].actividad + ' L ' + htelActvExtra[j].precio + ' c/u' + '</option>');
        };
    }
    else {
        $('#ddlhtelActivitiesUpdt_' + actvID).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');
    }
    $('.ui.dropdown').dropdown();
    SetDropDownValue($('#ddlhtelActivitiesUpdt_' + actvID), actvID);
    $("#htelActivitiesPriceUpdt_"+actvID).val(parseInt(precio));
    
};
var campoNumerico7;
//Calculates the price of the activities of the hotel
function calculatePriceOfHtelActvUpdt(inputID, hotel) {
    campoNumerico7 = document.getElementById('htelActivitiesAmountUpdt_' + inputID);
    vali()
    const CantPersonasResv = $(`#htelActivitiesAmountUpdt_${inputID}`).val();
    const Actividad = $(`#ddlhtelActivitiesUpdt_${inputID}`).val();
    const htelActvExtra = HotelsActivities.data.filter((x) => { return x.iD_Actividad == Actividad && x.iD_Hotel == hotel})[0];
    const total = htelActvExtra.precio * parseInt(CantPersonasResv);
    const selector = "#htelActivitiesPriceUpdt_" + inputID;
    $(selector).val(total);
    //$(`input[name="extraActivitiesPriceUpdt_${inputID}"]`).val(total);
    //$("#extraActivitiesPriceUpdt_" + inputID).val(parseInt(total));
};
//Delete an input for an activity extra of the hotel
function deleteHtelActivitiesUpdt(inputID) {
    $("#htelActivitiesUpdtID" + inputID).empty();
    //$("#htelActivitiesUpdtDel_" + inputID).val(true);
    //$("#htelActivitiesUpdtDel_" + inputID).prop("checked", true);
    //$("#htelActivitiesUpdtDel_" + inputID).attr("checked", true);
    //$("#htelActivitiesUpdtID" + inputID).css("display", "none");
};

function vali() {
campoNumerico7.addEventListener('keydown', function (evento) {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida =
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        teclaPresionada != 'Space' &&
        !teclaPresionadaEsUnNumero;
    const comienzaPorCero =
        campoNumerico7.value.length === 0 &&
        teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault();
    }

});
}