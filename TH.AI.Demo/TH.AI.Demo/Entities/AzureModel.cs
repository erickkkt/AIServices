using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TH.AI.Demo.Entities
{
    public class TableModel
    {
        public string[] ColumnNames { get; set; }
        public IList<List<string>> Values { get; set; }
    }

    public class AzureResponseModel
    {
        public ResultModel Results { get; set; }
    }

    public class AzureFeatureNamesResponseModel
    {
        public ResultFeatureNamesModel Results { get; set; }
    }

    public class AzureRequestModel
    {
        public InputModel Inputs { get; set; }
        public GlobalParameter GlobalParameters { get; set; }
    }

    public class ResultModel
    {
        public OutputModel output1 { get; set; }
    }

    public class ResultFeatureNamesModel
    {
        public OutputModel FeaturesPredict { get; set; }
    }

    public class OutputModel
    {
        public string type { get; set; }
        public TableModel value { get; set; }
    }

    public class InputModel
    {
        public TableModel input1 { get; set; }
    }

    public class GlobalParameter
    {
    }
}
