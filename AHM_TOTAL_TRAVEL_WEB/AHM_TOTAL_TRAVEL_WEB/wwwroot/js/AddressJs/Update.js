$(document).ready(function () {
    $("#addressID").hide();

});
function GetAddress(id) {

    var AddressModel = AdressListViewModel;
    var request = ajaxRequest("https://totaltravel.somee.com/API/Address/Find?Id=" + id);
    var calle = request.data.calle;
    var avenida = request.data.avenida;
    AddressModel.id = request.data.id;
    AddressModel.calle = request.data.calle;
    AddressModel.avenida = request.data.avenida;
    AddressModel.iD_Pais = request.data.iD_Pais;
    AddressModel.iD_Ciudad = request.data.iD_Ciudad;
    AddressModel.iD_Colonia = request.data.iD_Colonia;

    $("#addressID").val(AddressModel.id);
    $("#CalleUpdate").val(AddressModel.calle);
    $("#AvenidaUpdate").val(AddressModel.avenida);
    SetDropDownValue($("#Count_IDUpdate"), AddressModel.iD_Pais);
    GetCitiesUpdate(AddressModel.iD_Pais);
    GetSuburbUpdate(AddressModel.iD_Ciudad);
    SetDropDownValue($("#City_IDUpdate"), AddressModel.iD_Ciudad);
    SetDropDownValue($("#Col_IDUpdate"), AddressModel.iD_Colonia);

    $("#modalUpdate").modal({ autofocus: false, forceSelection: false }).modal('show');
}

$("#sendAddressUpdate").click(() => {


    validateArrayForm = [
        { validateMessage: "Ingrese una colonia.", Jqueryinput: $("#Col_IDUpdate") },
        { validateMessage: "Ingrese una calle.", Jqueryinput: $("#CalleUpdate") },
        { validateMessage: "Ingrese una avenida.", Jqueryinput: $("#AvenidaUpdate") },
        { validateMessage: "Seleccione un país.", Jqueryinput: $("#Count_IDUpdate") },
        { validateMessage: "Seleccione una ciudad.", Jqueryinput: $("#City_IDUpdate") }
    ];

    // retorna bool 
    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {

        var dire = AdressViewModel;
        dire.id = parseInt($('#addressID').val());
        dire.colo_ID = parseInt($('#Col_IDUpdate').val());
        dire.dire_Calle = $('#CalleUpdate').val();
        dire.dire_Avenida = $('#AvenidaUpdate').val();
        dire.dire_UsuarioModifica = dire.id;

        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Update?id=" + dire.id, dire, "PUT");
        var DireID;
        if (responseAddress.code == 200) {

            window.location.href = '/Address?success=true';
        }

    }

});
$("#closeAddressUpdate").click(() => {
    $(".ui.modal").modal('hide');
});

$('#Count_IDUpdate').change(function () {
    GetCitiesUpdate($('#Count_IDUpdate').val());
    SetDropDownPlaceholder($('#Col_IDUpdate'));
});
$('#City_IDUpdate').change(function () {
    GetSuburbUpdate($('#City_IDUpdate').val());
});
function GetCitiesUpdate(paisID) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
    if (response.code == 200) {
        var cities = response.data;
        var cityFilter = jQuery.grep(cities, function (City, i) {
            return City.paisID == paisID;
        });
        ClearDropDownItem($('#City_IDUpdate'));
        if (cityFilter.length > 0) {
            AddDropDownItem($('#City_IDUpdate'), item = { value: "", text: "Seleccione una ciudad." });
            for (var i = 0; i < cityFilter.length; i++) {
                var item = cityFilter[i];
                AddDropDownItem($('#City_IDUpdate'), item = { value: item.id, text: item.ciudad });
            }
            $('#City_IDUpdate').parent().find('.text').html('Seleccione una ciudad');
        } else {
            SetDropDownPlaceholder($('#City_IDUpdate'), "No hay ciudades disponibles.");
        }
    }
}

function GetSuburbUpdate(ciudID) {

    var response = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");
    if (response.code == 200) {

        var suburbs = response.data;
        var suburbsFilter = jQuery.grep(suburbs, function (Suburb, i) {
            return Suburb.ciudadID == ciudID;
        });
        ClearDropDownItem($('#Col_IDUpdate'));
        if (suburbsFilter.length > 0) {
            AddDropDownItem($('#Col_IDUpdate'), item = { value: "", text: "Seleccione una colonia." });
            for (var i = 0; i < suburbsFilter.length; i++) {
                var item = suburbsFilter[i];
                AddDropDownItem($('#Col_IDUpdate'), item = { value: item.id, text: item.colonia });
            }
            $('#Col_IDUpdate').parent().find('.text').html('Seleccione una colonia');
        } else {
            SetDropDownPlaceholder($('#Col_IDUpdate'), "No hay colonias disponibles.");
        }
    }
}


function DeleteAddress(id) {
    const capsula1 = () => {
        var response = ajaxRequest("Address/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Address?success=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};