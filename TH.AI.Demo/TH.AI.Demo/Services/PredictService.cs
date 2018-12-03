using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TH.AI.Demo.Entities;

namespace TH.AI.Demo.Services
{
    public class PredictService : IPredictService
    {
        public Task<SpamResult> PredictSpamMailAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
