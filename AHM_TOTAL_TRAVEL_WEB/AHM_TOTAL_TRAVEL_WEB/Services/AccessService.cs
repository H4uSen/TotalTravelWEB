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


        public async Task<ServiceResult> ChangePassword(userRegister changePassword)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Put<userRegister, RequestStatus>(req => {
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
        public async Task<ServiceResult> UsersList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<UserListViewModel>, IEnumerable<UserListViewModel>>(req => {
                    req.Path = $"/API/Users/List";
                    req.Content = new List<UserListViewModel>();
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

        #endregion

    }
}
