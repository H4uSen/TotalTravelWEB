
// ReportCreationModel
var reportCreation = {
    "ReportName": "",
    "HTMLFile": "",
    "DataSourceIndex": 0,
    "FilterType": "",
    "FilterValue": "",
};

var UserViewModel = {
    "usua_ID": 0,
    "usua_DNI": "string",
    "usua_Url": "string",
    "usua_Nombre": "string",
    "usua_Apellido": "string",
    "usua_FechaNaci": "2022-09-29T01:11:34.578Z",
    "usua_Email": "string",
    "usua_Sexo": "string",
    "usua_Telefono": "string",
    "usua_Password": "string",
    "usua_esAdmin": 0,
    "usua_Salt": "string",
    "role_ID": 0,
    "dire_ID": 0,
    "part_ID": 0,
    "usua_UsuarioCreacion": Client_User_ID,
    "usua_FechaCreacion": "2022-09-29T01:11:34.578Z",
    "usua_UsuarioModifica": Client_User_ID,
    "usua_FechaModifica": "2022-09-29T01:11:34.578Z",
    "usua_Estado": true
}

var PartnerViewModel = {
    "part_ID": 0,
    "part_Nombre": "string",
    "part_Email": "string",
    "part_Telefono": "string",
    "tiPart_Id": 0,
    "part_UsuarioCreacion": Client_User_ID,
    "part_FechaCreacion": "2022-09-29T01:12:08.872Z",
    "part_UsuarioModifica": Client_User_ID,
    "part_FechaModifica": "2022-09-29T01:12:08.872Z",
    "part_Estado": true,
    "part_Url": "string"
}

var AdressViewModel = {
    "id": 0,
    "colo_ID": 0,
    "dire_Calle": "string",
    "dire_Avenida": "string",
    "dire_UsuarioCreacion": Client_User_ID,
    "dire_UsuarioModifica": Client_User_ID
}
var AdressListViewModel = {
    "id": 0,
    "iD_Colonia": 0,
    "colonia": "string",
    "calle": "string",
    "avenida": "string",
    "iD_Ciudad": 0,
    "ciudad": "string",
    "iD_Pais": 0,
    "pais": "string",
    "iD_UsuaCrea": 0
}

var TransportViewModel = {
    "tiTr_ID": 0,
    "part_ID": 0,
    "dire_ID": 0,
    "tprt_UsuarioCreacion": Client_User_ID,
    "tprt_UsuarioModifica": Client_User_ID,
    "tprt_Nombre": "string",
}

var SuburbsViewModel = {
    "colo_Descripcion": "string",
    "ciud_ID": 0,
    "colo_UsuarioCreacion": Client_User_ID,
    "colo_UsuarioModifica": Client_User_ID
}

var PaymentTypesViewModel = {
    "tiPa_Descripcion": "string",
    "tiPa_UsuarioCreacion": Client_User_ID,
    "tiPa_UsuarioModifica": Client_User_ID
};

var categorysroomsViewModel = {
    "Caha_Descripcion": "string",
    "CaHa_UsuarioCreacion": Client_User_ID,
    "CaHa_UsuarioModifica": Client_User_ID
};

var HotelsViewModel = {
    "hote_Nombre": "string",
    "hote_Descripcion": "string",
    "dire_ID": 0,
    "part_ID": 0,
    "hote_UsuarioCreacion": Client_User_ID,
    "hote_UsuarioModifica": Client_User_ID
}
var TipoPartnerViewModel = {
    "id": 0,
    "descripcion": "string",
    "rol_Id": 0,
    "rol_Descripcion": "string"
};

var CitiesViewModel = {
    "ciud_Descripcion": "string",
    "pais_ID": 0,
    "ciud_UsuarioCreacion": Client_User_ID,
    "ciud_UsuarioModifica": Client_User_ID
}

