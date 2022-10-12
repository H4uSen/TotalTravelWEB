using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class TransportService 
    {
        private readonly API _api;

        public TransportService(API api)
        {
            _api = api;
        }

        #region DetallesTransportes
        public async Task<ServiceResult> TransportDetailsList(IEnumerable<TransportDetailsListViewModel> model)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<TransportDetailsListViewModel>, IEnumerable<TransportDetailsListViewModel>>(req => {
                    req.Path = $"/API/DetailsTransportation/List";
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

        public async Task<ServiceResult> TransportDetailsCreate(TransportDetailsViewModel transportdetails, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<TransportDetailsViewModel, RequestStatus>(req => {
                    req.Path = $"/API/DetailsTransportation/Insert";
                    req.Content = transportdetails;
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


        #region Transportes
        public async Task<ServiceResult> TransportList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<TransportListViewModel>, IEnumerable<TransportListViewModel>>(req => {
                    req.Path = $"/API/Transports/List";
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

        public async Task<ServiceResult> TransportCreate(TransportViewModel transporte, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<TransportViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Transports/Insert";
                    req.Content = transporte;
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
