using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
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

        #endregion

    }
}
