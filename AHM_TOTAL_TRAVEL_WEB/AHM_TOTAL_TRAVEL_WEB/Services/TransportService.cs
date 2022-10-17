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

        public async Task<ServiceResult> TransportDetailsUpdate(TransportDetailsViewModel transportdetails, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Put<TransportDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DetailsTransportation/Update?id=" + id;
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

        public async Task<ServiceResult> TransportDetailsDelete(int modifica, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<TransportDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DetailsTransportation/Delete?id=" + id + "&Mod=" + modifica;
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

        public async Task<ServiceResult> TransportDetailsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new TransportDetailsListViewModel();

            try
            {
                var response = await _api.Get<TransportDetailsListViewModel, TransportDetailsListViewModel>(req => {
                    req.Path = $"/API/DetailsTransportation/Find?Id=" + id;
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

        public async Task<ServiceResult> TransportUpdate(TransportViewModel transporte, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<TransportViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Transports/Update?id=" + transporte.Tprt_ID;
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

        public async Task<ServiceResult> TransportFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new TransportListViewModel();

            try
            {
                var response = await _api.Get<TransportListViewModel, TransportListViewModel>(req => {
                    req.Path = $"/API/Transports/Find?id="+id;
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

        public async Task<ServiceResult> TransportDelete(TransportViewModel transporte, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<TransportViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Transports/Delete?id=" + id + "&mod=" + transporte.Tprt_UsuarioModifica;
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

        #region TiposTransportes
        public async Task<ServiceResult> TypesTransportList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<TypesTransportListViewModel>, IEnumerable<TypesTransportListViewModel>>(req => {
                    req.Path = $"/API/TypesTransport/List";
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

        public async Task<ServiceResult> TypesTransportCreate(TypesTransportViewModel transporte, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<TypesTransportViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/TypesTransport/Insert";
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
        public async Task<ServiceResult> TypesTransportDelete(TypesTransportViewModel transporte, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<TypesTransportViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/TypesTransport/Delete?id=" + id + "&Mod=" + transporte.TiTr_UsuarioModifica;
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

        #region DestinosTransportes

        public async Task<ServiceResult> TransportDestionationsList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<DestinationsTransportationsListViewModel>, IEnumerable<DestinationsTransportationsListViewModel>>(req => {
                    req.Path = $"/API/DestinationsTransportations/List";

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


        public async Task<ServiceResult> TransportDestionationsCreate(DestinationsTransportationsViewModel transportedestino, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<DestinationsTransportationsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DestinationsTransportations/Insert";
                    req.Content = transportedestino;
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

        public async Task<ServiceResult> TransportDestionationsUpdate(DestinationsTransportationsViewModel transportedestino, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<DestinationsTransportationsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DestinationsTransportations/Update?id=" + transportedestino.DsTr_ID;
                    req.Content = transportedestino;
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

        public async Task<ServiceResult> TransportDestionationsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new DestinationsTransportationsListViewModel();

            try
            {
                var response = await _api.Get<DestinationsTransportationsListViewModel, DestinationsTransportationsListViewModel>(req => {
                    req.Path = $"/API/DestinationsTransportations/Find?id=" + id;
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

        public async Task<ServiceResult> TransportDestionationsDelete(DestinationsTransportationsViewModel destinotransporte, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<DestinationsTransportationsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DestinationsTransportations/Delete?id=" + id + "&mod=" + destinotransporte.DsTr_UsuarioModifica;
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


        #region HorariosTransporte
        public async Task<ServiceResult> ScheduleTransportationList(IEnumerable<ScheduleTransportationListViewModel> model) {
            
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ScheduleTransportationListViewModel>, IEnumerable<ScheduleTransportationListViewModel>>(req => {
                    req.Path = $"/API/ScheduleTransportation/List";

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
