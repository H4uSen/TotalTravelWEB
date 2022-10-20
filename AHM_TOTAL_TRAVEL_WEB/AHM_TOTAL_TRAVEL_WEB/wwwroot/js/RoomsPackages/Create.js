const RoomsList = ajaxRequest("https://totaltravel.somee.com/API/Rooms/List");
const PackagesList = ajaxRequest("https://totaltravel.somee.com/API/DefaultPackages/List");

$('#Paqu_ID').change(function (_this) {

    RoomsPackagesListDetails($('#Paqu_ID').val());
})

$('.ui.dropdown').dropdown();

$("#createPaqueteHabitacion").click(() => {
    $("#modalCreate").modal({ autofocus: false, forceSelection: false }).modal('show');
});

$("#closePaqueteHabitacion").click(() => {
    $("#modalCreate").modal('hide');
});

function RoomsPackagesListDetails(id_package) {

    var Packages = PackagesList.data;
    console.log(PackagesList);
    if (PackagesList.code == 200 && Packages.length > 0) {


        Packages = jQuery.grep(Packages, function (package, i) {
            return package.id == id_package;

        });
        const IdHotel = Packages[0].iD_Hotel;
        if (PackagesList.code == 200 && Packages.length > 0) {
            var Rooms = RoomsList.data;
               Rooms = jQuery.grep(Rooms, function (room, i) {
                   return room.hotelID == IdHotel;
               });
            console.log(Rooms);
            console.log(Packages);
            const dropdownData = {
                dropdown: $("#Habi_ID"),
                items: {
                    list: Rooms,
                    valueData: "id",
                    textData: "habitacion"
                },
                placeholder: {
                    empty: "No se encontraron habitaciones disponibles",
                    default: "Seleccione una habitacion",
                },
                semantic: true
            }

            FillDropDown(dropdownData);
            $("#Habi_ID").dropdown();
        }
    }
}

$("#sendPaqueteHabitacion").click(() => {

    const ValidateArray = [
        { validateMessage: "Seleccione un paquete", Jqueryinput: $("#Paqu_ID") },
        { validateMessage: "Seleccione una habitacion", Jqueryinput: $("#Habi_ID") }
    ];
    const userValidate = ValidateForm(ValidateArray);
    if (userValidate) {
        $("#createPaqueteHabitacionForm").submit();
    }

});