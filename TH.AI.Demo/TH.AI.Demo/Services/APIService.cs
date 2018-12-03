using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TH.AI.Demo.Common;

namespace TH.AI.Demo.Services
{
    public class ApiService : IApiService, IDisposable
    {
        private HttpClient _client;

        public async Task<T> GetAsync<T>(string apiUrl, Dictionary<string, string> headers = null, string baseUrl = null) where T : class
        {
            _client = new HttpClient();          
            _client.DefaultRequestHeaders.Accept.Clear();

            if (headers != null)
            {
                foreach (var header in headers)
                {
                    _client.DefaultRequestHeaders.Add(header.Key, header.Value);
                }
            }            

            // HTTP GET
            HttpResponseMessage response = await _client.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsAsync<T>();
            }
            else
            {
                var message = "The request failed";
                string responseContent = await response.Content.ReadAsStringAsync();

                var resp = new HttpResponseMessage(response.StatusCode)
                {
                    StatusCode = response.StatusCode,
                    Content = new StringContent(responseContent),
                    ReasonPhrase = response.ReasonPhrase
                };
                throw new ApiServiceException(message, resp);
            }
        }

        public async Task<U> PostAsync<T, U>(string apiUrl, T data, Dictionary<string, string> headers = null) where T : class
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Accept.Clear();
            
            if (headers != null)
            {
                foreach (var header in headers)
                {
                    _client.DefaultRequestHeaders.Add(header.Key, header.Value);
                }
            }
            _client.DefaultRequestHeaders.Add("contentType", "application/json");
            // HTTP POST
            HttpResponseMessage response;
            if (data is MultipartFormDataContent)
            {
                response = await _client.PostAsync(apiUrl, data as MultipartFormDataContent);
            }
            else
            {
                response = await _client.PostAsJsonAsync(apiUrl, data);
            }

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsAsync<U>();
            }
            else
            {
                var message = "The request failed";                
                string responseContent = await response.Content.ReadAsStringAsync();
                
                var resp = new HttpResponseMessage(response.StatusCode)
                {
                    StatusCode = response.StatusCode,
                    Content = new StringContent(responseContent),
                    ReasonPhrase = response.ReasonPhrase
                };
                throw new ApiServiceException(message, resp);
            }            
        }

        public async Task<U> PutAsync<T, U>(string apiUrl, T data, Dictionary<string, string> headers = null) where T : class
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Accept.Clear();

            if (headers != null)
            {
                foreach (var header in headers)
                {
                    _client.DefaultRequestHeaders.Add(header.Key, header.Value);
                }
            }

            // HTTP PUT
            HttpResponseMessage response = await _client.PutAsJsonAsync(apiUrl, data);
            response.EnsureSuccessStatusCode();

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsAsync<U>();
            }
            else
            {
                var message = "The request failed";
                string responseContent = await response.Content.ReadAsStringAsync();

                var resp = new HttpResponseMessage(response.StatusCode)
                {
                    StatusCode = response.StatusCode,
                    Content = new StringContent(responseContent),
                    ReasonPhrase = response.ReasonPhrase
                };
                throw new ApiServiceException(message, resp);
            }
        }

        public async Task<T> DeleteAsync<T>(string apiUrl, Dictionary<string, string> headers = null)
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Accept.Clear();

            if (headers != null)
            {
                foreach (var header in headers)
                {
                    _client.DefaultRequestHeaders.Add(header.Key, header.Value);
                }
            }

            // HTTP DELETE
            HttpResponseMessage response = await _client.DeleteAsync(apiUrl);
            response.EnsureSuccessStatusCode();

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsAsync<T>();
            }
            else
            {
                var message = "The request failed";
                string responseContent = await response.Content.ReadAsStringAsync();

                var resp = new HttpResponseMessage(response.StatusCode)
                {
                    StatusCode = response.StatusCode,
                    Content = new StringContent(responseContent),
                    ReasonPhrase = response.ReasonPhrase
                };
                throw new ApiServiceException(message, resp);
            }
        }
        
        public void Dispose()
        {
            _client?.Dispose();
        }
    }
}
