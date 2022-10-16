using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public class RestaurantService
    {

        private readonly API _api;

        public RestaurantService(API api)
        {
            _api = api;
        }
        #region Restaurants

        public async Task<ServiceResult> RestaurantsList(string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<RestaurantListViewModel>, IEnumerable<RestaurantListViewModel>>(req => {
                    req.Path = $"/API/Restaurants/List";
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

        public async Task<ServiceResult> RestaurantCreate(RestaurantViewModel restaurant, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<RestaurantViewModel, RequestStatus>(req => {
                    req.Path = $"/API/Restaurants/Insert";
                    req.Content = restaurant;
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



        public async Task<ServiceResult> RestaurantFind(string id, string token)
        {
            var Result = new ServiceResult();
            var typeMenu = new RestaurantListViewModel();

            try
            {
                var response = await _api.Get<RestaurantListViewModel, RestaurantListViewModel>(req => {
                    req.Path = $"/API/Restaurants/Find?id=" + id;
                    req.Content = typeMenu;
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

        #region Menus
        public async Task<ServiceResult> MenusList(IEnumerable<MenusListViewModel> model)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<MenusListViewModel>, IEnumerable<MenusListViewModel>>(req => {
                    req.Path = $"/API/Menus/List";
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


        public async Task<ServiceResult> MenusDelete(MenusViewModel Menus, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<MenusViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/Menus/Delete?id=" + id + "&mod=" + Menus.Menu_UsuarioModifica;
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


        public async Task<ServiceResult> MenusFind(string id, string token)
        {
            var Result = new ServiceResult();
            var Menu = new MenusListViewModel();

            try
            {
                var response = await _api.Get<MenusListViewModel, MenusListViewModel>(req => {
                    req.Path = $"/API/Menus/Find?id=" + id;
                    req.Content = Menu;
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

        #region TypeMenus
        public async Task<ServiceResult> TypeMenusList()
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Get<IEnumerable<TypeMenusListViewModel>, IEnumerable<TypeMenusListViewModel>>(req => {
                    req.Path = $"/API/MenuTypes/List";
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


        public async Task<ServiceResult> typeMenusCreate(TypeMenusViewModel typeMenu, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Post<TypeMenusViewModel, RequestStatus>(req => {
                    req.Path = $"/API/MenuTypes/Insert";
                    req.Content = typeMenu;
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

        public async Task<ServiceResult> TypeMenusUpdate(TypeMenusViewModel typeMenus, string token)
        {
            var Result = new ServiceResult();

            try
            {
                var response = await _api.Put<TypeMenusViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/MenuTypes/Update?id=" + typeMenus.Time_ID;
                    req.Content = typeMenus;
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

        public async Task<ServiceResult> TypeMenusDelete(TypeMenusViewModel typeMenus, int id, string token)
        {
            var Result = new ServiceResult();

            try
            {

                var response = await _api.Delete<TypeMenusViewModel, RequestStatus>(req =>
                {
                    req.Path = $"/API/MenuTypes/Delete?id=" + id + "&mod=" + typeMenus.Time_UsuarioModifica;
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


        public async Task<ServiceResult> TypeMenusFind(string id, string token)
        {
            var Result = new ServiceResult();
            var typeMenu = new TypeMenusListViewModel();

            try
            {
                var response = await _api.Get<TypeMenusListViewModel, TypeMenusListViewModel>(req => {
                    req.Path = $"/API/MenuTypes/Find?id=" + id;
                    req.Content = typeMenu;
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
