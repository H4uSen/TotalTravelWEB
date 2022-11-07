


function changePassword() {

    var images = [];
    var data = new FormData();
    data.append("usua_ID", $("#Dire_ID").val());
    data.append("usua_Password", $("#passwordConfirm").val());

    for (let i = 0; i < $('#File').prop('files').length; i++) {
        const file = $('#File').prop('files')[i];
        images.push(file); //IFORMFILE
    }

    data.append("file", images);

    var response = uploadFile("https://totaltravelapi.azurewebsites.net/API/Restaurants/Insert", data, "POST");
    console.log(response);
}