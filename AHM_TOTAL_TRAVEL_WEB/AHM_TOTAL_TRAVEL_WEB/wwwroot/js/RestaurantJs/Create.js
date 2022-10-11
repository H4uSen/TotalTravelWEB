function createRestaurant() {
    var images = [];
    var data = new FormData();
    data.append("dire_ID", $("#Dire_ID").val());
    data.append("rest_Nombre", $("#Rest_Nombre").val());
    data.append("part_ID", $("#Part_ID").val());
    data.append("rest_UsuarioCreacion", $("#Rest_UsuarioCreacion").val());

    for (let i = 0; i < $('#File').prop('files').length; i++) {
        const file = $('#File').prop('files')[i];
        images.push(file); //IFORMFILE
    }

    data.append("file", images);

    var response = uploadFile("https://totaltravel.somee.com/API/Restaurants/Insert", data, "POST");
    console.log(response);
}