using AHM_TOTAL_TRAVEL_WEB.Configuration;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Services
{
    public static class ServiceConfiguration
    {
        public static void BusinessLogic(this IServiceCollection services)
        {
            services.AddTransient<AccessService>();
            services.AddTransient<ActivitiesServices>();
            services.AddTransient<GeneralService>();
            services.AddTransient<RestaurantService>();
            services.AddTransient<RegistrationPaymentsService>();
            services.AddTransient<HttpClient>();
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<appSettings>();
            services.AddTransient<API>();
        }
    }
}
