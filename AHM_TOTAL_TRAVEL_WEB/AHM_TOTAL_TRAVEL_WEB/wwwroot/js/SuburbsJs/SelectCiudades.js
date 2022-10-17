$('.ui.dropdown').dropdown();

$('#Count_ID').change(function () {
    var Count_ID = $('#Count_ID').val();
    RellenarCiudades(Count_ID,$("#modalUpdate #City_ID"));
    
});

function RellenarCiudades(Count_ID, dropdown) {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
    if (response.code == 200) {
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == Count_ID;
        });
        ClearDropDownItem($(dropdown));
        if (cityFilter.length > 0) {
            SetDropDownPlaceholder($(dropdown), "Seleccione una ciudad.");
            for (var i = 0; i < cityFilter.length; i++) {
                var item = cityFilter[i];
                console.log(item);
                AddDropDownItem($(dropdown), item = { value: item.id, text: item.ciudad });
            }
            $(dropdown).parent().find('.text').html('Seleccione una ciudad');
        } else {
            SetDropDownPlaceholder($(dropdown), "No hay ciudades disponibles.");
        }
    }
}