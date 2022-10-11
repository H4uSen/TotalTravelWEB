using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class RegistrationPaymentsService
    {
        private readonly API _api;

        public RegistrationPaymentsService(API api)
        {
            _api = api;
        }

        #region RegistrationPayments

        public async Task<ServiceResult> RegistrationPaymentsList(IEnumerable<RegistrationPaymentsListViewModel> model)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<RegistrationPaymentsListViewModel>, IEnumerable<RegistrationPaymentsListViewModel>>(req => {
                    req.Path = $"/API/RecordPayment/List";
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
       
       

     

