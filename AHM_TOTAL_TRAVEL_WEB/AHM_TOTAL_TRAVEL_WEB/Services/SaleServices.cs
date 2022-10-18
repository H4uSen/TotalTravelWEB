using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{

    public class SaleServices
    {

        private readonly API _api;

        public SaleServices(API api)
        {
            _api = api;
        }

        #region DefaultPackages

        public async Task<ServiceResult> DefaultPackagesList(IEnumerable<DefaultPackagesListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<DefaultPackagesListViewModel>, IEnumerable<DefaultPackagesListViewModel>>(req => {
                    req.Path = $"/API/DefaultPackages/List";
                    req.Content = null;
                }
                );
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
                throw;
            }
        }

        public async Task<ServiceResult> DefaultPackagesCreate(DefaultPackagesViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<DefaultPackagesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DefaultPackages/Insert";
                    req.Content = actividad;
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

        public async Task<ServiceResult> DefaultPackagesUpdate(DefaultPackagesViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<DefaultPackagesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DefaultPackages/Update?id=" + actividad.paqu_ID;
                    req.Content = actividad;
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
        public async Task<ServiceResult> DefaultPackagesDelete(DefaultPackagesViewModel actividad, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<DefaultPackagesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DefaultPackages/Delete?id=" + id + "&mod=" + actividad.paqu_UsuarioModifica;
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
        public async Task<ServiceResult> DefaultPackagesFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new DefaultPackagesListViewModel();

            try
            {
                var response = await _api.Get<DefaultPackagesListViewModel, DefaultPackagesListViewModel>(req => {
                    req.Path = $"/API/DefaultPackages/Find?id=" + id;
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

        #region RoomPackages
        public async Task<ServiceResult> RoomsPackagesList(IEnumerable<RoomsPackagesListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<RoomsPackagesListViewModel>, IEnumerable<RoomsPackagesListViewModel>>(req =>
                {
                    req.Path = $"/API/RoomsPackages/List";
                    req.Content = null;
                }
                );
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
                throw;
            }
        }

        public async Task<ServiceResult> RoomsPackagesCreate(RoomsPackagesViewModel rooms, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<RoomsPackagesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/RoomsPackages/Insert";
                    req.Content = rooms;
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

        public async Task<ServiceResult> RoomsPackagesUpdate(RoomsPackagesListViewModel rooms, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<RoomsPackagesListViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/RoomsPackages/Update?id=" + rooms.ID;
                    req.Content = rooms;
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

        #region DefaultPackagesDetails

        public async Task<ServiceResult> DefaultPackagesDetailsList()
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<DefaultPackagesDetailsListViewModel>, IEnumerable<DefaultPackagesDetailsListViewModel>>(req => {
                    req.Path = $"/API/DefaultPackagesDetails/List";
                    req.Content = null;
                }
                );
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
                throw;
            }
        }

        public async Task<ServiceResult> DefaultPackagesDetailsCreate(DefaultPackagesDetailsViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<DefaultPackagesDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DefaultPackagesDetails/Insert";
                    req.Content = actividad;
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

        public async Task<ServiceResult> DefaultPackagesDetailsUpdate(DefaultPackagesDetailsViewModel ppd, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<DefaultPackagesDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DefaultPackagesDetails/Update?id=" + ppd.PaDe_ID;
                    req.Content = ppd;
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

        public async Task<ServiceResult> DefaultPackagesDetailsDelete(DefaultPackagesDetailsViewModel actividad, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<DefaultPackagesDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/DefaultPackagesDetails/Delete?id=" + id + "&mod=" + actividad.PaDe_UsuarioModifica;
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

        public async Task<ServiceResult> DefaultPackagesDetailsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new DefaultPackagesDetailsListViewModel();

            try
            {
                var response = await _api.Get<DefaultPackagesDetailsListViewModel, DefaultPackagesDetailsListViewModel>(req => {
                    req.Path = $"/API/DefaultPackagesDetails/Find?id=" + id;
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


        #region Paymenttypes

        public async Task<ServiceResult> PaymentTypesList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<TipeofpayListViewModel>, IEnumerable<TipeofpayListViewModel>>(req => {
                    req.Path = $"/API/PaymentTypes/List";
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

        public async Task<ServiceResult> PaymentTypesCreate(TipeofpayViewModel payment, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<TipeofpayViewModel, RequestStatus>(req => {
                    req.Path = $"/API/PaymentTypes/Insert";
                    req.Content = payment;
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

        public async Task<ServiceResult> PaymentTypesUpdate(TipeofpayViewModel payment, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<TipeofpayViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/PaymentTypes/Update?id=" + payment.TiPa_ID;
                    req.Content = payment;
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
        public async Task<ServiceResult> PaymentTypesDelete(TipeofpayViewModel payment, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<TipeofpayViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/PaymentTypes/Delete?id=" + id + "&mod=" + payment.TiPa_UsuarioModifica;
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

        public async Task<ServiceResult> PaymentTypesFind(string id, string token)
        {
            var Result = new ServiceResult();
            var tipe = new TipeofpayListViewModel();

            try
            {
                var response = await _api.Get<TipeofpayListViewModel, TipeofpayListViewModel>(req => {
                    req.Path = $"/API/PaymentTypes/Find?Id=" + id;
                    req.Content = tipe;
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

        #region PaymentRecords
        public async Task<ServiceResult> PaymentRecordsList()
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<PaymentRecordListViewModel>, IEnumerable<PaymentRecordListViewModel>>(req => {
                    req.Path = $"/API/RecordPayment/List";
                    req.Content = null;
                }
                );
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
                throw;
            }
        }

        public async Task<ServiceResult> PaymentRecordsFind(string id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<PaymentRecordViewModel, PaymentRecordViewModel>(req => {
                    req.Path = $"/API/RecordPayment/Find?id=" + id;
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
