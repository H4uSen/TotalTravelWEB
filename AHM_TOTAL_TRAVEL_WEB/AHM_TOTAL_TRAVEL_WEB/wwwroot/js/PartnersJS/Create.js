const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}

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

    var PartnersCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="PartnersCarousel" data-auto="false"></div>`;
    $("#PartnersCarousel").replaceWith(PartnersCarousel);
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
        $("#PartnersCarousel").append(HTML_img);
    }
    $("#PartnersCarousel").fotorama();
}

function deleteImage(index) {
    imagesArray.splice(index, 1);
    imagesArrayPure.splice(index, 1);
    LoadImage();
}

function createPartners() {

    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese un Email.", Jqueryinput: $("#Email") },
        { validateMessage: "Ingrese un teléfomo.", Jqueryinput: $("#Telefono") },
        { validateMessage: "Seleccione un tipo de partner.", Jqueryinput: $("#TiPart_Id") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    
    if (ValidateFormStatus) {
             
            
        var data = new FormData();
        data.append("part_Nombre", $("#Nombre").val());
        data.append("part_Email", $("#Email").val());
        data.append("part_Telefono", $("#Telefono").val());
        data.append("tiPart_Id", parseInt($("#TiPart_Id").val()));
        data.append("part_UsuarioCreacion", parseInt(Client_User_ID));
        for (var i = 0; i != imagesArrayPure.length; i++) {
            data.append("File", imagesArrayPure[i]);
        }
        var status = uploadFile("https://totaltravelapi.azurewebsites.net/API/Partners/Insert", data, "POST");
        
        if (status.code == 200) {
            window.location.href = '/Partners?success=true';
        }
        else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }
              
    }


}



