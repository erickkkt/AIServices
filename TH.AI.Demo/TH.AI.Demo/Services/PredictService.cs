using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TH.AI.Demo.Common;
using TH.AI.Demo.Entities;

namespace TH.AI.Demo.Services
{
    public class PredictService : IPredictService
    {
        private readonly IApiService _apiService;
        private readonly ILogger _logger;
        private readonly IOptions<AppSetting> _appSetting;

        public PredictService(IApiService apiService, ILoggerFactory loggerFactory, IOptions<AppSetting> appSetting)
        {
            _apiService = apiService;
            _logger = loggerFactory.CreateLogger(typeof(PredictService));
            _appSetting = appSetting;
        }

        public async Task<SpamResult> PredictSpamMailAsync(string email)
        {
            var isHam = true;
            var appSetting = _appSetting.Value;
            var configuration = appSetting.AzureMLApiSetting;
            var azureResponseModel = await InvokeRequestResponseService(email, configuration);
            var labelIndex = azureResponseModel?.Results?.output1?.value?.Values?.Count - 1;
            var columnNames = azureResponseModel.Results.output1.value.ColumnNames;
            var predictValues = azureResponseModel.Results.output1.value.Values[0];
            var ham = GetValueByColumnName(columnNames, predictValues, "Scored Labels");
            isHam = ham?.ToString().ToLower() == "ham";
            return new SpamResult() {
                SpamMail = !isHam
            };
        }

        private async Task<AzureResponseModel> InvokeRequestResponseService(string email, AzureMLApiSetting configuration)
        {
            var BaseUrl = configuration.API_RRS;
            var tableModel = new TableModel();
            var columnsNames = new List<string>();
            columnsNames.Add("v1");
            columnsNames.Add("v2");
            var values = new List<List<string>>();
            var emailPredict = new List<string>();
            emailPredict.Add("Predict");
            emailPredict.Add(email);
            values.Add(emailPredict);

            tableModel.ColumnNames = columnsNames.ToArray();
            tableModel.Values = values;

            var azureRequestModel = new AzureRequestModel()
            {
                Inputs = new InputModel()
                {
                    input1 = tableModel
                },
                GlobalParameters = new GlobalParameter()
            };

            var headers = new Dictionary<string, string>();
            var key = $"Bearer {configuration.AccessKey}";
            headers.Add("Authorization", key);
            try
            {
                var result = await _apiService.PostAsync<AzureRequestModel, AzureResponseModel>(BaseUrl, azureRequestModel, headers);
                return result;
            }
            catch (ApiServiceException ex)
            {
                var content = await ex.ResponseMessage.Content.ReadAsStringAsync();
                _logger.LogError($"{System.Reflection.MethodBase.GetCurrentMethod().ReflectedType.FullName}: Call Azure API fail. {content}. Status Code: {ex.ResponseMessage?.StatusCode}");
                throw;
            }
        }

        private object GetValueByColumnName(string[] columnNames, List<string> predictValue, string columnName)
        {
            var index = -1;
            for (int i = 0; i < columnNames.Length; i++)
            {
                if (columnNames[i].ToString().Trim() == columnName.Trim())
                {
                    index = i;
                    break;
                }
            }
            if (index != -1)
            {
                return predictValue[index];
            }
            return null;
        }
    }
}
