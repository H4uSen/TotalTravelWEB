using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace AHM_TOTAL_TRAVEL_WEB.WebAPI
{
    public class ApiCallConfiguration<T>
    {
        public string Path { get; set; }

        public string PathWithQueryStrings
        {
            get
            {
                if (QueryStrings.Any())
                {
                    // check de valores nulos
                    var keys = new List<string>(QueryStrings.Keys);
                    foreach (var k in keys)
                    {
                        if (QueryStrings[k] == null)
                            QueryStrings[k] = "";
                    }

                    return QueryHelpers.AddQueryString(Path, QueryStrings);
                }

                return Path;
            }
        }
    
        public Dictionary<string, string> QueryStrings { get; }

        public T Content { get; set; }

        public StringContent ContentJson
        {
            get
            {
                if (Content == null)
                    return null;

                return new StringContent(JsonConvert.SerializeObject(Content), Encoding.UTF8, "application/json");
            }
        }

        public ApiCallConfiguration()
        {
            QueryStrings = new Dictionary<string, string>();
        }
    }

    public class ApiCallConfigurationFormData<T>
    {
        public string Path { get; set; }

        public string PathWithQueryStrings
        {
            get
            {
                if (QueryStrings.Any())
                {
                    // check de valores nulos
                    var keys = new List<string>(QueryStrings.Keys);
                    foreach (var k in keys)
                    {
                        if (QueryStrings[k] == null)
                            QueryStrings[k] = "";
                    }

                    return QueryHelpers.AddQueryString(Path, QueryStrings);
                }

                return Path;
            }
        }

        public Dictionary<string, string> QueryStrings { get; }

        public T Content { get; set; }

        public StringContent ContentJson
        {
            get
            {
                if (Content == null)
                    return null;

                return new StringContent(JsonConvert.SerializeObject(Content), Encoding.UTF8);
            }
        }

        public ApiCallConfigurationFormData()
        {
            QueryStrings = new Dictionary<string, string>();
        }
    }

}
