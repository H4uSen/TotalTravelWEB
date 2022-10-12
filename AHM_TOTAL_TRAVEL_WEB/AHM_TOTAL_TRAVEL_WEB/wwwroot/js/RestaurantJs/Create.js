
$('.ui.dropdown').dropdown();

$('#Count_ID').change(function () {

   var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List")
    if (response.code == 200) {
        var Count_ID = $('#Count_ID').val();
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City. == PartnerType_Id;
        });


    }

});

$(document).ready(function () {
    $("#Part_ID").change(function () {

        var Partner = $("#Part_ID").val();

        $.ajax({
            url: "/API/Partners/List",
            method: "GET",
            dataType: 'json',
            contentType: "application/json;",
            data: JSON.stringify(Partners),
            success: function (data) {
                console.log(data);
                console.log(Partners);
                $("#Part_ID").empty();
                $("#Part_ID").append("<option>Seleccione un socio</option>");
                $.each(data, function (nombre, value) {

                    $("#Part_ID").append("<option value=" + value.id + ">" + value.nombre + " </option>");
                });
            },
            error: function (data) {
                console.log(data);
            }
        });

    });
});

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











