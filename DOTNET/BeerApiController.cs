using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Beers;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/beers")]
    [ApiController]
    public class BeerApiController : BaseApiController
    {
        private IBeersService _service = null;
        private IAuthenticationService<int> _authService = null;
        private IBeerModelsService _beerModelsService = null;
        public BeerApiController(IBeersService service
            , IBeerModelsService beerModelsService
            , ILogger<BeerApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
            
        {
            _service = service;
            _authService = authService;
            _beerModelsService = beerModelsService;
        }

        [HttpGet("")]
        public ActionResult<ItemsResponse<Beer>> GetExample()
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                List<Beer> list = _service.GetExample();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<Beer> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{modelId:int}")]
        public ActionResult<ItemsResponse<Beer>> GetAllByModelId(int modelId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Beer> list = _service.GetAllByModelId(modelId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<Beer> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("models")]
        public ActionResult<ItemsResponse<BeerModel>> GetAllModels()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                List<BeerModel> list = _beerModelsService.GetAllModels(userId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<BeerModel> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("usermodels")]
        public ActionResult<ItemsResponse<BeerModel>> GetUserModels()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                List<BeerModel> list = _beerModelsService.GetUserModels(userId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<BeerModel> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("models")]
        public ActionResult<ItemResponse<int>> Add(BeerModelAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _beerModelsService.Add(model, userId);

                ItemResponse<int> response = new ItemResponse<int> { Item = id };

                result = StatusCode(201, response);
            }

            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("models/{id:int}")]
        public ActionResult<SuccessResponse> Update(BeerModelUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _beerModelsService.Update(model, userId);

                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("")]
        public ActionResult<SuccessResponse> Update(BeersUpdateRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.Update(model, userId);

                SuccessResponse response = new SuccessResponse();

                result = StatusCode(201, response);
            }

            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpDelete("models/{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _beerModelsService.Delete(id);

                response = new SuccessResponse();
            }

            catch(Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

    }
}
