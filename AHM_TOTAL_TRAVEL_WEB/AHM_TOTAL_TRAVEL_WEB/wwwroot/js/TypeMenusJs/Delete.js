function DeleteTypeMenus(id) {
    const capsula1 = () => {
        var response = ajaxRequest("TypeMenus/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/TypeMenus?success=true';
        }
    };

    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};