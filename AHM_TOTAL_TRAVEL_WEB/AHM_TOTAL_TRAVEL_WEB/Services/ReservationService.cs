using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class ReservationService
    {
        private readonly API _api;

        public ReservationService(API api)
        {
            _api = api;
        }
        #region Reservations
        public async Task<ServiceResult> ReservationList(IEnumerable<ReservationListViewModel> model, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationListViewModel>, IEnumerable<ReservationListViewModel>>(req => {
                    req.Path = $"/API/Reservation/List";
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
        #region Reservacion Restaurants

        public async Task<ServiceResult> RestaurantsReservationList(IEnumerable<ReservationRestaurantsListViewModel> model, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationRestaurantsListViewModel>, IEnumerable<ReservationRestaurantsListViewModel>>(req => {
                    req.Path = $"/API/ReservationRestaurant/List";
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

        public async Task<ServiceResult> RestaurantsReservationCreate(ReservationRestaurantsViewModel reservationRestaurants, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<ReservationRestaurantsViewModel, RequestStatus>(req => {
                    req.Path = $"/API/ReservationRestaurant/Insert";
                    req.Content = reservationRestaurants;
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



        #region Reservacion Transporte

        public async Task<ServiceResult> transportationReservationList(IEnumerable<ReservationTransportationListViewModel> model, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationTransportationListViewModel>, IEnumerable<ReservationTransportationListViewModel>>(req => {
                    req.Path = $"/API/ReservationTransportation/List";
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

        public async Task<ServiceResult> transportationReservationCreate(ReservationTransportationViewModel  reservationTransportation, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<ReservationTransportationViewModel, RequestStatus>(req => {
                    req.Path = $"/API/ReservationTransportation/Insert";
                    req.Content = reservationTransportation;
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


        #region Reservacion Actividades Extra

        public async Task<ServiceResult> ExtraActivitiesReservationList(IEnumerable<ReservationExtraActivitiesListViewModel> model, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationExtraActivitiesListViewModel>, IEnumerable<ReservationExtraActivitiesListViewModel>>(req => {
                    req.Path = $"/API/ReservationActivitiesExtra/List";
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

        public async Task<ServiceResult> ExtraActivitiesReservationCreate(ReservationExtraActivitiesViewModel   reservationExtraActivities, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<ReservationExtraActivitiesViewModel, RequestStatus>(req => {
                    req.Path = $"/API/ReservationActivitiesExtra/Insert";
                    req.Content = reservationExtraActivities;
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

        #region ReservacionDetalles

        public async Task<ServiceResult> ReservationDetailsList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationDetailsListViewModel>, IEnumerable<ReservationDetailsListViewModel>>(req => {
                    req.Path = $"/API/ReservationDetails/List";

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


        public async Task<ServiceResult> ReservationDetailsCreate(ReservationDetailsViewModel reservaciondetalle, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<ReservationDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationDetails/Insert";
                    req.Content = reservaciondetalle;
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

        public async Task<ServiceResult> ReservationDetailsUpdate(ReservationDetailsViewModel reservaciondetalle, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<ReservationDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationDetails/Update?id=" + reservaciondetalle.ReDe_ID;
                    req.Content = reservaciondetalle;
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

        public async Task<ServiceResult> ReservationDetailsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new ReservationDetailsListViewModel();

            try
            {
                var response = await _api.Get<ReservationDetailsListViewModel, ReservationDetailsListViewModel>(req => {
                    req.Path = $"/API/ReservationDetails/Find?id=" + id;
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

        public async Task<ServiceResult> ReservationDetailsDelete(ReservationDetailsViewModel reservaciondetalle, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<ReservationDetailsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationDetails/Delete?id=" + id + "&mod=" + reservaciondetalle.ReDe_UsuarioModifica;
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

        #region ReservacionHoteles

        public async Task<ServiceResult> ReservationHotelsList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationHotelsListViewModel>, IEnumerable<ReservationHotelsListViewModel>>(req => {
                    req.Path = $"/API/ReservationHotels/List";

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


        public async Task<ServiceResult> ReservationHotelsCreate(ReservationHotelsViewModel reservacionhotel, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<ReservationHotelsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationHotels/Insert";
                    req.Content = reservacionhotel;
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

        public async Task<ServiceResult> ReservationHotelsUpdate(ReservationHotelsViewModel reservacionhotel, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<ReservationHotelsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationHotels/Update?id=" + reservacionhotel.ReHo_ID;
                    req.Content = reservacionhotel;
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

        public async Task<ServiceResult> ReservationHotelsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new ReservationHotelsListViewModel();

            try
            {
                var response = await _api.Get<ReservationHotelsListViewModel, ReservationHotelsListViewModel>(req => {
                    req.Path = $"/API/ReservationHotels/Find?id=" + id;
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

        public async Task<ServiceResult> ReservationHotelsDelete(ReservationHotelsViewModel reservacionhotel, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<ReservationHotelsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationHotels/Delete?id=" + id + "&mod=" + reservacionhotel.ReHo_UsuarioModifica;
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

        #region ReservacionActividadesHoteles

        public async Task<ServiceResult> ReservationActivitiesHotelsList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<ReservationActivitiesHotelsListViewModel>, IEnumerable<ReservationActivitiesHotelsListViewModel>>(req => {
                    req.Path = $"/API/ReservationActivitiesHotels/List";

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


        public async Task<ServiceResult> ReservationActivitiesHotelsCreate(ReservationActivitiesHotelsViewModel reservacionacthotel, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<ReservationActivitiesHotelsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationActivitiesHotels/Insert";
                    req.Content = reservacionacthotel;
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

        public async Task<ServiceResult> ReservationActivitiesHotelsUpdate(ReservationActivitiesHotelsViewModel reservacionacthotel, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<ReservationActivitiesHotelsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationActivitiesHotels/Update?id=" + reservacionacthotel.ReAH_ID;
                    req.Content = reservacionacthotel;
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

        public async Task<ServiceResult> ReservationActivitiesHotelsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new ReservationActivitiesHotelsListViewModel();

            try
            {
                var response = await _api.Get<ReservationActivitiesHotelsListViewModel, ReservationActivitiesHotelsListViewModel>(req => {
                    req.Path = $"/API/ReservationActivitiesHotels/Find?id=" + id;
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

        public async Task<ServiceResult> ReservationActivitiesHotelsDelete(ReservationActivitiesHotelsViewModel reservacionacthotel, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<ReservationActivitiesHotelsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/ReservationActivitiesHotels/Delete?id=" + id + "&mod=" + reservacionacthotel.ReAH_UsuarioModifica;
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
