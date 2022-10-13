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

        public async Task<ServiceResult> CitiesList(IEnumerable<CityListViewModel> model, string token)
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

        public async Task<ServiceResult> CitiesCreate(CityViewModel Cities, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<CityViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Cities/Insert";
                    req.Content = Cities;
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

        public async Task<ServiceResult> AddressesList(IEnumerable<AddressListViewModel> model)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<AddressListViewModel>, IEnumerable<AddressListViewModel>>(req => {
                    req.Path = $"/API/Address/List";
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

        public async Task<ServiceResult> CreateAddress(string token, AddressViewModel data)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<AddressViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Address/Insert";
                    req.Content = data;
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

        #region Partners

        public async Task<ServiceResult> PartnersList(IEnumerable<PartnersListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<PartnersListViewModel>, IEnumerable<PartnersListViewModel>>(req => {
                    req.Path = $"/API/Partners/List";
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

        public async Task<ServiceResult> PartnersCreate(PartnersViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<PartnersViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Partners/Insert";
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

        public async Task<ServiceResult> PartnersUpdate(PartnersViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<PartnersViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Partners/Update?id=" + actividad.Part_ID;
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
        #endregion

        #region Countries

        public async Task<ServiceResult> CountriesList(IEnumerable<CountriesListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<CountriesListViewModel>, IEnumerable<CountriesListViewModel>>(req => {
                    req.Path = $"/API/Countries/List";
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

        public async Task<ServiceResult> CountriesCreate(CountriesViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<CountriesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Countries/Insert";
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

        public async Task<ServiceResult> CountriesUpdate(CountriesViewModel actividad, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<CountriesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Countries/Update?id=" + actividad.Pais_ID;
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
        #endregion

        #region PartnerType

        public async Task<ServiceResult> PartnerTypeList(IEnumerable<PartnerTypeListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<PartnerTypeListViewModel>, IEnumerable<PartnerTypeListViewModel>>(req => {
                    req.Path = $"/API/PartnerType/List";
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

        public async Task<ServiceResult> PartnerTypeCreate(PartnerTypeViewModel TipoPartner, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<PartnerTypeViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/PartnerType/Insert";
                    req.Content = TipoPartner;
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

        public async Task<ServiceResult> PartnerTypeUpdate(PartnerTypeViewModel TipoPartner, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<PartnerTypeViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/PartnerType/Update?id=" + TipoPartner.TiPar_ID;
                    req.Content = TipoPartner;
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

        public async Task<ServiceResult> ActivitiesDelete(PartnerTypeViewModel TipoPartner, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<PartnerTypeViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/PartnerType/Delete?id=" + id + "&mod=" + TipoPartner.TiPar_UsuarioModifica;
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
