using System.Collections.Generic;
using System.Threading.Tasks;
using Application.SalesReps;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SalesRepController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<SalesRepDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("GroupByUserId")]
        public async Task<ActionResult<List<SalesRepUserDto>>> GroupByUserId()
        {
            return await Mediator.Send(new GroupByUserId.Query());
        }

        [HttpGet("ListBySalesRepId/{salesRepId}")]
        public async Task<ActionResult<List<SalesRepDto>>> ListBySalesRepId(int salesRepId)
        {
            return await Mediator.Send(new ListBySalesRepId.Query { SalesRepId = salesRepId });
        }

        [HttpGet("ListByUserId/{userId}")]
        public async Task<ActionResult<List<SalesRepDto>>> ListByUserId(int userId)
        {
            return await Mediator.Send(new ListByUserId.Query { UserId = userId });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SalesRepDto>> Details(int id)
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