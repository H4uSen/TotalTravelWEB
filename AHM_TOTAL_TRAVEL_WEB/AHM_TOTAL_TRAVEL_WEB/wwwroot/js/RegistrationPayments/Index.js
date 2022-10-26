// ----------------------------------- TABLE INIZIALIZE ------------------------------------
const CitiesList = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");
const SuburbsList = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");
TableSearchInput($("#txtSearch"), $("#grdPaymentRecord"), elemPerPage = 10);
TableDetailsConstructor($("#grdPaymentRecord"));

$("#grdPaymentRecord").paginationTdA({
    elemPerPage: 5
});



function Delete(id) {
    const capsula1 = () => {
        ajaxRequest("/RecordPayment/Delete?id=" + id, null, "POST")
        location.reload();
    };

    sweetAlertconfirm("Estas Seguro de Eliminar el Registro Seleccionado?", "Este registro se borrara permanentemente", "warning", capsula1);
};