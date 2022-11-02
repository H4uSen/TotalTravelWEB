using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class ReportService
    {
        private readonly API _api;


        public ReportService(API api)
        {
            _api = api;

        }

        public async Task<ServiceResult> TransporteReportList(IEnumerable<TransportReportListViewModel> model)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<TransportReportListViewModel>, IEnumerable<TransportReportListViewModel>>(req => {
                    req.Path = $"/API/Transport/Report";
                    req.Content = model;
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

    }
}
