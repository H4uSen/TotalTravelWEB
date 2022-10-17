using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
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

        public async Task<ServiceResult> ActivityList()
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<ActivitiesListViewModel>, IEnumerable<ActivitiesListViewModel>>(req => {
                    req.Path = $"/API/Activities/List";
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

        public async Task<ServiceResult> ActivitiesCreate(ActivitiesViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<ActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Activities/Insert";
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

        public async Task<ServiceResult> ActivitiesUpdate(ActivitiesViewModel actividad,int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Put<ActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Activities/Update?id="+ actividad.Actv_ID;
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

        public async Task<ServiceResult> ActivitiesDelete(ActivitiesViewModel actividad,int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<ActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Activities/Delete?id=" + id + "&mod="+ actividad.actv_UsuarioModifica;
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

        public async Task<ServiceResult> ActivitiesFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new ActivitiesListViewModel();

            try
            {
                var response = await _api.Get<ActivitiesListViewModel, ActivitiesListViewModel>(req => {
                    req.Path = $"/API/Activities/Find?id=" + id;
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

        #region ActividadesExtras

        public async Task<ServiceResult> ExtraActivitiesList(IEnumerable<ActivitiesExtrasListViewModel> model, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ActivitiesExtrasListViewModel>, IEnumerable<ActivitiesExtrasListViewModel>>(req =>
                {
                    req.Path = $"/API/ActivitiesExtra/List";
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

        public async Task<ServiceResult> ActivitiesExtraCreate(ActivitiesExtrasViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<ActivitiesExtrasViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ActivitiesExtra/Insert";
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

        public async Task<ServiceResult> ActivitiesExtraUpdate(ActivitiesExtrasViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<ActivitiesExtrasViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ActivitiesExtra/Update?id=" + actividad.AcEx_ID;
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

        public async Task<ServiceResult> ActivitiesExtraDelete(ActivitiesExtrasViewModel actividad, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<ActivitiesExtrasViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ActivitiesExtra/Delete?id=" + id + "&mod=" + actividad.acEx_UsuarioModifica;
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

        public async Task<ServiceResult> ActivitiesExtrasFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new ActivitiesListViewModel();

            try
            {
                var response = await _api.Get<ActivitiesListViewModel, ActivitiesListViewModel>(req => {
                    req.Path = $"/API/ActivitiesExtra/Find?id=" + id;
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

        #region TypesActivities

        public async Task<ServiceResult> TypesActivitiesList()
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<TypesActivitiesListViewModel>, IEnumerable<TypesActivitiesListViewModel>>(req => {
                    req.Path = $"/API/TypeActivities/List";
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

        public async Task<ServiceResult> TypesActivitiesCreate(TypesActivitiesViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<TypesActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/TypeActivities/Insert";
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

        public async Task<ServiceResult> TypesActivitiesUpdate(TypesActivitiesViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<TypesActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/TypeActivities/Update?id=" + actividad.TiAc_ID;
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
        public async Task<ServiceResult> TypesActivitiesDelete(TypesActivitiesViewModel actividad, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<TypesActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/TypeActivities/Delete?id=" + id + "&mod=" + actividad.TiAc_UsuarioModifica;
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
        public async Task<ServiceResult> TypesActivitiesFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new TypesActivitiesListViewModel();

            try
            {
                var response = await _api.Get<TypesActivitiesListViewModel, TypesActivitiesListViewModel>(req => {
                    req.Path = $"/API/TypeActivities/Find?id=" + id;
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
    }
}
