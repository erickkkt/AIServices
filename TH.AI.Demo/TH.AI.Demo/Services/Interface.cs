using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TH.AI.Demo.Entities;

namespace TH.AI.Demo.Services
{
    public interface IPredictService
    {
        Task<SpamResult> PredictSpamMailAsync(string email);
    }
}
