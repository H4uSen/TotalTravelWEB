$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createHotelsMenu").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeHotelsMenu").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendHotelsMenu").click(() => {
    validar();
})

function validar() {
    validateArrayForm = [
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #Descripcion") },
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #Precio") },
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #tHoTe_ID") },
        { validateMessage: "*.", Jqueryinput: $("#modalCreate #tTime_ID") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("HoMe_Descripcion", $("#modalCreate #Descripcion").val());
        data.append("HoMe_Precio", $("#modalCreate #Precio").val());
        data.append("HoTe_ID", $("#modalCreate #tHoTe_ID").val());
        data.append("Time_ID", $("#modalCreate #tTime_ID").val());
        if ($("#modalCreate #file").prop("files")[0] != undefined) {
            data.append("File", $("#modalCreate #file").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }
        var status = uploadFile("https://totaltravel.somee.com/API/HotelsMenu/Insert", data);
        if (status.code == 200) {
            location.reload();
        }
    }

}

