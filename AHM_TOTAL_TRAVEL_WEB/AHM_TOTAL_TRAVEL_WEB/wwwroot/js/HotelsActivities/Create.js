$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createHotelsActivities").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeHotelsActivities").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendHotelsActivities").click(() => {
    validar();
})

function validar() {
    validateArrayForm = [
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #Descripcion") },
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #Precio") },
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #tHoTe_ID") },
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #tActv_ID") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("HoAc_Descripcion", $("#modalCreate #Descripcion").val());
        data.append("HoAc_Precio", $("#modalCreate #Precio").val());
        data.append("HoAc_UsuarioCreacion", Client_User_ID);
        data.append("HoTe_ID", $("#modalCreate #tHoTe_ID").val());
        data.append("Actv_ID", $("#modalCreate #tActv_ID").val());
        if ($("#modalCreate #file").prop("files")[0] != undefined) {
            data.append("File", $("#modalCreate #file").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }
        var status = uploadFile("https://totaltravel.somee.com/API/HotelsActivities/Insert", data,"POST");
        if (status.code == 200) {
            location.reload();
        }
    }

}

