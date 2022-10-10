using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class UserLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
    public class UserLoggedModel
    {
            public int ID { get; set; }
            public string DNI { get; set; }
            public string Nombre { get; set; }
            public string Email { get; set; }
            public string Rol { get; set; }
            public int Role_ID { get; set; }
            public string Partner { get; set; }
            public int? PartnerID { get; set; }
            public string Token { get; set; }
        
    }
}
