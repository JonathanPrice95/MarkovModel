using Sabio.Models.Domain;
using Sabio.Models.Requests.Beers;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IBeersService
    {
        List<Beer> GetExample();

        List<Beer> GetAllByModelId(int modelId);

        void Update(BeersUpdateRequest model, int userId);
    }
}