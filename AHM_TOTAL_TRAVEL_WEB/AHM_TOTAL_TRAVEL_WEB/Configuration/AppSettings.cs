using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Configuration
{
    public class appSettings
    {
        public JWTSecuritySettings JWTSecurity { get; set; }
        public ApiSettingsJSON ApiSettings { get; set; }

        public class JWTSecuritySettings
        {
            public string Key { get; set; }
            public string ExpiresMinutes { get; set; }
        }

        public class ApiSettingsJSON
        {
            public string BaseUrl { get; set; }
            public int TimeoutSeconds { get; set; }

        }

    }
}
