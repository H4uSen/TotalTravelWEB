
// ----------------------------------- TABLE INIZIALIZE ------------------------------------
const CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
const SuburbsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
TableSearchInput($("#txtSearch"), $("#grdPaymentRecord"), elemPerPage = 10);
TableDetailsConstructor($("#grdPaymentRecord"));

$("#grdPaymentRecord").paginationTdA({
    elemPerPage: 5
});




function Delete(id) {
    const capsula1 = () => {
        ajaxRequest("/RecordPayment/Delete?Id=" + id, null, "POST")
        location.reload();
    };

    sweetAlertconfirm("Estas Seguro de Eliminar el Registro Seleccionado?", "Este registro se borrara permanentemente", "warning", capsula1);
};