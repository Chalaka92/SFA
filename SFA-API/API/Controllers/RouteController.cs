using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Routes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RouteController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<RouteDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("ListByAreaId/{areaId}")]
        public async Task<ActionResult<List<RouteDto>>> ListByAreaId(int areaId)
        {
            return await Mediator.Send(new ListByAreaId.Query { AreaId = areaId });
        }

        [HttpGet("Details/{id}")]
        public async Task<ActionResult<RouteDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}