const HotelsActvList = ajaxRequest(urlAPI + "/API/HotelsActivities/List");
const DefaultPackagesList = ajaxRequest(urlAPI + "/API/DefaultPackages/List");
const DefaultPackagesDetailsList = ajaxRequest(urlAPI + "/API/DefaultPackagesDetails/List");

$('.ui.dropdown').dropdown();
var imagesArray = [];
var imagesArrayPure = [];
$("#File").change(async function () {

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

function createDefaultPackages() {

    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese una descripción.", Jqueryinput: $("#Descripcion") },
        { validateMessage: "Ingrese un precio.", Jqueryinput: $("#Precio") },
        { validateMessage: "Ingrese una duración.", Jqueryinput: $("#Duracion") },
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
            data.append("Paqu_CantPersonas", $("#CantPers").val());
            data.append("Paqu_UsuarioCreacion", parseInt(Client_User_ID));

            for (var i = 0; i != imagesArrayPure.length; i++) {
                data.append("File", imagesArrayPure[i]);
            }

            var response = uploadFile(urlAPI+"/API/DefaultPackages/Insert", data, "POST");
            if (response.data.codeStatus > 0) {
                window.location.href = '/DefaultPackages?success=true';
            } else {

                $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
            }
        }
    }
    else if (ValidateFormStatus) {       
        var data = new FormData();
        data.append("Paqu_Nombre", $("#Nombre").val());
        data.append("Paqu_Descripcion", $("#Descripcion").val());
        data.append("Paqu_Duracion", $("#Duracion").val());
        data.append("Hote_ID", $("#hote_ID").val());
        data.append("Paqu_Precio", $("#Precio").val());
        data.append("Paqu_CantPersonas", $("#CantPers").val());
        data.append("Paqu_UsuarioCreacion", parseInt(Client_User_ID));
        for (var i = 0; i != imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }

        var response = uploadFile(urlAPI+"/API/DefaultPackages/Insert", data, "POST");
        if (response.data.codeStatus > 0) {
            window.location.href = '/DefaultPackages?success=true';
        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }
    }
}



//------------------------------------ACTIVIDADES EXTRAS EN HOTEL
//Fill the hotel activities extra form
function hotelActvExtraForm() {
    var htelActvExtra = [];
    if ($("#hote_ID").val() != 0) {
        //Activities Extras in the hotel
        htelActvExtra = HotelsActvList.data.filter((x) => { return x.iD_Hotel == $("#hote_ID").val()});
    }
        


    $("#listHotelsExtraActivities").append(`
<div class="four fields " id="hotelsExtraActivitiesID${CantidadActvHotel}">
    <div class="field">
        <label>Actividades en el hotel</label>
        <select class="ui dropdown" name="ddlhotelsExtraActivities_${CantidadActvHotel}" onchange="calculatePriceOfActvHotels(${CantidadActvHotel})" id="ddlhotelsExtraActivities_${CantidadActvHotel}" runat="server">

        </select>

    </div>
    <div class="field">
        <label>Cantidad de personas</label>
        <input type="number" min="1" max="100" value="1" onchange="calculatePriceOfActvHotels(${CantidadActvHotel})" name="hotelsExtraActivitiesAmount_${CantidadActvHotel}" id="hotelsExtraActivitiesAmount_${CantidadActvHotel}" placeholder="Cantidad de personas" runat="server">
    </div>
    <div class="field hotelsExtraActivitiesPrice">
        <label>Total</label>
        <input type="number" dir="rtl" name="hotelsExtraActivitiesPrice_${CantidadActvHotel}" id="hotelsExtraActivitiesPrice_${CantidadActvHotel}" placeholder="0.00" readonly runat="server">
    </div>
    <div class="field" style="display: flex;align-content: center;justify-content: center;align-items: flex-end;">
        <label></label>
        <div class="ui btn-edit text-white button" tabindex="0" onclick="deleteHotelExtraActivities(${CantidadActvHotel})" id="btndeleteExtraActivities">- Eliminar actividad</div>
    </div>
</div>

`);
    if (htelActvExtra.length > 0) {
        //Fill the extrac activities in the hotel
        $('#ddlhotelsExtraActivities_' + CantidadActvHotel).append('<option value="">' + "Seleccione una actividad" + '</option>');
        for (var j = 0; j < htelActvExtra.length; j++) {
            $('#ddlhotelsExtraActivities_' + CantidadActvHotel).append('<option value="' + htelActvExtra[j].id + '">' + htelActvExtra[j].actividad + ' L ' + htelActvExtra[j].precio + ' c/u' + '</option>');
        };

    } else {
        $('#ddlhotelsExtraActivities_' + CantidadActvHotel).append('<option value="">' + "No hay actividades disponibles actualmente" + '</option>');

    }
    $('.ui.dropdown').dropdown();

}

//Calculates the price of the activities of the hotel
function calculatePriceOfActvHotels(inputID) {
    const CantPersonas = $("#hotelsExtraActivitiesAmount_" + inputID).val();
    if (CantPersonas < 1) {
        $("#hotelsExtraActivitiesAmount_" + inputID).val("1");
        iziToast.warning({
            title: 'Atención',
            message: 'El mínimo de personas es 1',
        });
        return;
    }

    var ID = $("#ddlhotelsExtraActivities_" + inputID).val();
    const HtlExtraActv = ajaxRequest(urlAPI + "/API/HotelsActivities/Find?id=" + ID, SendToken = true);

    $("#hotelsExtraActivitiesPrice_" + inputID).val(HtlExtraActv.data.precio * CantPersonas);
};



//Show inputs for extra activities in hotels
$("#btnShowExtraHotelActivities").click(function () {
    if ($("#btnShowExtraHotelActivities").hasClass("active")) {
        $("#btnShowExtraHotelActivities").removeClass("active")
        $("#frmAddExtraHotelsActivities").hide();
        $("#listHotelsExtraActivities").empty();
        CantidadActvHotel = 0;

    }
    else {
        $("#frmAddExtraHotelsActivities").show();
        $("#btnShowExtraHotelActivities").addClass("active")
        CantidadActvHotel = 1;

        hotelActvExtraForm();
    }

});
//Add a new input for an activity extra of the hotel
$("#btnHotelExtraActivities").click(function () {
    CantidadActvHotel += 1;
    hotelActvExtraForm();
});
//Delete an input for an activity extra of the hotel
function deleteHotelExtraActivities(inputID) {
    $("#hotelsExtraActivitiesID" + inputID).remove();
};