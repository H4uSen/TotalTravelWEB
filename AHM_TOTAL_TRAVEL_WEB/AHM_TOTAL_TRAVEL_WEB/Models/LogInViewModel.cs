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
    public class userCodevalidation
    {
        public string userCode { get; set; }

    }
    public class changePasswordViewModel
    {
        public int usua_ID { get; set; }
        public string usua_Password { get; set; }
    }
        public class userRegister
    {
        public int usua_ID { get; set; }
        public string usua_DNI { get; set; }
        public string usua_Nombre { get; set; }
        public string usua_Apellido { get; set; }
        public string usua_FechaNaci { get; set; }
        public string usua_Email { get; set; }
        public string usua_Sexo { get; set; }
        public string? usua_Telefono { get; set; }
        public string usua_Url { get; set; }
        public string usua_Password { get; set; }
        public int usua_esAdmin { get; set; }
        public string usua_Salt { get; set; }
        public int role_ID { get; set; }
        public int? dire_ID { get; set; }
        public int part_ID { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public int usua_UsuarioModifica { get; set; }
        public string file { get; set; }


    }
    public class changePassword
    {
        public string usua_Password { get; set; }
        public string passwordConfirm { get; set; }
    }

    public class EmailVerificationModel
    {
        public string to { get; set; }
        public string toName { get; set; }
        public string subject { get; set; }
        public string bodyData { get; set; }
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
            public string Image_URL { get; set; }

    }
}
