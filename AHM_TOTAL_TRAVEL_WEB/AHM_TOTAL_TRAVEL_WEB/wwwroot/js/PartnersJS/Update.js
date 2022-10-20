$('.ui.dropdown').dropdown();

function updatePartners() {

    validateArrayForm = [
        { validateMessage: "Ingrese un nombre.", Jqueryinput: $("#Nombre") },
        { validateMessage: "Ingrese un Email.", Jqueryinput: $("#Email") },
        { validateMessage: "Ingrese un teléfomo.", Jqueryinput: $("#Telefono") },
        { validateMessage: "Seleccione un tipo de partner.", Jqueryinput: $("#TiPart_Id") },
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);



    if (ValidateFormStatus) {

        /*var images = [];*/
        var data = new FormData();
        data.append("part_Nombre", $("#Nombre").val());
        data.append("part_Email", $("#Email").val());
        data.append("part_Telefono", $("#Telefono").val());
        data.append("tiPart_Id", parseInt($("#TiPart_Id").val()));
        data.append("part_UsuarioModifica", parseInt(Client_User_ID));

        //for (let i = 0; i < $('#File').prop('files').length; i++) {
        //    const file = $('#File').prop('files')[i];
        //    images.push(file); //IFORMFILE
        //}

        data.append("file", $("#File").prop("files")[0]);
        var response = uploadFile("https://totaltravel.somee.com/API/Partners/Update?id=" + partnersID, data, "PUT");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Partners?success=true';


        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }
        console.log(response);

    }



}
