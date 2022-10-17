using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class HotelsService
    {
        private readonly API _api;

        public HotelsService(API api)
        {
            _api = api;
        }
        #region Habitaciones
        //RoomsListViewModel LIST
        public async Task<ServiceResult> RoomsList(IEnumerable<RoomsListViewModel> model)
            {
                var result = new ServiceResult();
                try
                {
                    var response = await _api.Get<IEnumerable<RoomsListViewModel>, IEnumerable<RoomsListViewModel>>(req => {
                        req.Path = $"/API/Rooms/List";
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

        internal Task RoomsList()
        {
            throw new NotImplementedException();
        }

        //RoomsListViewModel CREATE
        public async Task<ServiceResult> RoomsCreate(RoomsViewModel habitacion, string token)
            {
                var Result = new ServiceResult();
                try
                {
                    var response = await _api.Post<RoomsViewModel, RequestStatus>(req =>
                    {
                        req.Path = $"/API/Rooms/Insert";
                        req.Content = habitacion;
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


        //RoomsListViewModel UPDATE
        public async Task<ServiceResult> RoomsUpdate(RoomsViewModel habitacion, int id, string token)
            {
                var Result = new ServiceResult();
                try
                {
                    var response = await _api.Put<RoomsViewModel, RequestStatus>(req =>
                    {
                        req.Path = $"/API/Rooms/Update?id=" + id;
                        req.Content = habitacion;
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

            //RoomsListViewModel DELETE
            public async Task<ServiceResult> RoomsDelete(RoomsViewModel habitacion, int id, string token)
            {
                var Result = new ServiceResult();
                try
                {
                    var response = await _api.Delete<RoomsViewModel, RequestStatus>(req =>
                    {
                        req.Path = $"/API/Rooms/Delete?id=" + id + "&mod=" + habitacion.Habi_UsuarioModifica;
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

        #region Categorias Habitaciones
        //RoomsListViewModel LIST
        public async Task<ServiceResult> CategoriesRoomsList()
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<categoryroomsListViewModel>, IEnumerable<categoryroomsListViewModel>>(req => {
                    req.Path = $"/API/CategoriesRooms/List";
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

        //RoomsListViewModel CREATE
        public async Task<ServiceResult> CategoriesRoomsCreate(categoryroomsViewModel categoriahabitacion, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Post<categoryroomsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/CategoriesRooms/Insert";
                    req.Content = categoriahabitacion;
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


        //RoomsListViewModel UPDATE
        public async Task<ServiceResult> CategoriesRoomsUpdate(categoryroomsViewModel categoriahabitacion, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Put<categoryroomsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/CategoriesRooms/Update?id=" + categoriahabitacion.CaHa_ID;
                    req.Content = categoriahabitacion;
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

        //RoomsListViewModel DELETE
        public async Task<ServiceResult> CategoriesRoomsDelete(categoryroomsViewModel categoriahabitacion, int id, string token)
        {
            var Result = new ServiceResult();
            try
            {
                var response = await _api.Delete<categoryroomsViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/CategoriesRooms/Delete?id=" + id + "&mod=" + categoriahabitacion.CaHa_UsuarioModifica;
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

        public async Task<ServiceResult> CategoriesRoomsFind(string id, string token)
        {
            var Result = new ServiceResult();
            var room = new categoryroomsListViewModel();

            try
            {
                var response = await _api.Get<categoryroomsListViewModel, categoryroomsListViewModel>(req => {
                    req.Path = $"/API/CategoriesRooms/Find?id=" + id;
                    req.Content = room;
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

        #region Hoteles

        public async Task<ServiceResult> HotelsList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<HotelListViewModel>, IEnumerable<HotelListViewModel>>(req => {
                    req.Path = $"/API/Hotels/List";
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

        public async Task<ServiceResult> HotelCreate(HotelViewModel hotel, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<HotelViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Hotels/Insert";
                    req.Content = hotel;
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

        //public async Task<ServiceResult> ActivitiesUpdate(ActivitiesViewModel actividad, int id, string token)
        //{
        //    var Result = new ServiceResult();

        //    try
        //    {

        //        var response = await _api.Put<ActivitiesViewModel, RequestStatus>(req =>
        //        {
        //            req.Path = $"/API/Activities/Update?id=" + id;
        //            req.Content = actividad;
        //        },
        //        token
        //        );
        //        if (!response.Success)
        //        {
        //            return Result.FromApi(response);
        //        }
        //        else
        //        {
        //            return Result.Ok(response.Data);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Result.Error(Helpers.GetMessage(ex));
        //        throw;
        //    }

        //}

        public async Task<ServiceResult> HotelDelete(HotelViewModel transporte, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Delete<HotelViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Hotels/Delete?id=" + id + "&mod=" + transporte.Hote_UsuarioModifica;
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

        #region Hoteles Menu

        public async Task<ServiceResult> HotelsMenuList(IEnumerable<HotelsMenuListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<HotelsMenuListViewModel>, IEnumerable<HotelsMenuListViewModel>>(req => {
                    req.Path = $"/API/HotelsMenu/List";
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

        public async Task<ServiceResult> HotelsMenuCreate(HotelsMenuViewModel menuhotel, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<HotelsMenuViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/HotelsMenu/Insert";
                    req.Content = menuhotel;
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

        public async Task<ServiceResult> HotelsMenuUpdate(HotelsMenuViewModel menuhotel, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Put<HotelsMenuViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/HotelsMenu/Update?id=" + id;
                    req.Content = menuhotel;
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

        public async Task<ServiceResult> HotelsMenuDelete(HotelsMenuViewModel menuhotel, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<HotelsMenuViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/HotelsMenu/Delete?id=" + id + "&mod=" + menuhotel.HoMe_UsuarioModifica;
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
        public async Task<ServiceResult> HotelsMenuFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new HotelsMenuListViewModel();

            try
            {
                var response = await _api.Get<HotelsMenuListViewModel, HotelsMenuListViewModel>(req => {
                    req.Path = $"/API/HotelsMenu/Find?id=" + id;
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

        #region Hoteles Actividades

        public async Task<ServiceResult> HotelsActivitiesList(IEnumerable<HotelsActivitiesListViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<IEnumerable<HotelsActivitiesListViewModel>, IEnumerable<HotelsActivitiesListViewModel>>(req => {
                    req.Path = $"/API/HotelsActivities/List";
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

        public async Task<ServiceResult> HotelsActivitiesCreate(HotelsActivitiesViewModel actividades, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<HotelsActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/HotelsActivities/Insert";
                    req.Content = actividades;
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

        public async Task<ServiceResult> HotelsActivitiesUpdate(HotelsActivitiesViewModel actividades, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Put<HotelsActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/HotelsActivities/Update?id=" + id;
                    req.Content = actividades;
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

        public async Task<ServiceResult> HotelsActivitiesDelete(HotelsActivitiesViewModel actividades, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<HotelsActivitiesViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/HotelsActivities/Delete?id=" + id + "&mod=" + actividades.HoAc_UsuarioModifica;
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
        public async Task<ServiceResult> HotelsActivitiesFind(string id, string token)
        {
            var Result = new ServiceResult();
            var cuenta = new HotelsActivitiesListViewModel();

            try
            {
                var response = await _api.Get<HotelsActivitiesListViewModel, HotelsActivitiesListViewModel>(req => {
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
    }
}
