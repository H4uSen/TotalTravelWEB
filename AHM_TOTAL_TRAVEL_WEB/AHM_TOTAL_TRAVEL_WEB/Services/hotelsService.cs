using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class HotelsService
    {
        private readonly API _api;

        public HotelsService(API api)
        {
            _api = api;
        }
        #region Habitaciones
        public async Task<ServiceResult> RoomsList(IEnumerable<RoomsListViewModel> model)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<RoomsListViewModel>, IEnumerable<RoomsListViewModel>>(req => {
                    req.Path = $"/API/Rooms/List";
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
        #endregion
    }
}
