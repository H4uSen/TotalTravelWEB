﻿$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createHotelsActivities").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeHotelsActivities").click(() => {
    $("#modalCreate").modal('hide');
});



function validar() {
    validateArrayForm = [
        { validateMessage: "Ingrese una descripcion.", Jqueryinput: $("#modalCreate #Descripcion") },
        { validateMessage: "Ingrese un precio.", Jqueryinput: $("#modalCreate #Precio") },
        { validateMessage: "Ingrese un hotel.", Jqueryinput: $("#modalCreate #tHoTe_ID") },
        { validateMessage: "Ingrese una actividad.", Jqueryinput: $("#modalCreate #tActv_ID") },
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
        var status = uploadFile(urlAPI+"/API/HotelsActivities/Insert", data,"POST");
        if (status.code == 200) {
            window.location.href = '/HotelsActivities?success=true';
        }
    }

}
function editar(id) {
    var response = ajaxRequest(urlAPI+"/API/HotelsActivities/Find?id=" + id);
    if (response.code == 200) {
        $("#id").val(id);
        $("#Descripcion_up").val(response.data.descripcion);
        $("#Precio_up").val(response.data.precio);
        SetDropDownValue($("#tHoTe_ID_up"), defaultValue = response.data.iD_Hotel);
        SetDropDownValue($("#tActv_ID_up"), defaultValue = response.data.iD_Actividad);
        $("#modalUpdate").modal("show");
    }
}
function actualizar() {
    validateArrayForm = [
        { validateMessage: "Ingrese la descripcion.", Jqueryinput: $("#modalUpdate #Descripcion_up") },
        { validateMessage: "Ingrese el precio.", Jqueryinput: $("#modalUpdate #Precio_up") },
        { validateMessage: "Ingrese el hotel.", Jqueryinput: $("#modalUpdate #tHoTe_ID_up") },
        { validateMessage: "Ingrese la actividad.", Jqueryinput: $("#modalUpdate #tActv_ID_up") },
    ];
    const ValidateFormStatus = ValidateForm(validateArrayForm);
    var id = $("#id").val();
    if (ValidateFormStatus) {
        var data = new FormData();
        data.append("HoAc_Descripcion", $("#modalUpdate #Descripcion_up").val());
        data.append("HoAc_Precio", parseFloat($("#modalUpdate #Precio_up").val()));
        data.append("HoAc_UsuarioModifica", Client_User_ID);
        data.append("HoTe_ID", parseInt($("#modalUpdate #tHoTe_ID_up").val()));
        data.append("Actv_ID", parseInt($("#modalUpdate #tActv_ID_up").val()));
        if ($("#modalUpdate #file_up").prop("files")[0] != undefined) {
            data.append("File", $("#modalUpdate #file_up").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }
        var status = uploadFile(urlAPI+`/API/HotelsActivities/Update?id=${id}`, data, "PUT");
        if (status.code == 200) {
            location.reload();
            if (status.data.codeStatus > 0) {
                window.location.href = '/HotelsActivities?success=true';
            }
        }

    }

}
