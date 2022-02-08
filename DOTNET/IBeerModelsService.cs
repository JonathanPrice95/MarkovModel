using Sabio.Models.Domain;
using Sabio.Models.Requests.Beers;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IBeerModelsService
    {
        List<BeerModel> GetAllModels(int createdBy);

        List<BeerModel> GetUserModels(int createdBy);

        int Add(BeerModelAddRequest model, int userId);

        void Update(BeerModelUpdateRequest model, int userId);

        BeerModel Delete(int id);
    }
}