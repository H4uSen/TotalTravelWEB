$("#errorDiv").hide();

$(".ui.dropdown").dropdown();

SetDropDownValue($("#Count_ID"), Pais_ID);
RellenarCiudades(Pais_ID);
SetDropDownValue($("#City_ID"), Ciudad);
SetDropDownValue($("#Part_ID"), Part_ID);

$('#Count_ID').change(function () {
    RellenarCiudades($('#Count_ID').val());
})

$(document).ready(async function () {
    await GetImage();

});

//async function GetImage() {
//    var responseImage = ajaxRequest("https://totaltravel.somee.com/API/RootFiles/GetAllImages?folderName=" + folderName)
//    if (responseImage.code == 200) {
//        var list = responseImage.data
//        for (var i = 0; i < list.length; i++) {
//            var imageUrl = list[i].imageUrl;
//            var split = imageUrl.split("/");
//            var fileName = split[split.length - 1];
//            var file = await createBlob(imageUrl)
//                .then(function (data) {
//                    return data;
//                });
//            const fileData = await convertImage(file)
//                .then(function (data) {
//                    return data;
//                });
//            fileData.fileName = fileName;
//            imagesArray.push(fileData);
//        }
//        LoadImage();
//    }
//}










function RellenarCiudades(Country_Id) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");

    if (response.code == 200) {

        var cities = response.data;
        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == Country_Id;
        });

        const dropdownData = {
            dropdown: $("#City_ID"),
            items: {
                list: cities,
                valueData: "id",
                textData: "ciudad"
            },
            placeholder: {
                empty: "No se encontraron ciudades disponibles",
                default: "Seleccione una ciudad",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#City_ID").dropdown();

        //$("#City_ID").change((_this) => {
        //    const City_Id = $(_this.target).val();
        //    FillSuburbs(City_Id);
        //});
    }
}