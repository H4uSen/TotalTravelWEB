function FindGetValue(Get_KeyName = "") {
    var Get_KeyValue = null;

    // get url search content after "?"
    //example: www.url?get_var=5
    //return : get_var=5
    var url_query = location.search.substring(1);

    //split vars and get in array
    var gets_vars = url_query.split("&");

    for (var i = 0; i < gets_vars.length; i++) {
        //divide la key from the value in item
        var var_key = gets_vars[i].split("=");

        // if key is equal to query key return value key
        if (var_key[0] == Get_KeyName) {
            //get value key
            Get_KeyValue = var_key[1];
            break;
        }
    }

    //return value key
    return Get_KeyValue;
}


if (FindGetValue("Command") == "endSession") {
    window.history.pushState({}, "", "");

    window.onpopstate = function () {
        Swal.fire('Unicia sesión para poder acceder');
        window.history.pushState({}, "", "");
            
    };
        
}
if (FindGetValue("ReturnUrl") != null) {
    Swal.fire('Unicia sesión para poder acceder');
}
