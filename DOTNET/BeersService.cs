using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Requests.Beers;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class BeersService : IBeersService
    {
        IDataProvider _data = null;

        public BeersService(IDataProvider data)
        {
            _data = data;
        }

        public List<Beer> GetExample()
        {
            string procName = "[dbo].[BeersMarkov_SelectExample]";

            List<Beer> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Beer aBeer = MapBeer(reader);

                if (list == null)
                {
                    list = new List<Beer>();
                }
                list.Add(aBeer);
            }

            );

            return list;
        }

        public List<Beer> GetAllByModelId(int modelId)
        {
            string procName = "[dbo].[BeersMarkov_SelectByModelId]";

            List<Beer> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@BeerModelNameId", modelId);

            }, delegate (IDataReader reader, short set)
            {
                Beer aBeer = MapBeer(reader);

                if (list == null)
                {
                    list = new List<Beer>();
                }
                list.Add(aBeer);
            }

            );

            return list;
        }

        public void Update(BeersUpdateRequest model, int userId)
        {
            DataTable myParamValue = null;

            if (model.Beers != null)
            {
                myParamValue = MapBeersToTable(model.Beers, userId);
            }

            string procName = "[dbo].[BeersMarkov_UpdateBatch]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection sqlParams)
            {
                sqlParams.AddWithValue("@BatchBeers", myParamValue);

            }, returnParameters: null);
        }

        private static Beer MapBeer(IDataReader reader)
        {
            Beer aBeer = new Beer();

            int startingIndex = 0;

            aBeer.Id = reader.GetSafeInt32(startingIndex++);
            aBeer.ModelId = reader.GetSafeInt32(startingIndex++);
            aBeer.Name = reader.GetSafeString(startingIndex++);
            aBeer.QuantityStart = reader.GetSafeInt32(startingIndex++);
            aBeer.ProbabilityA = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityB = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityC = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityD = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityE = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityF = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityG = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityH = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.ProbabilityI = (float)reader.GetSafeDouble(startingIndex++);
            aBeer.Growth = reader.GetSafeInt32(startingIndex++);
            aBeer.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aBeer.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            aBeer.DateAdded = reader.GetSafeDateTime(startingIndex++);
            aBeer.DateModified = reader.GetSafeDateTime(startingIndex++);
            return aBeer;
        }

        private DataTable MapBeersToTable(List<BeerUpdateRequest> beersToMap, int userId)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Id", typeof(Int32));
            dt.Columns.Add("Name", typeof(String));
            dt.Columns.Add("Quantity", typeof(Int32));
            dt.Columns.Add("PxA", typeof(float));
            dt.Columns.Add("PxB", typeof(float));
            dt.Columns.Add("PxC", typeof(float));
            dt.Columns.Add("PxD", typeof(float));
            dt.Columns.Add("PxE", typeof(float));
            dt.Columns.Add("PxF", typeof(float));
            dt.Columns.Add("PxG", typeof(float));
            dt.Columns.Add("PxH", typeof(float));
            dt.Columns.Add("PxI", typeof(float));
            dt.Columns.Add("Growth", typeof(Int32));
            dt.Columns.Add("ModifiedBy", typeof(String));

            foreach (BeerUpdateRequest singleBeer in beersToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleBeer.Id);
                dr.SetField(startingIndex++, singleBeer.Name);
                dr.SetField(startingIndex++, singleBeer.QuantityStart);
                dr.SetField(startingIndex++, singleBeer.ProbabilityA);
                dr.SetField(startingIndex++, singleBeer.ProbabilityB);
                dr.SetField(startingIndex++, singleBeer.ProbabilityC);
                dr.SetField(startingIndex++, singleBeer.ProbabilityD);
                dr.SetField(startingIndex++, singleBeer.ProbabilityE);
                dr.SetField(startingIndex++, singleBeer.ProbabilityF);
                dr.SetField(startingIndex++, singleBeer.ProbabilityG);
                dr.SetField(startingIndex++, singleBeer.ProbabilityH);
                dr.SetField(startingIndex++, singleBeer.ProbabilityI);
                dr.SetField(startingIndex++, singleBeer.Growth);
                dr.SetField(startingIndex++, userId);

                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
}

    

