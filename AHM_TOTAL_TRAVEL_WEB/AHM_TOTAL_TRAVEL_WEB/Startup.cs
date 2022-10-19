using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AHM_TOTAL_TRAVEL_WEB.Services;
using System.Net;
using AHM_TOTAL_TRAVEL_WEB.Extensions;
using System.Security.Claims;

namespace AHM_TOTAL_TRAVEL_WEB
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLocalization(options => {
                options.ResourcesPath = "Resources";
            });
            services.AddAutoMapper(x => x.AddProfile<MappingProfileExtensions>(), AppDomain.CurrentDomain.GetAssemblies());
            services.AddControllersWithViews().AddViewLocalization();
            services.Configure<RequestLocalizationOptions>(options =>
            {
                options.DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("en-US");
                options.SupportedCultures = new List<System.Globalization.CultureInfo>
                {
                    new System.Globalization.CultureInfo("en-US"),
                    new System.Globalization.CultureInfo("es-ES")
                };
                options.SupportedUICultures = new List<System.Globalization.CultureInfo>
                {
                    new System.Globalization.CultureInfo("en-US"),
                    new System.Globalization.CultureInfo("es-ES")
                };
            });
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(option => {
                option.LoginPath = "/Access/LandingPage";
                option.ExpireTimeSpan = TimeSpan.FromMinutes(20);
                option.AccessDeniedPath = "/Home/Error";
            });
            services.AddAuthorization(options => {
                options.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, "Administrador"));
                options.AddPolicy("Client", policy => policy.RequireClaim(ClaimTypes.Role, "Cliente"));
                options.AddPolicy("Hotel", policy => policy.RequireClaim(ClaimTypes.Role, "Moderador de Hotel"));
                options.AddPolicy("Transport", policy => policy.RequireClaim(ClaimTypes.Role, "Moderador de Transporte"));
                options.AddPolicy("Restaurant", policy => policy.RequireClaim(ClaimTypes.Role, "Moderador de Restaurante"));
            });
            services.AddControllersWithViews()
                .AddViewLocalization()
                .AddDataAnnotationsLocalization();
            
            services.BusinessLogic();
            services.AddMvc();
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IOTimeout = TimeSpan.FromMinutes(60);
            });
            services.AddOptions();

            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseSession();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseRequestLocalization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
