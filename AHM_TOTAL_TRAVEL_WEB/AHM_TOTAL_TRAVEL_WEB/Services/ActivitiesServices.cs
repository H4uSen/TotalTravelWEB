using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class ActivitiesServices
    {

        private readonly API _api;

        public ActivitiesServices(API api)
        {
            _api = api;
        }


        #region Actividades

        public async Task<ServiceResult> ActivityList(IEnumerable<ActivitiesListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<ActivitiesListViewModel>, IEnumerable<ActivitiesListViewModel>>(req => {
                    req.Path = $"/API/Activities/List";
                    req.Content = null;
                });

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
            }
        }


        public async Task<ServiceResult> CreateActivity(string token, ActivitiesViewModel data)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<ActivitiesViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Activities/Insert";
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
