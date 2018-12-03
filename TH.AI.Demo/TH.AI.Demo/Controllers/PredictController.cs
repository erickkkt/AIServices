﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TH.AI.Demo.Entities;
using TH.AI.Demo.Services;

namespace TH.AI.Demo.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PredictController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IPredictService _predictService;

        public PredictController(ILoggerFactory loggerFactory,  IPredictService predictService)
        {
            _logger = loggerFactory.CreateLogger(typeof(PredictController));
            _predictService = predictService;
        }

        [HttpPost]
        [Route("spam")]
        public async Task<SpamResult> PredictSpamMail([FromBody]EmailModel emailModel)
        {
            var result = new SpamResult();
            try
            {
                result = await _predictService.PredictSpamMailAsync(emailModel.Email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return result;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
