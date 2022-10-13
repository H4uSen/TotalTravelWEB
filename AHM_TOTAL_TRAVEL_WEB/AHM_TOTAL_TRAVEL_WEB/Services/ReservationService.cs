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


        #region Reservacion Actividades Extrax

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
    }
}
