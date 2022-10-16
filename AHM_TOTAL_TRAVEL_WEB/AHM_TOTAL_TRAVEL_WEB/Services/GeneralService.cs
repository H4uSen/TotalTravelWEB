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

        public async Task<ServiceResult> CitiesList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<CityListViewModel>, IEnumerable<CityListViewModel>>(req => {
                    req.Path = $"/API/Cities/List";
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
        public async Task<ServiceResult> CitiesUpdate(CityViewModel  city, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Put<CityViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Cities/Update?id=" + id + "&mod=" + city.ciud_UsuarioModifica;
                    req.Content = city;
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


        public async Task<ServiceResult> CityFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new CityListViewModel();

            try
            {
                var response = await _api.Get<CityListViewModel, CityListViewModel>(req => {
                    req.Path = $"/API/Cities/Find?id=" + id;
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
        public async Task<ServiceResult> AddressDelete(AddressViewModel Address, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<AddressViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Address/Delete?id=" + id + "&mod=" + Address.Dire_UsuarioModifica;
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
        public async Task<ServiceResult> AddressFind(string id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<AddressListViewModel, AddressListViewModel>(req => {
                    req.Path = $"/API/Address/Find?id=" + id;
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

        #region Partners

        public async Task<ServiceResult> PartnersList()
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
                var response = await _api.Put<PartnersViewModel, RequestStatus>(req =>
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
        public async Task<ServiceResult> PartnersFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new PartnersListViewModel();

            try
            {
                var response = await _api.Get<PartnersListViewModel, PartnersListViewModel>(req => {
                    req.Path = $"/API/Partners/Find?id=" + id;
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

        #region Countries

        public async Task<ServiceResult> CountriesList()
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
                var response = await _api.Put<CountriesViewModel, RequestStatus>(req =>
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

        public async Task<ServiceResult> PartnerTypeUpdate(PartnerTypeViewModel TipoPartner, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<PartnerTypeViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/PartnerType/Update?id=" + id;
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

        public async Task<ServiceResult> PartnerTypeDelete(int modifica, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<PartnerTypeViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/PartnerType/Delete?id=" + id + "&mod=" + modifica;
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

        public async Task<ServiceResult> PartnerTypeFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new PartnerTypeListViewModel();

            try
            {
                var response = await _api.Get<PartnerTypeListViewModel, PartnerTypeListViewModel>(req => {
                    req.Path = $"/API/PartnerType/Find?Id=" + id;
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

        #region Colonias

        public async Task<ServiceResult> SuburbsList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<SuburbsListViewModel>, IEnumerable<SuburbsListViewModel>>(req => {
                    req.Path = $"/API/Suburbs/List";

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


        public async Task<ServiceResult> SuburbsCreate(SuburbsViewModel colonia, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<SuburbsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Suburbs/Insert";
                    req.Content = colonia;
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

        public async Task<ServiceResult> SuburbsUpdate(SuburbsViewModel colonia, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<SuburbsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Suburbs/Update?id=" + colonia.Colo_ID;
                    req.Content = colonia;
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

        public async Task<ServiceResult> SuburbsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new SuburbsListViewModel();

            try
            {
                var response = await _api.Get<SuburbsListViewModel, SuburbsListViewModel>(req => {
                    req.Path = $"/API/Suburbs/Find?id=" + id;
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

        public async Task<ServiceResult> SuburbsDelete(SuburbsViewModel colonia, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<SuburbsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Suburbs/Delete?id=" + id + "&mod=" + colonia.Colo_UsuarioModifica;
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
