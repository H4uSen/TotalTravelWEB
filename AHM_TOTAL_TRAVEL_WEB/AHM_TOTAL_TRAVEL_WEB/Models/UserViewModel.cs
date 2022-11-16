using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class UserViewModel
    {
        public int Usua_ID { get; set; }
        public string Usua_DNI { get; set; }
        public string Usua_Url { get; set; }
        public string Usua_Nombre { get; set; }
        public string Usua_Apellido { get; set; }
        public DateTime? Usua_FechaNaci { get; set; }
        public string Usua_Email { get; set; }
        public string Usua_Sexo { get; set; }
        public string Usua_Telefono { get; set; }
        public string Usua_Password { get; set; }
        public bool? Usua_esAdmin { get; set; }
        public string Usua_Salt { get; set; }
        public int? Role_ID { get; set; }
        public int? Dire_ID { get; set; }
        public int? Part_ID { get; set; }
        public int? Usua_UsuarioCreacion { get; set; }
        public DateTime? Usua_FechaCreacion { get; set; }
        public int? Usua_UsuarioModifica { get; set; }
        public DateTime? Usua_FechaModifica { get; set; }
        public bool? Usua_Estado { get; set; }
    }

    public class UserUpdateViewModel
    {
        public int Usua_ID { get; set; }
        public string Usua_DNI { get; set; }
        public string Usua_Nombre { get; set; }
        public string Usua_Apellido { get; set; }
        public string Usua_Telefono { get; set; }
        public int? Role_ID { get; set; }
        public int? Dire_ID { get; set; }
        public int? Ciu_ID { get; set; }
        public string Dire_Descripcion { get; set; }
        public int? Part_ID { get; set; }
        public int? Usua_UsuarioModifica { get; set; }
    }

    public class UserListViewModel
    {
        public int ID { get; set; }
        public string DNI { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Nombrecompleto { get; set; }
        public string Sexo { get; set; }
        public DateTime? Fecha_Nacimiento { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public int DireccionID { get; set; }
        public int PaisID { get; set; }
        public string Pais { get; set; }
        public int CiudadID { get; set; }
        public string Ciudad { get; set; }
        public int ColoniaID { get; set; }
        public string Colonia { get; set; }
        public string Calle { get; set; }
        public string Avenida { get; set; }
        public string Partner { get; set; }
        public int? PartnerID { get; set; }
        public string Rol { get; set; }
        public int Role_ID { get; set; }
        public int? ID_Crea { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? ID_Modifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }
        public string Image_URL { get; set; }
    }
}
