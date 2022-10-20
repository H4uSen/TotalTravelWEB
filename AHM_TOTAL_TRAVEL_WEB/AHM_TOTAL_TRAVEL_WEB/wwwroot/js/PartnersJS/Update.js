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
        var data = new FormData();
        data.append("part_Nombre", $("#Nombre").val());
        data.append("part_Email", $("#Email").val());
        data.append("part_Telefono", $("#Telefono").val());
        data.append("tiPart_Id", parseInt($("#TiPart_Id").val()));
        data.append("part_UsuarioCreacion", parseInt(Client_User_ID));
        if ($("#File").prop("files")[0] != undefined) {
            data.append("File", $("#File").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }
        var response = uploadFile("https://totaltravel.somee.com/API/Partners/Update?id=" + partnersID, data, "PUT");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Partners?success=true';


        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }
        console.log(response);

    }



}
