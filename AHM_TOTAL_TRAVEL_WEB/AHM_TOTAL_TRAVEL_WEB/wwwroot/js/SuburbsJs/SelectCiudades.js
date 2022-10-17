$('.ui.dropdown').dropdown();

$('#Count_ID').change(function () {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
    if (response.code == 200) {
        var Count_ID = $('#Count_ID').val();
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == Count_ID;
        });
        //ClearDropDownItem($('#City_ID'));
        if (cityFilter.length > 0) {
            SetDropDownPlaceholder($('#City_ID'), "Seleccione una ciudad.");
            for (var i = 0; i < cityFilter.length; i++) {
                var item = cityFilter[i];
                AddDropDownItem($('#City_ID'), item = { value: item.id, text: item.ciudad });
            }
            $('#City_ID').parent().find('.text').html('Seleccione una ciudad');
        } else {
            SetDropDownPlaceholder($('#City_ID'), "No hay ciudades disponibles.");
        }
    }
});