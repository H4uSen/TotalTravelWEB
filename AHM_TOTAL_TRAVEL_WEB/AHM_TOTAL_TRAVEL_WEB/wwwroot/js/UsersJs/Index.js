
// ----------------------------------- INIZIALIZE ------------------------------------
FillUsers();

$("#grdUsuarios").paginationTdA({
    elemPerPage: 5
});

// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdUsuarios tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdUsuarios").paginationTdA({
        elemPerPage: 5
    });
});

// ----------------------------------- FUNCTIONS ------------------------------------

function FillUsers() {
    const request = ajaxRequest(
        "https://totaltravelapi.azurewebsites.net/API/Users/List", null, "GET"
    );

    if (request.code == 200) {

        const users = request.data;
        $("#grdUsuarios tbody").empty();
        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            $("#grdUsuarios tbody").append(
                `<tr>
                    <td>${user.nombre_completo}</td>
                    <td>${user.email}</td>
                    <td>${user.rol}</td>
                    <td>${user.partner == null ? "No Partner" : user.partner}</td>
                    <td>
                        <button class="ui large icon positive button">
                            <i class="pencil alternate icon"></i>
                        </button>
                        <button class="ui large icon negative button">
                            <i class="trash alternate icon"></i>
                        </button>
                        <button class="ui large icon yellow button">
                            <i class="folder open outline icon"></i>
                        </button>
                    </td>
                </tr>`
            );
        }
    }
}