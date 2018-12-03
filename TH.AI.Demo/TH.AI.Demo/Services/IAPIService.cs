using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TH.AI.Demo.Services
{ 
    public interface IApiService
    {
        Task<T> GetAsync<T>(string apiUrl, Dictionary<string, string> headers = null, string baseUrl = null) where T : class;
        Task<U> PostAsync<T, U>(string apiUrl, T data, Dictionary<string, string> headers = null) where T : class;
        Task<U> PutAsync<T, U>(string apiUrl, T data, Dictionary<string, string> headers = null) where T : class;
        Task<T> DeleteAsync<T>(string apiUrl, Dictionary<string, string> headers = null);
    }
}