var ReservationDetailsViewModel = {
    "habi_ID": 0,
    "reHo_ID": 0,
    "reDe_UsuarioCreacion": Client_User_ID,
    "reDe_UsuarioModifica": Client_User_ID
}
var tipostransporte = {
    "tiTr_Descripcion": "string",
    "tiTr_UsuarioCreacion": 0,
    "tiTr_UsuarioModifica": 0,
    "partner_ID": 0
}
var detallespaquete = {
    "paqu_ID": 0,
    "actv_ID": 0,
    "paDe_Precio": 0,
    "paDe_Cantidad": 0,
    "paDe_UsuarioCreacion": 0,
    "paDe_UsuarioModifica":0
}

var ReservationCreateViewModel = {
    reservacion : {
        "resv_ID": 0,
        "usua_ID": Client_User_ID,
        "paqu_ID": 0,
        "resv_esPersonalizado": true,
        "resv_CantidadPagos": 0,
        "resv_NumeroPersonas": 0,
        "resv_ConfirmacionPago": false,
        "resv_ConfirmacionHotel": false,
        "resv_ConfirmacionRestaurante": false,
        "resv_ConfirmacionTrans": false,
        "resv_Precio": 0,
        "resv_UsuarioCreacion": Client_User_ID,
        "resv_UsuarioModifica": Client_User_ID,
        "reHo_FechaEntrada": "",
        "reHo_FechaSalida": "",
        "hote_ID": 0,
        "resv_Habitaciones": [],
        "actividadesExtras": [],
        "restaurantes": [],
        "actividadesHoteles": [],
        "tipoPago": 0,
        "reservacionTransportes": []
    },

    habitacion: {
        "habi_ID": 0,
        "habi_Cantidad": 0,
    },

    actividadesExtras: {
        "acEx_ID": 0,
        "reAE_ID": 0,
        "reAE_Precio": 0,
        "reAE_Cantidad": 0,
        "reAE_FechaReservacion": "2022-11-15T02:22:03.297Z",
        "reAE_HoraReservacion": "string"
    },

    restaurantes: {
        "resv_ID": 0,
        "rest_ID": 0,
        "reRe_FechaReservacion": "2022-11-15T02:22:03.297Z",
        "reRe_HoraReservacion": "string"
    },

    actividadesHoteles: {
        "hoAc_ID": 0,
        "reAH_Precio": 0,
        "reAH_Cantidad": 0,
        "reAH_FechaReservacion": "2022-11-15T02:22:03.298Z",
        "reAH_HoraReservacion": "string"
    },

    transporte: {
        "detr_ID": 0,
        "reTr_CantidadAsientos": 0,
        "reTr_Cancelado": true,
        "reTr_FechaCancelado": "2022-11-15T02:22:03.298Z"
    }
}

var ScreensViewModel = {
    "perm_ID": 0,
    "perm_Icono": "",
    "perm_Descripcion": "",
    "perm_Controlador": "",
    "perm_Action": "",
    "modu_ID": 0,
    "grEN_Id": 0,
    "perm_esVisible": true,
    "perm_UsuarioCreacion": Client_User_ID,
    "perm_UsuarioModifica": Client_User_ID
}

var restrictionsViewModel = {
    "perm_ID": 0,
    "role_ID": 0,
    "roPe_UsuarioCreacion": Client_User_ID,
    "roPe_UsuarioModifica": Client_User_ID
};

var ModulesViewModel = {
    "modu_Id": 0,
    "modu_Descripcion": "",
    "modu_UsuarioCreacion": Client_User_ID,
    "modu_UsuarioModifica": Client_User_ID
};

var EmailSendModel = {
    "to": "string",
    "toName": "string",
    "subject": "string",
    "bodyData": "string"
};

var ReservacionUModel = {
    "resv_ID": 0,
    "usua_ID": Client_User_ID,
    "paqu_ID": 0,
    "resv_esPersonalizado": true,
    "resv_CantidadPagos": 0,
    "resv_NumeroPersonas": 0,
    "resv_ConfirmacionPago": false,
    "resv_ConfirmacionHotel": false,
    "resv_ConfirmacionRestaurante": false,
    "resv_ConfirmacionTrans": false,
    "resv_ConfirmacionActividades": false,
    "resv_Precio": 0,
    "resv_UsuarioModifica": 0,
    "justConfirmation": false,

}
