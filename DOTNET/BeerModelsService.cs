using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Beers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class BeerModelsService : IBeerModelsService
    {
        IDataProvider _data = null;

        public BeerModelsService(IDataProvider data)
        {
            _data = data;
        }

        public List<BeerModel> GetAllModels(int createdBy)
        {
            string procName = "[dbo].[BeerModelNames_SelectAll]";

            List<BeerModel> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@CreatedBy", createdBy);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                BeerModel aBeerModel = MapBeerModel(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<BeerModel>();
                }
                list.Add(aBeerModel);
            }
        );
            return list;
        }

        public List<BeerModel> GetUserModels(int createdBy)
        {
            string procName = "[dbo].[BeerModelNames_SelectById]";

            List<BeerModel> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@CreatedBy", createdBy);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                BeerModel aBeerModel = MapBeerModel(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<BeerModel>();
                }
                list.Add(aBeerModel);
            }
        );
            return list;
        }

        public int Add(BeerModelAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[BeerModelNames_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Name", model.Name);
                col.AddWithValue("@CreatedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public void Update(BeerModelUpdateRequest model, int userId)
        {
            string procName = "[dbo].[BeerModelNames_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@Name", model.Name);
                col.AddWithValue("@ModifiedBy", userId);

            }, returnParameters: null);
        }

        public BeerModel Delete(int id)
        {
            string procName = "[dbo].[BeerModelNames_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            });

            return null;
        }

        private static BeerModel MapBeerModel(IDataReader reader, ref int startingIndex)
        {
            BeerModel aBeerModel = new BeerModel();

            aBeerModel.Id = reader.GetSafeInt32(startingIndex++);
            aBeerModel.Name = reader.GetSafeString(startingIndex++);
            aBeerModel.CreatedBy = reader.GetSafeInt32(startingIndex++);
            return aBeerModel;
        }
    }
}
