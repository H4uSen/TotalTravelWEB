using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.Exchange.WebServices.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class AccessService
    {

        private readonly API _api;

        public AccessService(API api)
        {
            _api = api;
        }

        #region Access
        public async Task<ServiceResult> LogIn(UserLoginModel LogInData)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<UserLoginModel, UserLoggedModel>(req => {
                    req.Path = $"/API/Login";
                    req.Content = LogInData;
                });

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }


        public async Task<ServiceResult> EmailVerification(EmailVerificationModel email)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<EmailVerificationModel, RequestStatus>(req => {
                    req.Path = $"/API/Login/EmailVerification";
                    req.Content = email;
                });
                var request = (RequestStatus)response.Data;

                if (request.CodeStatus > 0)
                {
                    return Result.Ok(response.Data);
                }
                else
                {
                    return Result.Error(response.Data);
                }
                   
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }
        }

        public async Task<ServiceResult> EmailSender(EmailVerificationModel email)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<EmailVerificationModel, int>(req => {
                    req.Path = $"/API/Login/EmailSender";
                    req.Content = email;
                });

                if (response.Data > 0)
                {
                    return Result.Ok(response.Data);
                }
                else
                {
                    return Result.Error(response.Data);
                }

            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }
        }


        public async Task<ServiceResult> ChangePassword(changePasswordViewModel changePassword)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Put<changePasswordViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Users/UpdatePassword";
                    req.Content = changePassword;
                });

                var request = (RequestStatus)response.Data;

                if (request.CodeStatus > 0)
                {
                    return Result.Ok(response.Data);
                }
                else
                {
                    return Result.Error(response.Data);
                }

            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }
        }


        #endregion

        #region Usuarios
        public async Task<ServiceResult> UsersList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<UserListViewModel>, IEnumerable<UserListViewModel>>(req => {
                    req.Path = $"/API/Users/List";
                    req.Content = new List<UserListViewModel>();
                },
                token
                );

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        public async Task<ServiceResult> UsersFind(int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<UserListViewModel, UserListViewModel>(req => {
                    req.Path = $"/API/Users/Find?id={id}";
                    req.Content = null;
                }, token);

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        public async Task<ServiceResult> UserRegister()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<IEnumerable<UserViewModel>, ApiResult>(req => {
                    req.Path = $"/API/Users/List";
                });

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        public async Task<ServiceResult> UserUpdate(UserUpdateViewModel data, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<UserUpdateViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Users/Update?id="+data.Usua_ID;
                    req.Content = data;
                },
                token
                );

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        public async Task<ServiceResult> DeleteUser(int User_Id, int User_Modify ,string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<object, RequestStatus>(req => {
                    req.Path = $"/API/Users/Delete?id={User_Id}&mod={User_Modify}";
                    req.Content = null;
                },token );

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        #endregion

        #region Account

        public async Task<ServiceResult> AccountFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new UserListViewModel();

            try
            {
                var response = await _api.Get<UserListViewModel, UserListViewModel>(req => {
                    req.Path = $"/API/Users/Find?id={id}";
                    req.Content = cuenta;
                },
                token
                );
                if (!response.Success)
                {
                    return Result.FromApi(response);
                }
                else
                {
                    return Result.Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
                throw;
            }
        }
        public async Task<ServiceResult> UserUpdate(UserViewModel data, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<UserViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Users/Update?id=" + data.Usua_ID;
                    req.Content = data;
                },
                token
                );
                if (!response.Success)
                {
                    return Result.FromApi(response);
                }
                else
                {
                    return Result.Ok(response.Data);
                }                    
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        #endregion

        #region Roles

        public async Task<ServiceResult> RolesList(string token)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<RolListViewModel>, IEnumerable<RolListViewModel>>(req => {
                    req.Path = $"/API/Roles/List";
                    req.Content = null;
                },
                token
                );
                if (!response.Success)
                {
                    return result.FromApi(response);
                }
                else
                {
                    return result.Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                return result.Error(Helpers.GetMessage(ex));
                throw;
            }
        }

        public async Task<ServiceResult> RolesCreate(RolViewModel Roles, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<RolViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Roles/Insert";
                    req.Content = Roles;
                },
                token
                );
                if (!response.Success)
                {
                    return Result.FromApi(response);
                }
                else
                {
                    return Result.Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
                throw;
            }

        }

        public async Task<ServiceResult> RolesUpdate(RolViewModel roles, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Put<RolViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Roles/Update?id=" + roles.Role_ID;
                    req.Content = roles;
                },
                token
                );
                if (!response.Success)
                {
                    return Result.FromApi(response);
                }
                else
                {
                    return Result.Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
                throw;
            }

        }
        #endregion

        #region Permisos
        public async Task<ServiceResult> PermissionsList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<PermissionsListViewModel>, IEnumerable<PermissionsListViewModel>>(req => {
                    req.Path = $"/API/Permissions/List";
                    req.Content = null;
                },
                token
                );

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        public async Task<ServiceResult> PermisosUpdate(PermissionsViewModel permisos, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Put<PermissionsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Permissions/Update?id=" + permisos.Perm_ID;
                    req.Content = permisos;
                },
                token
                );
                if (!response.Success)
                {
                    return Result.FromApi(response);
                }
                else
                {
                    return Result.Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
                throw;
            }

        }
        public async Task<ServiceResult> PermissionsDelete(PermissionsViewModel Screen, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<AddressViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Permissions/Delete?id=" + id + "&mod=" + Screen.Perm_UsuarioModifica;
                    req.Content = null;
                },
                token
                );
                if (!response.Success)
                {
                    return Result.FromApi(response);
                }
                else
                {
                    return Result.Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
                throw;
            }

        }

        #endregion

        #region modules
        public async Task<ServiceResult> ModulesList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ModulesListViewModel>, IEnumerable<ModulesListViewModel>>(req => {
                    req.Path = $"/API/Modules/List";
                    req.Content = null;
                },
                token
                );

                if (!response.Success)
                    return Result.FromApi(response);
                else
                    return Result.Ok(response.Data);
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
            }

        }

        public async Task<ServiceResult> ModulesDelete(ModulesViewModel Module, int id, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Delete<ModulesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Modules/Delete?id=" + id + "&mod=" + Module.Modu_UsuarioModifica;
                    req.Content = null;
                },
                token
                );
                if (!response.Success)
                {
                    return Result.FromApi(response);
                }
                else
                {
                    return Result.Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                return Result.Error(Helpers.GetMessage(ex));
                throw;
            }

        }

        #endregion

    }
}
