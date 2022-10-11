using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class ReservationService
    {
        private readonly API _api;

        public ReservationService(API api)
        {
            _api = api;
        }

        #region Reservacion Restaurants

        public async Task<ServiceResult> RestaurantsReservationList(IEnumerable<ReservationRestaurantsListViewModel> model, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationRestaurantsListViewModel>, IEnumerable<ReservationRestaurantsListViewModel>>(req => {
                    req.Path = $"/API/ReservationRestaurant/List";
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
