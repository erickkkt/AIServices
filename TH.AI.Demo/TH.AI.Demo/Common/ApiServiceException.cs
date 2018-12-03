using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;

namespace TH.AI.Demo.Common
{
    [Serializable]
    public class ApiServiceException : Exception
    {        
        public HttpResponseMessage ResponseMessage { get; set; }

        public ApiServiceException() {
        }

        public ApiServiceException(string message, HttpResponseMessage responseMessage):base(message)
        {
            ResponseMessage = responseMessage;
        }
    }
}
