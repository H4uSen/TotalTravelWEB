using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class GeneralService
    {
        private readonly API _api;

        public GeneralService(API api)
        {
            _api = api;
        }

        #region Ciudades

        public async Task<ServiceResult> CitiesList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<CityListViewModel>, IEnumerable<CityListViewModel>>(req => {
                    req.Path = $"/API/Cities/List";
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

        #region Direccion

        public async Task<ServiceResult> CreateAddress(string token, AddressViewModel data)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<AddressViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Address/Insert";
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
