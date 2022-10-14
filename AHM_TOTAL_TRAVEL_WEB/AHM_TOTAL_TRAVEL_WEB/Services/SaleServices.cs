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
        //        public async Task<ServiceResult> RoomPackagesList(IEnumerable<DefaultPackagesListViewModel> model)
        //        {
        //            var result = new ServiceResult();
        //            try
        //            {
        //                var response = await _api.Get<IEnumerable<DefaultPackagesListViewModel>, IEnumerable<DefaultPackagesListViewModel>>(req => {
        //                    req.Path = $"/API/DefaultPackages/List";
        //                    req.Content = null;
        //                }
        //                );
        //                if (!response.Success)
        //                {
        //                    return result.FromApi(response);
        //                }
        //                else
        //                {
        //                    return result.Ok(response.Data);
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                return result.Error(Helpers.GetMessage(ex));
        //                throw;
        //            }
        //        }

        //        public async Task<ServiceResult> RoomPackagesCreate(DefaultPackagesViewModel actividad, string token)
        //        {
        //            var Result = new ServiceResult();

        //            try
        //            {
        //                var response = await _api.Post<DefaultPackagesViewModel, RequestStatus>(req =>
        //                {
        //                    req.Path = $"/API/DefaultPackages/Insert";
        //                    req.Content = actividad;
        //                },
        //                token
        //                );
        //                if (!response.Success)
        //                {
        //                    return Result.FromApi(response);
        //                }
        //                else
        //                {
        //                    return Result.Ok(response.Data);
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                return Result.Error(Helpers.GetMessage(ex));
        //                throw;
        //            }

        //        }

        //        public async Task<ServiceResult> DefaultPackagesUpdate(DefaultPackagesViewModel actividad, string token)
        //        {
        //            var Result = new ServiceResult();

        //            try
        //            {
        //                var response = await _api.Put<DefaultPackagesViewModel, RequestStatus>(req =>
        //                {
        //                    req.Path = $"/API/DefaultPackages/Update?id=" + actividad.paqu_ID;
        //                    req.Content = actividad;
        //                },
        //                token
        //                );
        //                if (!response.Success)
        //                {
        //                    return Result.FromApi(response);
        //                }
        //                else
        //                {
        //                    return Result.Ok(response.Data);
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                return Result.Error(Helpers.GetMessage(ex));
        //                throw;
        //            }

        //        }
        #endregion

    }
}
