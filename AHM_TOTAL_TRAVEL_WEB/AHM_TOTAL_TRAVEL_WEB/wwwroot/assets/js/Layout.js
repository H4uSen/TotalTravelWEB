function sideBarState() {
    if (localStorage.getItem("sideBarState") == "false" || localStorage.getItem("sideBarState") == null) {
            localStorage.setItem("sideBarState", "true");
        }
        else
        {
            localStorage.setItem("sideBarState", "false");
        }

}

$(document).ready(function () {
    var sideBarState = localStorage.getItem("sideBarState");
    if (sideBarState == "false" || sideBarState == null) {
        $('#toggle-btn').addClass('active');
    }
    else
    {
        $('#toggle-btn').removeClass('active');    
    }
});
