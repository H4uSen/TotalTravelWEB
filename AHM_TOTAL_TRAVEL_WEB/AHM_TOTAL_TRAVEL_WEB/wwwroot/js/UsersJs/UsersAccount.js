function UpdateUser() {
    var direStatus = false;
    var fullAddress = `Colonia. ${$('#Colonia').val()}, Calle. ${$('#Calle').val()}, Avenida. ${$('#Avenida').val()}`;
    var dire = AdressViewModel;

    dire.Dire_Descripcion = fullAddress;
    dire.Ciud_ID = parseInt($("#Ciudad").val());
    var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
    var DireID;
    if (responseAddress.code == 200) {

        DireID = responseAddress.data.codeStatus;
        direStatus = true;
    } else {
        console.log(responseAddress)
    }
    if (direStatus) {
        const Client_Partner_ID = parseInt(GetCookie("Partner_Id"));
        console.log(isNaN(Client_Partner_ID) ? 0 : Client_Partner_ID);
        const Client_Role_ID = parseInt(GetCookie("Role_Id"));
        var data = new FormData();
        data.append("Usua_DNI", $("#Usua_DNI").val());
        data.append("Usua_Nombre", $("#Usua_Nombre").val());
        data.append("Usua_Apellido", $("#Usua_Apellido").val());
        data.append("Usua_Telefono", $("#Usua_Telefono").val());
        data.append("Role_ID", Client_Role_ID);
        data.append("Usua_Url", null);
        data.append("Dire_ID", DireID);
        data.append("Part_ID", isNaN(Client_Partner_ID) ? 0 : Client_Partner_ID);
        data.append("Usua_UsuarioModifica", Client_User_ID);
        if ($("#File").prop("files")[0] != undefined) {
            data.append("File", $("#File").prop("files")[0]);
        }
        else {
            data.append("File", null);
        }

        const userStatus = uploadFile("https://totaltravel.somee.com/API/Users/Update?id=" + Client_User_ID, data, "PUT");

        if (userStatus.code == 200) {
            location.reload();
        }
        else {
            console.log(userStatus);
        }
    }
}