using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class RestaurantService
    {

        private readonly API _api;

        public RestaurantService(API api)
        {
            _api = api;
        }
        #region Restaurants

        public async Task<ServiceResult> RestaurantsList(IEnumerable<RestaurantListViewModel> model)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<RestaurantListViewModel>, IEnumerable<RestaurantListViewModel>>(req => {
                    req.Path = $"/API/Restaurants/List";
                    req.Content = null;
                }
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

        public async Task<ServiceResult> RestaurantCreate(RestaurantViewModel restaurant, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.PostFormData<RestaurantViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Restaurants/Insert";
                    req.Content = restaurant;
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
